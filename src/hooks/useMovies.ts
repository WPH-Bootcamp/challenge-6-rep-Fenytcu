import { useQuery } from '@tanstack/react-query';
import {
  getTrendingMovies,
  getNowPlayingMovies,
  getMovieDetail,
  searchMovies,
} from '../services/movie';
import type { ApiResponse, Movie, MovieDetail } from '../types/movie';

export const useTrendingMovies = () => {
  return useQuery<ApiResponse<Movie>>({
    queryKey: ['movies', 'trending'],
    queryFn: getTrendingMovies,
  });
};

export const useNowPlayingMovies = () => {
  return useQuery<ApiResponse<Movie>>({
    queryKey: ['movies', 'nowPlaying'],
    queryFn: getNowPlayingMovies,
  });
};

export const useMovieDetail = (id: number) => {
  return useQuery<MovieDetail>({
    queryKey: ['movie', id],
    queryFn: () => getMovieDetail(id),
    enabled: !!id,
  });
};

export const useSearchMovies = (query: string) => {
  return useQuery<ApiResponse<Movie>>({
    queryKey: ['movies', 'search', query],
    queryFn: () => searchMovies(query),
    enabled: !!query,
  });
};
