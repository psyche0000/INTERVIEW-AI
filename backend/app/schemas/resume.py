from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


# ---------------------------------------------------------------------------
# Resume Base Schema
# ---------------------------------------------------------------------------
# Common fields shared by Resume-related API schemas.
# ---------------------------------------------------------------------------


class ResumeBase(BaseModel):
    """
    Common Resume fields returned or accepted by the API.

    These fields describe the uploaded resume file and its stored metadata.
    """

    original_file_name: str = Field(
        ...,
        min_length=1,
        max_length=255,
        description="Original name of the uploaded resume file.",
    )

    file_type: str = Field(
        ...,
        description="Resume file type, such as PDF, DOC, or DOCX.",
    )


# ---------------------------------------------------------------------------
# Resume Create Schema
# ---------------------------------------------------------------------------
# Used internally/API-side when creating Resume metadata after validation
# and storage of an uploaded file.
# ---------------------------------------------------------------------------


class ResumeCreate(ResumeBase):
    """
    Schema used when creating a Resume record.
    """

    stored_file_name: str = Field(
        ...,
        max_length=255,
        description="Generated filename used for stored resume data.",
    )

    file_size: int = Field(
        ...,
        ge=0,
        description="Resume file size in bytes.",
    )

    storage_path: str = Field(
        ...,
        max_length=1000,
        description="Path where the uploaded resume is stored.",
    )

    version: int = Field(
        default=1,
        ge=1,
        description="Resume version number.",
    )


# ---------------------------------------------------------------------------
# Resume Update Schema
# ---------------------------------------------------------------------------
# Only fields that are safe to update after upload should be exposed here.
# ---------------------------------------------------------------------------


class ResumeUpdate(BaseModel):
    """
    Schema used to update Resume metadata.
    """

    original_file_name: str | None = Field(
        default=None,
        min_length=1,
        max_length=255,
        description="Updated display name for the resume.",
    )


# ---------------------------------------------------------------------------
# Resume Response Schema
# ---------------------------------------------------------------------------
# Returned by Resume API endpoints.
# ---------------------------------------------------------------------------


class ResumeResponse(ResumeBase):
    """
    Complete Resume representation returned by the API.
    """

    model_config = ConfigDict(from_attributes=True)

    id: UUID = Field(
        ...,
        description="Unique identifier of the resume.",
    )

    user_id: UUID = Field(
        ...,
        description="Identifier of the user who owns the resume.",
    )

    stored_file_name: str = Field(
        ...,
        description="Generated filename used for stored resume data.",
    )

    file_size: int = Field(
        ...,
        ge=0,
        description="Resume file size in bytes.",
    )

    storage_path: str = Field(
        ...,
        description="Path where the resume is stored.",
    )

    version: int = Field(
        ...,
        ge=1,
        description="Current resume version.",
    )

    is_active: bool = Field(
        ...,
        description="Whether this resume version is currently active.",
    )

    created_at: datetime = Field(
        ...,
        description="Timestamp when the resume record was created.",
    )

    updated_at: datetime = Field(
        ...,
        description="Timestamp when the resume record was last updated.",
    )


# ---------------------------------------------------------------------------
# Resume History Response Schema
# ---------------------------------------------------------------------------


class ResumeHistoryResponse(BaseModel):
    """
    Represents a previous version of a user's resume.
    """

    model_config = ConfigDict(from_attributes=True)

    id: UUID = Field(
        ...,
        description="Unique identifier of the historical resume record.",
    )

    resume_id: UUID = Field(
        ...,
        description="Identifier of the current resume.",
    )

    version: int = Field(
        ...,
        ge=1,
        description="Historical resume version number.",
    )

    original_file_name: str = Field(
        ...,
        description="Original filename for this resume version.",
    )

    file_type: str = Field(
        ...,
        description="File type for this resume version.",
    )

    file_size: int = Field(
        ...,
        ge=0,
        description="File size in bytes.",
    )

    storage_path: str = Field(
        ...,
        description="Storage path for this resume version.",
    )

    created_at: datetime = Field(
        ...,
        description="Timestamp when this resume version was created.",
    )


# ---------------------------------------------------------------------------
# Resume List Response Schema
# ---------------------------------------------------------------------------


class ResumeListResponse(BaseModel):
    """
    Paginated/list response for a user's resumes.
    """

    items: list[ResumeResponse] = Field(
        default_factory=list,
        description="List of resumes.",
    )

    total: int = Field(
        ...,
        ge=0,
        description="Total number of resumes available.",
    )