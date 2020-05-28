const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')


var isDev = process.env.NODE_ENV === 'development'


var config;

config = {
  entry: path.resolve(__dirname, '../src/app.js'),
  output: {
    filename: "bundle.[name].[hash:8].js",
    path: path.resolve(__dirname, '../dist/'),
    publicPath:'/public/'
  },
  module:{
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader'
        }
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: isDev ? ['vue-style-loader', 'css-loader'] : ['vue-style-loader', 'css-loader']
      },
      {
        //直接把图片转换成base64代码 减少http请求
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: { //指定loader的操作方式
              limit: 1024,
              //指定输出文件名字
              name: 'resources/[path][name].[hash:8].[ext]',
              esModule: false
            }
          }
        ]
      }
    ],
  },
  plugins: isDev ? [
    new VueLoaderPlugin()
  ] : [new VueLoaderPlugin() ]
}

module.exports = config;
