"""
Job Service
===========

Business logic for Job Management.

Responsibilities:
- Create jobs.
- Retrieve job details.
- List jobs with search, filtering, sorting, and pagination.
- Update jobs.
- Delete jobs.

Saved jobs and categories will be added in later Job Management steps.
"""

from typing import Any
from uuid import UUID

from app.repositories.job_repository import JobRepositoryInterface
from app.schemas.job import JobCreate, JobUpdate


# ---------------------------------------------------------------------------
# Service Exceptions
# ---------------------------------------------------------------------------


class JobServiceError(Exception):
    """Base exception for Job service errors."""

    pass


class JobNotFoundError(JobServiceError):
    """Raised when a requested Job does not exist."""

    pass


# ---------------------------------------------------------------------------
# Job Service
# ---------------------------------------------------------------------------


class JobService:
    """
    Service layer responsible for Job business operations.

    The repository is injected into the service so database-specific
    implementation details remain outside the business logic.
    """

    def __init__(
        self,
        repository: JobRepositoryInterface,
    ) -> None:
        """
        Initialize the Job service.

        Args:
            repository:
                Job repository implementation.
        """

        self.repository = repository

    # -----------------------------------------------------------------------
    # Create Job
    # -----------------------------------------------------------------------

    async def create_job(
        self,
        job_data: JobCreate,
    ) -> Any:
        """
        Create a new Job.

        Converts the validated Pydantic input into repository data
        before persistence.
        """

        create_values = job_data.model_dump()

        return await self.repository.create(create_values)

    # -----------------------------------------------------------------------
    # Get Job
    # -----------------------------------------------------------------------

    async def get_job(
        self,
        job_id: UUID,
    ) -> Any:
        """
        Retrieve a Job by ID.

        Raises:
            JobNotFoundError:
                If the Job does not exist.
        """

        job = await self.repository.get_by_id(job_id)

        if job is None:
            raise JobNotFoundError(
                "Job was not found."
            )

        return job

    # -----------------------------------------------------------------------
    # List Jobs
    # -----------------------------------------------------------------------

    async def list_jobs(
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
    ) -> tuple[list[Any], int]:
        """
        Retrieve Jobs with search, filtering, sorting, and pagination.

        Invalid pagination values are normalized to safe defaults.
        """

        if skip < 0:
            skip = 0

        if limit < 1:
            limit = 20

        return await self.repository.get_all(
            search=search,
            location=location,
            category=category,
            employment_type=employment_type,
            experience_level=experience_level,
            sort_by=sort_by,
            sort_order=sort_order,
            skip=skip,
            limit=limit,
        )

    # -----------------------------------------------------------------------
    # Update Job
    # -----------------------------------------------------------------------


    async def get_categories(self) -> list[str]:
        """Return the available Job categories."""

        return await self.repository.get_categories()
    async def update_job(
        self,
        job_id: UUID,
        update_data: JobUpdate,
    ) -> Any:
        """
        Update an existing Job.

        Raises:
            JobNotFoundError:
                If the Job does not exist.
        """

        # Verify that the Job exists before attempting the update.
        await self.get_job(job_id)

        update_values = update_data.model_dump(
            exclude_unset=True,
            exclude_none=True,
        )

        if not update_values:
            return await self.get_job(job_id)

        updated_job = await self.repository.update(
            job_id,
            update_values,
        )

        if updated_job is None:
            raise JobNotFoundError(
                "Job was not found."
            )

        return updated_job

    # -----------------------------------------------------------------------
    # Delete Job
    # -----------------------------------------------------------------------

    async def delete_job(
        self,
        job_id: UUID,
    ) -> bool:
        """
        Delete a Job.

        Raises:
            JobNotFoundError:
                If the Job does not exist.
        """

        # Verify that the Job exists before deletion.
        await self.get_job(job_id)

        deleted = await self.repository.delete(job_id)

        if not deleted:
            raise JobNotFoundError(
                "Job was not found."
            )

        return True
