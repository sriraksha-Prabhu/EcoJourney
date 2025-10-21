import React from 'react'
import { Navigate } from 'react-router-dom'

export default function PrivateRoute({ token, children }) {
  // If no token → redirect to login
  if (!token) {
    return <Navigate to="/login" />
  }
  return children
}
