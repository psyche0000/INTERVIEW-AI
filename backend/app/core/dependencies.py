"""
Application dependencies.

Provides shared FastAPI dependencies for database-backed services.
"""

from fastapi import Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.repositories.sqlalchemy_resume_repository import (
    SQLAlchemyResumeRepository,
)
from app.services.resume_service import ResumeService


def get_resume_service(
    db: Session = Depends(get_db),
) -> ResumeService:
    """Create a ResumeService backed by the current database session."""

    repository = SQLAlchemyResumeRepository(db)

    return ResumeService(repository)