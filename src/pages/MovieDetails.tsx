import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { getMovieDetails } from '../services/movieService';
import type { MovieDetails as MovieDetailsType } from '../types';

export const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) {
        setError('Invalid movie ID');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError('');

      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-netflix-black">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-netflix-red"></div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-netflix-black">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-red-500 mb-4">Error</h2>
            <p className="text-gray-400 mb-6">{error || 'Movie not found'}</p>
            <button
              onClick={() => navigate('/')}
              className="bg-netflix-red hover:bg-red-700 text-white px-6 py-2 rounded transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-poster.jpg';

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-gray-400 hover:text-white transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Poster */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <img
                src={posterUrl}
                alt={movie.Title}
                className="w-full rounded-lg shadow-2xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x600/141414/ffffff?text=No+Poster';
                }}
              />
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {movie.Title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-300">
              {movie.Year && <span className="text-lg">{movie.Year}</span>}
              {movie.Rated && (
                <span className="px-3 py-1 bg-yellow-600/20 border border-yellow-600 rounded text-yellow-400">
                  {movie.Rated}
                </span>
              )}
              {movie.Runtime && <span>{movie.Runtime}</span>}
              {movie.imdbRating && (
                <span className="flex items-center gap-1">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {movie.imdbRating}/10
                </span>
              )}
            </div>

            {movie.Genre && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-400 mb-2">Genre</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.Genre.split(', ').map((genre, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-netflix-dark border border-gray-700 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {movie.Plot && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">Plot</h3>
                <p className="text-gray-300 leading-relaxed">{movie.Plot}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {movie.Director && movie.Director !== 'N/A' && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 mb-1">Director</h3>
                  <p className="text-white">{movie.Director}</p>
                </div>
              )}

              {movie.Writer && movie.Writer !== 'N/A' && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 mb-1">Writer</h3>
                  <p className="text-white">{movie.Writer}</p>
                </div>
              )}

              {movie.Actors && movie.Actors !== 'N/A' && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 mb-1">Cast</h3>
                  <p className="text-white">{movie.Actors}</p>
                </div>
              )}

              {movie.Language && movie.Language !== 'N/A' && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 mb-1">Language</h3>
                  <p className="text-white">{movie.Language}</p>
                </div>
              )}

              {movie.Country && movie.Country !== 'N/A' && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 mb-1">Country</h3>
                  <p className="text-white">{movie.Country}</p>
                </div>
              )}

              {movie.Released && movie.Released !== 'N/A' && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 mb-1">Released</h3>
                  <p className="text-white">{movie.Released}</p>
                </div>
              )}
            </div>

            {movie.Ratings && movie.Ratings.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Ratings</h3>
                <div className="space-y-2">
                  {movie.Ratings.map((rating, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-netflix-dark rounded">
                      <span className="text-gray-300 font-medium">{rating.Source}</span>
                      <span className="text-white">{rating.Value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {movie.Awards && movie.Awards !== 'N/A' && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-400 mb-1">Awards</h3>
                <p className="text-white">{movie.Awards}</p>
              </div>
            )}

            {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-400 mb-1">Box Office</h3>
                <p className="text-white">{movie.BoxOffice}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
