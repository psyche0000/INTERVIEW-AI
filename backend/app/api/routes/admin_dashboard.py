"""
Administrator dashboard statistics API.
"""

from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.core.dependencies import get_db, require_admin
from app.models.job import Job
from app.models.resume import Resume
from app.schemas.admin_dashboard import AdminDashboardStats


router = APIRouter(
    prefix="/api/v1/admin/dashboard",
    tags=["Admin Dashboard"],
    dependencies=[Depends(require_admin)],
)


@router.get("/stats", response_model=AdminDashboardStats)
def get_dashboard_stats(
    db: Session = Depends(get_db),
) -> AdminDashboardStats:
    """Return statistics calculated from existing database records."""

    total_jobs = db.scalar(
        select(func.count()).select_from(Job)
    ) or 0

    active_jobs = db.scalar(
        select(func.count())
        .select_from(Job)
        .where(Job.is_active.is_(True))
    ) or 0

    total_resumes = db.scalar(
        select(func.count()).select_from(Resume)
    ) or 0

    active_resumes = db.scalar(
        select(func.count())
        .select_from(Resume)
        .where(Resume.is_active.is_(True))
    ) or 0

    return AdminDashboardStats(
        total_jobs=total_jobs,
        active_jobs=active_jobs,
        total_resumes=total_resumes,
        active_resumes=active_resumes,
    )
