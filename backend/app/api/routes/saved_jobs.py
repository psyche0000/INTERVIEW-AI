"""
Saved Job API routes.

Provides endpoints for saving, listing, and deleting Jobs
for the authenticated user.
"""

from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.repositories.sqlalchemy_saved_job_repository import (
    SQLAlchemySavedJobRepository,
)
from app.schemas.saved_job import (
    SavedJobCreate,
    SavedJobListResponse,
    SavedJobResponse,
)
from app.services.saved_job_service import (
    SavedJobAlreadyExistsError,
    SavedJobNotFoundError,
    SavedJobService,
)
from app.db.session import get_db
from sqlalchemy.orm import Session


router = APIRouter(
    prefix="/api/v1/saved-jobs",
    tags=["Saved Jobs"],
)


async def get_current_user_id() -> UUID:
    """
    Provide the authenticated user's ID.

    Temporary dependency boundary for Member 1's authentication
    and RBAC implementation.
    """

    raise NotImplementedError(
        "Authentication dependency is not configured yet."
    )


def get_saved_job_service(
    db: Session = Depends(get_db),
) -> SavedJobService:
    """Build a SavedJobService using the current database session."""

    repository = SQLAlchemySavedJobRepository(db)

    return SavedJobService(repository)


# ---------------------------------------------------------------------------
# Save Job
# ---------------------------------------------------------------------------


@router.post(
    "",
    response_model=SavedJobResponse,
    status_code=status.HTTP_201_CREATED,
)
async def save_job(
    saved_job_data: SavedJobCreate,
    user_id: UUID = Depends(get_current_user_id),
    service: SavedJobService = Depends(get_saved_job_service),
):
    """Save a Job for the authenticated user."""

    try:
        return await service.save_job(
            user_id=user_id,
            saved_job_data=saved_job_data,
        )

    except SavedJobAlreadyExistsError as exc:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(exc),
        ) from exc


# ---------------------------------------------------------------------------
# List Saved Jobs
# ---------------------------------------------------------------------------


@router.get(
    "",
    response_model=SavedJobListResponse,
)
async def list_saved_jobs(
    skip: int = Query(
        default=0,
        ge=0,
        description="Number of records to skip.",
    ),
    limit: int = Query(
        default=20,
        ge=1,
        le=100,
        description="Maximum number of records to return.",
    ),
    user_id: UUID = Depends(get_current_user_id),
    service: SavedJobService = Depends(get_saved_job_service),
):
    """Return saved Jobs belonging to the authenticated user."""

    items, total = await service.list_saved_jobs(
        user_id=user_id,
        skip=skip,
        limit=limit,
    )

    return SavedJobListResponse(
        items=items,
        total=total,
    )


# ---------------------------------------------------------------------------
# Delete Saved Job
# ---------------------------------------------------------------------------


@router.delete(
    "/{saved_job_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_saved_job(
    saved_job_id: UUID,
    user_id: UUID = Depends(get_current_user_id),
    service: SavedJobService = Depends(get_saved_job_service),
):
    """Delete a saved Job belonging to the authenticated user."""

    try:
        await service.delete_saved_job(
            user_id=user_id,
            saved_job_id=saved_job_id,
        )

    except SavedJobNotFoundError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        ) from exc

    return None