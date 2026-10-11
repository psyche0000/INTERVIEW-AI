"""Pydantic schemas for notifications."""

from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class NotificationCreate(BaseModel):
    """Payload for creating a notification."""

    user_id: int | None = Field(default=None, gt=0)
    title: str = Field(min_length=1, max_length=200)
    message: str = Field(min_length=1)
    notification_type: str = Field(default="general", min_length=1, max_length=50)


class NotificationResponse(BaseModel):
    """Notification returned by the API."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int | None
    title: str
    message: str
    notification_type: str
    is_read: bool
    created_at: datetime
