from app.ai.providers.factory import get_ai_provider
from app.ai.schemas import AIRequest, AIResponse


class AIService:

    def __init__(self):
        self.provider = get_ai_provider()

    def generate(
        self,
        request: AIRequest,
    ) -> AIResponse:
        return self.provider.generate(request)