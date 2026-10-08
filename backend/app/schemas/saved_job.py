"""
Schemas for Saved Job API operations.
"""

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class SavedJobCreate(BaseModel):
    """Input data required to save a Job."""

    job_id: UUID


class SavedJobResponse(BaseModel):
    """Response returned for a saved Job."""

    id: UUID
    user_id: UUID
    job_id: UUID
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class SavedJobListResponse(BaseModel):
    """Paginated list of saved Jobs."""

    items: list[SavedJobResponse]
    total: int