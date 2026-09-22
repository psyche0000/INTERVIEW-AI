from abc import ABC, abstractmethod
from typing import Any
from uuid import UUID


# ---------------------------------------------------------------------------
# Resume Repository Interface
# ---------------------------------------------------------------------------


class ResumeRepositoryInterface(ABC):
    """
    Abstract persistence contract for Resume operations.

    The concrete SQLAlchemy implementation can be added later after
    Member 3's shared database foundation is integrated.
    """

    # -----------------------------------------------------------------------
    # Create
    # -----------------------------------------------------------------------

    @abstractmethod
    async def create(
        self,
        resume_data: dict[str, Any],
    ) -> Any:
        """
        Create and persist a new Resume record.

        Args:
            resume_data:
                Validated Resume data prepared by the service layer.

        Returns:
            The created Resume entity.
        """

        raise NotImplementedError

    # -----------------------------------------------------------------------
    # Read
    # -----------------------------------------------------------------------

    @abstractmethod
    async def get_by_id(
        self,
        resume_id: UUID,
    ) -> Any | None:
        """
        Retrieve a Resume by its unique identifier.

        Args:
            resume_id:
                Unique Resume identifier.

        Returns:
            Resume entity if found, otherwise None.
        """

        raise NotImplementedError

    @abstractmethod
    async def get_user_resumes(
        self,
        user_id: UUID,
        *,
        skip: int = 0,
        limit: int = 20,
    ) -> tuple[list[Any], int]:
        """
        Retrieve resumes belonging to a specific user.

        Args:
            user_id:
                Owner's user identifier.

            skip:
                Number of records to skip.

            limit:
                Maximum number of records to return.

        Returns:
            A tuple containing:

            (
                resume_records,
                total_count,
            )
        """

        raise NotImplementedError

    @abstractmethod
    async def get_active_resume(
        self,
        user_id: UUID,
    ) -> Any | None:
        """
        Retrieve the currently active resume for a user.

        Args:
            user_id:
                Owner's user identifier.

        Returns:
            Active Resume entity if one exists, otherwise None.
        """

        raise NotImplementedError

    # -----------------------------------------------------------------------
    # Update
    # -----------------------------------------------------------------------

    @abstractmethod
    async def update(
        self,
        resume_id: UUID,
        resume_data: dict[str, Any],
    ) -> Any | None:
        """
        Update Resume metadata.

        Args:
            resume_id:
                Resume identifier.

            resume_data:
                Validated fields to update.

        Returns:
            Updated Resume entity if found, otherwise None.
        """

        raise NotImplementedError

    # -----------------------------------------------------------------------
    # Delete
    # -----------------------------------------------------------------------

    @abstractmethod
    async def delete(
        self,
        resume_id: UUID,
    ) -> bool:
        """
        Delete a Resume record.

        File deletion is handled separately by the Resume storage service.

        Args:
            resume_id:
                Resume identifier.

        Returns:
            True if a record was deleted, otherwise False.
        """

        raise NotImplementedError

    # -----------------------------------------------------------------------
    # History
    # -----------------------------------------------------------------------

    @abstractmethod
    async def get_history(
        self,
        resume_id: UUID,
    ) -> list[Any]:
        """
        Retrieve historical versions of a Resume.

        Args:
            resume_id:
                Current Resume identifier.

        Returns:
            Historical Resume records.
        """

        raise NotImplementedError