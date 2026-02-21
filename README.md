# Tweme 

An app to generate memes based on the tweets.

## Project Structure

```
tweme/
├── frontend/          # React app with Vite & Tailwind
├── backend/           # Express server with CORS & .env
├── package.json       # Root workspace config
└── README.md
```

## Setup

### Installation
```bash
npm install
```

This will install dependencies for both frontend and backend workspaces.

### Development

Run both frontend and backend concurrently:
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

### Build

```bash
npm run build
```

### Environment Variables

Backend uses `.env` for configuration. Copy `.env.example` to `.env`:

```bash
cp backend/.env.example backend/.env
```

Supported variables:
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)

## Features

✅ React 18 with Vite  
✅ Tailwind CSS configured  
✅ Express with CORS enabled  
✅ .env support on backend  
✅ Workspace scripts with npm  
✅ Hot reload for both frontend & backend  
✅ Minimal, ready-to-extend boilerplate

## Next Steps

- Add API routes in `backend/server.js`
- Add components in `frontend/src/`
- Install additional packages within workspace: `npm install <package> --workspace=frontend`
