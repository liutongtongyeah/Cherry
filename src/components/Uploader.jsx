import { useState, useEffect } from 'react'
import { post, getUrl } from './Service'
import { useRef } from 'react'
// import { Button, Input } from ''
export const Uploader = ({rowData}) => {
  // const inputref= useRef()
  // inputref.current.value = ''
  console.log(rowData)
  const [file, setFile] = useState('')
  const [imgurl, setImgurl] =useState()
  // useEffect(() => {
  //   if(file === '') {
  //     inputref.current.value = ''
  //   }
  //   else {
  //     inputref.current.files = file
  //   }
  // }, [file])
  const chooseFile = (e) => {
    e.preventDefault()
    setFile(e.target.files[0])
  }
  const uploadImage = (e) => {
    e.preventDefault()
    console.log(file)
    let formdata = new FormData()
    formdata.append('imageFile', file)
    post('http://206.189.39.185:5031/api/Common/UploadImage', formdata)
    .then((response) => {
      console.log(response)
      setImgurl(response.data)
      let url = '"url":' + '"' + response.data + '"' 
      rowData.onChange(url)
    })
    .catch(error => {
    })
  }
  // style={{display: 'none'}}
  return (
    rowData.rowData.imageUrl?
    <div>
      <img style={{height:40, width:70}} src = {getUrl(rowData.rowData.imageUrl)} />
      <div className='mt-1'>
        <form>
          <input type='file' name='file' id='file' onChange={ (e) => chooseFile(e)} />
        
          <button className='filebutton' onClick={uploadImage}>Upload</button>
        </form>
      </div>
    </div>
    :
    imgurl?
    <div>
      <img style={{height:40, width:70}} src = {imgurl} />
      <div className='mt-1'>
        <form>
          <input type='file' name='file' id='file' onChange={ (e) => chooseFile(e)} />
          <button className='filebutton' onClick={uploadImage}>Upload</button>
        </form>
      </div>
    </div>
    :
    <div className='mt-1'>
      <form>
        <input type='file' name='file' id='file' onChange={ (e) => chooseFile(e)} />
        <button className='filebutton' onClick={uploadImage}>Upload</button>
      </form>  
    </div>
  )
}
export default Uploader
