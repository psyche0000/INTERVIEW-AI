from pydantic import BaseModel, Field


class InterviewCreate(BaseModel):
    title: str = Field(min_length=1, max_length=255)
    interview_type: str
    difficulty: str
    duration: int = Field(gt=0)
    question_count: int = Field(gt=0)
    mode: str


class InterviewResponse(BaseModel):
    id: int
    user_id: int
    title: str
    interview_type: str
    difficulty: str
    duration: int
    question_count: int
    mode: str
    is_completed: bool