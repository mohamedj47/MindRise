import { IncomingMessage, ServerResponse } from 'http';
import fetch from 'node-fetch'; // لتعمل fetch على Node.js، Vercel يدعمها الآن

// لاحظ: ضع مفتاحك في Environment Variables على Vercel باسم GEMINI_API_KEY
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export default async function handler(req: IncomingMessage & { body?: any }, res: ServerResponse) {
  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  try {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      let data;
      try {
        data = JSON.parse(body);
      } catch {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
        return;
      }

      const { prompt } = data;
      if (!prompt) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Prompt is required' }));
        return;
      }

      if (!GEMINI_API_KEY) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Gemini API key not set' }));
        return;
      }

      try {
        // 👇 استدعاء Gemini API
        const apiRes = await fetch('https://api.gemini.example.com/v1/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GEMINI_API_KEY}`
          },
          body: JSON.stringify({ prompt })
        });

        const result = await apiRes.json();

        res.writeHead(apiRes.status, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      } catch (err) {
        console.error('Gemini API error:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Gemini backend error' }));
      }
    });
  } catch (error) {
    console.error(error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
}
