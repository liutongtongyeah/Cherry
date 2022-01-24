import Header from './components/Header'
import Products from './components/Products'
import Login from './components/Login'
import Register from './components/Register'
import Order from './components/Order'
import Home from './components/Home'
import {Routes, Route, Navigate, useLocation} from 'react-router-dom'

import {useEffect, useState} from 'react'
function App() {
  const location = useLocation()
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
  }, [location.pathname])
  return (
        <Routes>
          
          <Route exact path='/login' element = {
            <>
              <Login />
            </>
          }/>
          {/* <Route exact path='/home' element = {
            <>
              <Home />
            </>
          }/> */}
          <Route exact path='/' element={
            <Home />
          }/>
          <Route exact path = '/Register' element = {
            <Register />
          } />
          <Route exact path='/products' element = { user ?
            <>
              <Header />
              <Products />
            </> : 
              <Home />
          } />
          <Route path = '/Order' element = { user ?
            <>
              <Header />
              <Order />
            </> :
            <Home />
          } />
        </Routes>
  );
}

export default App;
