import {
  Actor,
  IActor,
  IActorData,
} from "../../models/actor"
import {
  apiGet,
  apiPost,
  ApiEndpoints,
  ApiResponseCodes,
  IPaginatedResponse,
  apiGetImage,
} from "./api"
import {
  IMovieData,
  IMovie,
  Movie,
} from "../../models/movie"

export interface IPaginatedActorResponse extends IPaginatedResponse {
  actors: IActor[]
}

export const apiGetActor = async (actorId: string): Promise<IActor> => {
  const response = await apiGet(ApiEndpoints.Actor, { actorId })
  if (response.code !== ApiResponseCodes.OK) {
    // TODO: add comprehensive error -> ui handling
    throw new Error(`apiGetActor ${response.code}`)
  }

  console.log("actor:", response.payload)
  return new Actor(response.payload.actor)
}

export const apiGetAllActors = async (): Promise<IActor[]> => {
  const response = await apiGet(ApiEndpoints.AllActors)
  if (response.code !== ApiResponseCodes.OK) {
    // TODO: add comprehensive error -> ui handling
    throw new Error(`All Actors ${response.code}`)
  }

  return response.payload.actors.map((a: IActorData) => new Actor(a))
}

export const apiGetAllActorsWithMovies = async (): Promise<IActor[]> => {
  const response = await apiGet(ApiEndpoints.AllActorsWithMovies)
  if (response.code !== ApiResponseCodes.OK) {
    // TODO: add comprehensive error -> ui handling
    throw new Error(`All Actors ${response.code}`)
  }

  return response.payload.actors.map((a: IActorData) => new Actor(a))
}

export const apiSearchActorsWithName = async (name: string): Promise<IActor[]> => {
  const response = await apiGet(ApiEndpoints.MatchingActors, { "q": name })
  if (response.code !== ApiResponseCodes.OK) {
    // TODO: add comprehensive error -> ui handling
    throw new Error(`apiSearchActorsWithName ${response.code}`)
  }

  return response.payload.actors.map((a: IActorData) => new Actor(a))
}

export const apiSearchActorsWithNameAndMovies = async (name: string): Promise<IActor[]> => {
  const response = await apiGet(ApiEndpoints.MatchingActorsWithMovies, { "q": name })
  if (response.code !== ApiResponseCodes.OK) {
    // TODO: add comprehensive error -> ui handling
    throw new Error(`apiSearchActorsWithName ${response.code}`)
  }

  return response.payload.actors.map((a: IActorData) => new Actor(a))
}

export const apiSimpleSearchActorsWithNameAndMovies = async (name: string): Promise<IActor[]> => {
  const response = await apiGet(ApiEndpoints.SimpleMatchingActorsWithMovies, { "q": name })
  if (response.code !== ApiResponseCodes.OK) {
    // TODO: add comprehensive error -> ui handling
    throw new Error(`apiSearchActorsWithName ${response.code}`)
  }

  return response.payload.actors.map((a: IActorData) => new Actor(a))
}

export const apiNewActor = async (name: string): Promise<IActor> => {
  const response = await apiPost(ApiEndpoints.NewActor, { name })
  if (response.code !== ApiResponseCodes.OK) {
    // TODO: add comprehensive error -> ui handling
    throw new Error(`apiNewActor ${response.code}`)
  }

  return new Actor(response.payload.actor)
}

export const apiMoviesForActor = async (actorId: string): Promise<IMovie[]> => {
  const response = await apiGet(ApiEndpoints.ActorsMovies, { actorId })
  if (response.code !== ApiResponseCodes.OK) {
    // TODO: add comprehensive error -> ui handling
    throw new Error(`apiMoviesForActors ${response.code}`)
  }

  return response.payload.movies.map((m: IMovieData) => new Movie(m))
}

export const apiRecentActors = async (): Promise<IActor[]> => {
  const response = await apiGet(ApiEndpoints.RecentActors)
  return response.payload.data.actors.map((a: IActorData) => new Actor(a))
}

export const apiPaginatedActors = async (q: string, page: number): Promise<IPaginatedActorResponse> => {
  const response = await apiGet(ApiEndpoints.ActorsPaginated, { q, page })
  if (response.code !== ApiResponseCodes.OK) {
    // TODO: add comprehensive error -> ui handling
    throw new Error(`apiPaginatedActors::Failed with error ${response.payload.status}`)
  }

  const payload = response.payload
  payload.actors = payload.actors.map((a: IActorData) => new Actor(a))

  return payload
}

export const apiGetActorProfilePic = async (actorId: string): Promise<Blob> => {
  return await apiGetImage(ApiEndpoints.ActorsProfilePic, { actorId })
}
