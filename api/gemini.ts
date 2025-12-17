export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405 }
    );
  }

  const body = await req.json();
  const prompt = body?.prompt;

  if (!prompt) {
    return new Response(
      JSON.stringify({ error: 'Prompt is required' }),
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify(data), {
        status: response.status,
      });
    }

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    return new Response(JSON.stringify({ text }), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Gemini request failed' }),
      { status: 500 }
    );
  }
}
