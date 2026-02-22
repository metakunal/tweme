import React from 'react'

export default function GifGrid({ gifs, loading }) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-700"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 absolute inset-0"></div>
        </div>
      </div>
    )
  }

  if (!gifs || gifs.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      {gifs.map((gif) => (
        <div
          key={gif.id}
          className="group relative bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="aspect-video sm:aspect-square overflow-hidden bg-slate-800">
            <img
              src={gif.preview}
              alt={gif.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
            />
          </div>
          
          {/* Overlay Controls */}
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
            <a
              href={gif.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-2/3 bg-white text-slate-900 py-2 rounded-xl text-center text-sm font-bold shadow-lg hover:bg-slate-100 transition-colors"
            >
              Open GIPHY
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText(gif.url)
              }}
              className="w-2/3 bg-blue-600 text-white py-2 rounded-xl text-sm font-bold shadow-lg hover:bg-blue-500 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              Copy Link
            </button>
          </div>

          {/* Footer Info */}
          <div className="p-3 border-t border-slate-800 bg-slate-900/50 backdrop-blur-sm">
            <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">Title</p>
            <p className="text-sm text-slate-300 font-medium truncate">{gif.title || 'Untitled Reaction'}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
