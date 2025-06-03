import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Movie } from '../api';

interface PinnedVideosContextType {
  pinnedVideos: Movie[];
  isPinned: (movieId: number) => boolean;
  togglePin: (movie: Movie) => void;
  clearPins: () => void;
}

const PinnedVideosContext = createContext<PinnedVideosContextType | undefined>(undefined);

export function PinnedVideosProvider({ children }: { children: ReactNode }) {
  const [pinnedVideos, setPinnedVideos] = useState<Movie[]>([]);

  const isPinned = useCallback((movieId: number) => {
    return pinnedVideos.some((movie) => movie.id === movieId);
  }, [pinnedVideos]);

  const togglePin = useCallback((movie: Movie) => {
    setPinnedVideos((current) => {
      if (current.some((m) => m.id === movie.id)) {
        return current.filter((m) => m.id !== movie.id);
      }
      if (current.length >= 6) {
        alert('You can only pin up to 6 videos');
        return current;
      }
      return [...current, movie];
    });
  }, []);

  const clearPins = useCallback(() => {
    setPinnedVideos([]);
  }, []);

  return (
    <PinnedVideosContext.Provider value={{ pinnedVideos, isPinned, togglePin, clearPins }}>
      {children}
    </PinnedVideosContext.Provider>
  );
}

export function usePinnedVideos() {
  const context = useContext(PinnedVideosContext);
  if (context === undefined) {
    throw new Error('usePinnedVideos must be used within a PinnedVideosProvider');
  }
  return context;
} 