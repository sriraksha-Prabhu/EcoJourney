import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Calculator from './pages/Calculator'
import History from './pages/History'
import Navbar from './components/Navbar'
import Home from './pages/Home'   // ✅ import Home

export default function App() {
  const [token, setToken] = React.useState(localStorage.getItem('token') || '')

  const handleLogin = (tok) => {
    localStorage.setItem('token', tok)
    setToken(tok)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken('')
  }

  return (
    <BrowserRouter>
      {/* Show Navbar only when logged in */}
      {token && <Navbar token={token} onLogout={handleLogout} />}

      <div className="container">
        <Routes>
          {/* ✅ Show Home first */}
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onLogin={handleLogin} />} />
          <Route path="/dashboard" element={ token ? <Dashboard token={token} /> : <Navigate to='/login' /> } />
          <Route path="/calculator" element={ token ? <Calculator token={token} /> : <Navigate to='/login' /> } />
          <Route path="/history" element={ token ? <History token={token} /> : <Navigate to='/login' /> } />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
