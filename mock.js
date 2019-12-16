// 单纯的模拟几个接口

const express = require('express')
const app = express()

app.get('/api/course/list', (req, resp) => {
  // 支持跨域调用
  resp.header('Access-Control-Allow-Origin', '*')
  resp.header('Access-Control-Allow-Method', 'GET,POST,PUT,DELETE')
  resp.header('Content-Type', 'application/json;charset=utf-8')
  resp.json({
    code: 0,
    list: [
      { name: 'web全栈', id: 1 },
      { name: 'js高级', id: 2 },
      { name: 'web小白', id: 3 },
      { name: 'Java架构师', id: 4 },
    ]
  })
})
app.get('/api/user/info', (req, resp) => {
  // 支持跨域调用
  resp.header('Access-Control-Allow-Origin', '*')
  resp.header('Access-Control-Allow-Method', 'GET,POST,PUT,DELETE')
  resp.header('Content-Type', 'application/json;charset=utf-8')
  resp.json({
    code: 0,
    data: {
      title: 'kkb',
      best: '大圣',
    }
  })
})

app.listen(9090, () => {
  console.log('mock启动完毕')
})
