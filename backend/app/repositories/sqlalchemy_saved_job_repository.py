"""
SQLAlchemy repository for Saved Job persistence.
"""

from typing import Any
from uuid import UUID

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.models.saved_job import SavedJob
from app.repositories.saved_job_repository import SavedJobRepositoryInterface


class SQLAlchemySavedJobRepository(SavedJobRepositoryInterface):
    """SQLAlchemy implementation of the Saved Job repository."""

    def __init__(self, db: Session) -> None:
        self.db = db

    async def create(
        self,
        saved_job_data: dict[str, Any],
    ) -> SavedJob:
        saved_job = SavedJob(**saved_job_data)

        self.db.add(saved_job)
        self.db.commit()
        self.db.refresh(saved_job)

        return saved_job

    async def get_by_id(
        self,
        saved_job_id: UUID,
    ) -> SavedJob | None:
        return self.db.get(SavedJob, saved_job_id)

    async def get_by_user_and_job(
        self,
        user_id: UUID,
        job_id: UUID,
    ) -> SavedJob | None:
        statement = select(SavedJob).where(
            SavedJob.user_id == user_id,
            SavedJob.job_id == job_id,
        )

        return self.db.scalars(statement).first()

    async def get_user_saved_jobs(
        self,
        user_id: UUID,
        *,
        skip: int = 0,
        limit: int = 20,
    ) -> tuple[list[SavedJob], int]:
        count_statement = (
            select(func.count())
            .select_from(SavedJob)
            .where(SavedJob.user_id == user_id)
        )

        total = self.db.scalar(count_statement) or 0

        statement = (
            select(SavedJob)
            .where(SavedJob.user_id == user_id)
            .order_by(SavedJob.created_at.desc())
            .offset(skip)
            .limit(limit)
        )

        saved_jobs = list(self.db.scalars(statement).all())

        return saved_jobs, total

    async def delete(
        self,
        saved_job_id: UUID,
    ) -> bool:
        saved_job = self.db.get(SavedJob, saved_job_id)

        if saved_job is None:
            return False

        self.db.delete(saved_job)
        self.db.commit()

        return True