import Router, {RouterContext} from "koa-router"

const router = new Router({ prefix: "/movie" })

router.get("/", (ctx: RouterContext, next: Function) => {

})

router.get("/:id", (ctx: RouterContext, next: Function) => {

})

export default router