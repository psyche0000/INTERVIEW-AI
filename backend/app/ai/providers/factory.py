from app.ai.providers.base import AIProvider
from app.ai.providers.openai_provider import OpenAIProvider
from app.core.config import settings


def get_ai_provider() -> AIProvider:
    provider = settings.LLM_PROVIDER.lower()

    if provider == "openai":
        return OpenAIProvider()

    raise ValueError(
        f"Unsupported AI provider: {settings.LLM_PROVIDER}"
    )