import { Movie } from '@/lib/api';
import { StarIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

interface MovieCardProps {
  movie: Movie;
  onEdit: (movie: Movie) => void;
  onDelete: (id: number) => void;
}

export function MovieCard({ movie, onEdit, onDelete }: MovieCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-900">{movie.title}</h3>
          <div className="flex space-x-2">
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
          </div>
        </div>

        {movie.description && (
          <p className="mt-2 text-gray-600 line-clamp-2">{movie.description}</p>
        )}

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            {movie.rating && (
              <div className="flex items-center text-yellow-400">
                <StarIcon className="h-5 w-5" />
                <span className="ml-1 text-gray-600">{movie.rating}</span>
              </div>
            )}
            {movie.genre && (
              <span className="ml-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {movie.genre}
              </span>
            )}
          </div>
          {movie.release_year && (
            <span className="text-sm text-gray-500">{movie.release_year}</span>
          )}
        </div>
      </div>
    </div>
  );
} 