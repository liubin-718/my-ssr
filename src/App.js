import React, {useState} from 'react'
function App(props){
    const [count, setCount] = useState(1)
    return <>
                <h1>我的第一个react ssr, {props.title}</h1>
                <p>如果你喜欢，请点赞，当前已经获得star： {count} 🌟</p>
                <button onClick={()=>setCount(count+1)}>点赞👍</button>
           </>
} 
export default <App title="kkb"><App>;
