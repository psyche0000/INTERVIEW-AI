from app.ai.providers.base import AIProvider
from app.ai.schemas import AIRequest, AIResponse


class AIService:

    def __init__(self, provider: AIProvider):
        self.provider = provider

    def generate(
        self,
        request: AIRequest,
    ) -> AIResponse:
        return self.provider.generate(request)