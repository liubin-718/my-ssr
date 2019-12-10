const path = require('path')
const nodeExternals = require('webpack-node-externals')
// 服务端webpack
module.exports = {
    target: "node",
    mode: "development",
    entry:'./server/index.js',
    externals:[nodeExternals()],// 规避node层面一些代码
    output:{
        filename: 'bundle.js',
        path:path.resolve(__dirname, 'build')
    },
    module:{
        rules:[
            {//支持babel
                test:/\.js$/,
                // 支持import 支持jsx
                loader:'babel-loader',
                exclude:/node_modules/,
                options:{
                    presets:['@babel/preset-react', ['@babel/preset-env']] // 支持jsx、最新js语法
                }
            }
        ]
    }
}