import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { movieApi, Movie, MovieCreate, MovieUpdate } from '../api';

export const useMovies = () => {
  return useQuery({
    queryKey: ['movies'],
    queryFn: movieApi.getAll,
  });
};

export const useMovie = (id: number) => {
  return useQuery({
    queryKey: ['movies', id],
    queryFn: () => movieApi.getById(id),
  });
};

export const useCreateMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (movie: MovieCreate) => movieApi.create(movie),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
  });
};

export const useUpdateMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, movie }: { id: number; movie: MovieUpdate }) =>
      movieApi.update(id, movie),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
  });
};

export const useDeleteMovie = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => movieApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
  });
}; 