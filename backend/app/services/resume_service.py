"""
Resume Service
==============

Business logic for Resume Management.

Responsibilities:
- Coordinate resume upload and storage.
- Create Resume metadata through the repository.
- Retrieve resumes.
- List a user's resumes.
- Update allowed resume metadata.
- Delete resume records and their stored files.
- Retrieve resume history.

"""
from typing import Any
from uuid import UUID

from fastapi import UploadFile

from app.repositories.resume_repository import (
    ResumeRepositoryInterface,
)
from app.services.resume_storage import (
    delete_resume_file,
    save_resume_file,
)
from app.schemas.resume import (
    ResumeCreate,
    ResumeUpdate,
)


# ---------------------------------------------------------------------------
# Service Exceptions
# ---------------------------------------------------------------------------


class ResumeServiceError(Exception):
    """
    Base exception for Resume service errors.
    """

    pass


class ResumeNotFoundError(ResumeServiceError):
    """
    Raised when a requested Resume does not exist.
    """

    pass


class ResumeOwnershipError(ResumeServiceError):
    """
    Raised when a Resume does not belong to the requested user.
    """

    pass


# ---------------------------------------------------------------------------
# Resume Service
# ---------------------------------------------------------------------------


class ResumeService:
    """
    Service layer responsible for Resume business operations.

    The repository is injected into the service so that database-specific
    implementation details remain outside the business logic.
    """

    def __init__(
        self,
        repository: ResumeRepositoryInterface,
    ) -> None:
        """
        Initialize the Resume service.

        Args:
            repository:
                Resume repository implementation.
        """

        self.repository = repository

    # -----------------------------------------------------------------------
    # Upload Resume
    # -----------------------------------------------------------------------

    async def upload_resume(
        self,
        user_id: UUID,
        upload_file: UploadFile,
    ) -> Any:
        """
        Validate, store, and create a Resume record.

        Processing flow:

        1. Validate and save the uploaded file.
        2. Build Resume metadata.
        3. Persist the Resume through the repository.
        4. Return the created Resume.

        If database persistence fails after the file is stored, the stored
        file is removed so that an orphaned file is not left behind.
        """

        (
            stored_file_name,
            file_size,
            storage_path,
        ) = await save_resume_file(upload_file)

        try:
            resume_data = ResumeCreate(
                original_file_name=upload_file.filename or "",
                file_type=upload_file.filename.rsplit(".", 1)[-1].lower(),
                stored_file_name=stored_file_name,
                file_size=file_size,
                storage_path=storage_path,
                version=1,
            )

            resume_record = await self.repository.create(
                {
                    "user_id": user_id,
                    **resume_data.model_dump(),
                }
            )

            return resume_record

        except Exception:
            # Database creation failed after the file was stored.
            # Clean up the file to prevent orphaned storage.
            delete_resume_file(storage_path)
            raise

    # -----------------------------------------------------------------------
    # Get Resume
    # -----------------------------------------------------------------------

    async def get_resume(
        self,
        user_id: UUID,
        resume_id: UUID,
    ) -> Any:
        """
        Retrieve a Resume belonging to a specific user.

        Raises:
            ResumeNotFoundError:
                If the Resume does not exist.

            ResumeOwnershipError:
                If the Resume belongs to another user.
        """

        resume = await self.repository.get_by_id(resume_id)

        if resume is None:
            raise ResumeNotFoundError(
                "Resume was not found."
            )

        # The repository result is expected to expose user_id.
        if resume.user_id != user_id:
            raise ResumeOwnershipError(
                "You do not have access to this resume."
            )

        return resume

    # -----------------------------------------------------------------------
    # List User Resumes
    # -----------------------------------------------------------------------

    async def list_user_resumes(
        self,
        user_id: UUID,
        *,
        skip: int = 0,
        limit: int = 20,
    ) -> tuple[list[Any], int]:
        """
        Retrieve resumes belonging to a user.

        Args:
            user_id:
                Owner's user identifier.

            skip:
                Number of records to skip.

            limit:
                Maximum number of records to return.

        Returns:
            A tuple containing resume records and total count.
        """

        if skip < 0:
            skip = 0

        if limit < 1:
            limit = 20

        return await self.repository.get_user_resumes(
            user_id,
            skip=skip,
            limit=limit,
        )

    # -----------------------------------------------------------------------
    # Get Active Resume
    # -----------------------------------------------------------------------

    async def get_active_resume(
        self,
        user_id: UUID,
    ) -> Any | None:
        """
        Retrieve the currently active resume for a user.
        """

        return await self.repository.get_active_resume(
            user_id
        )

    # -----------------------------------------------------------------------
    # Update Resume
    # -----------------------------------------------------------------------

    async def update_resume(
        self,
        user_id: UUID,
        resume_id: UUID,
        update_data: ResumeUpdate,
    ) -> Any:
        """
        Update allowed Resume metadata.

        The service verifies ownership before updating the record.
        """

        resume = await self.get_resume(
            user_id=user_id,
            resume_id=resume_id,
        )

        update_values = update_data.model_dump(
            exclude_unset=True,
            exclude_none=True,
        )

        if not update_values:
            return resume

        updated_resume = await self.repository.update(
            resume_id,
            update_values,
        )

        if updated_resume is None:
            raise ResumeNotFoundError(
                "Resume was not found."
            )

        return updated_resume

    # -----------------------------------------------------------------------
    # Delete Resume
    # -----------------------------------------------------------------------

    async def delete_resume(
        self,
        user_id: UUID,
        resume_id: UUID,
    ) -> bool:
        """
        Delete a Resume record and its associated stored file.

        The database record is removed first.

        If the file no longer exists, the operation still succeeds because
        the database record has already been removed.
        """

        resume = await self.get_resume(
            user_id=user_id,
            resume_id=resume_id,
        )

        deleted = await self.repository.delete(
            resume_id
        )

        if not deleted:
            raise ResumeNotFoundError(
                "Resume was not found."
            )

        # Storage cleanup happens after successful repository deletion.
        if resume.storage_path:
            delete_resume_file(
                resume.storage_path
            )

        return True

    # -----------------------------------------------------------------------
    # Resume History
    # -----------------------------------------------------------------------

    async def get_resume_history(
        self,
        user_id: UUID,
        resume_id: UUID,
    ) -> list[Any]:
        """
        Retrieve historical versions of a user's Resume.

        Ownership is verified before history is returned.
        """

        await self.get_resume(
            user_id=user_id,
            resume_id=resume_id,
        )

        return await self.repository.get_history(
            resume_id
        )