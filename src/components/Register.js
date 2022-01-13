import { Link } from "react-router-dom"
import { useState } from "react"
const Register = () => {
  const [userName, setUsername] = useState([])
  const [email, setEmail] = useState([])
  const [password, setPassword] = useState([])
  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    const name = data.get('name')
    const pwd = data.get('password')
    const Email = data.get('email')
    setUsername(name)
    setEmail(Email)
    setPassword(pwd)
    create({userName, email, password})
  }
  const create = async (user) => {
    console.log(user)
    const res = await fetch('http://206.189.39.185:5031/api/User/UserRegister', {
      method: 'Post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
  }
  return(
    <div className='mycontainer'>
      <form onSubmit={handleSubmit} id='myForm' className='myform'>
        <div className='field'>
          <label htmlFor='name' className='mylabel'>Username: </label>
          <input type='text' name='name' id='name' placeholder='username' required></input>
        </div>
        <div className='field'>
          <label htmlFor='email' className='mylabel'>Email: </label>
          <input type='text' name='email' id='email' placeholder='email' required></input>
        </div>
        <div className='field'>
          <label htmlFor='pwd' className='mylabel'>Password: </label>
          <input type='password' name='password' id='password' placeholder='password' required></input>
        </div>
        <div className='mybutton'>
          <button className='btn' type='submit'>Signup</button>
        </div>
        <p className='paragraph1'>Already have an account?</p>
        <Link to='/' className='link2'>Login</Link>
      </form>
    </div>
  )
}

export default Register
