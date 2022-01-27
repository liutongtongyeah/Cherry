import { Link } from 'react-router-dom'

const Header = () => {
  let currentuser
  if(localStorage.getItem('user')){
    currentuser = JSON.parse(localStorage.user)
  }
  else if(sessionStorage.getItem('user')){
    currentuser = JSON.parse(sessionStorage.user)
  }
  const logout = () => {
    localStorage.removeItem('user')
    sessionStorage.removeItem('user')
    localStorage.removeItem('date')
  }
  return (
    <div>
      <nav className='navbar navbar-expand-sm navbar-bg'>
        <div className='container-fluid'>
          <p className='my-navbar-brand'>Cherry NZ</p>
          <div className='collapse navbar-collapse'>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <Link to = '/products' className='my-nav-link' role='button'>Products</Link>
              </li>
              <li className='nav-item'>
                <Link to = '/order' className='my-nav-link' role='button'>Orderlist</Link>
              </li>
            </ul>
            <ul className='navbar-nav ms-auto'>
              <li className='nav-item me-3'>
                <p className='user'>{currentuser.userName}</p>
                {/* {currentuser ? <a className='my-nav-link' href='#' role='button'>{currentuser.userName}</a> : <a className='my-nav-link' href='#' role='button'></a>} */}
              </li>
              <li className='nav-item me-3'>
                <Link className='my-nav-link' to='/' role='button' onClick={logout}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header
