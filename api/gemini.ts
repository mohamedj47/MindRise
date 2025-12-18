import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/responses',
      req.body,
      {
        headers: {
          'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Gemini backend error' });
  }
}
