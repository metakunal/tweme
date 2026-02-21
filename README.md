# Tweme - GIF Reaction Suggester

An app that generates perfect GIF reactions to any tweet using AI and GIPHY.

## How It Works

1. **Paste a tweet** into the textarea
2. **Backend calls Gemini API** to generate 3 contextual GIF search keywords
3. **Backend searches GIPHY** for GIFs matching each keyword
4. **Frontend displays** the top 5 GIF reactions in an interactive grid
5. **Click any GIF** to view it or copy the link

## Project Structure

```
tweme/
├── backend/
│   ├── services/
│   │   ├── gemini.service.js    # Gemini API integration
│   │   └── gif.service.js       # GIPHY API integration
│   ├── controllers/
│   │   └── gif.controller.js    # GIF generation logic
│   ├── routes/
│   │   └── gif.routes.js        # API routes
│   ├── server.js                # Express server
│   ├── .env                     # API keys (git-ignored)
│   ├── .env.example             # Template for .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx              # Main app component
│   │   ├── GifGrid.jsx          # GIF display component
│   │   ├── main.jsx             # React entry
│   │   └── index.css            # Tailwind CSS
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
├── .gitignore
├── package.json                 # Root workspace
└── README.md
```

## Setup

### 1. Installation

```bash
npm install
```

### 2. Get API Keys

**Gemini API:**
- Go to [Google AI Studio](https://aistudio.google.com/apikey)
- Create a new API key
- Add to `backend/.env`: `GEMINI_API_KEY=your_key_here`

**GIPHY API:**
- Go to [GIPHY Developers](https://developers.giphy.com/)
- Create an app to get API key
- Add to `backend/.env`: `GIPHY_API_KEY=your_key_here`

### 3. Environment Variables

```bash
cp backend/.env.example backend/.env
```

Then update with your API keys:
```env
PORT=5000
NODE_ENV=development
GEMINI_API_KEY=your_gemini_key
GIPHY_API_KEY=your_giphy_key
```

### 4. Development

Run frontend and backend together:
```bash
npm run dev
```

- **Backend**: http://localhost:5000
- **Frontend**: http://localhost:5173

### Individual Commands

**Backend only:**
```bash
npm run dev --workspace=backend
```

**Frontend only:**
```bash
npm run dev --workspace=frontend
```

**Production build:**
```bash
npm run build
```

## Tech Stack

**Frontend:**
- React 18
- Vite (lightning-fast bundler)
- Tailwind CSS (styling)
- Axios (API calls)

**Backend:**
- Node.js
- Express (server framework)
- Gemini API (AI-powered keyword generation)
- GIPHY API (GIF search)
- dotenv (environment configuration)

## API Endpoint

### `POST /api/generate-gif`

**Request:**
```json
{
  "tweet": "your tweet text here"
}
```

**Response:**
```json
{
  "keywords": ["sad vibes", "internal screaming", "existential crisis"],
  "gifs": [
    {
      "id": "abc123",
      "url": "https://giphy.com/gifs/...",
      "preview": "https://media.giphy.com/...",
      "title": "GIF Title"
    }
  ]
}
```

## Features

✅ **AI-Powered:** Gemini generates context-aware GIF keywords  
✅ **GIF Search:** GIPHY integration for massive GIF library  
✅ **Responsive Grid:** Mobile-friendly GIF display  
✅ **Copy & Share:** Easy GIF link copying  
✅ **Error Handling:** Graceful fallbacks if APIs fail  
✅ **Loading States:** Visual feedback during processing  
✅ **No Database:** Stateless API design

## Keyboard Shortcuts

- `Ctrl/Cmd + Enter` in textarea to generate reactions

## Error Handling

- If Gemini API fails, falls back to generic keywords
- If GIPHY returns no results, shows error message
- CORS enabled for frontend-backend communication

## Next Steps

- Add authentication for API keys
- Cache results to reduce API calls
- Add favorites/history
- Deploy to production (Vercel, Railway, etc.)
