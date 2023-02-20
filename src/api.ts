import { useQuery } from "@tanstack/react-query";

const API_KEY = "3feeafdd3e2f06ac75d6b4da35e61894";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

interface ITV {
  id: number;
  backdrop_path: string;
  poster_path: string;
  name: string;
  overview: string;
}

export interface IGetTVsResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: ITV[];
  total_pages: number;
  total_results: number;
}

export async function getLatest() {
  const response = await fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`
  );
  return await response.json();
}

export async function getTopRated() {
  const response = await fetch(
    `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`
  );
  return await response.json();
}

export async function getUpcoming() {
  const response = await fetch(
    `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`
  );
  return await response.json();
}

export const useMultipleQuery = <T>() => {
  const latest = useQuery<T>(["latest"], getLatest);
  const topRated = useQuery<T>(["topRated"], getTopRated);
  const upcoming = useQuery<T>(["upcoming"], getUpcoming);

  return [latest, topRated, upcoming];
};

export async function getAiringToday() {
  const response = await fetch(
    `${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`
  );
  return await response.json();
}

export async function getPopular() {
  const response = await fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`);
  return await response.json();
}

export async function getTopRatedShows() {
  const response = await fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`);
  return await response.json();
}

export const useMultipleTvQuery = <T>() => {
  const airingToday = useQuery<T>(["airingToday"], getAiringToday);
  const popular = useQuery<T>(["popular"], getPopular);
  const topRatedShows = useQuery<T>(["topRatedShows"], getTopRatedShows);

  return [airingToday, popular, topRatedShows];
};

export async function getMovie(keyword: string) {
  const response = await fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${keyword}`
  );
  return await response.json();
}

export async function getTV(keyword: string) {
  const response = await fetch(
    `${BASE_PATH}/search/tv?api_key=${API_KEY}&query=${keyword}`
  );
  return await response.json();
}

export const useMultipleSearchQuery = (keyword: string) => {
  const movie = useQuery<IGetMoviesResult>(["searchMovie"], () =>
    getMovie(keyword)
  );
  const tv = useQuery<IGetTVsResult>(["searchTV"], () => getTV(keyword));

  return [movie, tv];
};
