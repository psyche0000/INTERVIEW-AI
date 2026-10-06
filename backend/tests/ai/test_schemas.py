from app.ai.schemas import AIRequest, AIResponse


def test_ai_request():
    request = AIRequest(
        prompt="Generate an interview question",
        system_prompt="You are an interviewer",
    )

    assert request.prompt == "Generate an interview question"
    assert request.system_prompt == "You are an interviewer"


def test_ai_request_without_system_prompt():
    request = AIRequest(prompt="Generate a question")

    assert request.prompt == "Generate a question"
    assert request.system_prompt is None


def test_ai_response():
    response = AIResponse(
        success=True,
        content="What is Python?",
        provider="openai",
        model="gpt-4o-mini",
    )

    assert response.success is True
    assert response.content == "What is Python?"
    assert response.provider == "openai"
    assert response.model == "gpt-4o-mini"