"""
Resume database model.

Stores uploaded resume metadata and ownership information.
"""

from datetime import datetime
from uuid import UUID, uuid4

from sqlalchemy import DateTime, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class Resume(Base):
    """Database model for a user's uploaded resume."""

    __tablename__ = "resumes"

    # Unique identifier for the resume record.
    id: Mapped[UUID] = mapped_column(
        primary_key=True,
        default=uuid4,
    )

    # Identifier of the user who owns the resume.
    user_id: Mapped[UUID] = mapped_column(
        nullable=False,
        index=True,
    )

    # Original filename supplied by the user.
    original_file_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    # Generated filename used in storage.
    stored_file_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    # Uploaded file type such as pdf, doc, or docx.
    file_type: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )

    # Uploaded file size in bytes.
    file_size: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    # Path of the stored resume file.
    storage_path: Mapped[str] = mapped_column(
        String(1000),
        nullable=False,
    )

    # Current resume version number.
    version: Mapped[int] = mapped_column(
        Integer,
        default=1,
        nullable=False,
    )

    # Indicates whether this resume is the user's active resume.
    is_active: Mapped[bool] = mapped_column(
        default=True,
        nullable=False,
    )

    # Timestamp when the resume was created.
    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    # Timestamp when the resume was last updated.
    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )