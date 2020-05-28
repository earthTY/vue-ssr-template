const Router = require('koa-router');
const path= require('path')
const fs = require('fs')
const { createBundleRenderer } = require('vue-server-renderer');

//创建render器
//1.获取serverBundle
let serverBundle = require('../../server-build/vue-ssr-server-bundle.json');
//2.获取客户端数据清单
let clientManifest = require('../../public/vue-ssr-client-manifest.json');
//3.获取模板
let template = fs.readFileSync(path.resolve(__dirname, '../server.template.html'), 'utf-8')
//4.创建renderer
let renderer = createBundleRenderer(serverBundle, {
  template,
  clientManifest,
  runInNewContext: false
})


const pageRouter = new Router();

pageRouter.get("*", async ctx => {
  let context = {
    url:ctx.url
  }

  let appString = await renderer.renderToString(context)

  ctx.body = appString
})

module.exports = pageRouter;
