from pydantic import BaseModel, ConfigDict
from typing import Optional


class MovieBase(BaseModel):
    title: str
    description: Optional[str] = None
    rating: Optional[float] = None
    release_year: Optional[int] = None
    genre: Optional[str] = None
    video_path: Optional[str] = None
    video_type: Optional[str] = None


class MovieCreate(MovieBase):
    pass


class MovieUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    rating: Optional[float] = None
    release_year: Optional[int] = None
    genre: Optional[str] = None
    video_path: Optional[str] = None
    video_type: Optional[str] = None


class Movie(MovieBase):
    id: int
    model_config = ConfigDict(from_attributes=True)
