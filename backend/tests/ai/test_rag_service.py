from app.ai.rag.service import RAGService
from app.ai.schemas import AIResponse


class FakeAIService:
    def __init__(self):
        self.last_request = None

    def generate(self, request):
        self.last_request = request

        return AIResponse(
            success=True,
            content="Python is a high-level programming language.",
            provider="fake",
            model="test-model",
        )


def test_generate_with_context():
    fake_ai = FakeAIService()
    service = RAGService(fake_ai)

    context = """
    Python is a high-level, interpreted programming language.
    It is widely used for web development, automation, and AI.
    """

    response = service.generate_with_context(
        query="What is Python?",
        context=context,
    )

    assert response.success is True
    assert response.content == "Python is a high-level programming language."

    assert fake_ai.last_request is not None
    assert "Answer the user's query using the provided context." in fake_ai.last_request.prompt
    assert "Python is a high-level, interpreted programming language." in fake_ai.last_request.prompt
    assert "What is Python?" in fake_ai.last_request.prompt