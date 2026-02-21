import React, { useState } from 'react'
import './index.css'
import GifGrid from './GifGrid.jsx'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function App() {
  const [tweet, setTweet] = useState('')
  const [gifs, setGifs] = useState([])
  const [keywords, setKeywords] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleGenerate = async () => {
    if (!tweet.trim()) {
      setError('Please enter a tweet')
      return
    }

    setLoading(true)
    setError(null)
    setGifs([])
    setKeywords([])

    try {
      const response = await fetch(`${API_URL}/api/generate-gif`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tweet: tweet.trim() }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate GIF reactions')
      }

      const data = await response.json()
      setKeywords(data.keywords || [])
      setGifs(data.gifs || [])

      if (data.gifs.length === 0) {
        setError('No GIFs found. Try a different tweet!')
      }
    } catch (err) {
      setError(err.message || 'Failed to connect to backend')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleGenerate()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-3">Tweme</h1>
          <p className="text-blue-100 text-lg">Find the perfect GIF reaction to any tweet</p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-2xl p-6 md:p-8 mb-8">
          <label className="block text-gray-700 font-semibold mb-3">
            Paste a tweet:
          </label>
          <textarea
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Paste tweet text here..."
            className="w-full border-2 border-gray-300 rounded-lg p-4 mb-4 focus:outline-none focus:border-blue-500 resize-none h-24"
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !tweet.trim()}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            {loading ? 'Generating...' : 'Generate GIF Reactions'}
          </button>
        </div>

        {/* Keywords */}
        {keywords.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <p className="text-gray-700 font-semibold mb-3">Search keywords used:</p>
            <div className="flex flex-wrap gap-2">
              {keywords.map((keyword, idx) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border-2 border-red-300 text-red-700 px-6 py-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        {/* GIF Grid */}
        {gifs.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <p className="text-gray-700 font-semibold mb-4">Top 5 GIF Reactions:</p>
            <GifGrid gifs={gifs} loading={false} />
          </div>
        )}
      </div>
    </div>
  )
}
