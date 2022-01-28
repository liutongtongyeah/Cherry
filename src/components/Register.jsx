import { Link } from 'react-router-dom'
import { useState } from 'react'
import { post } from './Service'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [userName, setUsername] = useState([])
  const [email, setEmail] = useState([])
  const [password, setPassword] = useState([])
  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    const name = data.get('name')
    const pwd = data.get('password')
    const Email = data.get('email')
    setUsername(name)
    setEmail(Email)
    setPassword(pwd)
    post('http://206.189.39.185:5031/api/User/UserRegister', {userName, email, password})
    .then(response => {
      alert('Signup successful')
      navigate('/login')
    })
    .catch(error => {
      alert('Signup failed')
      window.location.reload()
    })
  }

  return(
    <div className='myLogin'>
      <div className='mycontainer'>
        <form onSubmit={handleSubmit} id='myForm' className='myform'>
        <h1 className='title'>Registration</h1>
          <div className='field'>
            <label htmlFor='name' className='mylabel'>Username </label>
            <input type='text' name='name' id='name' className='myinput' autoComplete='off' required></input>
          </div>
          <div className='field'>
            <label htmlFor='email' className='mylabel'>Email </label>
            <input type='text' name='email' id='email' className='myinput' autoComplete='off' required></input>
          </div>
          <div className='field'>
            <label htmlFor='pwd' className='mylabel'>Password </label>
            <input type='password' name='password' id='password' className='myinput' autoComplete='off' required></input>
          </div>
          <div className='mybutton'>
            <button className='btn' type='submit'>Signup</button>
          </div>
          <p className='paragraph1'>Already have an account?</p>
          <Link to='/Login' className='link2'>Login</Link>
        </form>
      </div>
    </div>
  )
}

export default Register
