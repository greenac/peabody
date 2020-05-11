import Router, { RouterContext } from "koa-router"
import logger from "../logger/logger"


const router = new Router()

router.get("/", async (ctx: RouterContext, next: Function) => {
  logger.log("in base route. Just saying hi")

  ctx.body = "Hello from peabody! ;)"
})

export default router
