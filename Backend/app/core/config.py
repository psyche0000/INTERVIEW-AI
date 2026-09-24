# Import Pydantic Settings for environment-based configuration.
from pydantic_settings import BaseSettings, SettingsConfigDict


# Define centralized application configuration.
class Settings(BaseSettings):
    # Store the PostgreSQL database connection URL.
    DATABASE_URL: str

    # Load configuration values from the backend .env file.
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


# Create a single reusable settings instance.
settings = Settings()