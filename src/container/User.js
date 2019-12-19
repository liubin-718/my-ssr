import React from 'react'
import {connect} from 'react-redux'
import {getUserInfo} from '../store/user'
import {Redirect} from 'react-router-dom'
import store from '../store'
function User(props){
    // 比如登录逻辑
    // 没有登录跳转到登录页，判断cookie 判断localStorage
    console.log('props.userinfo',props.userinfo)
    return <Redirect to="/about"></Redirect> // 重定向到登录页面
    // return (
    //     <div>
    //         <h2>你好{props.userinfo.name}!, 你们中best：{props.userinfo.best}</h2>
    //     </div>
    // )
}
User.loadData = (store) => {
    return store.dispatch(getUserInfo())
}

export default connect(
    state => {
        return {
            userinfo: state.user.userinfo
        }
    }
)(User)