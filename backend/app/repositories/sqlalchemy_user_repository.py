"""SQLAlchemy repository for user accounts."""

from sqlalchemy import select
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

    def list_users(self, skip: int = 0, limit: int = 50) -> list[User]:
        statement = (
            select(User)
            .order_by(User.id.asc())
            .offset(skip)
            .limit(limit)
        )
        return list(self.db.scalars(statement).all())


    def count_active_admins(self) -> int:
        """Count active administrator accounts."""
        from sqlalchemy import func

        statement = select(func.count()).select_from(User).where(
            User.role == "admin",
            User.is_active.is_(True),
        )
        return self.db.scalar(statement) or 0


    def save(self, user: User) -> User:
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user
