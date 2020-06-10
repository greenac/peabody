import logger from "../../logger/logger"


export enum ApiEndpoints {
  AllActors = "/api/actor/all",
  AllActorsWithMovies = "/api/actor/all-with-movies",
  NewActor = "/api/actor/new",
  MatchingActors = "/api/actor/match",
  ActorsMovies = "/api/actor/movies",
  MatchingActorsWithMovies = "/api/actor/match-with-movies",
  SimpleMatchingActorsWithMovies = "/api/actor/simple-match-with-movies",
  RecentActors = "/api/actor/recent",
  OpenMovie = "/api/movie/open",
  DeleteMovie = "/api/movie/delete",
  MoviesWithIds = "/api/movie/ids",
  UnknownMovies = "/api/movie/unknown",
  AddActorsToMovie = "/api/movie/add-actors",
  SearchMoviesByDate = "/api/movie/search-date",
  ActorsInMovie = "/api/movie/actors",
}

// TODO: add more values
export enum ApiResponseCodes {
  OK = 200,
  OkCreated = 201,
  NotFount = 404,
  InternalServerError = 500,
}

interface ApiResponse {
  code: number
  payload?: any
  message?: string
}

export type QueryParams = { [key: string]: number | string }

export const apiGet = async (url: string, params?: QueryParams): Promise<ApiResponse> => {
  url = makeUrl(url, params)
  let response: Response

  try {
    response = await fetch(url)
  } catch (error) {
    logger.error("apiGet::Failed to get response from", url, "with error:", error)
    throw error
  }

  let apiResponse: ApiResponse
  try {
    apiResponse = await response.json()
  } catch (error) {
    logger.error("apiGet::Failed to make api response object for url", url, "with error:", error)
    throw error
  }

  return apiResponse
}

export const apiPost = async (url: string, payload: any): Promise<ApiResponse> => {
  let response: Response
  try {
    response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
  } catch (error) {
    logger.error(`apiPost::Failed to post ${payload} to ${url} with error: ${error}`)
    throw error
  }

  let apiResponse: ApiResponse
  try {
    apiResponse = await response.json()
  } catch (error) {
    logger.error("apiPost::Failed to make api response object for url", url, "with error:", error)
    throw error
  }

  return apiResponse
}

const makeQueryString = (params: QueryParams): string => {
  const size = Object.keys(params).length
  if (size === 0) {
    return ""
  }

  let q = "?"
  let i = 0
  for (const k in params) {
    q += `${k}=${params[k]}${i === size - 1 ? "" : "&"}`
    i += 1
  }

  return q
}

const makeUrl = (url: string, params?: QueryParams): string => {
  if (!params) {
    return url
  }

  if (url[url.length - 1] === "/") {
    url = url.substring(0, url.length - 1)
  }

  return `${url}${makeQueryString(params)}`
}
