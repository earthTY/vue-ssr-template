const path = require('path');
const axios = require('axios');
const Router = require('koa-router');
const { createBundleRenderer } = require('vue-server-renderer');
const webpack = require('webpack');
const MemoryFS = require('memory-fs');
const fs = require('fs');
const serverConfig = require('../../build/webpack.server.config');
const appConfig = require('../../appConfig');



const serverCompiler = webpack(serverConfig);
const mfs = new MemoryFS();
serverCompiler.outputFileSystem = mfs;

let serverBundle, clientManifest, renderer;



const getServerBundle = ()=> {
  return new Promise((resolve, reject) => {
    serverCompiler.run((err, status)=>{
      resolve()
    })
  })
}

const getServerRenderer = async ()=> {
  if(!serverBundle){
    await getServerBundle()
    let bundlePath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json');
    serverBundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'));
  }

  if(!clientManifest){
    const clientHost = appConfig.client.host;
    const clientPort = appConfig.client.port;
    let {data} = await axios.get(`http://${clientHost}:${clientPort}/public/vue-ssr-client-manifest.json`);
    clientManifest = data
  }

  let template = fs.readFileSync(path.resolve(__dirname, '../server.template.html'), 'utf-8')

  return createBundleRenderer(serverBundle, {
    clientManifest,
    template,
    runInNewContext: false
  })

}

const pageRouter = new Router();

pageRouter.get("*", async ctx => {
  if(!renderer){
    ctx.body = '数据正在加载，请稍等！';
    renderer = await getServerRenderer();
    return ;
  }



  let context = {
    url:ctx.url
  }
  let appString = await renderer.renderToString(context)

  ctx.body = appString
})

module.exports = pageRouter;
