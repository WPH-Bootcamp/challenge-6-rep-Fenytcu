import type { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://placehold.co/500x750?text=No+Image';

  return (
    <div className="w-full snap-center cursor-pointer transition-transform hover:scale-105">
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-4 ">
        <img
          src={imageUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div>
            <h3 className="text-white font-semibold text-sm line-clamp-2">{movie.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-yellow-400 text-xs">★ {movie.vote_average.toFixed(1)}</span>
              <span className="text-gray-300 text-xs">{new Date(movie.release_date).getFullYear()}</span>
      </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
