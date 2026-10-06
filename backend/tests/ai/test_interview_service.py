from app.ai.interview.service import InterviewAIService
from app.ai.schemas import AIResponse


class FakeAIService:
    def __init__(self):
        self.last_request = None

    def generate(self, request):
        self.last_request = request

        return AIResponse(
            success=True,
            content="What is polymorphism in Python?",
            provider="fake",
            model="test-model",
        )


def test_generate_question():
    fake_ai = FakeAIService()
    service = InterviewAIService(fake_ai)

    response = service.generate_question(
        topic="Python",
        difficulty="medium",
    )

    assert response.success is True
    assert response.content == "What is polymorphism in Python?"

    assert fake_ai.last_request is not None
    assert "Topic: Python" in fake_ai.last_request.prompt
    assert "Difficulty: medium" in fake_ai.last_request.prompt


def test_evaluate_answer():
    fake_ai = FakeAIService()
    service = InterviewAIService(fake_ai)

    response = service.evaluate_answer(
        question="What is Python?",
        answer="Python is a high-level programming language.",
    )

    assert response.success is True
    assert response.content == "What is polymorphism in Python?"

    assert fake_ai.last_request is not None
    assert "Question: What is Python?" in fake_ai.last_request.prompt
    assert "Answer: Python is a high-level programming language." in fake_ai.last_request.prompt