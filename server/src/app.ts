import Koa from "koa"
import logger from "./logger/logger"
import actorRouter from "./routes/actor"
import movieRouter from "./routes/movie"
import serverConfig from "./config/server"

const run = async (): Promise<void> => {
  const app = new Koa()

  app.use(actorRouter.routes())
  app.use(movieRouter.routes())

  app.listen(serverConfig.port, () => {
    logger.log("Running peabody server on:", serverConfig.port)
  })
}

export default run
