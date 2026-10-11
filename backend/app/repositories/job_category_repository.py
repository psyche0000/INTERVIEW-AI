"""Repository for Job Category persistence."""

from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.models.job_category import JobCategory


class JobCategoryRepository:
    """Database operations for job categories."""

    def __init__(self, db: Session) -> None:
        self.db = db

    async def get_all(self) -> list[JobCategory]:
        """Return categories alphabetically."""
        statement = select(JobCategory).order_by(JobCategory.name.asc())
        return list(self.db.scalars(statement).all())

    async def get_by_id(self, category_id: int) -> JobCategory | None:
        """Return a category by ID."""
        return self.db.get(JobCategory, category_id)

    async def get_by_name(self, name: str) -> JobCategory | None:
        """Return a category by exact name."""
        statement = select(JobCategory).where(JobCategory.name == name)
        return self.db.scalars(statement).first()

    async def create(self, category_data: dict) -> JobCategory:
        """Create and return a category."""
        category = JobCategory(**category_data)
        self.db.add(category)
        try:
            self.db.commit()
        except IntegrityError:
            self.db.rollback()
            raise
        self.db.refresh(category)
        return category

    async def update(
        self,
        category_id: int,
        category_data: dict,
    ) -> JobCategory | None:
        """Update and return a category."""
        category = self.db.get(JobCategory, category_id)
        if category is None:
            return None

        for field, value in category_data.items():
            setattr(category, field, value)

        try:
            self.db.commit()
        except IntegrityError:
            self.db.rollback()
            raise
        self.db.refresh(category)
        return category

    async def delete(self, category_id: int) -> bool:
        """Delete a category and report whether it existed."""
        category = self.db.get(JobCategory, category_id)
        if category is None:
            return False

        self.db.delete(category)
        self.db.commit()
        return True
