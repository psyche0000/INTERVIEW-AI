
"""SQLAlchemy repository for user accounts."""

from sqlalchemy import func, or_, select
from sqlalchemy.orm import Session

from app.models.user import User


class SQLAlchemyUserRepository:
    """Database operations for user accounts."""

    def __init__(self, db: Session):
        self.db = db

    def get_by_id(self, user_id: int) -> User | None:
        return self.db.get(User, user_id)

    def get_by_email(self, email: str) -> User | None:
        statement = select(User).where(User.email == email)
        return self.db.scalar(statement)

    def list_users(
        self,
        skip: int = 0,
        limit: int = 50,
        search: str | None = None,
        role: str | None = None,
        is_active: bool | None = None,
        is_verified: bool | None = None,
    ) -> list[User]:
        statement = select(User)

        if search and search.strip():
            term = f"%{search.strip()}%"
            statement = statement.where(
                or_(
                    User.name.ilike(term),
                    User.email.ilike(term),
                )
            )

        if role is not None:
            statement = statement.where(User.role == role)

        if is_active is not None:
            statement = statement.where(User.is_active.is_(is_active))

        if is_verified is not None:
            statement = statement.where(User.is_verified.is_(is_verified))

        statement = (
            statement.order_by(User.id.asc())
            .offset(skip)
            .limit(limit)
        )
        return list(self.db.scalars(statement).all())

    def count_active_admins(self) -> int:
        statement = (
            select(func.count())
            .select_from(User)
            .where(
                User.role == "admin",
                User.is_active.is_(True),
            )
        )
        return self.db.scalar(statement) or 0

    def delete(self, user: User) -> None:
        self.db.delete(user)
        self.db.commit()

    def save(self, user: User) -> User:
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user
