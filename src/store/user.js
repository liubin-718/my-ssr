// 首页的逻辑
import axios from 'axios'
// actionType
const GET_LIST = 'INDEX/USER_INFO'

// actionCreator
const changeUserInfo = data => ({
  type: GET_LIST,
  data
})

export const getUserInfo = server => {
  return (dispatch, getState, axiosInstance) => {
    return axios.get('http://localhost:9090/api/user/info1').then(resp => {
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
      //   list: action.list
      // }
      // return newState
      return {
        ...state,
        userInfo: action.data
      }
    default:
      return state
  }
}
