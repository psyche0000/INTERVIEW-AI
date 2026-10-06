from datetime import datetime, timezone

from app.core import security


def test_hash_and_verify_password():
    password = "StrongPassword123!"

    hashed = security.hash_password(password)

    assert hashed != password
    assert security.verify_password(password, hashed) is True
    assert security.verify_password("WrongPassword", hashed) is False


def test_create_access_token():
    token = security.create_access_token(
        {
            "sub": "1",
            "email": "test@example.com",
            "role": "user",
        }
    )

    payload = security.decode_token(token)

    assert payload is not None
    assert payload["sub"] == "1"
    assert payload["email"] == "test@example.com"
    assert payload["role"] == "user"
    assert payload["type"] == "access"
    assert "exp" in payload


def test_create_refresh_token():
    token = security.create_refresh_token(
        {
            "sub": "1",
            "email": "test@example.com",
            "role": "user",
        }
    )

    payload = security.verify_refresh_token(token)

    assert payload is not None
    assert payload["sub"] == "1"
    assert payload["type"] == "refresh"


def test_refresh_token_rejects_access_token():
    token = security.create_access_token(
        {
            "sub": "1",
            "email": "test@example.com",
            "role": "user",
        }
    )

    assert security.verify_refresh_token(token) is None


def test_decode_invalid_token():
    result = security.decode_token("invalid.token.value")

    assert result is None


def test_create_reset_token():
    token = security.create_reset_token(
        {
            "sub": "1",
            "email": "test@example.com",
        }
    )

    payload = security.verify_reset_token(token)

    assert payload is not None
    assert payload["sub"] == "1"
    assert payload["email"] == "test@example.com"
    assert payload["type"] == "reset"


def test_reset_token_rejects_access_token():
    token = security.create_access_token(
        {
            "sub": "1",
            "email": "test@example.com",
            "role": "user",
        }
    )

    assert security.verify_reset_token(token) is None


def test_create_email_verification_token():
    token = security.create_email_verification_token(
        {
            "sub": "1",
            "email": "test@example.com",
        }
    )

    payload = security.verify_email_verification_token(token)

    assert payload is not None
    assert payload["sub"] == "1"
    assert payload["email"] == "test@example.com"
    assert payload["type"] == "email_verification"


def test_email_verification_rejects_access_token():
    token = security.create_access_token(
        {
            "sub": "1",
            "email": "test@example.com",
            "role": "user",
        }
    )

    assert security.verify_email_verification_token(token) is None


def test_revoke_token():
    token = "test-token-123"

    security.revoke_token(token)

    assert security.is_token_revoked(token) is True
    assert security.is_token_revoked("another-token") is False