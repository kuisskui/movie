from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlalchemy.orm import Session

from app.schemas.movie import Movie, MovieCreate, MovieUpdate
from app.crud.movie import get_movie, get_movies, create_movie, update_movie, delete_movie
from app.core.db import get_db

router = APIRouter(
    prefix="/movies",
    tags=["movies"],
)


@router.get("/", response_model=List[Movie])
def read_movies(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return get_movies(db, skip=skip, limit=limit)


@router.post("/", response_model=Movie, status_code=201)
def create_movie_endpoint(movie: MovieCreate, db: Session = Depends(get_db)):
    return create_movie(db, movie)


@router.get("/{movie_id}", response_model=Movie)
def read_movie(movie_id: int, db: Session = Depends(get_db)):
    db_movie = get_movie(db, movie_id)
    if not db_movie:
        raise HTTPException(status_code=404, detail="Movie not found")
    return db_movie


@router.put("/{movie_id}", response_model=Movie)
def update_movie_endpoint(movie_id: int, movie: MovieUpdate, db: Session = Depends(get_db)):
    db_movie = update_movie(db, movie_id, movie)
    if not db_movie:
        raise HTTPException(status_code=404, detail="Movie not found")
    return db_movie


@router.delete("/{movie_id}", status_code=204)
def delete_movie_endpoint(movie_id: int, db: Session = Depends(get_db)):
    success = delete_movie(db, movie_id)
    if not success:
        raise HTTPException(status_code=404, detail="Movie not found")
    return None
