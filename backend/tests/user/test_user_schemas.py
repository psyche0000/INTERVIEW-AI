import pytest
from pydantic import ValidationError

from app.schemas.user import (
    UserCreate,
    UserResponse,
    UserUpdate,
    ChangePasswordRequest,
    UserPreferencesUpdate,
    AccountStatusResponse,
)


def test_user_create_valid():
    user = UserCreate(
        name="Ankan",
        email="ankan@example.com",
        password="Test@123",
    )

    assert user.name == "Ankan"
    assert user.email == "ankan@example.com"
    assert user.password == "Test@123"


def test_user_create_rejects_short_name():
    with pytest.raises(ValidationError):
        UserCreate(
            name="A",
            email="ankan@example.com",
            password="Test@123",
        )


def test_user_create_rejects_short_password():
    with pytest.raises(ValidationError):
        UserCreate(
            name="Ankan",
            email="ankan@example.com",
            password="short",
        )


def test_user_create_rejects_invalid_email():
    with pytest.raises(ValidationError):
        UserCreate(
            name="Ankan",
            email="invalid-email",
            password="Test@123",
        )


def test_user_response():
    user = UserResponse(
        id=1,
        name="Ankan",
        email="ankan@example.com",
        role="user",
        is_active=True,
        is_verified=True,
    )

    assert user.id == 1
    assert user.role == "user"
    assert user.is_active is True
    assert user.is_verified is True


def test_user_update():
    user = UserUpdate(
        name="Updated Name",
        email="updated@example.com",
    )

    assert user.name == "Updated Name"
    assert user.email == "updated@example.com"


def test_user_update_optional_fields():
    user = UserUpdate()

    assert user.name is None
    assert user.email is None


def test_change_password_request():
    request = ChangePasswordRequest(
        current_password="OldPassword",
        new_password="NewPassword123",
    )

    assert request.current_password == "OldPassword"
    assert request.new_password == "NewPassword123"


def test_user_preferences():
    preferences = UserPreferencesUpdate(
        theme="dark",
        language="en",
        notifications_enabled=True,
        email_notifications=False,
    )

    assert preferences.theme == "dark"
    assert preferences.language == "en"
    assert preferences.notifications_enabled is True
    assert preferences.email_notifications is False


def test_user_preferences_optional():
    preferences = UserPreferencesUpdate()

    assert preferences.theme is None
    assert preferences.language is None
    assert preferences.notifications_enabled is None
    assert preferences.email_notifications is None


def test_account_status():
    status = AccountStatusResponse(active=True)

    assert status.active is True