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
} from "./api"

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

export const apiNewActor = async (name: string): Promise<IActor> => {
  const response = await apiPost(ApiEndpoints.NewActor, { name })
  if (response.code !== ApiResponseCodes.OK) {
    // TODO: add comprehensive error -> ui handling
    throw new Error(`apiNewActor ${response.code}`)
  }

  return new Actor(response.payload.actor)
}

