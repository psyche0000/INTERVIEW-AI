from app.models.interview import Interview
from app.models.question import InterviewQuestion
from app.models.answer import InterviewAnswer


def test_interview_model_creation():
    interview = Interview(
        user_id=1,
        title="Python Interview",
        interview_type="technical",
        difficulty="medium",
        duration=30,
        question_count=10,
        mode="text",
    )

    assert interview.user_id == 1
    assert interview.title == "Python Interview"
    assert interview.is_completed is None or interview.is_completed is False


def test_interview_question_model_creation():
    question = InterviewQuestion(
        interview_id=1,
        question_number=1,
        question_text="What is Python?",
        question_type="technical",
        difficulty="easy",
        topic="Python",
    )

    assert question.interview_id == 1
    assert question.question_number == 1
    assert question.question_text == "What is Python?"
    assert question.topic == "Python"


def test_interview_answer_model_creation():
    answer = InterviewAnswer(
        session_id=1,
        question_id=1,
        answer_text="Python is a programming language.",
    )

    assert answer.session_id == 1
    assert answer.question_id == 1
    assert answer.answer_text == "Python is a programming language."
    assert answer.score is None
    assert answer.ai_feedback is None