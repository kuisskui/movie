from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Response
from fastapi.responses import StreamingResponse
from typing import List
import os
import shutil
from pathlib import Path
from sqlalchemy.orm import Session

from app.schemas.movie import Movie, MovieCreate, MovieUpdate
from app.crud.movie import get_movie, get_movies, create_movie, update_movie, delete_movie
from app.core.db import get_db

router = APIRouter(
    prefix="/movies",
    tags=["movies"],
)

# Create media directory if it doesn't exist
MEDIA_DIR = Path("app/media/videos")
MEDIA_DIR.mkdir(parents=True, exist_ok=True)

def get_video_path(filename: str) -> Path:
    return MEDIA_DIR / filename


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


@router.post("/{movie_id}/upload")
async def upload_video(
    movie_id: int,
    video: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    db_movie = get_movie(db, movie_id)
    if not db_movie:
        raise HTTPException(status_code=404, detail="Movie not found")

    # Create a unique filename
    file_extension = os.path.splitext(video.filename)[1]
    filename = f"movie_{movie_id}{file_extension}"
    file_path = get_video_path(filename)

    # Save the uploaded file
    try:
        with file_path.open("wb") as buffer:
            shutil.copyfileobj(video.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Could not upload video: {str(e)}")

    # Update movie record with video information
    video_update = MovieUpdate(
        video_path=str(file_path),
        video_type=video.content_type
    )
    update_movie(db, movie_id, video_update)

    return {"message": "Video uploaded successfully"}


@router.get("/{movie_id}/video")
async def stream_video(movie_id: int, db: Session = Depends(get_db)):
    db_movie = get_movie(db, movie_id)
    if not db_movie or not db_movie.video_path:
        raise HTTPException(status_code=404, detail="Video not found")

    video_path = Path(db_movie.video_path)
    if not video_path.exists():
        raise HTTPException(status_code=404, detail="Video file not found")

    def iterfile():
        with open(video_path, mode="rb") as file:
            yield from file

    return StreamingResponse(
        iterfile(),
        media_type=db_movie.video_type or "video/mp4"
    )
