import { useNavigate } from 'react-router-dom';
import type { Movie } from '../types/movie';
import playButton from '../assets/watch-trailer.png';

interface HeroProps {
  movie?: Movie;
}

const Hero = ({ movie }: HeroProps) => {
  const navigate = useNavigate();

  if (!movie) return <div className='h-[80vh] bg-gray-900 animate-pulse'></div>;

  const backdropUrl = movie?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : 'https://placehold.co/1920x1080?text=No+Image';

  const handleNavigation = () => {
    if (movie?.id) {
      navigate(`/movie/${movie.id}`);
    }
  };

  return (
    <div className='relative h-screen w-full'>
      <div className='absolute inset-0'>
        <img
          src={backdropUrl}
          alt={movie?.title || 'Hero Banner'}
          className='w-full h-full object-cover'
        />
        {/* Gradient Overlay similar to design (darker at bottom/left) */}
        <div className='absolute inset-0 bg-gradient-to-t from-[#141414] via-black/20 to-transparent'></div>
        <div className='absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent'></div>
      </div>

      <div className='relative px-4 md:px-[140px] h-full flex items-center'>
        <div className='max-w-[635px] mt-[365px] md:mt-[422px]'>
          <h1 className="text-2xl md:text-7xl font-bold text-white mb-4 drop-shadow-xl font-['Poppins']">
            {movie?.title || 'The Gorge'}
          </h1>
          <p className="text-neutral-400 text-regular line-clamp-3 mb-12 drop-shadow-md leading-relaxed font-['Poppins']">
            {movie?.overview ||
              'Two highly trained operatives grow close from a distance after being sent to guard opposite sides of a mysterious gorge. When an evil below emerges, they must work together to survive what lies within.'}
          </p>

          <div className='max-w-[635px] flex flex-col sm:flex-row gap-4'>
            {/* Watch Trailer Button - Red Style */}
            <button
              onClick={handleNavigation}
              className='w-full h-[44px] sm:w-[230px] sm:h-[52px] bg-[rgba(150,18,0,1)] text-white py-3 rounded-full flex items-center justify-center gap-4 font-bold hover:bg-red-500 transition-colors shadow-lg shadow-red-900/20 cursor-pointer'
            >
              Watch Trailer
              <img src={playButton} alt='Play' className='w-6 h-6' />
            </button>
            {/* See Detail Button - Dark Translucent Style */}
            <button
              onClick={handleNavigation}
              className='w-full h-[44px] sm:w-[230px] sm:h-[52px] bg-[rgba(10,13,18,0.6)] text-white py-3 rounded-full flex items-center justify-center font-bold hover:bg-neutral-500 transition-colors border border-neutral-900 backdrop-blur-2xl cursor-pointer'
            >
              See Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
