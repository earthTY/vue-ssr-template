const path = require('path');
const Koa = require('koa');
const staticRouter = require('./router/static');
const {server:serverConfig} = require('../appConfig')


const isDev = process.env.NODE_ENV === 'development'; //定义开发模式

const app = new Koa();

app.use(staticRouter.routes()).use(staticRouter.allowedMethods()); //自定义静态routes

let pageRouter;



if(isDev){
  pageRouter = require('./router/dev-ssr');
}else {
  pageRouter = require('./router/prod-ssr');
}

app.use(pageRouter.routes()).use(pageRouter.allowedMethods());


console.log(process.env.HOST, process.env.PORT)

const HOST = process.env.HOST || serverConfig.host; //定义服务ip
const PORT = process.env.PORT || serverConfig.port; //定义服务端口



app.listen(PORT, HOST, function () {
  console.log('端口已开启')
})
