import React from 'react'
import { Link } from 'react-router-dom'

const aboutText = `EcoJourney helps you track your travel activities and understand your carbon footprint. By analyzing your journeys, we encourage you to make environmentally conscious choices for a greener tomorrow.`

export default function Dashboard({ token }){
  const scrollToCalc = () => {
    const el = document.getElementById('calculator-section')
    if(el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const bgUrl = '/assets/dashboard-bg.jpg'

  return (
    <div className="min-h-screen dashboard-hero" style={{ backgroundImage: `url(${bgUrl})` }}>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-3xl p-6 overlay rounded">
          <h1 className="text-3xl font-bold mb-3">About EcoJourney</h1>
          <p className="mb-4">{aboutText}</p>
          <button onClick={scrollToCalc} className="bg-green-600 text-white px-4 py-2 rounded">🌱 Get Started</button>
        </div>
      </div>

      <div id="calculator-section" className="py-12 container">
        <h2 className="text-2xl mb-4">Carbon Calculator</h2>
        <div className="bg-white p-4 rounded shadow">
          <p>Use the Carbon Calculator page to add journeys.</p>
          <Link to="/calculator" className="text-green-600">Open Calculator</Link>
        </div>
      </div>

      <div className="py-12 container">
        <h2 className="text-2xl mb-4">Your History</h2>
        <div className="bg-white p-4 rounded shadow">
          <p>Open History page to view your saved journeys.</p>
          <Link to="/history" className="text-green-600">View History</Link>
        </div>
      </div>
    </div>
  )
}
