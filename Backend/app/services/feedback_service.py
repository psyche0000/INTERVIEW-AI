# Import SQLAlchemy session support.
from sqlalchemy.orm import Session

# Import the Feedback database model.
from app.models.feedback import Feedback

# Import the feedback creation schema.
from app.schemas.feedback import FeedbackCreate


# Create and store a new feedback record.
def create_feedback(
    db: Session,
    feedback_data: FeedbackCreate,
) -> Feedback:
    # Create a new Feedback database object.
    feedback = Feedback(
        content=feedback_data.content,
    )

    # Add the feedback object to the database session.
    db.add(feedback)

    # Save the feedback record to PostgreSQL.
    db.commit()

    # Refresh the object with database-generated values.
    db.refresh(feedback)

    # Return the created feedback.
    return feedback


# Retrieve all feedback records.
def get_feedback_history(
    db: Session,
) -> list[Feedback]:
    # Return feedback from newest to oldest.
    return (
        db.query(Feedback)
        .order_by(Feedback.created_at.desc())
        .all()
    )


# Retrieve one feedback record by ID.
def get_feedback_by_id(
    db: Session,
    feedback_id: int,
) -> Feedback | None:
    # Find the requested feedback record.
    return (
        db.query(Feedback)
        .filter(Feedback.id == feedback_id)
        .first()
    )


# Update an existing feedback record.
def update_feedback(
    db: Session,
    feedback_id: int,
    feedback_data: FeedbackCreate,
) -> Feedback | None:
    # Find the feedback record.
    feedback = get_feedback_by_id(
        db=db,
        feedback_id=feedback_id,
    )

    # Return None when the record does not exist.
    if feedback is None:
        return None

    # Update the feedback content.
    feedback.content = feedback_data.content

    # Save the updated record.
    db.commit()

    # Refresh the object with the latest database values.
    db.refresh(feedback)

    # Return the updated feedback.
    return feedback


# Delete an existing feedback record.
def delete_feedback(
    db: Session,
    feedback_id: int,
) -> bool:
    # Find the feedback record.
    feedback = get_feedback_by_id(
        db=db,
        feedback_id=feedback_id,
    )

    # Return False when the record does not exist.
    if feedback is None:
        return False

    # Delete the feedback record.
    db.delete(feedback)

    # Save the deletion.
    db.commit()

    # Confirm successful deletion.
    return True