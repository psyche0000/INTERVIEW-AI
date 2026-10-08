"""
Repository contract for Saved Job persistence.
"""

from abc import ABC, abstractmethod
from typing import Any
from uuid import UUID

from app.models.saved_job import SavedJob


class SavedJobRepositoryInterface(ABC):
    """Abstract repository for Saved Job operations."""

    @abstractmethod
    async def create(
        self,
        saved_job_data: dict[str, Any],
    ) -> SavedJob:
        """Create a saved Job record."""
        ...

    @abstractmethod
    async def get_by_id(
        self,
        saved_job_id: UUID,
    ) -> SavedJob | None:
        """Retrieve a saved Job by its ID."""
        ...

    @abstractmethod
    async def get_by_user_and_job(
        self,
        user_id: UUID,
        job_id: UUID,
    ) -> SavedJob | None:
        """Retrieve a saved Job for a specific user and Job."""
        ...

    @abstractmethod
    async def get_user_saved_jobs(
        self,
        user_id: UUID,
        *,
        skip: int = 0,
        limit: int = 20,
    ) -> tuple[list[SavedJob], int]:
        """Return a user's saved Jobs with pagination."""
        ...

    @abstractmethod
    async def delete(
        self,
        saved_job_id: UUID,
    ) -> bool:
        """Delete a saved Job record."""
        ...