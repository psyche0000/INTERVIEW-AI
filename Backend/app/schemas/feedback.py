# Import datetime for feedback response timestamps.
from datetime import datetime

# Import Pydantic model utilities.
from pydantic import BaseModel, ConfigDict


# Define the schema used to create feedback.
class FeedbackCreate(BaseModel):
    # Store the feedback content submitted by the user.
    content: str


# Define the schema returned by the API.
class FeedbackResponse(BaseModel):
    # Enable conversion from SQLAlchemy model objects.
    model_config = ConfigDict(from_attributes=True)

    # Return the feedback identifier.
    id: int

    # Return the feedback content.
    content: str

    # Return the feedback creation timestamp.
    created_at: datetime