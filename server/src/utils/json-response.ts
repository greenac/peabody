import { RouterContext } from "koa-router"

interface IJsonResponse {
  status: number
  payload?: any
  message?: string
  error?: any
}

const setJsonResponse = (
  ctx: RouterContext,
  status: number,
  payload?: any,
  error?: number,
  message?: string,
): void => {
  const res: IJsonResponse = { status, payload, message, error }
  
  ctx.status = status
  ctx.body = res
}

export default setJsonResponse
