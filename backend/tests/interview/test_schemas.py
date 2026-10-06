import pytest
from pydantic import ValidationError

from app.schemas.interview import InterviewCreate, InterviewResponse
from app.schemas.answer import AnswerSubmitRequest, AnswerResponse
from app.schemas.session import SessionResponse, EndSessionResponse


def test_valid_interview_create():
    data = InterviewCreate(
        title="Python Interview",
        interview_type="technical",
        difficulty="medium",
        duration=30,
        question_count=10,
        mode="text",
    )

    assert data.title == "Python Interview"
    assert data.duration == 30
    assert data.question_count == 10


def test_interview_title_cannot_be_empty():
    with pytest.raises(ValidationError):
        InterviewCreate(
            title="",
            interview_type="technical",
            difficulty="medium",
            duration=30,
            question_count=10,
            mode="text",
        )


def test_interview_duration_must_be_positive():
    with pytest.raises(ValidationError):
        InterviewCreate(
            title="Python Interview",
            interview_type="technical",
            difficulty="medium",
            duration=0,
            question_count=10,
            mode="text",
        )


def test_interview_question_count_must_be_positive():
    with pytest.raises(ValidationError):
        InterviewCreate(
            title="Python Interview",
            interview_type="technical",
            difficulty="medium",
            duration=30,
            question_count=0,
            mode="text",
        )


def test_interview_response_schema():
    response = InterviewResponse(
        id=1,
        user_id=1,
        title="Python Interview",
        interview_type="technical",
        difficulty="medium",
        duration=30,
        question_count=10,
        mode="text",
        is_completed=False,
    )

    assert response.id == 1
    assert response.user_id == 1
    assert response.is_completed is False


def test_valid_answer_submit_request():
    data = AnswerSubmitRequest(
        question_id=5,
        answer_text="Python is a high-level programming language.",
    )

    assert data.question_id == 5
    assert data.answer_text.startswith("Python")


def test_answer_text_cannot_be_empty():
    with pytest.raises(ValidationError):
        AnswerSubmitRequest(
            question_id=5,
            answer_text="",
        )


def test_answer_response_schema():
    response = AnswerResponse(
        id=1,
        session_id=10,
        question_id=5,
        answer_text="My answer",
        score=8.5,
        ai_feedback="Good answer",
    )

    assert response.id == 1
    assert response.session_id == 10
    assert response.score == 8.5


def test_session_response_schema():
    response = SessionResponse(
        id=1,
        interview_id=10,
        user_id=1,
        status="in_progress",
        current_question=1,
    )

    assert response.id == 1
    assert response.interview_id == 10
    assert response.status == "in_progress"


def test_end_session_response_schema():
    from datetime import datetime

    ended_at = datetime.utcnow()

    response = EndSessionResponse(
        id=1,
        interview_id=10,
        user_id=1,
        status="completed",
        ended_at=ended_at,
    )

    assert response.id == 1
    assert response.status == "completed"
    assert response.ended_at == ended_at