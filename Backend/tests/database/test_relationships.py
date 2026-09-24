# Import the SQLAlchemy metadata.
from app.db.base import Base

# Import the chat models to inspect their relationships.
from app.models.conversation import Conversation
from app.models.message import Message


# Verify the Conversation -> Message relationship.
def test_conversation_message_relationship():
    # Get the Conversation messages relationship.
    conversation_relationship = Conversation.__mapper__.relationships["messages"]

    # Get the Message conversation relationship.
    message_relationship = Message.__mapper__.relationships["conversation"]

    # Verify both sides use the expected relationship names.
    assert conversation_relationship.key == "messages"
    assert message_relationship.key == "conversation"

    # Verify the message foreign key points to conversations.
    foreign_keys = Message.__table__.c.conversation_id.foreign_keys

    # Confirm exactly one foreign key is configured.
    assert len(foreign_keys) == 1

    # Verify the foreign key references conversations.id.
    assert next(iter(foreign_keys)).target_fullname == "conversations.id"