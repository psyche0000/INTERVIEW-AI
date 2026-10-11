"""Service layer for Job Category management."""

from sqlalchemy.exc import IntegrityError

from app.models.job_category import JobCategory
from app.repositories.job_category_repository import JobCategoryRepository
from app.schemas.job_category import JobCategoryCreate, JobCategoryUpdate


class JobCategoryNotFoundError(Exception):
    """Raised when a job category does not exist."""


class DuplicateJobCategoryError(Exception):
    """Raised when a category name is already in use."""


class JobCategoryService:
    """Business operations for job categories."""

    def __init__(self, repository: JobCategoryRepository) -> None:
        self.repository = repository

    async def get_all(self) -> list[JobCategory]:
        """List all categories."""
        return await self.repository.get_all()

    async def get_by_id(self, category_id: int) -> JobCategory:
        """Get one category or raise when it does not exist."""
        category = await self.repository.get_by_id(category_id)
        if category is None:
            raise JobCategoryNotFoundError(
                f"Job category {category_id} not found"
            )
        return category

    async def create(self, data: JobCategoryCreate) -> JobCategory:
        """Create a category with a unique name."""
        if await self.repository.get_by_name(data.name):
            raise DuplicateJobCategoryError(
                f"Job category '{data.name}' already exists"
            )

        try:
            return await self.repository.create(data.model_dump())
        except IntegrityError as exc:
            raise DuplicateJobCategoryError(
                f"Job category '{data.name}' already exists"
            ) from exc

    async def update(
        self,
        category_id: int,
        data: JobCategoryUpdate,
    ) -> JobCategory:
        """Update a category."""
        category = await self.get_by_id(category_id)
        update_data = data.model_dump(exclude_unset=True)

        new_name = update_data.get("name")
        if new_name is not None:
            existing = await self.repository.get_by_name(new_name)
            if existing is not None and existing.id != category_id:
                raise DuplicateJobCategoryError(
                    f"Job category '{new_name}' already exists"
                )

        try:
            updated = await self.repository.update(category_id, update_data)
        except IntegrityError as exc:
            duplicate_name = new_name or category.name
            raise DuplicateJobCategoryError(
                f"Job category '{duplicate_name}' already exists"
            ) from exc

        if updated is None:
            raise JobCategoryNotFoundError(
                f"Job category {category_id} not found"
            )
        return updated

    async def delete(self, category_id: int) -> None:
        """Delete a category or raise when it does not exist."""
        deleted = await self.repository.delete(category_id)
        if not deleted:
            raise JobCategoryNotFoundError(
                f"Job category {category_id} not found"
            )
