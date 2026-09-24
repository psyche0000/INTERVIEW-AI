# Import datetime for chat response timestamps.
from datetime import datetime

# Import Pydantic schema utilities.
from pydantic import BaseModel, ConfigDict


# Define the schema for creating a conversation.
class ConversationCreate(BaseModel):
    # Store an optional conversation title.
    title: str | None = None


# Define the schema for creating a message.
class MessageCreate(BaseModel):
    # Store the message content.
    content: str

    # Store the sender role.
    role: str


# Define the response schema for a message.
class MessageResponse(BaseModel):
    # Enable conversion from SQLAlchemy model objects.
    model_config = ConfigDict(from_attributes=True)

    # Return the message ID.
    id: int

    # Return the parent conversation ID.
    conversation_id: int

    # Return the message content.
    content: str

    # Return the sender role.
    role: str

    # Return the creation timestamp.
    created_at: datetime


# Define the response schema for a conversation.
class ConversationResponse(BaseModel):
    # Enable conversion from SQLAlchemy model objects.
    model_config = ConfigDict(from_attributes=True)

    # Return the conversation ID.
    id: int

    # Return the conversation title.
    title: str | None

    # Return the creation timestamp.
    created_at: datetime

    # Return the latest update timestamp.
    updated_at: datetime


# Define the detailed conversation response with messages.
class ConversationDetailResponse(ConversationResponse):
    # Return all messages belonging to the conversation.
    messages: list[MessageResponse]