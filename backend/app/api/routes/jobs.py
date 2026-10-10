"""
Job API routes.

Provides CRUD and details endpoints for Job listings.
"""

from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_db, require_admin
from app.repositories.sqlalchemy_job_repository import SQLAlchemyJobRepository
from app.schemas.job import (
    JobCreate,
    JobListResponse,
    JobResponse,
    JobUpdate,
)
from app.services.job_service import JobNotFoundError, JobService


router = APIRouter(
    prefix="/api/v1/jobs",
    tags=["Jobs"],
)


def get_job_service(
    db: Session = Depends(get_db),
) -> JobService:
    """Build a JobService using the current database session."""

    repository = SQLAlchemyJobRepository(db)

    return JobService(repository)


# ---------------------------------------------------------------------------
# Create Job
# ---------------------------------------------------------------------------


@router.post(
    "",
    response_model=JobResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_job(
    job_data: JobCreate,
    current_user: dict = Depends(require_admin),
    service: JobService = Depends(get_job_service),
):
    """Create a new Job."""

    return await service.create_job(job_data)


# ---------------------------------------------------------------------------
# List Jobs
# ---------------------------------------------------------------------------


@router.get(
    "",
    response_model=JobListResponse,
)
async def list_jobs(
    search: str | None = None,
    location: str | None = None,
    category: str | None = None,
    employment_type: str | None = None,
    experience_level: str | None = None,
    sort_by: str = "created_at",
    sort_order: str = "desc",
    skip: int = 0,
    limit: int = 20,
    service: JobService = Depends(get_job_service),
):
    """Return Jobs with search, filtering, sorting, and pagination."""

    jobs, total = await service.list_jobs(
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

    return {
        "items": jobs,
        "total": total,
    }


# ---------------------------------------------------------------------------
# Get Job Details
# ---------------------------------------------------------------------------



@router.get("/categories", response_model=list[str])
async def get_job_categories(
    service: JobService = Depends(get_job_service),
) -> list[str]:
    """Return available Job categories."""

    return await service.get_categories()

@router.get(
    "/{job_id}",
    response_model=JobResponse,
)
async def get_job(
    job_id: UUID,
    service: JobService = Depends(get_job_service),
):
    """Return details for a specific Job."""

    try:
        return await service.get_job(job_id)

    except JobNotFoundError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        ) from exc


# ---------------------------------------------------------------------------
# Update Job
# ---------------------------------------------------------------------------


@router.put(
    "/{job_id}",
    response_model=JobResponse,
)
async def update_job(
    job_id: UUID,
    update_data: JobUpdate,
    current_user: dict = Depends(require_admin),
    service: JobService = Depends(get_job_service),
):
    """Update an existing Job."""

    try:
        return await service.update_job(
            job_id,
            update_data,
        )

    except JobNotFoundError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        ) from exc


# ---------------------------------------------------------------------------
# Delete Job
# ---------------------------------------------------------------------------


@router.delete(
    "/{job_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_job(
    job_id: UUID,
    current_user: dict = Depends(require_admin),
    service: JobService = Depends(get_job_service),
):
    """Delete an existing Job."""

    try:
        await service.delete_job(job_id)

    except JobNotFoundError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        ) from exc


