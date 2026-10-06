from openai import OpenAI

from app.ai.exceptions import AIConfigurationError, AIProviderError
from app.ai.providers.base import AIProvider
from app.ai.schemas import AIRequest, AIResponse
from app.core.config import settings


class OpenAIProvider(AIProvider):

    def __init__(self):
        if not settings.LLM_API_KEY:
            raise AIConfigurationError(
                "LLM_API_KEY is not configured"
            )

        self.client = OpenAI(api_key=settings.LLM_API_KEY)
        self.model = settings.LLM_MODEL

    def generate(self, request: AIRequest) -> AIResponse:
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {
                        "role": "system",
                        "content": request.system_prompt or "",
                    },
                    {
                        "role": "user",
                        "content": request.prompt,
                    },
                ],
            )

            content = response.choices[0].message.content or ""

            return AIResponse(
                success=True,
                content=content,
                provider="openai",
                model=self.model,
            )

        except Exception as exc:
            raise AIProviderError(
                f"AI provider request failed: {exc}"
            ) from exc