import { Movie } from '@/lib/api';
import { usePinnedVideos } from '@/lib/context/PinnedVideosContext';

interface VideoPlayerProps {
  movie: Movie;
  hidePin?: boolean;
}

export function VideoPlayer({ movie, hidePin = false }: VideoPlayerProps) {
  const { isPinned, togglePin } = usePinnedVideos();

  return (
    <div className="relative aspect-w-16 aspect-h-9">
      <video
        className="w-full h-full object-contain"
        controls
        preload="metadata"
      >
        <source src={movie.video_path} type={movie.video_type || 'video/mp4'} />
        Your browser does not support the video tag.
      </video>

      {!hidePin && movie.video_path && (
        <button
          onClick={() => togglePin(movie)}
          className={`
            absolute right-3 top-3
            z-10
            rounded-full ${isPinned(movie.id) ? 'bg-indigo-600 text-white' : 'bg-white/70 text-gray-900'}
            backdrop-blur px-3 py-2
            text-sm font-medium hover:bg-indigo-600 hover:text-white
            transition
          `}
        >
          {isPinned(movie.id) ? 'Pinned' : 'Pin'}
        </button>
      )}
    </div>
  );
} 