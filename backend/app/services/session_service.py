from app.models.session import InterviewSession


def start_interview(
    interview_id: int,
    user_id: int,
):
    session = InterviewSession(
        interview_id=interview_id,
        user_id=user_id,
        status="in_progress",
        current_question=1,
    )

    # Temporary ID until database integration
    session.id = 1

    return session

from datetime import datetime


def end_interview(
    session_id: int,
    user_id: int,
):
    # Temporary session object until database integration
    session = InterviewSession(
        interview_id=1,
        user_id=user_id,
        status="completed",
        current_question=0,
        started_at=datetime.utcnow(),
        ended_at=datetime.utcnow(),
    )

    session.id = session_id

    return session