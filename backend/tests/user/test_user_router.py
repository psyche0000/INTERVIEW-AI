import pytest
from fastapi import HTTPException

from app.models.user import User
from app.routers import users
from app.schemas.user import (
    UserUpdate,
    ChangePasswordRequest,
    UserPreferencesUpdate,
)


def make_user():
    user = User(
        name="Ankan",
        email="ankan@example.com",
        password_hash="test-hash",
        role="admin",
    )
    user.id = 1
    return user


def test_get_me_success(monkeypatch):
    user = make_user()

    monkeypatch.setattr(
        users,
        "get_user_by_id",
        lambda user_id: user,
    )

    current_user = {
        "id": 1,
        "email": "ankan@example.com",
        "role": "admin",
    }

    result = users.get_me(current_user)

    assert result["success"] is True
    assert result["data"]["id"] == 1
    assert result["data"]["name"] == "Ankan"
    assert result["data"]["email"] == "ankan@example.com"
    assert result["data"]["role"] == "admin"


def test_get_me_user_not_found(monkeypatch):
    monkeypatch.setattr(
        users,
        "get_user_by_id",
        lambda user_id: None,
    )

    current_user = {
        "id": 999,
        "email": "unknown@example.com",
        "role": "user",
    }

    result = users.get_me(current_user)

    assert result["success"] is False
    assert result["message"] == "User not found"


def test_update_me_success(monkeypatch):
    user = make_user()

    monkeypatch.setattr(
        users,
        "get_user_by_id",
        lambda user_id: user,
    )

    current_user = {
        "id": 1,
        "email": "ankan@example.com",
        "role": "admin",
    }

    data = UserUpdate(
        name="Updated Ankan",
        email="updated@example.com",
    )

    result = users.update_me(data, current_user)

    assert result["success"] is True
    assert result["message"] == "Profile updated successfully"
    assert result["data"]["name"] == "Updated Ankan"
    assert result["data"]["email"] == "updated@example.com"


def test_update_me_user_not_found(monkeypatch):
    monkeypatch.setattr(
        users,
        "get_user_by_id",
        lambda user_id: None,
    )

    current_user = {
        "id": 999,
        "email": "unknown@example.com",
        "role": "user",
    }

    data = UserUpdate(name="Updated")

    result = users.update_me(data, current_user)

    assert result["success"] is False
    assert result["message"] == "User not found"


def test_change_password_success(monkeypatch):
    monkeypatch.setattr(
        users,
        "change_user_password",
        lambda user_id, current_password, new_password: True,
    )

    current_user = {
        "id": 1,
        "email": "ankan@example.com",
        "role": "admin",
    }

    data = ChangePasswordRequest(
        current_password="Test@123",
        new_password="NewPassword123",
    )

    result = users.change_password(data, current_user)

    assert result["success"] is True
    assert result["message"] == "Password changed successfully"


def test_change_password_user_not_found(monkeypatch):
    monkeypatch.setattr(
        users,
        "change_user_password",
        lambda user_id, current_password, new_password: None,
    )

    current_user = {
        "id": 999,
        "email": "unknown@example.com",
        "role": "user",
    }

    data = ChangePasswordRequest(
        current_password="Test@123",
        new_password="NewPassword123",
    )

    with pytest.raises(HTTPException) as exc:
        users.change_password(data, current_user)

    assert exc.value.status_code == 404
    assert exc.value.detail == "User not found"


def test_change_password_wrong_current_password(monkeypatch):
    monkeypatch.setattr(
        users,
        "change_user_password",
        lambda user_id, current_password, new_password: False,
    )

    current_user = {
        "id": 1,
        "email": "ankan@example.com",
        "role": "admin",
    }

    data = ChangePasswordRequest(
        current_password="WrongPassword",
        new_password="NewPassword123",
    )

    with pytest.raises(HTTPException) as exc:
        users.change_password(data, current_user)

    assert exc.value.status_code == 400
    assert exc.value.detail == "Current password is incorrect"


def test_change_password_invalid_new_password(monkeypatch):
    def fake_change_password(
        user_id,
        current_password,
        new_password,
    ):
        raise ValueError(
            "Password must be at least 8 characters"
        )

    monkeypatch.setattr(
        users,
        "change_user_password",
        fake_change_password,
    )

    current_user = {
        "id": 1,
        "email": "ankan@example.com",
        "role": "admin",
    }

    data = ChangePasswordRequest(
        current_password="Test@123",
        new_password="short",
    )

    with pytest.raises(HTTPException) as exc:
        users.change_password(data, current_user)

    assert exc.value.status_code == 400
    assert exc.value.detail == (
        "Password must be at least 8 characters"
    )


def test_update_preferences(monkeypatch):
    user = make_user()

    monkeypatch.setattr(
        users,
        "get_user_by_id",
        lambda user_id: user,
    )

    current_user = {
        "id": 1,
        "email": "ankan@example.com",
        "role": "admin",
    }

    preferences = UserPreferencesUpdate(
        theme="dark",
        language="en",
        notifications_enabled=True,
        email_notifications=False,
    )

    result = users.update_preferences(
        preferences,
        current_user,
    )

    assert result["success"] is True
    assert result["data"]["theme"] == "dark"
    assert result["data"]["language"] == "en"
    assert result["data"]["notifications_enabled"] is True
    assert result["data"]["email_notifications"] is False


def test_update_preferences_user_not_found(monkeypatch):
    monkeypatch.setattr(
        users,
        "get_user_by_id",
        lambda user_id: None,
    )

    current_user = {
        "id": 999,
        "email": "unknown@example.com",
        "role": "user",
    }

    preferences = UserPreferencesUpdate(
        theme="dark",
    )

    result = users.update_preferences(
        preferences,
        current_user,
    )

    assert result["success"] is False
    assert result["message"] == "User not found"


def test_get_account_status(monkeypatch):
    user = make_user()

    monkeypatch.setattr(
        users,
        "get_user_by_id",
        lambda user_id: user,
    )

    current_user = {
        "id": 1,
        "email": "ankan@example.com",
        "role": "admin",
    }

    result = users.get_account_status(current_user)

    assert result["success"] is True
    assert result["data"]["id"] == 1
    assert result["data"]["email"] == "ankan@example.com"
    assert result["data"]["role"] == "admin"
    assert result["data"]["active"] is True


def test_get_account_status_user_not_found(monkeypatch):
    monkeypatch.setattr(
        users,
        "get_user_by_id",
        lambda user_id: None,
    )

    current_user = {
        "id": 999,
        "email": "unknown@example.com",
        "role": "user",
    }

    result = users.get_account_status(current_user)

    assert result["success"] is False
    assert result["message"] == "User not found"


def test_deactivate_account(monkeypatch):
    user = make_user()

    monkeypatch.setattr(
        users,
        "get_user_by_id",
        lambda user_id: user,
    )

    current_user = {
        "id": 1,
        "email": "ankan@example.com",
        "role": "admin",
    }

    result = users.deactivate_account(current_user)

    assert result["success"] is True
    assert result["message"] == "Account deactivated successfully"
    assert user.is_active is False


def test_deactivate_account_user_not_found(monkeypatch):
    monkeypatch.setattr(
        users,
        "get_user_by_id",
        lambda user_id: None,
    )

    current_user = {
        "id": 999,
        "email": "unknown@example.com",
        "role": "user",
    }

    result = users.deactivate_account(current_user)

    assert result["success"] is False
    assert result["message"] == "User not found"