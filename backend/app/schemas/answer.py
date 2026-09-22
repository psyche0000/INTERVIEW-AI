from pydantic import BaseModel, Field


class AnswerSubmitRequest(BaseModel):
    question_id: int
    answer_text: str = Field(min_length=1)


class AnswerResponse(BaseModel):
    id: int
    session_id: int
    question_id: int
    answer_text: str
    score: float | None = None
    ai_feedback: str | None = None