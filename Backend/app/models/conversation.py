# Import datetime for conversation timestamps.
from datetime import datetime

# Import SQLAlchemy relationship support.
from sqlalchemy import DateTime, Integer, String

# Import SQLAlchemy ORM mapping utilities.
from sqlalchemy.orm import Mapped, mapped_column, relationship

# Import the shared database base class.
from app.db.base import Base


# Define the conversation database model.
class Conversation(Base):
    # Define the database table name.
    __tablename__ = "conversations"

    # Define the conversation primary key.
    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    # Store an optional conversation title.
    title: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    # Store the conversation creation timestamp.
    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    # Store the latest conversation update timestamp.
    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )

    # Define the one-to-many relationship with messages.
    messages: Mapped[list["Message"]] = relationship(
        "Message",
        back_populates="conversation",
        cascade="all, delete-orphan",
    )