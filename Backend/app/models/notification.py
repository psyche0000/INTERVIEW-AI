# Import datetime for notification timestamps.
from datetime import datetime

# Import SQLAlchemy column and data types.
from sqlalchemy import Boolean, DateTime, Integer, String, Text

# Import SQLAlchemy ORM mapping utilities.
from sqlalchemy.orm import Mapped, mapped_column

# Import the shared database base class.
from app.db.base import Base


# Define the notification database model.
class Notification(Base):
    # Define the database table name.
    __tablename__ = "notifications"

    # Define the notification primary key.
    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    # Store the notification title.
    title: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    # Store the notification message.
    message: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    # Store whether the notification has been read.
    is_read: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
        index=True,
    )

    # Store the notification creation timestamp.
    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )