const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const baseConfig = require('./webpack.base.config')
const {client:clientConfig} = require('../appConfig')


const isDev = process.env.NODE_ENV === 'development'

var devServer = {
  port: clientConfig.port,
  host: clientConfig.host,
  hot:true,
}

var defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new VueSSRClientPlugin()
]

var config;

if(isDev){
  config = merge(baseConfig, {
    devServer,
    entry:path.resolve(__dirname, '../src/entry-client.js'),
    output:{
      path: path.resolve(__dirname, '../public'),
      publicPath:'/public/'
    },
    plugins:defaultPlugins.concat([
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ])
  })

}else {
  config = merge(baseConfig, {
    entry:path.resolve(__dirname, '../src/entry-client.js'),
    output:{
      path: path.resolve(__dirname, '../public'),
      publicPath:'/public/'
    },
    plugins:defaultPlugins.concat([])
  })

}

module.exports = config;
