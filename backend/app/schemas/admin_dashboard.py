"""
Response schemas for the Admin Dashboard.
"""

from pydantic import BaseModel, Field


class AdminDashboardStats(BaseModel):
    """Database-backed statistics currently available to the application."""

    total_jobs: int = Field(ge=0)
    active_jobs: int = Field(ge=0)
    total_resumes: int = Field(ge=0)
    active_resumes: int = Field(ge=0)
