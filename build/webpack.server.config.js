const path = require('path');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const baseConfig = require('./webpack.base.config')


module.exports = merge(baseConfig, {
  entry: path.join(__dirname, '../src/entry-server.js'),

  target: 'node',

  devtool: 'source-map',

  output: {
    path: path.join(__dirname, '../server-build'),
    libraryTarget: 'commonjs2',
  },

  externals: nodeExternals({
    whitelist:/\.(css|styl)$/
  }),

  plugins:[
    new VueSSRServerPlugin()
  ]
})
