import React, { useState } from 'react'
import axios from '../services/api'
import { useNavigate } from 'react-router-dom'

const modes = ['Car','Bus','Bike','Train','Flight','Walk']

export default function Calculator({ token }){
  const [mode, setMode] = useState('Car')
  const [distanceKm, setDistanceKm] = useState('')
  const [note, setNote] = useState('')
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    try{
      await axios.post('/api/journeys', { mode, distanceKm: parseFloat(distanceKm), note }, { headers: { Authorization: `Bearer ${token}` } })
      setMsg('Saved successfully')
      setTimeout(()=> navigate('/history'), 800)
    }catch(err){
      setMsg(err.response?.data?.message || 'Failed')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Add Journey</h2>
      {msg && <div className="mb-2">{msg}</div>}
      <form onSubmit={submit} className="space-y-3">
        <select value={mode} onChange={e=>setMode(e.target.value)} className="w-full p-2 border">
          {modes.map(m=> <option key={m}>{m}</option>)}
        </select>
        <input className="w-full p-2 border" placeholder="Distance (km)" value={distanceKm} onChange={e=>setDistanceKm(e.target.value)} />
        <input className="w-full p-2 border" placeholder="Note" value={note} onChange={e=>setNote(e.target.value)} />
        <button className="w-full bg-green-600 text-white p-2 rounded">Calculate & Save</button>
      </form>
    </div>
  )
}
