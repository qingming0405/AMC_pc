import axios from 'axios'

export function request(config){
  const instance = axios.create({
    baseURL: 'http://10.100.0.2:8880/AMC',
    timeout: 5000,
    method: 'post',
    headers: {
      "authorization":sessionStorage.amc_token//此处放置请求到的用户token
    },
  })

  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err)
  })

  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })

  return instance(config)
}