import { generateKeywords } from '../services/gemini.service.js';
import { searchMultipleKeywords } from '../services/gif.service.js';

export async function generateGifReactions(req, res) {
  const { tweet } = req.body;

  if (!tweet || typeof tweet !== 'string' || tweet.trim() === '') {
    return res.status(400).json({ error: 'Tweet text is required' });
  }

  if (tweet.length > 10000) {
    return res.status(400).json({ error: 'Tweet text too long (max 10000 chars)' });
  }

  try {
    const keywords = await generateKeywords(tweet.trim());
    const gifs = await searchMultipleKeywords(keywords);

    res.json({
      keywords,
      gifs,
    });
  } catch (error) {
    console.error('Error in generateGifReactions:', error);
    res.status(500).json({ error: 'Failed to generate GIF reactions' });
  }
}
