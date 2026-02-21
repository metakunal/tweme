import React, { useState, useEffect } from 'react'
import './index.css'

export default function App() {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/health')
        const data = await response.json()
        setMessage(data.status)
      } catch (err) {
        setError('Failed to connect to backend')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white rounded-lg shadow-2xl p-8 text-center max-w-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Tweme</h1>
        <p className="text-gray-600 text-lg mb-6">Fullstack Monorepo</p>
        
        {loading ? (
          <p className="text-gray-500 animate-pulse">Connecting to server...</p>
        ) : error ? (
          <p className="text-red-500 font-semibold">{error}</p>
        ) : (
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
            <p className="text-green-700 font-semibold">✓ {message}</p>
            <p className="text-green-600 text-sm mt-2">Frontend & Backend Connected!</p>
          </div>
        )}
      </div>
    </div>
  )
}
