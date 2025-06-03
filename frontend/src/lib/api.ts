import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Movie {
  id: number;
  title: string;
  description?: string;
  rating?: number;
  release_year?: number;
  genre?: string;
  video_path?: string;
  video_type?: string;
}

export interface MovieCreate {
  title: string;
  description?: string;
  rating?: number;
  release_year?: number;
  genre?: string;
}

export interface MovieUpdate {
  title?: string;
  description?: string;
  rating?: number;
  release_year?: number;
  genre?: string;
  video_path?: string;
  video_type?: string;
}

export const movieApi = {
  getAll: async () => {
    const response = await api.get<Movie[]>('/movies');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get<Movie>(`/movies/${id}`);
    return response.data;
  },

  create: async (movie: MovieCreate) => {
    const response = await api.post<Movie>('/movies', movie);
    return response.data;
  },

  update: async (id: number, movie: MovieUpdate) => {
    const response = await api.put<Movie>(`/movies/${id}`, movie);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/movies/${id}`);
  },

  uploadVideo: async (movieId: number, videoFile: File) => {
    const formData = new FormData();
    formData.append('video', videoFile);

    const response = await axios.post(
      `${baseURL}/movies/${movieId}/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  getVideoUrl: (movieId: number) => {
    return `${baseURL}/movies/${movieId}/video`;
  },
}; 