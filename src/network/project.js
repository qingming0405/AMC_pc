import { from } from "core-js/fn/array";
import {request} from './request'

export function getProjectInfo(curUser){
  return request({
    url: '/getProjectInfo',
    data: curUser
  })
}

export function insertAndUpdateProjects(projects){
  return request({
    url: '/insertAndUpdateProjects',
    data: projects
  })
}

export function delProjectByIds(delIds){
  return request({
    url: '/delProjectByIds',
    data: delIds
  })
}