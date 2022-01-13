const Form = ({product}) => {
  return (
    <div className='mycontainer'>
      {/* <ul className='myform'>
        <li className='form-item'>Product Image</li>
        <li className='form-item'>Product Name</li>
      </ul> */}
      <div className='row'>
        <div className='col'>
          <p>Product Image</p>
        </div>
        <div className='col'>
          <p>Product Name</p>
        </div>
        <div className='col'>
          <p>Product code</p>
        </div>
        <div className='col'>
          <p>RRP Price(CNY)</p>
        </div>
        <div className='col'>
          <p>Shopify Price(CNY)</p>
        </div>
        <div className='col'>
          <p>Agent Price(CNY)</p>
        </div>
        <div className='col'>
          <p>1212 Price(CNY)</p>
        </div>
        <div className='col'>
          <p>Special Price</p>
        </div>
        <div className='col'>
          <p>Size(mm)</p>
        </div>
        <div className='col'>
          <p>Weight(KG)</p>
        </div>
      </div>
    </div>
  )
}

export default Form
