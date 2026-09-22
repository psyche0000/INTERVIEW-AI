from fastapi import APIRouter, Depends, status

from app.core.dependencies import get_current_user
from app.schemas.interview import (
    InterviewCreate,
    InterviewResponse,
)
from app.services.interview_service import create_interview

from app.schemas.session import SessionResponse
from app.services.session_service import start_interview

from app.schemas.answer import (
    AnswerSubmitRequest,
    AnswerResponse,
)

from app.services.answer_service import submit_answer

from app.schemas.session import (
    SessionResponse,
    EndSessionResponse,
)

from app.services.session_service import (
    start_interview,
    end_interview,
)

from app.core.dependencies import (
    get_current_user,
    verify_interview_owner,
)

router = APIRouter(
    prefix="/api/v1/interviews",
    tags=["Interviews"],
)


@router.post(
    "/",
    response_model=InterviewResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_new_interview(
    interview_data: InterviewCreate,
    current_user=Depends(get_current_user),
):
    interview = create_interview(
        current_user["id"],
        interview_data,
    )

    return interview

@router.post(
    "/{interview_id}/start",
    response_model=SessionResponse,
)
def start_new_interview(
    interview_id: int,
    current_user=Depends(get_current_user),
):
    session = start_interview(
        interview_id,
        current_user["id"],
    )

    return session

@router.post(
    "/sessions/{session_id}/answers",
    response_model=AnswerResponse,
)
def submit_interview_answer(
    session_id: int,
    data: AnswerSubmitRequest,
    current_user=Depends(get_current_user),
):
    answer = submit_answer(
        session_id=session_id,
        question_id=data.question_id,
        answer_text=data.answer_text,
    )

    return answer


@router.post(
    "/sessions/{session_id}/end",
    response_model=EndSessionResponse,
)
def end_current_interview(
    session_id: int,
    current_user=Depends(get_current_user),
):
    session = end_interview(
        session_id=session_id,
        user_id=current_user["id"],
    )

    return session


@router.get(
    "/sessions/{session_id}",
)
def get_session_status(
    session_id: int,
    current_user=Depends(get_current_user),
):
    # Temporary session data until database integration

    return {
        "success": True,
        "data": {
            "session_id": session_id,
            "user_id": current_user["id"],
            "status": "in_progress",
            "current_question": 1,
        },
    }


@router.get("/")
def get_interview_history(
    current_user=Depends(get_current_user),
):
    # Temporary data until database integration

    interviews = [
        {
            "id": 1,
            "user_id": current_user["id"],
            "title": "Python Technical Interview",
            "interview_type": "technical",
            "difficulty": "medium",
            "duration": 30,
            "question_count": 10,
            "mode": "text",
            "is_completed": True,
        }
    ]

    return {
        "success": True,
        "count": len(interviews),
        "data": interviews,
    }

@router.get("/{interview_id}/summary")
def get_interview_summary(
    interview_id: int,
    current_user=Depends(get_current_user),
):
    # Temporary data until database integration

    return {
        "success": True,
        "data": {
            "interview_id": interview_id,
            "user_id": current_user["id"],
            "title": "Python Technical Interview",
            "status": "completed",
            "total_questions": 10,
            "answered_questions": 10,
            "total_score": 78.0,
            "average_score": 7.8,
            "duration_minutes": 28,
            "completed_at": None,
        },
    }

@router.get("/{interview_id}/statistics")
def get_interview_statistics(
    interview_id: int,
    current_user=Depends(get_current_user),
):
    # Temporary statistics until database integration

    return {
        "success": True,
        "data": {
            "interview_id": interview_id,
            "user_id": current_user["id"],
            "total_questions": 10,
            "answered_questions": 10,
            "unanswered_questions": 0,
            "total_score": 78.0,
            "average_score": 7.8,
            "highest_score": 10.0,
            "lowest_score": 5.0,
            "completion_percentage": 100.0,
        },
    }

@router.get("/{interview_id}/authorize")
def authorize_interview(
    interview_id: int,
    current_user=Depends(get_current_user),
):
    # Temporary ownership check until database integration

    interview_user_id = current_user["id"]

    verify_interview_owner(
        interview_user_id,
        current_user,
    )

    return {
        "success": True,
        "authorized": True,
        "interview_id": interview_id,
        "user_id": current_user["id"],
    }