import pytest
from fastapi import HTTPException
from fastapi.security import HTTPAuthorizationCredentials

from app.core.dependencies import (
    get_current_user,
    require_admin,
    verify_interview_owner,
)
from app.core.security import (
    create_access_token,
    create_refresh_token,
    revoke_token,
)


def make_credentials(token: str):
    return HTTPAuthorizationCredentials(
        scheme="Bearer",
        credentials=token,
    )


def test_get_current_user_valid_token():
    token = create_access_token(
        {
            "sub": "1",
            "email": "test@example.com",
            "role": "user",
        }
    )

    current_user = get_current_user(make_credentials(token))

    assert current_user == {
        "id": 1,
        "email": "test@example.com",
        "role": "user",
    }


def test_get_current_user_admin():
    token = create_access_token(
        {
            "sub": "10",
            "email": "admin@example.com",
            "role": "admin",
        }
    )

    current_user = get_current_user(make_credentials(token))

    assert current_user["id"] == 10
    assert current_user["email"] == "admin@example.com"
    assert current_user["role"] == "admin"


def test_get_current_user_revoked_token():
    token = create_access_token(
        {
            "sub": "1",
            "email": "test@example.com",
            "role": "user",
        }
    )

    revoke_token(token)

    with pytest.raises(HTTPException) as exc:
        get_current_user(make_credentials(token))

    assert exc.value.status_code == 401
    assert exc.value.detail == "Token has been revoked"


def test_get_current_user_rejects_refresh_token():
    token = create_refresh_token(
        {
            "sub": "1",
            "email": "test@example.com",
            "role": "user",
        }
    )

    with pytest.raises(HTTPException) as exc:
        get_current_user(make_credentials(token))

    assert exc.value.status_code == 401
    assert exc.value.detail == "Invalid token type"


def test_get_current_user_invalid_token():
    with pytest.raises(HTTPException) as exc:
        get_current_user(make_credentials("invalid.token"))

    assert exc.value.status_code == 401
    assert exc.value.detail == "Invalid or expired token"


def test_get_current_user_missing_user_id():
    token = create_access_token(
        {
            "email": "test@example.com",
            "role": "user",
        }
    )

    with pytest.raises(HTTPException) as exc:
        get_current_user(make_credentials(token))

    assert exc.value.status_code == 401
    assert exc.value.detail == "Invalid authentication credentials"


def test_get_current_user_missing_email():
    token = create_access_token(
        {
            "sub": "1",
            "role": "user",
        }
    )

    with pytest.raises(HTTPException) as exc:
        get_current_user(make_credentials(token))

    assert exc.value.status_code == 401
    assert exc.value.detail == "Invalid authentication credentials"


def test_require_admin_success():
    current_user = {
        "id": 1,
        "email": "admin@example.com",
        "role": "admin",
    }

    result = require_admin(current_user)

    assert result == current_user


def test_require_admin_rejects_user():
    current_user = {
        "id": 1,
        "email": "user@example.com",
        "role": "user",
    }

    with pytest.raises(HTTPException) as exc:
        require_admin(current_user)

    assert exc.value.status_code == 403
    assert exc.value.detail == "Admin access required"


def test_verify_interview_owner_success():
    current_user = {
        "id": 5,
        "email": "user@example.com",
        "role": "user",
    }

    result = verify_interview_owner(
        interview_user_id=5,
        current_user=current_user,
    )

    assert result is True


def test_verify_interview_owner_rejects_other_user():
    current_user = {
        "id": 5,
        "email": "user@example.com",
        "role": "user",
    }

    with pytest.raises(HTTPException) as exc:
        verify_interview_owner(
            interview_user_id=10,
            current_user=current_user,
        )

    assert exc.value.status_code == 403
    assert exc.value.detail == (
        "You are not authorized to access this interview"
    )