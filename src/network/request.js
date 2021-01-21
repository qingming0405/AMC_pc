import axios from 'axios'

export function request(config){
  // console.log(sessionStorage.amc_token);

  const instance = axios.create({
    baseURL: 'http://127.0.0.1:8880/AMC',
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