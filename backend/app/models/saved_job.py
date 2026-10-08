"""
Saved Job database model.

Stores the relationship between a user and a Job that the
user has saved for later reference.
"""

from datetime import datetime
from uuid import UUID, uuid4

from sqlalchemy import DateTime, Integer, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID as PostgreSQLUUID
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class SavedJob(Base):
    """Database model representing a user's saved Job."""

    __tablename__ = "saved_jobs"

    __table_args__ = (
        UniqueConstraint(
            "user_id",
            "job_id",
            name="uq_saved_jobs_user_job",
        ),
    )

    id: Mapped[UUID] = mapped_column(
        PostgreSQLUUID(as_uuid=True),
        primary_key=True,
        default=uuid4,
    )

    user_id: Mapped[UUID] = mapped_column(
        PostgreSQLUUID(as_uuid=True),
        nullable=False,
        index=True,
    )

    job_id: Mapped[UUID] = mapped_column(
        PostgreSQLUUID(as_uuid=True),
        nullable=False,
        index=True,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        nullable=False,
        default=datetime.utcnow,
    )