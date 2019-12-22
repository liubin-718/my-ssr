import React from 'react'
import {Route} from 'react-router-dom'
function Status({code, children}){
    return <Route render={({staticContext}) => {
        if(staticContext){
            staticContext.statusCode=code //404
        }
        return children
    }}></Route>
}
function NotFound(props){
    console.log('notFound', props);
    // 渲染了这个组件就给staticContext赋值 statusCode=404
    
    return (
        <Status code={404}>
            <h2>404</h2>
            <img id="img-404" src="/404.jpg" alt=""/>
        </Status>
    )
    
}
export default NotFound