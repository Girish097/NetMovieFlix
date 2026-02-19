import { useState, useEffect, useCallback } from 'react';
import { Navbar } from '../components/Navbar';
import { SearchBar } from '../components/SearchBar';
import { MovieCard } from '../components/MovieCard';
import { searchMovies } from '../services/movieService';
import type { Movie } from '../types';

export const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('batman');

  const fetchMovies = useCallback(async (query: string) => {
    if (!query.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await searchMovies(query);
      if (response.Search) {
        setMovies(response.Search);
      } else {
        setMovies([]);
        setError('No movies found');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch movies');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load with default search
  useEffect(() => {
    fetchMovies(searchQuery);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    fetchMovies(query);
  };

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Welcome to MovieFlix
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Discover your next favorite movie
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} loading={loading} />

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-red-900/30 border border-red-700 rounded-lg text-red-200 text-center">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && movies.length === 0 && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-netflix-red"></div>
          </div>
        )}

        {/* Movies Grid */}
        {!loading && movies.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-white mb-6">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'Popular Movies'}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && movies.length === 0 && !error && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Start searching for movies...</p>
          </div>
        )}
      </div>
    </div>
  );
};
