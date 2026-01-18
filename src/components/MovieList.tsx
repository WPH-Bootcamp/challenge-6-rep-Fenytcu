import type { Movie } from '../types/movie';
import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';

interface MovieListProps {
  title: string;
  movies?: Movie[];
  isLoading?: boolean;
  variant?: 'horizontal' | 'grid';
}

const MovieList = ({
  title,
  movies,
  isLoading,
  variant = 'horizontal',
}: MovieListProps) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [visibleCount, setVisibleCount] = useState(15);

  // Check if we can scroll right (Horizontal mode only)
  const checkScroll = () => {
    if (variant === 'horizontal' && scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [movies, variant]);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <div className='space-y-4 px-4 md:px-[140px] my-8 relative transition-all duration-300'>
      <div className='flex items-center justify-between'>
        <h2 className='text-white text-[24px] md:text-[36px] font-bold hover:text-gray-300 cursor-pointer transition-colors'>
          {title}
        </h2>
      </div>

      <div className='relative group'>
        {variant === 'horizontal' ? (
          // Horizontal Scroll Layout
          <>
            <div
              ref={scrollRef}
              className='flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x'
              onScroll={checkScroll}
            >
              {isLoading
                ? [...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className='flex-none w-[160px] md:w-[216px] aspect-[2/3] bg-gray-800 rounded-lg animate-pulse'
                    />
                  ))
                : movies?.map((movie) => (
                    <div
                      key={movie.id}
                      className='flex-none w-[160px] md:w-[216px]'
                    >
                      <MovieCard movie={movie} />
                    </div>
                  ))}
            </div>

            <div
              className={`absolute right-0 top-0 bottom-4 w-[100px] md:w-[150px] bg-gradient-to-l from-black via-black/70 to-transparent pointer-events-none transition-opacity duration-300 z-10 ${
                canScrollRight ? 'opacity-100' : 'opacity-0'
              }`}
            />

            <button
              onClick={scrollRight}
              className={`hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-300 ${
                canScrollRight
                  ? 'opacity-0 group-hover:opacity-100'
                  : 'opacity-0 hidden'
              }`}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2.5}
                stroke='currentColor'
                className='w-6 h-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M8.25 4.5l7.5 7.5-7.5 7.5'
                />
              </svg>
            </button>
          </>
        ) : (
          // Grid Layout
          <div className='flex flex-col items-center gap-8'>
            <div className='grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8 w-full'>
              {isLoading
                ? [...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className='w-full aspect-[2/3] bg-gray-800 rounded-lg animate-pulse'
                    />
                  ))
                : movies?.slice(0, visibleCount).map((movie) => (
                    <div key={movie.id} className='w-full flex justify-start'>
                      <MovieCard movie={movie} />
                    </div>
                  ))}
            </div>

            {movies && visibleCount < movies.length && (
              <button
                onClick={loadMore}
                className='mt-8 w-[200px] h-[44px] md:w-[230px] md:h-[52px] mb-[113px] md:mb-[224px] bg-[rgba(10,13,18,0.8)] border border-neutral-900 text-white rounded-full hover:bg-[rgba(20,25,35,0.9)] hover:border-neutral-500 transition-all duration-300 backdrop-blur-md font-semibold flex items-center justify-center'
              >
                Load More
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieList;
