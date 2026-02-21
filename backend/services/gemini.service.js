import fetch from 'node-fetch';

// 1. Updated URL to the standard OpenAI-compatible endpoint
const DEFAULT_GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const FALLBACK_KEYWORDS = ['reaction meme', 'funny response', 'mood check'];

const systemPrompt = `You are an expert in internet meme culture.
Given a tweet, generate 3 short GIF search phrases that would perfectly react to it.
Rules:
- 2 to 4 words only
- No full sentences
- Return strictly valid JSON: { "keywords": ["", "", ""] }`;

export async function generateKeywords(tweet) {
  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  const GROQ_API_URL = process.env.GROQ_API_URL || DEFAULT_GROQ_API_URL;

  if (!GROQ_API_KEY) {
    console.warn('GROQ_API_KEY not set');
    return FALLBACK_KEYWORDS;
  }

  try {
    const userPrompt = `Tweet: "${tweet}"`;

    const payload = {
      // 2. Use a valid 2026 Model ID (llama-3.3-70b-versatile is great for text)
      model: 'llama-3.3-70b-versatile', 
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      // 3. Optional: Force JSON mode if supported
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 150, 
    };

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Groq Error ${response.status}:`, errorData);
      return FALLBACK_KEYWORDS;
    }

    const data = await response.json();
    
    // 4. Extract content from the standard OpenAI response shape
    const textContent = data.choices[0]?.message?.content;

    if (!textContent) {
      return FALLBACK_KEYWORDS;
    }

    const parsed = JSON.parse(textContent);
    return parsed.keywords || FALLBACK_KEYWORDS;

  } catch (error) {
    console.error('Error calling Groq:', error);
    return FALLBACK_KEYWORDS;
  }
}