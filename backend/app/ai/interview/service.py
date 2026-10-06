from app.ai.schemas import AIRequest, AIResponse
from app.ai.service import AIService


class InterviewAIService:

    def __init__(self, ai_service: AIService):
        self.ai_service = ai_service

    def generate_question(
        self,
        topic: str,
        difficulty: str = "medium",
    ) -> AIResponse:

        prompt = (
            "Generate one technical interview question.\n"
            f"Topic: {topic}\n"
            f"Difficulty: {difficulty}\n"
            "Return only the interview question."
        )

        request = AIRequest(
            prompt=prompt,
            system_prompt=(
                "You are an expert technical interviewer. "
                "Generate clear and relevant interview questions."
            ),
        )

        return self.ai_service.generate(request)

    def evaluate_answer(
        self,
        question: str,
        answer: str,
    ) -> AIResponse:

        prompt = (
            "Evaluate the following interview answer.\n\n"
            f"Question: {question}\n"
            f"Answer: {answer}\n\n"
            "Provide constructive feedback."
        )

        request = AIRequest(
            prompt=prompt,
            system_prompt=(
                "You are an expert technical interviewer. "
                "Evaluate answers fairly and provide useful feedback."
            ),
        )

        return self.ai_service.generate(request)