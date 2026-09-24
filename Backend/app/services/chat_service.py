# Import datetime for conversation timestamp updates.
from datetime import datetime

# Import SQLAlchemy session support.
from sqlalchemy.orm import Session

# Import chat database models.
from app.models.conversation import Conversation
from app.models.message import Message

# Import chat creation schemas.
from app.schemas.chat import ConversationCreate, MessageCreate


# Create a new conversation.
def create_conversation(
    db: Session,
    conversation_data: ConversationCreate,
) -> Conversation:
    # Create a conversation database object.
    conversation = Conversation(
        title=conversation_data.title,
    )

    # Add the conversation to the database session.
    db.add(conversation)

    # Save the conversation to PostgreSQL.
    db.commit()

    # Refresh the object with database-generated values.
    db.refresh(conversation)

    # Return the created conversation.
    return conversation


# Retrieve all conversations.
def get_conversations(
    db: Session,
) -> list[Conversation]:
    # Return conversations from newest to oldest.
    return (
        db.query(Conversation)
        .order_by(Conversation.updated_at.desc())
        .all()
    )


# Retrieve a conversation by ID.
def get_conversation_by_id(
    db: Session,
    conversation_id: int,
) -> Conversation | None:
    # Find the requested conversation.
    return (
        db.query(Conversation)
        .filter(Conversation.id == conversation_id)
        .first()
    )


# Add a message to an existing conversation.
def create_message(
    db: Session,
    conversation_id: int,
    message_data: MessageCreate,
) -> Message | None:
    # Verify that the conversation exists.
    conversation = get_conversation_by_id(
        db=db,
        conversation_id=conversation_id,
    )

    # Return None when the conversation does not exist.
    if conversation is None:
        return None

    # Create a message database object.
    message = Message(
        conversation_id=conversation_id,
        content=message_data.content,
        role=message_data.role,
    )

    # Add the message to the database session.
    db.add(message)

    # Update the parent conversation timestamp.
    conversation.updated_at = datetime.utcnow()

    # Save the message and conversation changes.
    db.commit()

    # Refresh the message with database-generated values.
    db.refresh(message)

    # Return the created message.
    return message


# Retrieve a conversation with all its messages.
def get_conversation_history(
    db: Session,
    conversation_id: int,
) -> Conversation | None:
    # Retrieve the requested conversation.
    return get_conversation_by_id(
        db=db,
        conversation_id=conversation_id,
    )


# Delete a conversation and its messages.
def delete_conversation(
    db: Session,
    conversation_id: int,
) -> bool:
    # Find the requested conversation.
    conversation = get_conversation_by_id(
        db=db,
        conversation_id=conversation_id,
    )

    # Return False when the conversation does not exist.
    if conversation is None:
        return False

    # Delete the conversation and related messages.
    db.delete(conversation)

    # Save the deletion to PostgreSQL.
    db.commit()

    # Confirm successful deletion.
    return True