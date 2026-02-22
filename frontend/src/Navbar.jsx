import React from 'react'

export default function Navbar({ setView }) {
  return (
    <nav className="bg-slate-800/80 backdrop-blur-lg sticky top-0 z-50 border-b border-slate-700/50 py-4 px-6 mb-8">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setView('home')}
        >
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20 group-hover:scale-105 active:scale-95">
            <span className="text-white font-bold text-xl">T</span>
          </div>
          <span className="text-2xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">Tweme</span>
        </div>
        
        <div className="hidden md:flex gap-8 text-slate-400 font-semibold uppercase text-[10px] tracking-[0.2em]">
          <button 
            onClick={() => setView('home')} 
            className="hover:text-blue-400 transition-colors py-2"
          >
            Home
          </button>
          <button 
            onClick={() => setView('pricing')} 
            className="hover:text-blue-400 transition-colors py-2 border-b-2 border-transparent hover:border-blue-500/50"
          >
            Pricing
          </button>
          <a href="#" className="hover:text-blue-400 transition-colors py-2">API Docs</a>
        </div>

        <button 
          onClick={() => setView('pricing')}
          className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-500/10 hover:shadow-blue-500/30 active:scale-95 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Upgrade
        </button>
      </div>
    </nav>
  )
}
