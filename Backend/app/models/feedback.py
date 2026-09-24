# Import datetime for feedback timestamps.
from datetime import datetime

# Import SQLAlchemy column and data types.
from sqlalchemy import DateTime, Integer, Text

# Import SQLAlchemy's mapped column utilities.
from sqlalchemy.orm import Mapped, mapped_column

# Import the shared database base class.
from app.db.base import Base


# Define the feedback database model.
class Feedback(Base):
    # Define the database table name.
    __tablename__ = "feedback"

    # Define the primary key for each feedback record.
    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        autoincrement=True,
    )

    # Store the feedback content.
    content: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    # Store the feedback creation timestamp.
    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )