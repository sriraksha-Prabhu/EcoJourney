import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../services/api'   // ✅ use the same api.js as Login

export default function Register({ onLogin }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // ✅ If already logged in, skip register page
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/dashboard')
    }
  }, [navigate])

  const submit = async (e) => {
    e.preventDefault()
    try {
      // ✅ send to correct backend endpoint
      const res = await axios.post('/api/auth/register', { name, email, password })

      // ✅ save token
      localStorage.setItem('token', res.data.token)
      onLogin(res.data.token)

      // ✅ redirect to dashboard
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl mb-4">Register</h2>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <form onSubmit={submit} className="space-y-3">
          <input
            className="w-full p-2 border"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            className="w-full p-2 border"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            className="w-full p-2 border"
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button className="w-full bg-green-600 text-white p-2 rounded">
            Register
          </button>
        </form>
      </div>
    </div>
  )
}
