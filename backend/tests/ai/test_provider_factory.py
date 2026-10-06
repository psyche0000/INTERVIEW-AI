import pytest

from app.ai.providers.factory import get_ai_provider
from app.core.config import settings


class FakeProvider:
    pass


def test_get_openai_provider(monkeypatch):
    monkeypatch.setattr(settings, "LLM_PROVIDER", "openai")
    monkeypatch.setattr(
        "app.ai.providers.factory.OpenAIProvider",
        FakeProvider,
    )

    provider = get_ai_provider()

    assert isinstance(provider, FakeProvider)


def test_unsupported_provider():
    original_provider = settings.LLM_PROVIDER

    try:
        settings.LLM_PROVIDER = "unsupported"

        with pytest.raises(ValueError, match="Unsupported AI provider"):
            get_ai_provider()

    finally:
        settings.LLM_PROVIDER = original_provider