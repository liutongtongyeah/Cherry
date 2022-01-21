import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='home'>
      <div className='bg'>
        <div className='hometitle'>
          <img src = 'cherry3.png' className='logo' />
          <h1 className='myh1'>Welcome to Cherry NZ</h1>
        </div>
        <Link to='/Login' className='btn' type='button'>Get started</Link>
      </div>
    </div>
  )
}

export default Home
