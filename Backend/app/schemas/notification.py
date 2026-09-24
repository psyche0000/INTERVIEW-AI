# Import datetime for notification timestamps.
from datetime import datetime

# Import Pydantic schema utilities.
from pydantic import BaseModel, ConfigDict


# Define the schema for creating a notification.
class NotificationCreate(BaseModel):
    # Store the notification title.
    title: str

    # Store the notification message.
    message: str


# Define the schema for updating notification status.
class NotificationUpdate(BaseModel):
    # Store whether the notification has been read.
    is_read: bool


# Define the notification response schema.
class NotificationResponse(BaseModel):
    # Enable conversion from SQLAlchemy model objects.
    model_config = ConfigDict(from_attributes=True)

    # Return the notification identifier.
    id: int

    # Return the notification title.
    title: str

    # Return the notification message.
    message: str

    # Return the read status.
    is_read: bool

    # Return the creation timestamp.
    created_at: datetime