from app.ai.schemas import AIRequest, AIResponse
from app.ai.service import AIService


class ResumeAIService:

    def __init__(self, ai_service: AIService):
        self.ai_service = ai_service

    def analyze_resume(
        self,
        resume_text: str,
    ) -> AIResponse:

        prompt = (
            "Analyze the following resume and provide a concise professional "
            "assessment.\n\n"
            f"Resume:\n{resume_text}\n\n"
            "Focus on strengths, weaknesses, and improvement areas."
        )

        request = AIRequest(
            prompt=prompt,
            system_prompt=(
                "You are an expert resume and career analysis assistant. "
                "Provide practical and objective feedback."
            ),
        )

        return self.ai_service.generate(request)