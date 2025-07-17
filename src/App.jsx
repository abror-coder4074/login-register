import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Compnents/Login'
import Home from './Compnents/Home'
import Details from './Compnents/Details'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='home/details/:id' element={<Details/>}/>
      </Routes>
    </div>
  )
}

export default App
