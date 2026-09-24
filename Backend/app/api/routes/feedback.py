# Import FastAPI routing and dependency utilities.
from fastapi import APIRouter, Depends, HTTPException, status

# Import SQLAlchemy session support.
from sqlalchemy.orm import Session

# Import the database session dependency.
from app.db.session import get_db

# Import feedback schemas.
from app.schemas.feedback import FeedbackCreate, FeedbackResponse

# Import feedback service operations.
from app.services.feedback_service import (
    create_feedback,
    delete_feedback,
    get_feedback_by_id,
    get_feedback_history,
    update_feedback,
)


# Create the Feedback API router.
router = APIRouter(
    prefix="/feedback",
    tags=["Feedback"],
)


# Create new feedback.
@router.post(
    "/",
    response_model=FeedbackResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_feedback_endpoint(
    feedback_data: FeedbackCreate,
    db: Session = Depends(get_db),
) -> FeedbackResponse:
    # Store the submitted feedback.
    return create_feedback(db, feedback_data)


# Get all feedback records.
@router.get(
    "/",
    response_model=list[FeedbackResponse],
)
def get_feedback_history_endpoint(
    db: Session = Depends(get_db),
) -> list[FeedbackResponse]:
    # Retrieve feedback history.
    return get_feedback_history(db)


# Get feedback by ID.
@router.get(
    "/{feedback_id}",
    response_model=FeedbackResponse,
)
def get_feedback_by_id_endpoint(
    feedback_id: int,
    db: Session = Depends(get_db),
) -> FeedbackResponse:
    # Retrieve the requested feedback.
    feedback = get_feedback_by_id(db, feedback_id)

    # Return 404 when feedback does not exist.
    if feedback is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Feedback not found.",
        )

    # Return the feedback record.
    return feedback


# Update feedback by ID.
@router.put(
    "/{feedback_id}",
    response_model=FeedbackResponse,
)
def update_feedback_endpoint(
    feedback_id: int,
    feedback_data: FeedbackCreate,
    db: Session = Depends(get_db),
) -> FeedbackResponse:
    # Update the requested feedback.
    feedback = update_feedback(
        db,
        feedback_id,
        feedback_data,
    )

    # Return 404 when feedback does not exist.
    if feedback is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Feedback not found.",
        )

    # Return the updated feedback.
    return feedback


# Delete feedback by ID.
@router.delete(
    "/{feedback_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_feedback_endpoint(
    feedback_id: int,
    db: Session = Depends(get_db),
) -> None:
    # Delete the requested feedback.
    deleted = delete_feedback(
        db,
        feedback_id,
    )

    # Return 404 when feedback does not exist.
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Feedback not found.",
        )