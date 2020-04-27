import Router, { RouterContext } from "koa-router"
import { getActors } from "../handlers/actor"
import logger from "../logger/logger"
import jsonResponse from "../utils/json-response"


const router = new Router({ prefix: "/api/actor" })

router.get("/", async (ctx: RouterContext, next: Function) => {
  logger.log("/api/actor::getting all actors...")

  let actors: Buffer
  try {
    actors = await getActors()
  } catch (error) {
    logger.error("/api/actor::Failed to retrieve actors with error:", error)
    jsonResponse(ctx, 500)
    return next()
  }

  logger.log("Got data from artemis for all actors:", actors)

  jsonResponse(ctx, 200, { actors })

  next()
})

router.get("/:id", async (ctx: RouterContext, next: Function) => {

})

export default router
