import {request} from './request'

export function getAllUserInfo() {
  return request({
    url: '/getAllUserInfo'
  })
}

export function insertAndUpdateUsers(userInfos) {
  return request({
    url: '/insertAndUpdateUsers',
    data: userInfos
  })
}

export function delUserById(delIds) {
  return request({
    url: '/delUserById',
    data: delIds
  })
}

export function updateAlarmUserInfo(dataP){
  return request({
    url: '/updateAlarmUserInfo',
    data: dataP
  })
}