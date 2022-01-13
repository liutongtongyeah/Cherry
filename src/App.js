import Header from './components/Header'
import Products from './components/Products'
import Login from './components/Login'
import Register from './components/Register'
import Order from './components/Order'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'

import {useEffect, useState} from 'react'
function App() {
  let user = null
  if(localStorage.getItem('user')){
    user = localStorage.getItem('user')
  }
  else if(sessionStorage.getItem('user')){
    user = sessionStorage.getItem('user')
  }
  useEffect(() => {
    const expiryDate = localStorage.getItem('date')
    const date = new Date()
    if(date.getTime() > expiryDate){
      localStorage.removeItem('user')
      localStorage.removeItem('date')
    }
    if(localStorage.getItem('user')){
      user = localStorage.getItem('user')
    }
    else if(sessionStorage.getItem('user')){
      user = sessionStorage.getItem('user')
    }
  }, [])
  return (
    <Router>
      <div className='mybody'>
        <Routes>
          
          <Route exact path='/login' element = {
            <>
              <Login />
            </>
          }/>
          <Route exact path='/' element={ user ?
            <Navigate to = '/products' /> : <Navigate to = '/login' />
          }/>
          <Route exact path = '/Register' element = {
            <Register />
          } />
          <Route exact path='/products' element = { user ?
            <>
              <Header />
              <Products />
            </> : <Login />
          } />
          <Route path = '/Order' element = { user ?
            <>
              <Header />
              <Order />
            </> :
            <Login />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
