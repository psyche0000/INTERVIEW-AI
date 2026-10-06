import pytest
from fastapi import HTTPException

from app.core.roles import UserRole
from app.core.permissions import require_admin


def test_user_role_value():
    assert UserRole.USER == "user"


def test_admin_role_value():
    assert UserRole.ADMIN == "admin"


def test_require_admin_allows_admin():
    current_user = {
        "id": 1,
        "email": "admin@example.com",
        "role": UserRole.ADMIN,
    }

    result = require_admin(current_user)

    assert result == current_user


def test_require_admin_rejects_user():
    current_user = {
        "id": 2,
        "email": "user@example.com",
        "role": UserRole.USER,
    }

    with pytest.raises(HTTPException) as exc:
        require_admin(current_user)

    assert exc.value.status_code == 403
    assert exc.value.detail == "Admin access required"


def test_require_admin_rejects_unknown_role():
    current_user = {
        "id": 3,
        "email": "unknown@example.com",
        "role": "manager",
    }

    with pytest.raises(HTTPException) as exc:
        require_admin(current_user)

    assert exc.value.status_code == 403
    assert exc.value.detail == "Admin access required"