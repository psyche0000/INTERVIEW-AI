class AIProviderError(Exception):
    """Raised when an AI provider request fails."""

    def __init__(self, message: str):
        self.message = message
        super().__init__(message)


class AIConfigurationError(Exception):
    """Raised when AI configuration is invalid."""

    def __init__(self, message: str):
        self.message = message
        super().__init__(message)