from pydantic import BaseModel
from datetime import datetime

class SessionResponse(BaseModel):
    id: int
    interview_id: int
    user_id: int
    status: str
    current_question: int

class EndSessionResponse(BaseModel):
    id: int
    interview_id: int
    user_id: int
    status: str
    ended_at: datetime