import { artemisGet, ArtemisEndpoint } from "./artemis-handler"

export const unknownMovies = async (): Promise<Buffer> => {
  const response = await artemisGet(ArtemisEndpoint.UnknownMovies)
  return response.data
}
