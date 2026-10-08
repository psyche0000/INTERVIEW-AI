"""
Repository contract for Job persistence.

Defines the operations required by the Job service.
"""

from abc import ABC, abstractmethod
from typing import Any
from uuid import UUID

from app.models.job import Job


class JobRepositoryInterface(ABC):
    """Abstract repository interface for Job persistence."""

    @abstractmethod
    async def create(self, job_data: dict[str, Any]) -> Job:
        """Create and return a Job."""

    @abstractmethod
    async def get_by_id(self, job_id: UUID) -> Job | None:
        """Return a Job by ID."""

    @abstractmethod
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

    @abstractmethod
    async def get_categories(self) -> list[str]:
        """Return distinct Job categories."""

    @abstractmethod
    async def update(
        self,
        job_id: UUID,
        job_data: dict[str, Any],
    ) -> Job | None:
        """Update and return a Job."""

    @abstractmethod
    async def delete(self, job_id: UUID) -> bool:
        """Delete a Job and return whether it existed."""
