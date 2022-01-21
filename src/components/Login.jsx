import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const userLogin = async (user) => {
   const res = await fetch('http://206.189.39.185:5031/api/User/UserLogin', {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    const data = res.json()
    return data
  }

  let check = false
  const handleCheckbox = (event) =>{
    if(event.target.checked){
      check = true
    }
    else{
      check = false
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    const username = data.get('name')
    const password = data.get('password')
    userLogin({username, password})
    .then((response) => {
      console.log(response)
      if(response.data && response.data.token){
        if(check){
          const date = new Date()
          const expiryDate = date.getTime() + 7 * 24 * 60 * 60 * 1000
          localStorage.setItem('date', JSON.stringify(expiryDate))
          localStorage.setItem('user', JSON.stringify(response.data))
          sessionStorage.setItem('user', JSON.stringify(response.data))
        }
        else{
          sessionStorage.setItem('user', JSON.stringify(response.data))
        }

        navigate('/products', {replace:true})
        window.location.reload()
      }
      else{
        alert ('Wrong username or password!')
      }
    })
  }

  return (
    <div className='myLogin'>
      {
      // location.pathname === '/login' && 
      (
        <div className='mycontainer'>
          <form onSubmit={handleSubmit} id='myForm' className='myform' autoComplete='off'>
            <h1 className='title'>Login</h1>
            <div className='field'>
              <label htmlFor='name' className='mylabel'>Username </label>
              <input type='text' name='name' id='name' className='myinput' required></input>
            </div>
            <div className='field'>
              <label htmlFor='pwd' className='mylabel'>Password </label>
              <input type='password' name='password' id='password' className='myinput' required></input>
            </div>
            <div className='mycheckbox'>
              <input type='checkbox' id='rememberme' name='checkbox' onChange={handleCheckbox}></input>
              <label htmlFor='rememberme'>Remember me</label>
            </div>

            <div className='mybutton'>
              <button className='btn' type='submit'>Login</button>
            </div>
            <p className='paragraph1'>Don't have an account?</p>
            <Link to='/Register' className='link2'>Signup</Link>
          </form>
        </div>
      )}
    </div>
  )
}

export default Login
