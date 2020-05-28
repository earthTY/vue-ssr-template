const Router = require('koa-router');
const send = require('koa-send');
const path = require('path');
const axios = require('axios')

const staticRouter = new Router({ prefix: '/public' });

staticRouter.get('/*', async ctx => {
    await send(ctx, ctx.path, { root: path.join(__dirname, '../../') });

   /*const {data} = await axios.get(`http://127.0.0.1:8000${ctx.path}`)
   ctx.body = data

  console.log('staticRouter')*/
})

module.exports = staticRouter;
