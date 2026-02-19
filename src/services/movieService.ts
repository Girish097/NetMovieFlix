import axios from 'axios';
import type { MovieSearchResponse, MovieDetails } from '../types';

const API_KEY = '92adea90';
const BASE_URL = 'https://www.omdbapi.com/';

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY,
  },
});

// Search movies by title
export const searchMovies = async (query: string): Promise<MovieSearchResponse> => {
  if (!query.trim()) {
    throw new Error('Search query cannot be empty');
  }

  try {
    const response = await api.get<MovieSearchResponse>('', {
      params: {
        s: query,
      },
    });

    if (response.data.Response === 'False') {
      throw new Error(response.data.Error || 'No movies found');
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message || 'Failed to fetch movies');
    }
    throw error;
  }
};

// Get movie details by IMDB ID
export const getMovieDetails = async (imdbID: string): Promise<MovieDetails> => {
  if (!imdbID.trim()) {
    throw new Error('IMDB ID cannot be empty');
  }

  try {
    const response = await api.get<MovieDetails>('', {
      params: {
        i: imdbID,
      },
    });

    if (response.data.Response === 'False') {
      const errorData = response.data as { Response: string; Error?: string };
      throw new Error(errorData.Error || 'Movie not found');
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message || 'Failed to fetch movie details');
    }
    throw error;
  }
};
