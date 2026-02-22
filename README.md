# Tweme - GIF Reaction Suggester

Generate context-aware GIF reactions for tweets using an AI text-generation service and GIPHY.

## How It Works

1. **Paste a tweet** into the textarea.
2. **Backend calls a GROQ / OpenAI-compatible text API** (see `backend/services/gemini.service.js`) to generate 3 contextual GIF search keywords.
3. **Backend searches GIPHY** for GIFs matching each keyword.
4. **Frontend displays** the top GIF reactions in an interactive grid.
5. **Click any GIF** to view it or copy the link.

## Project Structure

```
tweme/
├── backend/
│   ├── services/
│   │   ├── gemini.service.js    # GROQ/OpenAI-compatible text generation (env: GROQ_API_KEY)
│   │   └── gif.service.js       # GIPHY API integration (env: GIPHY_API_KEY)
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
├── package.json                 # Root workspace (uses npm workspaces + concurrently)
└── README.md
```

## Setup

### 1. Installation

```bash
npm install
```

### 2. Get API Keys

**GROQ / OpenAI-compatible Text API (used by `gemini.service.js`):**
- Provision an API key from your provider that is compatible with the OpenAI-style chat/completions API (the code calls a GROQ-compatible endpoint by default).
- Add to `backend/.env`: `GROQ_API_KEY=your_key_here`
- Optional: Override the API URL with `GROQ_API_URL=https://your-provider.example/v1/chat/completions` if you need a custom endpoint.

**GIPHY API:**
- Go to https://developers.giphy.com/ and create an app to get an API key.
- Add to `backend/.env`: `GIPHY_API_KEY=your_key_here`

### 3. Environment Variables

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` with at least the following:

```env
PORT=5000
NODE_ENV=development
GROQ_API_KEY=your_groq_key
# Optional: GROQ_API_URL to override the default endpoint
GIPHY_API_KEY=your_giphy_key
```

If `GROQ_API_KEY` is missing, the backend will fall back to a small set of safe keywords.

### 4. Development

Run frontend and backend together from the repo root:

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

**Frontend:** React, Vite, Tailwind CSS

**Backend:** Node.js, Express, dotenv, node-fetch

**APIs:** GROQ/OpenAI-compatible text generation (env: `GROQ_API_KEY`), GIPHY (env: `GIPHY_API_KEY`)

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

- **AI-Powered:** Generates context-aware GIF keywords using a GROQ/OpenAI-compatible model.
- **GIF Search:** GIPHY integration for a large GIF library.
- **Responsive Grid:** Mobile-friendly GIF display.
- **Copy & Share:** Easy GIF link copying.
- **Graceful Fallbacks:** Uses fallback keywords when the text API is unavailable.

## Keyboard Shortcuts

- `Ctrl/Cmd + Enter` in textarea to generate reactions

## Error Handling

- If the text-generation API fails, the backend returns safe fallback keywords.
- If GIPHY returns no results, the frontend shows an appropriate message.
- CORS is enabled for frontend-backend communication.

## Next Steps

- Add authentication for API keys
- Cache results to reduce API calls
- Add favorites/history
- Deploy to production (Vercel, Railway, etc.)
