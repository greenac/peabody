import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios"
import proxyConfig from "../config/proxy"
import logger from "../logger/logger"


export enum ArtemisEndpoint {
  AllActors = "/api/actor",
  Actor = "/api/actor",
  UnknownMovies = "/api/movie/unknown",
}

export enum ArtemisModelType {
  Actor,
  Model,
}

const ax: AxiosInstance = axios.create({
  baseURL: proxyConfig.getUrl(),
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "Application/json",
  }
})

export const artemisGet = async (
  url: ArtemisEndpoint,
  options?: object
): Promise<AxiosResponse> => {
  let resp: AxiosResponse
  try {
    resp = await ax.get(url)
  } catch (error) {
    logger.error("artemisGet::Failed at url:", url, error)
    throw error
  }

  return resp
}
