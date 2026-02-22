# Project Overview

This is a full-stack JavaScript application that generates context-aware GIF reactions for tweets. It uses a React frontend and a Node.js/Express backend. The backend leverages an AI text-generation service (like GROQ or OpenAI) to create relevant GIF search terms and then fetches GIFs from the GIPHY API.

**Frontend:** React, Vite, Tailwind CSS
**Backend:** Node.js, Express
**APIs:** GIPHY, and any OpenAI-compatible text generation API (e.g., GROQ)

# Building and Running

The project uses `npm` workspaces to manage the frontend and backend as separate packages. The `concurrently` library is used to run both services together for development.

## Development

To run the frontend and backend servers simultaneously, run the following command from the root directory:

```bash
npm run dev
```

- **Backend:** `http://localhost:5000`
- **Frontend:** `http://localhost:5173`

## Building for Production

To build the frontend and backend for production, run:

```bash
npm run build
```

## Starting the Production Server

To start the production server (backend only), run:

```bash
npm run start
```

# API Keys

The application requires API keys for the text generation service and GIPHY.

1.  Create a `backend/.env` file by copying the `backend/.env.example`.
2.  Add your API keys to the `backend/.env` file:

```
GROQ_API_KEY=your_text_generation_api_key
GIPHY_API_KEY=your_giphy_api_key
```

# Development Conventions

- **Monorepo:** The project is structured as a monorepo with `frontend` and `backend` workspaces.
- **Package Management:** `npm` is used for package management.
- **Concurrent Development:** The `concurrently` library is used to run the frontend and backend servers together in development.
