import React from 'react'

export default function GifGrid({ gifs, loading }) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!gifs || gifs.length === 0) {
    return null
  }

  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {gifs.map((gif) => (
        <div
          key={gif.id}
          className="relative bg-gray-200 rounded-lg overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow"
        >
          <img
            src={gif.preview}
            alt={gif.title}
            className="w-full h-40 object-cover"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
            <a
              href={gif.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-gray-800 px-3 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors"
            >
              View
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText(gif.url)
              }}
              className="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors"
            >
              Copy
            </button>
          </div>
          <p className="text-xs text-gray-600 p-2 truncate">{gif.title}</p>
        </div>
      ))}
    </div>
  )
}
