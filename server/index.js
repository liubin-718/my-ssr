// 这里的node代码，会用babel处理
import path from 'path'
import fs from 'fs'
import React from 'react'
import { renderToString } from 'react-dom/server'
import express from 'express'
import { StaticRouter, matchPath, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { getServerStore } from '../src/store/store'
import routes from '../src/App'
import Header from '../src/component/Header'
import proxy from 'http-proxy-middleware'


const store = getServerStore()
// 启动服务器
const app = express()
app.use(express.static('public'))

app.use(
  '/api',
  proxy({ target: 'http://localhost:9090', changeOrigin: true })
);
function csrRender(res){
  // 读取csr文件，返回
  const filename = path.resolve(process.cwd(), 'public/index.csr.html')
  const html = fs.readFileSync(filename, 'utf-8')
  return res.send(html)
}
app.get('*', (req, resp) => {
  // 获取根据路由渲染出的组件，并拿到loadData方法，获取数据
  // 存储网络请求
  if(req.query._mode == "csr"){ // 9093/?_mode=csr
    console.log('url参数开启csr降级')
    return csrRender(resp)
  }
  // 配置开关开启csr

  // 服务器负载过高 开启csr



  // if(req.url.startsWith('/api')){
  //   //不渲染页面，使用axios转发axios.get
  // }
  const promises = []
  routes.some(route => {
    const match = matchPath(req.path, route)
    // if (match) {
    //   const {loadData} = route.component
    //   if (loadData) {
    //     promises.push(loadData(store))
    //   }
    // }
    //报错的话降级处理  ---比如：把store中index的list接口改为list1
    if (match) {
      const {loadData} = route.component
      if (loadData) {
        // 包装后 规避报错，可以考虑加日志
        const promise = new Promise((resolve,reject) => {
          loadData(store).then(resolve).catch(resolve)
        })
        promises.push(promise)
      }
    }

  })
  // 等待所有网络请求结束后在渲染
  // Promise.all(promises.map(p => p.catch(e => null))).then(() => {
  Promise.all(promises).then(() => {
    const context = {
      css: []
    }
    // const page = <App title="开课吧"></App>
    // 把react组件，解析成html
    const content = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <Header/>
          <Switch>
            {routes.map(route => <Route {...route}/>)}
          </Switch>
        </StaticRouter>
      </Provider>
    )
    console.log('context', context);
    
    if(context.statusCode){
      // 状态切换和页面的跳转
      resp.status(context.statusCode)
    }
    if(context.action=="REPLACE"){
      resp.redirect(301,context.url) //context.url是我们要跳转的目标
    }

    const css = context.css.join('\n')
    // 字符串模板
    resp.send(`
    <html>
      <head>
         <meta charset="utf-8" />
         <title>react ssr</title>
         <style>
          ${css}
         </style>
      </head>
      <body>
         <div id="root">${content}</div>
         <script>
           window.__context = ${JSON.stringify(store.getState())}      
         </script>
         <script src="/bundle.js"></script>
      </body>
    </html>
    `)
  }).catch(() => {
    // 一旦接口出错，就会进入下面的提示。
    // 如何才能让下面的提示只出现在页面的部分区域
    resp.send('报错页面500')
  })

})
app.listen(9093, () => {
  console.log('监听完毕')
})
