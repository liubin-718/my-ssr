const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const nodeExternals = require('webpack-node-externals')
// 客户端的webpack
module.exports = {
  // target: 'node',
  mode: 'development',
  // 客户端入口
  entry: './client/index.js',
  // externals: [nodeExternals()],
  // 客户端输出
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  plugins:[
    new HtmlWebpackPlugin({
      filename: 'index.csr.html',
      template: 'src/index.csr.html',
      inject: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        // 才能支持import、支持jsx
        loader: 'babel-loader',
        exclude: '/node_modules',
        // babel配置
        options: {
          presets: [
            '@babel/preset-react', // 支持jsx
            ['@babel/preset-env'] // 支持最新的js语法
          ]
        }
      },
      {
        test:/\.css$/,
        use:['style-loader',{
          loader: 'css-loader',
          options: {
            modules: true
          }
        }]
      }
    ]
  }
}
