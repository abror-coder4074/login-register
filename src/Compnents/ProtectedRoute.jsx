import React from 'react'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get('token')

  if (!token) {
    return <Navigate to="/" />
  }

  return children
}

export default ProtectedRoute
