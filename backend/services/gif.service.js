import fetch from 'node-fetch';

const GIPHY_API_URL = 'https://api.giphy.com/v1/gifs/search';

const GIPHY_LIMIT = 5;

function parseGifData(gif) {
  return {
    id: gif.id,
    url: gif.url,
    preview: gif.images?.fixed_height?.url || gif.images?.original?.url || '',
    title: gif.title || 'GIF Reaction',
  };
}

export async function searchGifs(keyword) {
  const GIPHY_API_KEY = process.env.GIPHY_API_KEY;
  if (!GIPHY_API_KEY) {
    console.warn('GIPHY_API_KEY not set');
    return [];
  }

  try {
    const response = await fetch(
      `${GIPHY_API_URL}?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(keyword)}&limit=5&rating=g`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error(`GIPHY API error: ${response.status}`);
      return [];
    }

    const data = await response.json();

    if (!Array.isArray(data.data)) {
      return [];
    }

    return data.data.map(parseGifData);
  } catch (error) {
    console.error('Error calling GIPHY API:', error);
    return [];
  }
}

export async function searchMultipleKeywords(keywords) {
  const results = [];
  const seenIds = new Set();

  for (const keyword of keywords) {
    const gifs = await searchGifs(keyword);
    
    for (const gif of gifs) {
      if (!seenIds.has(gif.id)) {
        results.push(gif);
        seenIds.add(gif.id);
      }
      if (results.length >= GIPHY_LIMIT) {
        break;
      }
    }

    if (results.length >= GIPHY_LIMIT) {
      break;
    }
  }

  return results.slice(0, GIPHY_LIMIT);
}
