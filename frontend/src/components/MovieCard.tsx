import { Movie, movieApi } from '@/lib/api';
import { StarIcon, PencilIcon, TrashIcon, VideoCameraIcon, CheckIcon } from '@heroicons/react/24/solid';
import { VideoPlayer } from './VideoPlayer';
import { useState } from 'react';

interface MovieCardProps {
  movie: Movie;
  onEdit: (movie: Movie) => void;
  onDelete: (id: number) => void;
}

export function MovieCard({ movie, onEdit, onDelete }: MovieCardProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleVideoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      await movieApi.uploadVideo(movie.id, file);
      // Refresh the page or update the movie state to show the video
      window.location.reload();
    } catch (error) {
      console.error('Failed to upload video:', error);
      alert('Failed to upload video');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-0 m-0">
      {movie.video_path && (
        <div className="p-0 m-0">
          <VideoPlayer
            src={movieApi.getVideoUrl(movie.id)}
            type={movie.video_type}
          />
        </div>
      )}

      <div className="flex justify-between items-start p-0 m-0">
        <h3 className="text-xl font-semibold text-gray-900 p-0 m-0">{movie.title}</h3>
        <div className="flex space-x-2 p-0 m-0">
          <button
            onClick={() => onEdit(movie)}
            className="text-gray-400 hover:text-gray-500"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => onDelete(movie.id)}
            className="text-gray-400 hover:text-red-500"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
          {!movie.video_path && (
            <label className="cursor-pointer text-gray-400 hover:text-blue-500">
              <VideoCameraIcon className="h-5 w-5" />
              <input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleVideoUpload}
                disabled={isUploading}
              />
            </label>
          )}
        </div>
      </div>

      {movie.description && (
        <p className="text-gray-600 p-0 m-0">{movie.description}</p>
      )}

      <div className="m-0 flex items-center justify-end">
        <div className="flex items-center">
          {movie.rating && (
            <div className="flex items-center text-yellow-400">
              <CheckIcon className="h-5 w-5" />
              <span className="ml-1 text-gray-600">{movie.rating}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 