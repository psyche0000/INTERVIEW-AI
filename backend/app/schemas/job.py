"""
Pydantic schemas for Job APIs.

Defines request and response validation for job listings.
"""

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class JobBase(BaseModel):
    """Shared fields for Job schemas."""

    title: str = Field(min_length=1, max_length=255)
    company_name: str = Field(min_length=1, max_length=255)
    description: str = Field(min_length=1)
    location: str = Field(min_length=1, max_length=255)
    employment_type: str = Field(min_length=1, max_length=50)
    experience_level: str = Field(min_length=1, max_length=50)
    salary_min: int | None = Field(default=None, ge=0)
    salary_max: int | None = Field(default=None, ge=0)
    currency: str = Field(default="USD", min_length=1, max_length=10)
    category: str = Field(min_length=1, max_length=100)
    skills: list[str] = Field(default_factory=list)


class JobCreate(JobBase):
    """Schema for creating a Job."""

    pass


class JobUpdate(BaseModel):
    """Schema for updating a Job."""

    title: str | None = Field(default=None, min_length=1, max_length=255)
    company_name: str | None = Field(default=None, min_length=1, max_length=255)
    description: str | None = Field(default=None, min_length=1)
    location: str | None = Field(default=None, min_length=1, max_length=255)
    employment_type: str | None = Field(default=None, min_length=1, max_length=50)
    experience_level: str | None = Field(default=None, min_length=1, max_length=50)
    salary_min: int | None = Field(default=None, ge=0)
    salary_max: int | None = Field(default=None, ge=0)
    currency: str | None = Field(default=None, min_length=1, max_length=10)
    category: str | None = Field(default=None, min_length=1, max_length=100)
    skills: list[str] | None = None
    is_active: bool | None = None


class JobResponse(JobBase):
    """Schema returned by Job APIs."""

    model_config = ConfigDict(from_attributes=True)

    id: UUID
    is_active: bool
    created_at: datetime
    updated_at: datetime


class JobListResponse(BaseModel):
    """Paginated Job list response."""

    items: list[JobResponse]
    total: int = Field(ge=0)