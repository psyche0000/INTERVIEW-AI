"""Pydantic schemas for Job Category APIs."""

from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, field_validator


class JobCategoryCreate(BaseModel):
    """Payload for creating a job category."""

    name: str = Field(min_length=1, max_length=100)
    description: str | None = Field(default=None, max_length=500)

    @field_validator("name")
    @classmethod
    def validate_name(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("Category name cannot be blank")
        return value


class JobCategoryUpdate(BaseModel):
    """Payload for updating a job category."""

    name: str | None = Field(default=None, min_length=1, max_length=100)
    description: str | None = Field(default=None, max_length=500)

    @field_validator("name")
    @classmethod
    def validate_name(cls, value: str | None) -> str | None:
        if value is None:
            return value
        value = value.strip()
        if not value:
            raise ValueError("Category name cannot be blank")
        return value


class JobCategoryResponse(BaseModel):
    """Category returned by the API."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    description: str | None
    created_at: datetime
    updated_at: datetime
