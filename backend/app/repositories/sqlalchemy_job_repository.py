"""
SQLAlchemy repository for Job persistence.

Implements the Job repository contract using the shared
synchronous SQLAlchemy session.
"""

from typing import Any
from uuid import UUID

from sqlalchemy import asc, desc, func, or_, select
from sqlalchemy.orm import Session

from app.models.job import Job
from app.repositories.job_repository import JobRepositoryInterface


class SQLAlchemyJobRepository(JobRepositoryInterface):
    """SQLAlchemy implementation of the Job repository."""

    def __init__(self, db: Session) -> None:
        self.db = db

    async def create(self, job_data: dict[str, Any]) -> Job:
        """Create and return a Job."""

        job = Job(**job_data)

        self.db.add(job)
        self.db.commit()
        self.db.refresh(job)

        return job

    async def get_by_id(self, job_id: UUID) -> Job | None:
        """Return a Job by ID."""

        return self.db.get(Job, job_id)

    async def get_all(
        self,
        *,
        search: str | None = None,
        location: str | None = None,
        category: str | None = None,
        employment_type: str | None = None,
        experience_level: str | None = None,
        sort_by: str = "created_at",
        sort_order: str = "desc",
        skip: int = 0,
        limit: int = 20,
    ) -> tuple[list[Job], int]:
        """Return filtered, sorted, and paginated Jobs."""

        filters = []

        if search:
            search_pattern = f"%{search}%"

            filters.append(
                or_(
                    Job.title.ilike(search_pattern),
                    Job.company_name.ilike(search_pattern),
                    Job.description.ilike(search_pattern),
                    Job.category.ilike(search_pattern),
                )
            )

        if location:
            filters.append(
                Job.location.ilike(f"%{location}%")
            )

        if category:
            filters.append(
                Job.category.ilike(f"%{category}%")
            )

        if employment_type:
            filters.append(
                Job.employment_type == employment_type
            )

        if experience_level:
            filters.append(
                Job.experience_level == experience_level
            )

        count_statement = (
            select(func.count())
            .select_from(Job)
            .where(*filters)
        )

        total = self.db.scalar(count_statement) or 0

        sort_columns = {
            "created_at": Job.created_at,
            "updated_at": Job.updated_at,
            "title": Job.title,
            "company_name": Job.company_name,
            "salary_min": Job.salary_min,
            "salary_max": Job.salary_max,
        }

        sort_column = sort_columns.get(
            sort_by,
            Job.created_at,
        )

        order_expression = (
            asc(sort_column)
            if sort_order.lower() == "asc"
            else desc(sort_column)
        )

        statement = (
            select(Job)
            .where(*filters)
            .order_by(order_expression)
            .offset(skip)
            .limit(limit)
        )

        jobs = list(
            self.db.scalars(statement).all()
        )

        return jobs, total


    async def get_categories(self) -> list[str]:
        """Return distinct non-empty Job categories in alphabetical order."""

        statement = (
            select(Job.category)
            .where(Job.category.is_not(None))
            .where(Job.category != "")
            .distinct()
            .order_by(Job.category.asc())
        )

        return list(self.db.scalars(statement).all())
    async def update(
        self,
        job_id: UUID,
        job_data: dict[str, Any],
    ) -> Job | None:
        """Update and return a Job."""

        job = self.db.get(Job, job_id)

        if job is None:
            return None

        for field, value in job_data.items():
            setattr(job, field, value)

        self.db.commit()
        self.db.refresh(job)

        return job

    async def delete(self, job_id: UUID) -> bool:
        """Delete a Job and return whether it existed."""

        job = self.db.get(Job, job_id)

        if job is None:
            return False

        self.db.delete(job)
        self.db.commit()

        return True
