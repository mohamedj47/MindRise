import React, { useState } from 'react';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const sendPrompt = async () => {
    if (!prompt) {
      alert('من فضلك اكتب نصًا أولاً');
      return;
    }

    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });

      const data = await res.json();
      if (res.ok) {
        setResponse(data.response);
      } else {
        alert('Error: ' + data.error);
      }
    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء الاتصال بالـ API');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>اختبار Gemini API</h1>
      <input
        type="text"
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        placeholder="اكتب النص هنا"
        style={{ width: '300px', marginRight: '10px' }}
      />
      <button onClick={sendPrompt}>Send</button>
      {response && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
          Response: {response}
        </div>
      )}
    </div>
  );
}

export default App;

