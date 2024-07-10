import React, { useState } from 'react';

export default function TeachBot() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async () => {
    setError(''); // Clear previous error
    setResponse(''); // Clear previous response

    try {
      const res = await fetch('http://localhost:5221/api/OpenAI/GenerateText', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: input })
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Something went wrong');
      }

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      setError('Error fetching data: ' + error.message);
    }
  };

  return (
    <div>
      <h1>TeachBot</h1>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Ask me something..."
      />
      <button onClick={handleSubmit}>Submit</button>
      {response && (
        <div>
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}
