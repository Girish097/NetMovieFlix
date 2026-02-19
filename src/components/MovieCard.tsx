import { useNavigate } from 'react-router-dom';
import type { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard = ({ movie }: MovieCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.imdbID}`);
  };

  const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-poster.jpg';

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-10"
    >
      <div className="relative overflow-hidden rounded-lg bg-netflix-dark shadow-lg">
        <div className="aspect-[2/3] overflow-hidden">
          <img
            src={posterUrl}
            alt={movie.Title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x450/141414/ffffff?text=No+Poster';
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2">
              {movie.Title}
            </h3>
            <p className="text-gray-300 text-xs">{movie.Year}</p>
          </div>
        </div>
        <div className="p-4 bg-netflix-dark">
          <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2 group-hover:text-netflix-red transition-colors">
            {movie.Title}
          </h3>
          <p className="text-gray-400 text-xs">{movie.Year}</p>
        </div>
      </div>
    </div>
  );
};
