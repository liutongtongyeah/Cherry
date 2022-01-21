import { Link } from "react-router-dom"
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
          <a className='my-navbar-brand' href='#'>Cherry NZ</a>
          <div className='collapse navbar-collapse'>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <a className='my-nav-link' href='/products' role='button'>Products</a>
              </li>
              <li className='nav-item'>
                <a className='my-nav-link' href='/Order' role='button'>Orderlist</a>
              </li>
            </ul>
            <ul className='navbar-nav ms-auto'>
            `<li className='nav-item me-3'>
                {currentuser ? <a className='my-nav-link' href='#' role='button'>{currentuser.userName}</a> : <a className='my-nav-link' href='#' role='button'>Login</a>}
              </li>
              <li className='nav-item me-3'>
                <Link className='my-nav-link' to='/login' role='button' onClick={logout}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header
