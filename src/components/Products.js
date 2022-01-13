import MaterialTable from 'material-table'
import {useState, useEffect, useRef} from 'react'
import { Button, Container } from '@material-ui/core'
const Products = () => {
    const getUrl = (imageUrl) => {
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
  let currentuser
  if(localStorage.getItem('user')){
    currentuser = JSON.parse(localStorage.user)
  }
  else if(sessionStorage.getItem('user')){
    currentuser = JSON.parse(sessionStorage.user)
  }
  else{
    currentuser = null
  }
  console.log(currentuser)
  const [pic, setPic] = useState()
  const ref = useRef(pic)
  const uploadImage = (e) => {
    e.preventDefault()
    setPic(e.target.files[0])
    console.log(e.target.files[0])
    ref.current=e.target.files[0]
  }

  const postImage = async(e) => {
    e.preventDefault()
    const imgfile = ref.current
    // const imgfile = pic
    const formData = new FormData()
    formData.append('imgfile', imgfile)
    console.log(formData.get('imgfile'))

    await fetch('http://206.189.39.185:5031/api/Common/UploadImage', {
    method: 'post',

    body:formData
   })
  }
  const [columns, setColumns] = useState([
  {
    title: 'Product Image', field: 'imageUrl', 
      render: rowData => (
        <img
          style={{height:40, width:70}}
          src={getUrl(rowData.imageUrl)}
        />

      ),
      editComponent: props => (
        <>
        <form method='post' encType='multipart/form-data'>
          <label htmlFor='upload'>
            <input accept='image/*' id='upload' multiple type='file' style={{display:'none'}} onChange={e=>uploadImage(e)}/>
            <Button variant='outlined' component='span' size='small'>Select</Button>
          </label>
        </form>
        <Button id='submit' type='submit' variant='outlined' component='span' size='small' onClick={postImage}>Submit</Button>
        </>
      )
    },
  {
    title: 'Product Name', field: 'productName',
      editComponent: props => (
        <input
          type='text'
          
          onChange={e => props.onChange(e.target.value)}
        />
      ),
      cellStyle: {
        whiteSpace: 'nowarp'
      }
    },
    {title: 'Product Code', field: 'productCode',},
    {title: 'RRP Price(CNY)', field: 'priceRrp', type: 'numeric'},
    {title: 'Shopify Price(CNY)', field: 'priceShopify', type: 'numeric'},
    {title: 'Agent Price(CNY)', field: 'priceAgent', type: 'numeric'},
    {title: '1212 Price(CNY)', field: 'price1212', type: 'numeric'},
    {title: 'Special Price(CNY)', field: 'priceSpecial', type: 'numeric'},
    {title: 'Weight(KG)', field: 'weight', type: 'numeric'},
    {title: 'Package QTY', field: 'packageQty', type: 'numeric'},
    {title: 'ProductId', field: 'productId', type: 'numeric'},
  ])
  const [data, setData] = useState([])
  useEffect(() => {
    const getData = async () => {
      const tasksFromServer = await fetchData()
      setData(tasksFromServer)
    }
    getData()
  },[])
  const fetchData = async() => {
    const res = await fetch('http://206.189.39.185:5031/api/Product')
    const data = await res.json()
    return data.data
  }
  const postData = async(newData) => {

     await fetch('http://206.189.39.185:5031/api/Product/ProductCreate', {
      method: 'Post',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(newData),
    })
  }

  const addProduct = async(newData, resolve) => {
    const product = {
      "productName": newData.productName,
      "priceRrp": parseInt(newData.priceRrp),
      "priceShopify": parseInt(newData.priceShopify),
      "priceAgent": parseInt(newData.priceAgent),
      "price1212": parseInt(newData.price1212),
      "priceSpecial": parseInt(newData.priceSpecial),
      "desciption": newData.desciption,
      "weight": parseInt(newData.weight),
      "packageQty": parseInt(newData.packageQty),
      "productId": parseInt(newData.productId),
      "imageUrl": `{"url":"${newData.imageUrl}"}`
    }
    if(pic){
      await postImage(pic)
    }
    await postData(product)
    const addedProduct = [...data, product]
    setData(addedProduct)
    resolve()
  }
  const updateProduct = async(newData, oldData, resolve) => {
    const res = await fetch('http://206.189.39.185:5031/api/Product/ProductUpdate', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify(newData),
    })
    const id = oldData.productId
    setData(data.map((product) => product.productId == id? newData : product))
    resolve()
  }
  const deleteData = async(id) => {
    const res = await fetch(`http://206.189.39.185:5031/api/Product/${id}`, {
      method: 'DELETE',
    })
  }
  const deleteProduct = async(oldData, resolve) => {
    const id = oldData.productId
    await deleteData(id)
    setData(data.filter((product) => product.productId !== id))
    resolve()
  }
  return (
    <MaterialTable
      title=''
      columns={columns}
      data={data}
      options={{
        rowStyle: {
          fontSize: '8px',
          whiteSpace: 'nowarp'
        },
        headerStyle: {
          fontSize: '8px',
          whiteSpace: 'nowarp',
        },
        actionsColumnIndex: -1,
        addRowPosition: "first",
      }}
      editable={{
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
            addProduct(newData, resolve)
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            updateProduct(newData, oldData, resolve)
          }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            deleteProduct(oldData, resolve)
          }),
      }}
    />
  )
}

export default Products
