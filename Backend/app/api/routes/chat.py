# Import FastAPI routing and dependency utilities.
from fastapi import APIRouter, Depends, HTTPException, status

# Import SQLAlchemy session support.
from sqlalchemy.orm import Session

# Import the database session dependency.
from app.db.session import get_db

# Import chat schemas.
from app.schemas.chat import (
    ConversationCreate,
    ConversationDetailResponse,
    ConversationResponse,
    MessageCreate,
    MessageResponse,
)

# Import chat service operations.
from app.services.chat_service import (
    create_conversation,
    create_message,
    delete_conversation,
    get_conversation_history,
    get_conversations,
)


# Create the Chat API router.
router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)


# Create a new conversation.
@router.post(
    "/conversations",
    response_model=ConversationResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_conversation_endpoint(
    conversation_data: ConversationCreate,
    db: Session = Depends(get_db),
) -> ConversationResponse:
    # Create and store the conversation.
    return create_conversation(
        db=db,
        conversation_data=conversation_data,
    )


# Retrieve all conversations.
@router.get(
    "/conversations",
    response_model=list[ConversationResponse],
)
def get_conversations_endpoint(
    db: Session = Depends(get_db),
) -> list[ConversationResponse]:
    # Retrieve all conversations from PostgreSQL.
    return get_conversations(db=db)


# Retrieve one conversation with its messages.
@router.get(
    "/conversations/{conversation_id}",
    response_model=ConversationDetailResponse,
)
def get_conversation_endpoint(
    conversation_id: int,
    db: Session = Depends(get_db),
) -> ConversationDetailResponse:
    # Retrieve the requested conversation.
    conversation = get_conversation_history(
        db=db,
        conversation_id=conversation_id,
    )

    # Return 404 when the conversation does not exist.
    if conversation is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Conversation not found.",
        )

    # Return the conversation with its messages.
    return conversation


# Create a message inside a conversation.
@router.post(
    "/conversations/{conversation_id}/messages",
    response_model=MessageResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_message_endpoint(
    conversation_id: int,
    message_data: MessageCreate,
    db: Session = Depends(get_db),
) -> MessageResponse:
    # Store the message in the selected conversation.
    message = create_message(
        db=db,
        conversation_id=conversation_id,
        message_data=message_data,
    )

    # Return 404 when the conversation does not exist.
    if message is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Conversation not found.",
        )

    # Return the created message.
    return message


# Delete a conversation and its messages.
@router.delete(
    "/conversations/{conversation_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_conversation_endpoint(
    conversation_id: int,
    db: Session = Depends(get_db),
) -> None:
    # Delete the requested conversation.
    deleted = delete_conversation(
        db=db,
        conversation_id=conversation_id,
    )

    # Return 404 when the conversation does not exist.
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Conversation not found.",
        )