import React, { useEffect, useState } from 'react'
import axios from '../services/api'

export default function History({ token }){
  const [journeys, setJourneys] = useState([])

  useEffect(()=>{
    const fetchAll = async ()=>{
      try{
        const res = await axios.get('/api/journeys', { headers: { Authorization: `Bearer ${token}` } })
        setJourneys(res.data)
      }catch(err){
        console.error(err)
      }
    }
    if(token) fetchAll()
  },[token])

  return (
    <div>
      <h2 className="text-2xl mb-4">Your Journeys</h2>
      <div className="grid gap-3">
        {journeys.map(j=> (
          <div key={j._id} className="bg-white p-3 rounded shadow">
            <div className="font-semibold">{j.mode} — {j.distanceKm} km</div>
            <div className="text-sm text-gray-600">{j.emissionsG} g CO₂ — {j.note}</div>
            <div className="text-xs text-gray-400">{new Date(j.createdAt).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
