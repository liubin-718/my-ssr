// 这里的node代码，会用babel处理
import React from 'react'
import { renderToString } from 'react-dom/server'
import express from 'express'
import { StaticRouter, matchPath, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { getServerStore } from '../src/store/store'
import routes from '../src/App'
import Header from '../src/component/Header'


const store = getServerStore()
// 启动服务器
const app = express()
app.use(express.static('public'))

app.get('*', (req, resp) => {
  // 获取根据路由渲染出的组件，并拿到loadData方法，获取数据
  // 存储网络请求
  const promises = []
  routes.some(route => {
    const match = matchPath(req.path, route)
    if (match) {
      const {loadData} = route.component
      if (loadData) {
        promises.push(loadData(store))
      }
    }
  })
  // 等待所有网络请求结束后在渲染
  Promise.all(promises.map(p => p.catch(e => null))).then(() => {
    // const page = <App title="开课吧"></App>
    // 把react组件，解析成html
    const content = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url}>
          <Header/>
          {routes.map(route => <Route {...route}/>)}
        </StaticRouter>
      </Provider>
    )
    // 字符串模板
    resp.send(`
    <html>
      <head>
         <meta charset="utf-8" />
         <title>react ssr</title>
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
