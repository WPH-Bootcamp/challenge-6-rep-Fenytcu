import Hero from "../components/Hero";
import MovieList from "../components/MovieList";
import Navbar from "../components/Navbar";
import { useTrendingMovies, useNowPlayingMovies } from "../hooks/useMovies";
import logo from '../assets/logo.png';

const Home = () => {
  const { data: trending, isLoading: loadingTrending } = useTrendingMovies();
  const { data: nowPlaying, isLoading: loadingNowPlaying } = useNowPlayingMovies();

  const featuredMovie = trending?.results[0];

  return (
    <div className="bg-black text-white">
      <Navbar />
      <Hero movie={featuredMovie} />
      <div className="mt-0 md:mt-[199px] relative z-10">
        <MovieList 
            title="Trending Now" 
            movies={trending?.results.slice(1)} 
            isLoading={loadingTrending} 
        />
        <MovieList 
            title="New Release" 
            movies={nowPlaying?.results} 
            isLoading={loadingNowPlaying} 
            variant="grid"
        />
      </div>
      
      {/* Footer */}
      <footer className="py-8 px-4 md:px-[120px] mt-12 bg-black md:px-[140px]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
                <img src={logo} alt="Logo" className="w-8 h-8" />
                <span className="text-white font-semibold text-[24px]">Movie</span>
            </div>
            <div className="text-neutral-600 text-[16px] font-normal text-left md:text-right ">
                Copyright ©2025 Movie Explorer 
                <span className="sr-only">.</span>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
