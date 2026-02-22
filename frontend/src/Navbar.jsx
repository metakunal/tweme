import React from 'react'

export default function Navbar() {
  return (
    <nav className="bg-slate-800 border-b border-slate-700 py-4 px-6 mb-8">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">T</span>
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">Tweme</span>
        </div>
        
        <div className="hidden md:flex gap-6 text-slate-300 font-medium">
          <a href="#" className="hover:text-white transition-colors">Home</a>
          <a href="#" className="hover:text-white transition-colors">Pricing</a>
          <a href="#" className="hover:text-white transition-colors">API</a>
        </div>

        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
          Get Started
        </button>
      </div>
    </nav>
  )
}
