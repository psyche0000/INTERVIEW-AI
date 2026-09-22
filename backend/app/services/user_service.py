from app.core.security import (
    create_access_token,
    create_refresh_token,
    hash_password,
    verify_password,
)

from app.models.user import User
from app.schemas.user import UserCreate


def create_user(user_data: UserCreate) -> User:
    """
    Create a new user with a hashed password.
    """

    password_hash = hash_password(
        user_data.password
    )

    user = User(
        name=user_data.name,
        email=user_data.email,
        password_hash=password_hash,
        role="user",
    )

    return user


def authenticate_user(
    email: str,
    password: str,
):
    """
    Temporary authentication logic
    until database integration.
    """

    if email != "ankan@example.com":
        return None

    hashed_password = hash_password(
        "Test@123"
    )

    if not verify_password(
        password,
        hashed_password,
    ):
        return None

    user = User(
        name="Ankan",
        email=email,
        password_hash=hashed_password,
        role="admin",
    )

    user.id = 1

    return user


def login_user(
    email: str,
    password: str,
):
    """
    Authenticate user and generate JWT tokens.
    """

    user = authenticate_user(
        email,
        password,
    )

    if not user:
        return None

    token_data = {
        "sub": str(user.id),
        "email": user.email,
        "role": user.role,
    }

    access_token = create_access_token(
        token_data
    )

    refresh_token = create_refresh_token(
        token_data
    )

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
    }


def get_user_by_id(
    user_id: int,
):
    """
    Temporary user lookup.
    Database integration will replace this.
    """

    if user_id != 1:
        return None

    user = User(
        name="Ankan",
        email="ankan@example.com",
        password_hash="",
        role="admin",
    )

    user.id = 1

    return user


def get_user_by_email(
    email: str,
):
    """
    Temporary email-based user lookup.
    """

    if email != "ankan@example.com":
        return None

    return get_user_by_id(1)

def change_user_password(
    user_id: int,
    current_password: str,
    new_password: str,
):
    user = get_user_by_id(user_id)

    if not user:
        return None

    # Temporary password until database integration
    existing_password = "Test@123"

    if not verify_password(
        current_password,
        hash_password(existing_password),
    ):
        return False

    if len(new_password) < 8:
        raise ValueError(
            "Password must be at least 8 characters"
        )

    user.password_hash = hash_password(
        new_password
    )

    return True