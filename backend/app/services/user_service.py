"""Business logic for user management."""

from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.core.roles import UserRole
from app.core.security import hash_password, verify_password
from app.models.user import User
from app.repositories.sqlalchemy_user_repository import (
    SQLAlchemyUserRepository,
)


class UserNotFoundError(Exception):
    """Raised when a user account does not exist."""


class DuplicateEmailError(Exception):
    """Raised when an email address is already registered."""


class InvalidPasswordError(Exception):
    """Raised when the current password is incorrect."""


class InvalidUserUpdateError(Exception):
    """Raised when an account update is invalid."""


class UserService:
    """Business logic for user profiles and administration."""

    def __init__(self, db: Session):
        self.db = db
        self.repository = SQLAlchemyUserRepository(db)

    def get_user(self, user_id: int) -> User:
        user = self.repository.get_by_id(user_id)
        if user is None:
            raise UserNotFoundError("User not found")
        return user

    def update_profile(
        self,
        user_id: int,
        name: str | None = None,
        email: str | None = None,
    ) -> User:
        user = self.get_user(user_id)

        if name is not None:
            user.name = name.strip()

        if email is not None:
            normalized_email = email.strip().lower()
            existing = self.repository.get_by_email(normalized_email)
            if existing is not None and existing.id != user.id:
                raise DuplicateEmailError("Email is already registered")
            user.email = normalized_email

        return self._save(user)

    def change_password(
        self,
        user_id: int,
        current_password: str,
        new_password: str,
    ) -> None:
        user = self.get_user(user_id)

        if not verify_password(current_password, user.password_hash):
            raise InvalidPasswordError("Current password is incorrect")

        if current_password == new_password:
            raise InvalidUserUpdateError(
                "New password must differ from current password"
            )

        user.password_hash = hash_password(new_password)
        self._save(user)

    def list_users(self, skip: int = 0, limit: int = 50) -> list[User]:
        return self.repository.list_users(skip=skip, limit=limit)

    def update_user_as_admin(
        self,
        user_id: int,
        *,
        role: str | None = None,
        is_active: bool | None = None,
        is_verified: bool | None = None,
    ) -> User:
        user = self.get_user(user_id)


        removing_admin_access = (
            user.role == UserRole.ADMIN
            and user.is_active
            and (
                role == UserRole.USER
                or is_active is False
            )
        )

        if removing_admin_access:
            active_admin_count = self.repository.count_active_admins()

            if active_admin_count <= 1:
                raise InvalidUserUpdateError(
                    "Cannot deactivate or demote the last active administrator"
                )


        if role is not None:
            if role not in {UserRole.USER, UserRole.ADMIN}:
                raise InvalidUserUpdateError("Invalid role")
            user.role = role

        if is_active is not None:
            user.is_active = is_active

        if is_verified is not None:
            user.is_verified = is_verified

        return self._save(user)


    def _save(self, user: User) -> User:
        try:
            return self.repository.save(user)
        except IntegrityError as exc:
            self.db.rollback()

            original_error = getattr(exc, "orig", None)
            constraint_name = getattr(
                getattr(original_error, "diag", None),
                "constraint_name",
                None,
            )

            if constraint_name in {
                "ix_users_email",
                "users_email_key",
            }:
                raise DuplicateEmailError(
                    "Email is already registered"
                ) from exc

            raise
