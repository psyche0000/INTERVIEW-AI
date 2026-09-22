from pydantic import BaseModel


class AIRequest(BaseModel):
    prompt: str
    system_prompt: str | None = None


class AIResponse(BaseModel):
    success: bool
    content: str
    provider: str
    model: str