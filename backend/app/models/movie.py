from sqlalchemy import Column, Integer, String, Text, Float
from app.core.db import Base


class Movie(Base):
    __tablename__ = "movies"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), unique=True, index=True, nullable=False)
    description = Column(Text, nullable=True)
    rating = Column(Float, nullable=True)
    release_year = Column(Integer, nullable=True)
    genre = Column(String(100), nullable=True)
    video_path = Column(String(255), nullable=True)
    video_type = Column(String(50), nullable=True)  # e.g., 'video/mp4'
