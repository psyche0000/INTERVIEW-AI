from app.ai.schemas import AIRequest, AIResponse
from app.ai.service import AIService


class FakeProvider:
    def generate(self, request):
        return AIResponse(
            success=True,
            content="Generated test response",
            provider="fake",
            model="test-model",
        )


def test_ai_service_generate(monkeypatch):
    monkeypatch.setattr(
        "app.ai.service.get_ai_provider",
        lambda: FakeProvider(),
    )

    service = AIService()

    request = AIRequest(
        prompt="Generate a Python interview question",
        system_prompt="You are an interviewer",
    )

    response = service.generate(request)

    assert response.success is True
    assert response.content == "Generated test response"
    assert response.provider == "fake"
    assert response.model == "test-model"