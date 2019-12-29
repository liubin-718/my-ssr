import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import { getIndexList } from "../store/index"
import styles from './Index.css'
import withStyle from '../withStyle'
// console.log(styles._getCss()) // server端特有的
function Index(props) {
  if(props.staticContext){
    props.staticContext.css.push(styles._getCss())
  }
  const [count, setCount] = useState(1)
  useEffect(() => {
    // 异步数据首页显示
    if (!props.list.length) {
      // 不存在，就客户端获取
      props.getIndexList()
    }
  }, [])
  // => 修改为服务端渲染

  return <div className={styles.container}>
    <h1 className={styles.title}>Hello, {props.title} ! {count}</h1>
    <button onClick={() => setCount(count+1)}>累加</button>
    <hr/>
    <ul>
      {props.list.map(item => {
        return <li key={item.id}>{item.name}</li>
      })}
    </ul>
  </div>
}

// let NewIndex = connect(
//   state => ({ list: state.index.list }),
//   { getIndexList }
// )(withStyle(Index, styles))

// NewIndex.loadData = (store) => {
//   return store.dispatch(getIndexList())
// }
// export default NewIndex


Index.loadData = store => {
  return store.dispatch(getIndexList())
}
export default connect(
  state => ({ list: state.index.list }),
  { getIndexList }
)(withStyle(Index, styles))
