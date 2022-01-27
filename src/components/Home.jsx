import { Link } from 'react-router-dom'

const Home = () => {
  const user = localStorage.getItem('user') || sessionStorage.getItem('user')
  console.log(user)
  return (
    <div className='home'>
      <div className='bg'>
        <div className='hometitle'>
          <img src = 'cherry3.png' className='logo' />
          <h1 className='myh1'>Welcome to Cherry NZ</h1>
        </div>
        {user ? <Link to='/products' className='btn' type='button'>Get started</Link> : <Link to='/Login' className='btn' type='button'>Get started</Link>}
        
      </div>
    </div>
  )
}

export default Home
