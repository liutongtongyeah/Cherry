import axios from 'axios'

const baseurl = process.env.REACT_APP_BASE_URL
console.log(baseurl)
const instance = axios.create({
  baseURL: baseurl,
  headers: {'Content-Type': 'application/json'}
})
let currentuser
if(localStorage.getItem('user')){
  currentuser = localStorage.getItem('user')
}
else if(sessionStorage.getItem('user')){
  currentuser = sessionStorage.getItem('user')
}
instance.interceptors.request.use(request => {
  if(currentuser)
  { request.headers.common.Authorization = `Bearer ${currentuser}` }
  return request
})
export const get = (url, data) => {
  return new Promise((resolve, reject) => {
    instance({
      method: 'get',
      url,
      data,
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

export const post = (url, data) => {
  return new Promise((resolve, reject) => {
    instance({
      method: 'post',
      url,
      data,
    }).then(response => {
      console.log(response)
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

export const put = (url, data) => {
  return new Promise((resolve, reject) => {
    instance({
      method: 'put',
      url,
      data,
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

export const remove = (url, data) => {
  return new Promise((resolve, reject) => {
    instance({
      method: 'delete',
      url,
      data,
    }).then(response => {
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

export const getUrl = (imageUrl) => {
  var url = null
  if(imageUrl !== null){
    const url1 = imageUrl.split('"url":')[1]
    if(url1){
      url = url1.split('"')[1]
    }
      
  }
  else{
    url = null
  }
  return url
}