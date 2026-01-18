import { api } from "../lib/api";
import type { ApiResponse, Movie, MovieDetail } from "../types/movie";

export const getTrendingMovies = async (): Promise<ApiResponse<Movie>> => {
  const response = await api.get('/trending/movie/week');
  return response.data;
};

export const getNowPlayingMovies = async (): Promise<ApiResponse<Movie>> => {
  const response = await api.get('/movie/now_playing');
  return response.data;
};

export const getMovieDetail = async (id: number): Promise<MovieDetail> => {
  const response = await api.get(`/movie/${id}?append_to_response=credits`);
  return response.data;
};

export const searchMovies = async (query: string): Promise<ApiResponse<Movie>> => {
  const response = await api.get(`/search/movie?query=${query}`);
  return response.data;
};