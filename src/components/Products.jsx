import MaterialTable from '@material-table/core'
import { Button, Tooltip } from '@material-ui/core'
import {useState, useEffect} from 'react'
import { Uploader } from './Uploader'
import axios from 'axios'

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
  // let image
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get('http://206.189.39.185:5031/api/Product')
    .then((response) => {
      setData(response.data.data)
    })

  },[])
  const [image, setImage] = useState()
  const [columns, setColumns] = useState([
  {
    title: 'Product Image', field: 'imageUrl', 
      render: rowData => (
        <img
          style={{height:40, width:70}}
          src={getUrl(rowData.imageUrl)}
        />
      ),
      editComponent: props => {
        
        return(<Uploader setImage={setImage} />)
        }
      
    },
  {
    title: 'Product Name', field: 'productName', initialEditValue:'cherry'
    },
    {title: 'Product Code', field: 'productCode'},
    {title: 'RRP Price(CNY)', field: 'priceRrp', type: 'numeric', align: 'left'},
    {title: 'Shopify Price(CNY)', field: 'priceShopify', type: 'numeric', align: 'left'},
    {title: 'Agent Price(CNY)', field: 'priceAgent', type: 'numeric', align: 'left'},
    {title: '1212 Price(CNY)', field: 'price1212', type: 'numeric', align: 'left'},
    {title: 'Special Price(CNY)', field: 'priceSpecial', type: 'numeric', align: 'left'},
    {title: 'Weight(KG)', field: 'weight', type: 'numeric', align: 'left'},
    {title: 'Package QTY', field: 'packageQty', type: 'numeric', align: 'left'},
    {title: 'ProductId', field: 'productId', type: 'numeric', align: 'left'},
  ])


  const addProduct = (newData, resolve, reject) => {
    console.log(image)
    if(!newData.productId){
      newData.productId = 0
    }
    if(!newData.productName){
      newData.productName = null
    }
    if(!newData.priceRrp){
      newData.priceRrp = 0
    }
    if(!newData.priceShopify){
      newData.priceShopify = 0
    }
    if(!newData.priceAgent){
      newData.priceAgent = 0
    }
    if(!newData.price1212){
      newData.price1212 = 0
    }
    if(!newData.priceSpecial){
      newData.priceSpecial = 0
    }
    if(!newData.desciption){
      newData.desciption = null
    }
    if(!newData.weight){
      newData.weight = 0
    }
    if(!newData.packageQty){
      newData.packageQty = 0
    }

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
      "imageUrl": `{"url":"${image}"}`
    }
    console.log(product.imageUrl)
    axios.post('http://206.189.39.185:5031/api/Product/ProductCreate', product)
    .then((response) => {
      console.log(response)
      const addedProduct = [...data, product]
      setData(addedProduct)
      resolve()
    })
    .catch(error => {
      console.log(error)
      resolve()
    })
  }
  const updateProduct = (newData, oldData, resolve) => {
    if(image) {
      newData.imageUrl=`{"url":"${image}"}`
    }
    axios.put('http://206.189.39.185:5031/api/Product/ProductUpdate', newData)
    .then((response) => {
      const id = oldData.productId
      setData(data.map((product) => product.productId == id? newData : product))
      resolve()
    })
    .catch((error) => {
      alert('Update failed!')
      console.log(error)
      resolve()
    })
  }

  const deleteProduct = async(oldData, resolve) => {
    const id = oldData.productId
    axios.delete(`http://206.189.39.185:5031/api/Product/${id}`)
    .then((response) => {
      setData(data.filter((product) => product.productId !== id))
      resolve()
    })
    .catch((error) => {
      alert('Delete failed!')
      console.log(error)
    })
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
          fontSize: '12px',
          whiteSpace: 'nowarp',
        },
        actionsColumnIndex: -1,
        addRowPosition: "first",
      }}

      editable={{
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
            addProduct(newData, resolve, reject)
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
