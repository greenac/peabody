import logger from "../logger/logger"
import { IActor, Actor, IActorData } from "../models/actor"
import { IMovieData, IMovie, Movie } from "../models/movie"

enum ApiEndpoints {
  AllActors = "/api/actor",
  UnknownMovies = "/api/movie/unknown",
}

// TODO: add more values
enum ApiResponseCodes {
  OK = 200,
  OkCreated = 201,
  NotFount = 404,
  InternalServerError = 500,
}

interface ApiResponse {
  status: number
  payload?: any
  message?: string
  error?: number
}

export const apiGet = async (url: string): Promise<ApiResponse> => {
  let response: Response
  try {
    response = await fetch(url)
  } catch (error) {
    logger.error("apiGet::failed to get response from", url, "with error:", error)
    throw error
  }

  let apiResponse: ApiResponse
  try {
    apiResponse = await response.json()
  } catch (error) {
    logger.error("apiGet::failed to make api response object for url", url, "with error:", error)
    throw error
  }

  return apiResponse
}

export const apiGetAllActors = async (): Promise<IActor[]> => {
  const response = await apiGet(ApiEndpoints.AllActors)
  if (response.status !== ApiResponseCodes.OK) {
    // TODO: add comprehensive error -> ui handling
    throw new Error(`All Actors ${response.status}`)
  }

  console.log("Got actors from api:", response)

  return response.payload.actors.map((a: IActorData) => new Actor(a))
}

export const apiGetUnknownMovies = async (): Promise<IMovie[]> => {
  const response = await apiGet(ApiEndpoints.UnknownMovies)
  if (response.status !== ApiResponseCodes.OK) {
    // TODO: add comprehensive error -> ui handling
    throw new Error(`All Actors ${response.status}`)
  }

  console.log("Got unknown movies from api:", response)

  return response.payload.movies.map((m: IMovieData) => new Movie(m))
}

