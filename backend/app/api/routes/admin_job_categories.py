"""Admin-only Job Category API routes."""

from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_db, require_admin
from app.repositories.job_category_repository import JobCategoryRepository
from app.schemas.job_category import (
    JobCategoryCreate,
    JobCategoryResponse,
    JobCategoryUpdate,
)
from app.services.job_category_service import (
    DuplicateJobCategoryError,
    JobCategoryNotFoundError,
    JobCategoryService,
)


router = APIRouter(
    prefix="/api/v1/admin/job-categories",
    tags=["Admin Job Categories"],
    dependencies=[Depends(require_admin)],
)


def get_job_category_service(
    db: Session = Depends(get_db),
) -> JobCategoryService:
    """Build the category service for the current database session."""
    return JobCategoryService(JobCategoryRepository(db))


@router.get("", response_model=list[JobCategoryResponse])
async def list_categories(
    service: JobCategoryService = Depends(get_job_category_service),
):
    """List all job categories."""
    return await service.get_all()


@router.get("/{category_id}", response_model=JobCategoryResponse)
async def get_category(
    category_id: int,
    service: JobCategoryService = Depends(get_job_category_service),
):
    """Retrieve one job category."""
    try:
        return await service.get_by_id(category_id)
    except JobCategoryNotFoundError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        ) from exc


@router.post(
    "",
    response_model=JobCategoryResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_category(
    category_data: JobCategoryCreate,
    service: JobCategoryService = Depends(get_job_category_service),
):
    """Create a job category."""
    try:
        return await service.create(category_data)
    except DuplicateJobCategoryError as exc:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(exc),
        ) from exc


@router.patch("/{category_id}", response_model=JobCategoryResponse)
async def update_category(
    category_id: int,
    category_data: JobCategoryUpdate,
    service: JobCategoryService = Depends(get_job_category_service),
):
    """Update a job category."""
    try:
        return await service.update(category_id, category_data)
    except JobCategoryNotFoundError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        ) from exc
    except DuplicateJobCategoryError as exc:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(exc),
        ) from exc


@router.delete(
    "/{category_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_category(
    category_id: int,
    service: JobCategoryService = Depends(get_job_category_service),
):
    """Delete a job category."""
    try:
        await service.delete(category_id)
    except JobCategoryNotFoundError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        ) from exc
    return Response(status_code=status.HTTP_204_NO_CONTENT)
