from app.ai.schemas import AIRequest, AIResponse
from app.ai.service import AIService


class RAGService:

    def __init__(self, ai_service: AIService):
        self.ai_service = ai_service

    def generate_with_context(
        self,
        query: str,
        context: str,
    ) -> AIResponse:

        prompt = (
            "Answer the user's query using the provided context.\n\n"
            f"Context:\n{context}\n\n"
            f"Query:\n{query}\n\n"
            "If the context does not contain enough information, "
            "clearly state that."
        )

        request = AIRequest(
            prompt=prompt,
            system_prompt=(
                "You are a retrieval-augmented AI assistant. "
                "Use the supplied context to provide accurate answers "
                "and do not invent unsupported information."
            ),
        )

        return self.ai_service.generate(request)