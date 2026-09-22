from abc import ABC, abstractmethod

from app.ai.schemas import AIRequest, AIResponse


class AIProvider(ABC):

    @abstractmethod
    def generate(
        self,
        request: AIRequest,
    ) -> AIResponse:
        pass