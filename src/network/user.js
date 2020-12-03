import {request} from './request'

export function getAllUserInfo() {
  return request({
    url: '/getAllUserInfo'
  })
}