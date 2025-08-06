import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './Compnents/Login'
import Register from './Compnents/Register'
import Home from './Compnents/Home'
import Error from './Compnents/Error'
import Product from './Compnents/Product'

const App = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  if (!token) {
    navigate('/login');
  }
  return (
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/" element={<Home/>} />      
      <Route path="*" element={<Error/>} />
      <Route path='/product' element={<Product/>}/>
    </Routes>
  )
}

export default App
