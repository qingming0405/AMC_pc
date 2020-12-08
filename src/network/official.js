import {request} from './request'


export function getAllOfficialAccounts(){
  return request({
    url: '/getAllOfficialAccounts'
  })
}

export function getQRCodeStr(dataP){
  return request({
    url: '/getQRCodeStr',
    data: dataP
  })
}

export function insertAndUpdateOfficialAccounts(officialAccounts){
  return request({
    url: 'insertAndUpdateOfficialAccounts',
    data: officialAccounts
  })
}

export function delOfficialAccountsById(delIds){
  return request({
    url: 'delOfficialAccountsById',
    data: delIds
  })
}