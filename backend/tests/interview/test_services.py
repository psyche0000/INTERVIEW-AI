from app.schemas.interview import InterviewCreate
from app.services.interview_service import create_interview
from app.services.answer_service import submit_answer
from app.services.session_service import start_interview, end_interview


def test_create_interview():
    data = InterviewCreate(
        title="Python Interview",
        interview_type="technical",
        difficulty="medium",
        duration=30,
        question_count=10,
        mode="text",
    )

    interview = create_interview(1, data)

    assert interview.id == 1
    assert interview.user_id == 1
    assert interview.title == "Python Interview"
    assert interview.interview_type == "technical"
    assert interview.difficulty == "medium"
    assert interview.duration == 30
    assert interview.question_count == 10
    assert interview.mode == "text"
    assert interview.is_completed is False


def test_create_interview_with_different_user():
    data = InterviewCreate(
        title="Java Interview",
        interview_type="technical",
        difficulty="hard",
        duration=45,
        question_count=15,
        mode="voice",
    )

    interview = create_interview(25, data)

    assert interview.user_id == 25
    assert interview.title == "Java Interview"
    assert interview.difficulty == "hard"
    assert interview.mode == "voice"


def test_submit_answer():
    answer = submit_answer(
        session_id=10,
        question_id=5,
        answer_text="Python is an interpreted programming language.",
    )

    assert answer.id == 1
    assert answer.session_id == 10
    assert answer.question_id == 5
    assert answer.answer_text == "Python is an interpreted programming language."
    assert answer.score is None
    assert answer.ai_feedback is None


def test_start_interview():
    session = start_interview(
        interview_id=20,
        user_id=5,
    )

    assert session.id == 1
    assert session.interview_id == 20
    assert session.user_id == 5
    assert session.status == "in_progress"
    assert session.current_question == 1


def test_end_interview():
    session = end_interview(
        session_id=15,
        user_id=5,
    )

    assert session.id == 15
    assert session.interview_id == 1
    assert session.user_id == 5
    assert session.status == "completed"
    assert session.current_question == 0
    assert session.started_at is not None
    assert session.ended_at is not None