import { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleSend = async () => {
    try {
      const res = await axios.post('/api/gemini', { prompt: input });
      setOutput(JSON.stringify(res.data, null, 2));
    } catch (err: any) {
      setOutput(err.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Gemini AI Demo</h1>
      <textarea
        rows={5}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="اكتب هنا..."
        style={{ width: '100%' }}
      />
      <button onClick={handleSend}>Send</button>
      <pre>{output}</pre>
    </div>
  );
}
