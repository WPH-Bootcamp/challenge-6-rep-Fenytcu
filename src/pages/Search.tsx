import { useSearchParams } from 'react-router-dom';
import { useSearchMovies } from '../hooks/useMovies';
import Navbar from '../components/Navbar';
import MovieList from '../components/MovieList';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { data, isLoading } = useSearchMovies(query);

  return (
    <div className="bg-black min-h-screen text-white font-['Poppins']">
      <Navbar />
      <div className="pt-[150px] px-4 md:px-[140px] relative z-10">
        <h1 className="text-3xl font-bold mb-8">
            Search Results for: <span className="text-red-500">{query}</span>
        </h1>
        
        {query ? (
             <MovieList 
                title="" 
                movies={data?.results} 
                isLoading={isLoading} 
                variant="grid"
            />
        ) : (
             <div className="text-center text-neutral-500 text-xl mt-20">
                Please enter a search term.
             </div>
        )}
      </div>
    </div>
  );
};

export default Search;
