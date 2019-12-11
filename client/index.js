import React from 'react'
import ReactDom from 'react-dom'
import App from '../src/App'

//不做渲染，只是绑定监听
ReactDom.hydrate(App, document.getElementById("root"))
