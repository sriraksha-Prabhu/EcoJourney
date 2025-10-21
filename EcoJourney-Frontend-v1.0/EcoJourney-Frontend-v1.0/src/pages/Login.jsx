import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '../services/api'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // ✅ If already logged in, skip login page
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/dashboard')
    }
  }, [navigate])

  const submit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/api/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)   // ✅ Save token
      onLogin(res.data.token)
      navigate('/dashboard')                         // ✅ Redirect after login
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl mb-4">Login</h2>
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <form onSubmit={submit} className="space-y-3">
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
            Login
          </button>
        </form>
        <p className="text-sm mt-4 text-center">Don’t have an account?{" "}
  <a href="/register" className="text-green-600 underline">
    Register here
  </a>
</p>

      </div>
    </div>
  )
}
