import { useParams } from 'react-router-dom';
import { useMovieDetail } from '../hooks/useMovies';
import Navbar from '../components/Navbar';
import playButton from "../assets/watch-trailer.png";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  // Fallback to ID 0 if undefined, though routing ensures ID exists
  const { data: movie, isLoading } = useMovieDetail(Number(id) || 0);

  if (isLoading) {
    return (
      <div className="bg-black min-h-screen text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="bg-black min-h-screen text-white flex items-center justify-center">
        <h1 className="text-2xl">Movie not found</h1>
      </div>
    );
  }

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : 'https://placehold.co/1920x1080?text=No+Image';

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://placehold.co/500x750?text=No+Image';

  return (
    <div className="bg-black min-h-screen text-white font-['Poppins']">
      <Navbar />
      
      {/* Hero Section with Backdrop */}
      <div className="relative h-[80vh] w-full">
        <div className="absolute inset-0">
          <img
            src={backdropUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        </div>

        <div className="relative container mx-auto px-4 md:px-[140px] h-full flex items-center">
          <div className="flex flex-col md:flex-row gap-12 mt-[100px] w-full">
            {/* Poster (Hidden on mobile, visible on desktop) */}
            <div className="hidden md:block w-[300px] flex-shrink-0 shadow-2xl rounded-lg overflow-hidden">
                <img src={posterUrl} alt={movie.title} className="w-full h-full object-cover" />
            </div>

            {/* Content */}
            <div className="max-w-[800px] flex flex-col justify-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 drop-shadow-xl">
                {movie.title}
              </h1>
              <div className="flex items-center gap-4 text-neutral-300 text-sm md:text-base mb-6">
                <span className="bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded border border-yellow-500/30">
                    ★ {movie.vote_average.toFixed(1)}
                </span>
                <span>{new Date(movie.release_date).getFullYear()}</span>
                <span>•</span>
                <span>{movie.runtime} min</span>
                <span>•</span>
                <span>{movie.genres?.map(g => g.name).join(', ')}</span>
              </div>

              <p className="text-neutral-300 text-lg leading-relaxed mb-8 drop-shadow-md">
                {movie.overview}
              </p>

              <button className="w-[235px] bg-[rgba(150,18,0,1)] text-white py-3 rounded-full flex items-center justify-center gap-2 font-bold hover:bg-red-500 transition-colors shadow-lg shadow-red-900/20 cursor-pointer">
                  Watch Trailer 
                  <img src={playButton} alt="Play" className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default MovieDetail;
