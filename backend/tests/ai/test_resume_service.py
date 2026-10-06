from app.ai.resume.service import ResumeAIService
from app.ai.schemas import AIResponse


class FakeAIService:
    def __init__(self):
        self.last_request = None

    def generate(self, request):
        self.last_request = request

        return AIResponse(
            success=True,
            content="Resume analysis completed",
            provider="fake",
            model="test-model",
        )


def test_analyze_resume():
    fake_ai = FakeAIService()
    service = ResumeAIService(fake_ai)

    resume_text = """
    Python Developer
    Skills: Python, FastAPI, SQL
    Experience: 1 year
    """

    response = service.analyze_resume(resume_text)

    assert response.success is True
    assert response.content == "Resume analysis completed"

    assert fake_ai.last_request is not None
    assert "Analyze the following resume" in fake_ai.last_request.prompt
    assert "Python Developer" in fake_ai.last_request.prompt
    assert "Python, FastAPI, SQL" in fake_ai.last_request.prompt