"""
Saved Job Service
=================

Business logic for saving and managing Jobs for users.
"""

from typing import Any
from uuid import UUID

from app.repositories.saved_job_repository import (
    SavedJobRepositoryInterface,
)
from app.schemas.saved_job import SavedJobCreate


class SavedJobServiceError(Exception):
    """Base exception for Saved Job service errors."""

    pass


class SavedJobAlreadyExistsError(SavedJobServiceError):
    """Raised when a user has already saved a Job."""

    pass


class SavedJobNotFoundError(SavedJobServiceError):
    """Raised when a Saved Job does not exist."""

    pass


class SavedJobService:
    """Service layer for Saved Job operations."""

    def __init__(
        self,
        repository: SavedJobRepositoryInterface,
    ) -> None:
        self.repository = repository

    async def save_job(
        self,
        user_id: UUID,
        saved_job_data: SavedJobCreate,
    ) -> Any:
        """Save a Job for a user."""

        existing = await self.repository.get_by_user_and_job(
            user_id,
            saved_job_data.job_id,
        )

        if existing is not None:
            raise SavedJobAlreadyExistsError(
                "Job has already been saved."
            )

        create_values = {
            "user_id": user_id,
            "job_id": saved_job_data.job_id,
        }

        return await self.repository.create(create_values)

    async def list_saved_jobs(
        self,
        user_id: UUID,
        *,
        skip: int = 0,
        limit: int = 20,
    ) -> tuple[list[Any], int]:
        """Return the user's saved Jobs with pagination."""

        if skip < 0:
            skip = 0

        if limit < 1:
            limit = 20

        return await self.repository.get_user_saved_jobs(
            user_id,
            skip=skip,
            limit=limit,
        )

    async def delete_saved_job(
        self,
        user_id: UUID,
        saved_job_id: UUID,
    ) -> bool:
        """Delete a Saved Job belonging to the user."""

        saved_job = await self.repository.get_by_id(
            saved_job_id,
        )

        if saved_job is None:
            raise SavedJobNotFoundError(
                "Saved Job was not found."
            )

        if saved_job.user_id != user_id:
            raise SavedJobNotFoundError(
                "Saved Job was not found."
            )

        deleted = await self.repository.delete(
            saved_job_id,
        )

        if not deleted:
            raise SavedJobNotFoundError(
                "Saved Job was not found."
            )

        return True