import {request} from './request'

export function getAllUserInfo() {
  return request({
    url: '/getAllUserInfo'
  })
}

export function insertAndUpdateUsers(userInfos) {
  return request({
    url: '/insertAndUpdateUsers',
    params: {
      userInfos
    }
  })
}

export function delUserById(delIds) {
  return request({
    url: '/delUserById',
    params:{
      delIds
    }
  })
}