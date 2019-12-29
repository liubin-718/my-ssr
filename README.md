# ssr-camp

# my-ssr

day1

对同构的理解
一套代码, 客户端服务端同时运行
SSR 之后, 客户端接收页面交互及后续显示
服务端客户端 share 同一套组件代码, 只不过 SSR 负责呈现内容, CSR 负责后续交互(事件监听)
前后端两套 webpack 构建
生成前后端两份 bundle
服务端 bundle 用于首屏渲染, 引入方式: 在服务端将内容生成 html 字符串后拼接返回
客户端 bundle 用于渲染后交互, 引入方式: 动态插入 script 标签
前后端代码区别
服务端 启动服务器, 生成首屏 html 内容, 同时将客户端 js 插入 script 标签中
客户端 将内容以 hydrate 注水的方式 组合 SRR CSR 渲染
hydrate 不会重新渲染 dom, 只会挂载一些事件监听等交互内容
npm run dev:server    解析成原生node可支持 
npm run dev:start     启动node server开始页面渲染（另起一个终端执行）
// server端调试   // 把支持jsx语法变成node原生代码
day2

mock 数据
ssr 支持路由
server 端监听所有路由， 通过 req.url 获取路由
StaticRouter 通过 req.url 决定所需渲染路由页面
csr 支持路由
使用 BrowserRouter 变成多页应用
ssr 支持数据流 > 异步数据
使用 redux-thunk 支持异步
useEffect 更新异步数据
day3

服务端异步数据渲染
server 端拿到路由对应的信息, 此处需要的时路由对于的组件, 加载的数据
定义路由表, 自然能拿到对应路由的信息 用到 matchPath
App.js 修改为根据路由表动态生成
取出路由的组件, 通过组件拿到 loadData 方法
loadData 中会调用 dispatch 存放异步数据到 server 端的 store
利用 Promise.all 现将所有需要的数据获取
拿到所有数据后通过之前的方法生成 html 字符串
由于此时已经拿到所有数据, 这些数据需要提供给客户端 store 作为初始数据, 否则页面数据会被客户端清空
数据挂载到 window.**context 上
Server Client 端的 store 不是同一个了
客户端异步数据渲染
初始化 store 时, 先拿到 window.**context 的数据作为初始值
多个数据同时加到 props 里面
day3-作业

降级处理接口报错
方法一: Promise.all 不处理异常, 在 finally 回调返回. 无论是否发生错误均返回, 可以实现降级处理. 缺点: 任何一个 reject 会导致立即返回, 会导致其他还未 resolve 的正常请求被截断, 从而改成走 client 端渲染
方法二: 实现 ES2010 的 Promise.allSettled 方法, 所有请求结束后才返回, 将每个 promise 的结果储存在 results 中
Promise.allSettled 需要扩展支持
没有 Promise.all 的缺点
前后端统一 axios
client 端 store 中获取数据的端口改成 server 端 9000
server 端单独处理 /api 开头的请求, 将请求转发到 mock server 9090 端口, 从而解决跨域问题


http-proxy-middleware  对http请求做一个代理转发  https://github.com/chimurai/http-proxy-middleware
针对express代理的工具                           https://github.com/villadora/express-http-proxy

支持css:
npm install css-loader style-loader -D
node层没有document所以要isomorphic-style-loader
做同构用的 isomorphic-style-loader     npm install isomorphic-style-loader --save-dev
https://github.com/kriasoft/isomorphic-style-loader

错误页面状态码的支持：


下节课讨论 12.19
ssr额外的性能损耗，日常没问题，大流浪期间如何尽可能的规避，让服务稳定

查看connect方法源码   合并静态方法
npm install hoist-non-react-statics --save 


<!-- 使用它写爬虫 -->
npm install puppeteer --save
    比较慢：可以考虑
    // 1.加缓存
    // 2.lru缓存算法



prerender（github）
const prerender = require('prerender')
const server = prerender()
server.start()

prerender-spa-plugin(github)
next.js(github)


作业： 使用next.js+antd+redux实现类似 https://e.xitu.io/
1.查看网页使用的接口（用掘进的接口即可）
2.左侧掘进，右侧GitHub  trending
3.支持切花（不用那么多，有功能就行）