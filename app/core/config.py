from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List


class Settings(BaseSettings):
    PROJECT_NAME: str = "Movie App"
    SQLALCHEMY_DATABASE_URL: str = "sqlite:///./movie_app.db"
    CORS_ORIGINS: List[str] = ["*"]
    model_config = SettingsConfigDict(env_file=".env")


settings = Settings()
