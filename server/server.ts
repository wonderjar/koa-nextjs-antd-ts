// const Koa = require('koa')
// const Router = require('koa-router')
// const bodyParser = require('koa-bodyparser')

import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'

import next from "next"

const port = parseInt((process as any).env.PORT, 10) || 3500;
const dev = process.env.NODE_ENV !== "production";
const nextjs_app = next({ dev })
const handle = nextjs_app.getRequestHandler();

nextjs_app.prepare().then(() => {
    const app = new Koa()
    const router = new Router()

    router.get('/api/hello', async ctx => {
      ctx.body = 'hello'
    })

    router.get('/nextjs', async ctx => {
        await nextjs_app.render(ctx.req, ctx.res, "/index");
        ctx.respond = false;
    })

    router.get('(.*)', async ctx => {
      await handle(ctx.req, ctx.res)
    })
    
    app.use(bodyParser())
    app.use(router.routes())
    
    app.listen(port)
})