import {
  ApiEndpoints,
  apiGet,
  apiPost,
  ApiResponseCodes,
} from "./api"
import {
  IMovie,
  IMovieData,
  Movie,
} from "../../models/movie"
import {
  IActor,
  IActorData,
  Actor,
} from "../../models/actor"

export interface IUnknownMovieResponse {
  movies: IMovie[]
  page: number,
  length: number
  size: number
  total: number
}

export const apiGetUnknownMovies = async (page: number): Promise<IUnknownMovieResponse> => {
  const response = await apiGet(ApiEndpoints.UnknownMovies, { page })
  if (response.code !== ApiResponseCodes.OK) {
    // TODO: add comprehensive error -> ui handling
    throw new Error(`apiGetUnknownMovies::Failed with error ${response.payload.status}`)
  }

  console.log("Got unknown movies from api:", response)

  const payload = response.payload
  payload.movies = payload.movies.map((m: IMovieData) => new Movie(m))

  return payload
}

export const apiAddActorsToMovie = async (
  movieId: string,
  actorIds: string[],
): Promise<boolean> => {
  const response = await apiPost(ApiEndpoints.AddActorsToMovie, { movieId, actorIds })
  return response.payload.success
}

export const apiOpenMovie = async (movieId: string): Promise<boolean> => {
  const response = await apiGet(ApiEndpoints.OpenMovie, { movieId })
  return response.payload.success
}

export const apiMoviesWithIds = async (movieIds: string[]): Promise<IMovie[]> => {
  const response = await apiPost(ApiEndpoints.MoviesWithIds, { movieIds })
  return response.payload.movies.map((m: IMovieData) => new Movie(m))
}

export const apiMovieDelete = async (movieId: string): Promise<boolean> => {
  const response = await apiGet(ApiEndpoints.DeleteMovie, { movieId })
  return response.payload.success
}

export const apiSearchMoviesByDate = async (name: string): Promise<IMovie[]> => {
  const response = await apiGet(ApiEndpoints.SearchMoviesByDate, { name })
  return response.payload.data.movies.map((m: IMovieData) => new Movie(m))
}

export const apiActorsInMovie = async (movieId: string): Promise<IActor[]> => {
  const response = await apiGet(ApiEndpoints.ActorsInMovie, { movieId })
  return response.payload.data.actors.map((a: IActorData) => new Actor(a))
}
