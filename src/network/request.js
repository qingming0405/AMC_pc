import axios from 'axios'

export function request(config){
  
  const baseURL = '../../../../AMC'
  // const baseURL = 'http://10.100.0.2:8880/AMC'

  const instance = axios.create({
    baseURL,
    timeout: 5000,
    method: 'post',
    headers: {
      "Content-Type": "application/json;charsetset=UTF-8",
      "authorization": sessionStorage.amc_token
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