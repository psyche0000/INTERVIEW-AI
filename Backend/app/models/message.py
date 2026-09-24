# Import datetime for message timestamps.
from datetime import datetime

# Import SQLAlchemy column and foreign key types.
from sqlalchemy import DateTime, ForeignKey, Integer, Text

# Import SQLAlchemy ORM mapping utilities.
from sqlalchemy.orm import Mapped, mapped_column, relationship

# Import the shared database base class.
from app.db.base import Base


# Define the message database model.
class Message(Base):
    # Define the database table name.
    __tablename__ = "messages"

    # Define the message primary key.
    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    # Link every message to its parent conversation.
    conversation_id: Mapped[int] = mapped_column(
        ForeignKey(
            "conversations.id",
            ondelete="CASCADE",
        ),
        nullable=False,
        index=True,
    )

    # Store the message content.
    content: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    # Store whether the message came from the user or AI.
    role: Mapped[str] = mapped_column(
        nullable=False,
    )

    # Store the message creation timestamp.
    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    # Define the many-to-one relationship with Conversation.
    conversation: Mapped["Conversation"] = relationship(
        "Conversation",
        back_populates="messages",
    )