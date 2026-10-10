"""Response schema for administrator feedback management."""

from datetime import datetime

from pydantic import BaseModel, ConfigDict


class AdminFeedbackResponse(BaseModel):
    """Feedback record returned to administrators."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    content: str
    created_at: datetime
