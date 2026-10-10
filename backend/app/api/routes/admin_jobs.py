"""
Admin Job API routes.

Provides administrator-only job creation, updating, and deletion.
"""

from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_db, require_admin
from app.repositories.sqlalchemy_job_repository import SQLAlchemyJobRepository
from app.schemas.job import JobCreate, JobResponse, JobUpdate
from app.services.job_service import JobNotFoundError, JobService


router = APIRouter(
    prefix="/api/v1/admin/jobs",
    tags=["Admin Jobs"],
    dependencies=[Depends(require_admin)],
)


def get_admin_job_service(
    db: Session = Depends(get_db),
) -> JobService:
    """Build a job service using the current database session."""

    repository = SQLAlchemyJobRepository(db)
    return JobService(repository)


@router.post(
    "",
    response_model=JobResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_job(
    job_data: JobCreate,
    service: JobService = Depends(get_admin_job_service),
):
    """Create a job listing as an administrator."""

    return await service.create_job(job_data)


@router.put(
    "/{job_id}",
    response_model=JobResponse,
)
async def update_job(
    job_id: UUID,
    update_data: JobUpdate,
    service: JobService = Depends(get_admin_job_service),
):
    """Update an existing job listing as an administrator."""

    try:
        return await service.update_job(job_id, update_data)
    except JobNotFoundError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        ) from exc


@router.delete(
    "/{job_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_job(
    job_id: UUID,
    service: JobService = Depends(get_admin_job_service),
):
    """Delete an existing job listing as an administrator."""

    try:
        await service.delete_job(job_id)
    except JobNotFoundError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        ) from exc
