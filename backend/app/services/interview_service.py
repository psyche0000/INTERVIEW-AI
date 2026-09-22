from app.models.interview import Interview
from app.schemas.interview import InterviewCreate


def create_interview(
    user_id: int,
    interview_data: InterviewCreate,
):
    interview = Interview(
        user_id=user_id,
        title=interview_data.title,
        interview_type=interview_data.interview_type,
        difficulty=interview_data.difficulty,
        duration=interview_data.duration,
        question_count=interview_data.question_count,
        mode=interview_data.mode,
        is_completed=False,
    )

    # Temporary ID until database integration
    interview.id = 1

    return interview