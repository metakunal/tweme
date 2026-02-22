import React, { useState } from 'react'
import './index.css'
import GifGrid from './GifGrid.jsx'
import Navbar from './Navbar.jsx'

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
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-blue-500/30">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 pb-12">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 tracking-tight bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-sm">
            Tweme
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto font-medium">
            AI-powered context-aware GIF reactions for your texts/tweets.
          </p>
        </header>

        {/* Input Card */}
        <section className="bg-slate-800 border border-slate-700/50 rounded-2xl shadow-2xl p-6 md:p-10 mb-8 backdrop-blur-sm transition-all hover:border-blue-500/30">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-6 bg-blue-500 rounded-full"></div>
            <label className="text-slate-200 font-bold text-lg uppercase tracking-wider">
              Paste a tweet:
            </label>
          </div>
          <textarea
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="What's on your mind? Paste a tweet here..."
            className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-5 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-slate-200 placeholder-slate-500 resize-none h-32 text-lg shadow-inner"
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !tweet.trim()}
            className="w-full group relative overflow-hidden bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-blue-500/20 active:scale-[0.98]"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <div className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full"></div>
                  Generating...
                </>
              ) : (
                'Generate GIF Reactions'
              )}
            </span>
          </button>
        </section>

        {/* Keywords Chips */}
        {keywords.length > 0 && (
          <div className="mb-8 flex flex-wrap items-center gap-3 bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
            <span className="text-slate-400 font-semibold text-sm uppercase tracking-widest mr-2">Keywords:</span>
            {keywords.map((keyword, idx) => (
              <span
                key={idx}
                className="bg-blue-500/10 border border-blue-500/20 text-blue-400 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-blue-500/20 transition-colors cursor-default"
              >
                #{keyword}
              </span>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-6 py-5 rounded-xl mb-8 flex items-center gap-3 animate-pulse">
            <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-semibold">{error}</span>
          </div>
        )}

        {/* Main GIF Result Grid Container */}
        {gifs.length > 0 && (
          <div className="bg-slate-800/80 border border-slate-700 rounded-3xl shadow-3xl p-6 md:p-10 backdrop-blur-md">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </span>
                Top Reactions
              </h2>
              <span className="bg-slate-700 text-slate-300 text-xs px-3 py-1 rounded-lg font-bold uppercase tracking-tighter shadow-sm border border-slate-600">
                5 results
              </span>
            </div>
            <GifGrid gifs={gifs} loading={false} />
          </div>
        )}
      </div>
    </div>
  )
}
