const express = require('express')
// 针对/api开头的请求
const axios = require('axios')
const app = express()
const puppeteer = require('puppeteer')

async function test(){
    console.log('截图');
    
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://kaikeba.com/')
    await page.screenshot({path: 'kaikeba.png'})
    await browser.close()
}



// test()
const urlCache = {}
app.get('*', async function(req,res){
    console.log(req.url)
    // 遍历所有路由，都写成html文件或者都缓存上  prerender
    // 1.加缓存
    // 2.lru缓存算法
    if(urlCache[url]){
        return res.send(urlCache[url])
    }
    if(req.url == "/favicon.ico"){
        return res.send({code: 0})
    }
    const url = 'http://localhost:9093' + req.url
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url, { //异步请求
        waitUntil:['networkidle0']
    })
    const html = await page.content()
    urlCache[url] = html
    console.log('html ', html)
    res.send(html)
})

app.listen(8081, () => {
    console.log('ssr sever start');
    
})