"""Admin Feedback API routes.

Allows administrators to view and delete feedback submissions.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.dependencies import get_db, require_admin
from app.models.feedback import Feedback
from app.schemas.admin_feedback import AdminFeedbackResponse


router = APIRouter(
    prefix="/api/v1/admin/feedback",
    tags=["Admin Feedback"],
    dependencies=[Depends(require_admin)],
)


@router.get("", response_model=list[AdminFeedbackResponse])
def list_feedback(
    db: Session = Depends(get_db),
):
    """Return all feedback, newest first."""

    statement = select(Feedback).order_by(Feedback.created_at.desc())
    return db.scalars(statement).all()


@router.get("/history", response_model=list[AdminFeedbackResponse])
def get_feedback_history(
    db: Session = Depends(get_db),
):
    """Return feedback history, newest first."""

    statement = select(Feedback).order_by(Feedback.created_at.desc())
    return db.scalars(statement).all()


@router.delete("/{feedback_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_feedback(
    feedback_id: int,
    db: Session = Depends(get_db),
):
    """Delete a feedback submission."""

    feedback = db.get(Feedback, feedback_id)

    if feedback is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Feedback not found",
        )

    db.delete(feedback)
    db.commit()
