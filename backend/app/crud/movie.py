from sqlalchemy.orm import Session
from typing import List, Optional
from app.models.movie import Movie as MovieModel
from app.schemas.movie import MovieCreate, MovieUpdate


def get_movie(db: Session, movie_id: int) -> Optional[MovieModel]:
    return db.query(MovieModel).filter(MovieModel.id == movie_id).first()


def get_movies(db: Session, skip: int = 0, limit: int = 100) -> List[MovieModel]:
    return db.query(MovieModel).offset(skip).limit(limit).all()


def create_movie(db: Session, movie: MovieCreate) -> MovieModel:
    db_movie = MovieModel(**movie.dict())
    db.add(db_movie)
    db.commit()
    db.refresh(db_movie)
    return db_movie


def update_movie(db: Session, movie_id: int, movie: MovieUpdate) -> Optional[MovieModel]:
    db_movie = db.query(MovieModel).filter(MovieModel.id == movie_id).first()
    if not db_movie:
        return None
    for key, value in movie.dict(exclude_unset=True).items():
        setattr(db_movie, key, value)
    db.commit()
    db.refresh(db_movie)
    return db_movie


def delete_movie(db: Session, movie_id: int) -> bool:
    db_movie = db.query(MovieModel).filter(MovieModel.id == movie_id).first()
    if not db_movie:
        return False
    db.delete(db_movie)
    db.commit()
    return True
