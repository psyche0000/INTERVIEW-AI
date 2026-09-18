from app.core.security import (
    create_access_token,
    create_refresh_token,
    hash_password,
    verify_password,
)
from app.models.user import User
from app.schemas.user import UserCreate


def create_user(user_data: UserCreate) -> User:
    password_hash = hash_password(user_data.password)

    user = User(
        name=user_data.name,
        email=user_data.email,
        password_hash=password_hash,
    )

    return user


def authenticate_user(
    email: str,
    password: str,
):
    # Temporary user lookup until database integration
    if email != "ankan@example.com":
        return None

    hashed_password = hash_password("Test@123")

    if not verify_password(password, hashed_password):
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
    user = authenticate_user(email, password)

    if not user:
        return None

    token_data = {
        "sub": str(user.id),
        "email": user.email,
        "role": user.role,
    }

    access_token = create_access_token(token_data)

    refresh_token = create_refresh_token(token_data)

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
    }