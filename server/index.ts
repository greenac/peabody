require("dotenv").config()

import run from "./src/app"
import logger from "./src/logger/logger"

run().catch(error => logger.error("App failed with error:", error))
