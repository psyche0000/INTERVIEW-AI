from app.schemas.user import UserCreate
from app.services.user_service import (
    create_user,
    authenticate_user,
    login_user,
    get_user_by_id,
    get_user_by_email,
    change_user_password,
)


def test_create_user():
    user_data = UserCreate(
        name="Test User",
        email="test@example.com",
        password="Test@123",
    )

    user = create_user(user_data)

    assert user.name == "Test User"
    assert user.email == "test@example.com"
    assert user.role == "user"
    assert user.password_hash != "Test@123"


def test_authenticate_user_success():
    user = authenticate_user(
        "ankan@example.com",
        "Test@123",
    )

    assert user is not None
    assert user.id == 1
    assert user.name == "Ankan"
    assert user.email == "ankan@example.com"
    assert user.role == "admin"


def test_authenticate_user_wrong_email():
    user = authenticate_user(
        "wrong@example.com",
        "Test@123",
    )

    assert user is None


def test_authenticate_user_wrong_password():
    user = authenticate_user(
        "ankan@example.com",
        "WrongPassword123",
    )

    assert user is None


def test_login_user_success():
    result = login_user(
        "ankan@example.com",
        "Test@123",
    )

    assert result is not None
    assert "access_token" in result
    assert "refresh_token" in result
    assert result["token_type"] == "bearer"


def test_login_user_failure():
    result = login_user(
        "wrong@example.com",
        "WrongPassword",
    )

    assert result is None


def test_get_user_by_id_success():
    user = get_user_by_id(1)

    assert user is not None
    assert user.id == 1
    assert user.name == "Ankan"
    assert user.email == "ankan@example.com"
    assert user.role == "admin"


def test_get_user_by_id_not_found():
    user = get_user_by_id(999)

    assert user is None


def test_get_user_by_email_success():
    user = get_user_by_email(
        "ankan@example.com"
    )

    assert user is not None
    assert user.id == 1
    assert user.email == "ankan@example.com"


def test_get_user_by_email_not_found():
    user = get_user_by_email(
        "unknown@example.com"
    )

    assert user is None


def test_change_user_password_success():
    result = change_user_password(
        user_id=1,
        current_password="Test@123",
        new_password="NewPassword123",
    )

    assert result is True


def test_change_user_password_wrong_current_password():
    result = change_user_password(
        user_id=1,
        current_password="WrongPassword",
        new_password="NewPassword123",
    )

    assert result is False


def test_change_user_password_user_not_found():
    result = change_user_password(
        user_id=999,
        current_password="Test@123",
        new_password="NewPassword123",
    )

    assert result is None


def test_change_user_password_short_password():
    try:
        change_user_password(
            user_id=1,
            current_password="Test@123",
            new_password="short",
        )
        assert False
    except ValueError as error:
        assert str(error) == "Password must be at least 8 characters"
        