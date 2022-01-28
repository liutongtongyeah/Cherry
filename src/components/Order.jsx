import MaterialTable from '@material-table/core'
import React from 'react'
import {useState, useEffect} from 'react'
import {XLSX} from 'xlsx'
import { get } from './Service'

const Order = () => {
  let currentuser
  if(sessionStorage.getItem('user')){
    currentuser = JSON.parse(sessionStorage.user)
  }
  const [columns, setColumns] = useState([
    {title: 'User Id', field: 'userId', type: 'numeric', align: 'left', width: '100px' },
    {title: "Product Id", field: "productId", type: "numeric", align: 'left', width: '120px'},
    { title: "QTY Rate", field: "qty", type: "numeric", align: 'left', width: '120px'},
    { title: "Price Id", field: "price", type: "numeric", align: 'left', width: '100px', },
    { title: "Recipient", field: "recipient", align: 'left', width:'100px' },
    { title: "Recipient Provience", field: "recipientProvience", align: 'left', width: '150px'},
    { title: "recipient City", field: "recipientCity", align: 'left', width: '120px' },
    { title: "Recipient Addr", field: "recipientAddr", align: 'left', width: '200px' },
    { title: "Recipient Number", field: "recipientNumber", align: 'left', width: '120px' },
    { title: "Sender City", field: "senderCity", align: 'left', width: '180px' },
    { title: "Sender Addr", field: "senderAddr", align: 'left', width: '180px' },
    { title: "Sender Number", field: "senderNumber", align: 'left', width: '120px' },
    { title: "Sender Name", field: "senderName", align: 'left', width: '100px' },
    { title: "Status", field: "status", type: "numeric", align: 'left', width:'100px' },
    { title: "Track No", field: "trackNo", align: 'left', width: '150px' },
    { title: "Sender Company Name", field: "senderCompanyName", align: 'left', width:'150px' },
  ])
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let isMounted = true
      get('http://206.189.39.185:5031/api/Order/GetOrderList/userId/status')
      .then((response) => {
        setData(response.data.data)
        setIsLoading(false)
      })

    return () => isMounted =false
  },[])

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
        tableLayout: 'fixed',
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
