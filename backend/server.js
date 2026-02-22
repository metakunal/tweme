import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import gifRoutes from './routes/gif.routes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Tweme API - GIF Reactions', version: '1.0.0' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

app.use('/api', gifRoutes);

// Start server (only if not running as a Vercel serverless function)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

// Export for Vercel
export default app;
