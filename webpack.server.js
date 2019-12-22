const path = require('path')
const nodeExternals = require('webpack-node-externals')
// 服务端的webpack
module.exports = {
  target: 'node',
  mode: 'development',
  entry: './server/index.js',
  externals: [nodeExternals()],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
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
        // use:['style-loader','css-loader']
        use:['isomorphic-style-loader',,{
          loader: 'css-loader',
          options: {
            modules: true
          }
        }]
      }
      
    ]
  }
}
