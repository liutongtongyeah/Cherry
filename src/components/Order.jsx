import MaterialTable from '@material-table/core'
import React from 'react'
import {useState, useEffect} from 'react'
import {XLSX} from 'xlsx'

const Order = () => {
  let currentuser
  if(sessionStorage.getItem('user')){
    currentuser = JSON.parse(sessionStorage.user)
  }
  const [columns, setColumns] = useState([
    {title: 'User Id', field: 'userId', type: 'numeric'},
    {title: "Product Id", field: "productId", type: "numeric"},
    { title: "QTY Rate", field: "qty", type: "numeric" },
    { title: "Batch Id", field: "batchId" },
    { title: "Price Id", field: "price", type: "numeric" },
    { title: "Unit Price Rate", field: "unitPrice", type: "numeric" },
    { title: "Po Number", field: "poNumber" },
    { title: "Recipient", field: "recipient" },
    { title: "Recipient Country", field: "recipientCountry" },
    { title: "Recipient Provience", field: "recipientProvience" },
    { title: "recipient City", field: "recipientCity" },
    { title: "Recipient Addr", field: "recipientAddr" },
    { title: "Recipient Number", field: "recipientNumber" },
    { title: "Sender City", field: "senderCity" },
    { title: "Sender Addr", field: "senderAddr" },
    { title: "Sender Country", field: "senderCountry" },
    { title: "Sender Number", field: "senderNumber" },
    { title: "Sender Name", field: "senderName" },
    { title: "Status", field: "status", type: "numeric" },
    { title: "Track No", field: "trackNo" },
    { title: "Billing Company", field: "billingCompany" },
    { title: "Customer Reference No", field: "customerReferenceNo" },
    { title: "Sender Company Name", field: "senderCompanyName" },
    { title: "Payment Method", field: "paymentMethod" },
  ])
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true
    const getData = async () => {
      const tasksFromServer = await fetchData()
      setData(tasksFromServer)
      setIsLoading(false)
    }
    getData()
    return () => isMounted =false;
  },[])
  const fetchData = async() => {
    const res = await fetch('http://206.189.39.185:5031/api/Order/GetOrderList/userId/status')
    const data = await res.json()
    return data.data
  }
  const converData = (header, data) => {
    data.splice(0, 1)
    const rows = []
    data.forEach(row => {
      let rowData = {}
      row.forEach((element, index) => {
        rowData[header[index]] = element
      })
      rows.push(rowData)
    })
    return rows
  }
  const importFile = (event) => {
    XLSX = require('xlsx')
    const file = event.target.files[0]
    const name = file.name.split('.')
    const type = name[name.length-1]

    const reader = new FileReader()
    reader.onload = (e) => {
      const bstr = e.target.result
      const wb = XLSX.read(bstr, {type: 'binary'})
      const wsname = wb.SheetNames[0]
      const ws = wb.Sheets[wsname]
      const data = XLSX.utils.sheet_to_json(ws,{header:1})
      const header = data[0]
      const head = header.map(head => ({ title: head, field: head }));
      setColumns(head)
      setData(converData(header, data))
    }
    if(file!=null){
      if(type == 'xlsx' || type == 'xls' || type == 'csv'){
        reader.readAsBinaryString(file)
      }
      else{
        alert('Invalid file!')
      }
    }
    else{
      setData()
      setColumns()
    }
  }

  const ExportExcel = () => {
    let headers = []
    columns.map((head, index) => {
      headers[index] = head.title
    })
    console.log(headers)
    XLSX = require('xlsx')
    const ws = XLSX.utils.book_new()
    XLSX.utils.sheet_add_aoa(ws, [headers])
    XLSX.utils.sheet_add_json(ws, data, {origin:'A2', skipHeader: true})
    const wb = {Sheets: {'data':ws}, SheetNames: ['data']}
    XLSX.write(wb, {bookType: 'xlsx', type: 'binary'})
    XLSX.writeFile(wb, 'data.xlsx')
  }

  return (
    <div className='mt-3'>
    <div className='text-nowrap ms-3 mb-2'>Import csv, xlsx or xlx files here: <input type='file' className='ms-3' onChange={importFile}/></div>
    <MaterialTable
      title=''
      isLoading={isLoading}
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
        exportMenu: [{
          label: 'Export to Excel',
          exportFunc:() => ExportExcel()
        }]
      }}

    />
    </div>
  )
}

export default Order
