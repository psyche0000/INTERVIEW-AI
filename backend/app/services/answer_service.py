from app.models.answer import InterviewAnswer


def submit_answer(
    session_id: int,
    question_id: int,
    answer_text: str,
):
    answer = InterviewAnswer(
        session_id=session_id,
        question_id=question_id,
        answer_text=answer_text,
        score=None,
        ai_feedback=None,
    )

    # Temporary ID until database integration
    answer.id = 1

    return answer