import {request} from './request'

export function getUserPrivilege(dataP){
  return request({
    url: '/getUserPrivilege',
    data: dataP
  })
}

export function updateUserPri(userRights){
  return request({
    url: '/updateUserPri',
    data: userRights
  })
}