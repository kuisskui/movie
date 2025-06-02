'use client';

import { useState } from 'react';
import { useMovies, useCreateMovie, useUpdateMovie, useDeleteMovie } from '@/lib/hooks/useMovies';
import { Movie } from '@/lib/api';
import { MovieCard } from '@/components/MovieCard';
import { MovieForm } from '@/components/MovieForm';
import { Dialog } from '@headlessui/react';

export default function Home() {
  const { data: movies, isLoading } = useMovies();
  const createMovie = useCreateMovie();
  const updateMovie = useUpdateMovie();
  const deleteMovie = useDeleteMovie();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | undefined>();

  const handleSubmit = async (data: any) => {
    try {
      if (selectedMovie) {
        await updateMovie.mutateAsync({ id: selectedMovie.id, movie: data });
      } else {
        await createMovie.mutateAsync(data);
      }
      setIsOpen(false);
      setSelectedMovie(undefined);
    } catch (error) {
      console.error('Failed to save movie:', error);
    }
  };

  const handleEdit = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await deleteMovie.mutateAsync(id);
      } catch (error) {
        console.error('Failed to delete movie:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Movies</h1>
        <button
          onClick={() => {
            setSelectedMovie(undefined);
            setIsOpen(true);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add Movie
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movies?.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <Dialog
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSelectedMovie(undefined);
        }}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-lg rounded bg-white p-6 w-full">
            <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 mb-4">
              {selectedMovie ? 'Edit Movie' : 'Add Movie'}
            </Dialog.Title>
            <MovieForm
              initialData={selectedMovie}
              onSubmit={handleSubmit}
              isSubmitting={createMovie.isPending || updateMovie.isPending}
            />
          </Dialog.Panel>
        </div>
      </Dialog>
    </main>
  );
}
