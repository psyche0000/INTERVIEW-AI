"""
SQLAlchemy repository for Resume persistence.

Implements the Resume repository contract using the shared
synchronous SQLAlchemy session.
"""

from typing import Any
from uuid import UUID

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.models.resume import Resume
from app.models.resume_history import ResumeHistory
from app.repositories.resume_repository import ResumeRepositoryInterface


class SQLAlchemyResumeRepository(ResumeRepositoryInterface):
    """SQLAlchemy implementation of ResumeRepositoryInterface."""

    def __init__(self, db: Session) -> None:
        self.db = db

    async def create(
        self,
        resume_data: dict[str, Any],
    ) -> Resume:
        """Create and persist a Resume record."""

        resume = Resume(**resume_data)

        self.db.add(resume)
        self.db.commit()
        self.db.refresh(resume)

        return resume

    async def get_by_id(
        self,
        resume_id: UUID,
    ) -> Resume | None:
        """Retrieve a Resume by ID."""

        return self.db.get(Resume, resume_id)

    async def get_user_resumes(
        self,
        user_id: UUID,
        *,
        skip: int = 0,
        limit: int = 20,
    ) -> tuple[list[Resume], int]:
        """Retrieve paginated resumes belonging to a user."""

        count_statement = (
            select(func.count())
            .select_from(Resume)
            .where(Resume.user_id == user_id)
        )

        total = self.db.scalar(count_statement) or 0

        statement = (
            select(Resume)
            .where(Resume.user_id == user_id)
            .order_by(Resume.created_at.desc())
            .offset(skip)
            .limit(limit)
        )

        resumes = list(self.db.scalars(statement).all())

        return resumes, total

    async def get_active_resume(
        self,
        user_id: UUID,
    ) -> Resume | None:
        """Retrieve the active Resume belonging to a user."""

        statement = (
            select(Resume)
            .where(
                Resume.user_id == user_id,
                Resume.is_active.is_(True),
            )
            .order_by(Resume.created_at.desc())
            .limit(1)
        )

        return self.db.scalars(statement).first()

    async def update(
        self,
        resume_id: UUID,
        resume_data: dict[str, Any],
    ) -> Resume | None:
        """Update Resume metadata."""

        resume = self.db.get(Resume, resume_id)

        if resume is None:
            return None

        for field, value in resume_data.items():
            setattr(resume, field, value)

        self.db.commit()
        self.db.refresh(resume)

        return resume

    async def delete(
        self,
        resume_id: UUID,
    ) -> bool:
        """Delete a Resume record."""

        resume = self.db.get(Resume, resume_id)

        if resume is None:
            return False

        self.db.delete(resume)
        self.db.commit()

        return True

    async def get_history(
        self,
        resume_id: UUID,
    ) -> list[ResumeHistory]:
        """Retrieve historical versions of a Resume."""

        statement = (
            select(ResumeHistory)
            .where(ResumeHistory.resume_id == resume_id)
            .order_by(ResumeHistory.version.desc())
        )

        return list(self.db.scalars(statement).all())