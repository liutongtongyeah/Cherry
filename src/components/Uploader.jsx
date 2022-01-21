import { useState } from 'react'
import axios from 'axios'
export const Uploader = ({setImage}) => {
  const [file, setFile] = useState()
  let imageurl
  const instance = axios.create({
    baseURL: 'http://206.189.39.185:5031'
  })
  instance.defaults.headers.post["Content-Type"] = "application/json"
  const create = (url, data) => {
    return new Promise((resolve, reject) => {
      instance({
        method: "post",
        url,
        data,
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }

  const chooseFile = (e) => {
    e.preventDefault()
    setFile(e.target.files[0])
  }
  const uploadImage = (e) => {
    e.preventDefault()
    console.log(file)
    let formdata = new FormData()
    formdata.append('imageFile', file)
    create('http://206.189.39.185:5031/api/Common/UploadImage', formdata)
    .then((response) => {
      console.log(response)
      imageurl=response.data
      setImage(imageurl)
    })
    .catch(error => {
      // console.log(error)
    })
  }
  return (
    imageurl?
    <img style={{height:40, width:70}} src = {imageurl} />
    // <input type = 'text' defaultValue={image} />
    // defaultValue
    :
    <div>
      <input type='file' name='file' id='file' style={{display: 'none'}} onChange={ e => chooseFile(e)} />
      <label htmlFor='file'>Choose file</label>
      <button onClick={uploadImage}>Upload</button>
    </div>
  )
}
