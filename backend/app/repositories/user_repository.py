from typing import Optional

from app.models.user import User


_users: list[User] = []


def save_user(user: User) -> User:
    user.id = len(_users) + 1
    _users.append(user)
    return user


def get_user_by_email(email: str) -> Optional[User]:
    for user in _users:
        if user.email.lower() == email.lower():
            return user

    return None