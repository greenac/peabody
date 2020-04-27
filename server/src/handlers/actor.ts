import { artemisGet, ArtemisEndpoint } from "./artemis-handler"

export const getActors = async (): Promise<Buffer> => {
  const response = await artemisGet(ArtemisEndpoint.AllActors)
  return response.data
}
