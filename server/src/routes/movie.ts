import Router, {RouterContext} from "koa-router"
import path from "path"
import logger from "../logger/logger"
import jsonResponse from "../utils/json-response"
import { unknownMovies } from "../handlers/movie"

const EndpointBase = "/api/movie"

const router = new Router({ prefix: "/api/movie"})

router.get("/all", (ctx: RouterContext, next: Function) => {
  ctx.body = "movie base"
})

router.get("/find/:id", (ctx: RouterContext, next: Function) => {
  ctx.body = "movie base"
})

router.get("/unknown", async (ctx: RouterContext, next: Function) => {
  const p = path.join(EndpointBase, "unknown")
  logger.log(`${p}::getting all actors...`)

  let movies: Buffer
  try {
    movies = await unknownMovies()
  } catch (error) {
    logger.error(`${path}::Failed with error: ${error}`)
    jsonResponse(ctx, 500)
    return next()
  }

  logger.log("Got data from artemis for # of unknown movies:", movies.length)

  jsonResponse(ctx, 200, { movies })

  next()
})

export default router
