import axios from 'axios';

const BASE_URL =
  import.meta.env.VITE_BASE_URL || 'https://api.themoviedb.org/3';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = import.meta.env.VITE_READ_ACCESS_TOKEN;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ... existing code ...

export const fetcher = async (url: string) => {
  const response = await api.get(url);
  return response.data;
};

