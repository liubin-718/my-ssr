// 首页的逻辑
import axios from 'axios'
// actionType
const GET_LIST = 'INDEX/USER_INFO'
const GET_INFO = 'USER/USER_INFO'

// actionCreator
const changeUserInfo = data => ({
  type: GET_INFO,
  userinfo
})

export const getUserInfo = server => {
  return (dispatch, getState, axiosInstance) => {
    return axios.get('/api/user/info').then(resp => {
      const { data } = resp.data
      console.log('userInfo：', data)
      dispatch(changeUserInfo(data))
    })
  }
}

const defaultState = {
  userInfo: {}
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_LIST:
      // const newState = {
      //   ...state,
      //   list: action.userinfo
      // }
      // return newState
      case GET_INFO:
      return {
        ...state,
        userInfo: action.userinfo
      }
    default:
      return state
  }
}
