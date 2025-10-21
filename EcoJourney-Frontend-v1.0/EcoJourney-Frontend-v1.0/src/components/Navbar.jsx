import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({ token, onLogout }){
  return (
    <nav className="bg-white shadow-sm mb-6">
      <div className="container flex items-center justify-between py-3">
        <Link to="/" className="font-bold text-xl">🌿 EcoJourney</Link>
        <div>
          { token ? (
            <>
              <Link to="/dashboard" className="mr-4">Dashboard</Link>
              <Link to="/calculator" className="mr-4">Carbon Calculator</Link>
              <Link to="/history" className="mr-4">History</Link>
              <button onClick={onLogout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">Login</Link>
              <Link to="/register" className="mr-4">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
