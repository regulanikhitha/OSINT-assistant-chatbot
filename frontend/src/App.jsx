import { useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);

    try {
      const response = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      const data = await response.json();
      
      setMessages((prev) => [...prev, { sender: 'bot', text: data.reply || data.error }]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Error: Could not connect to the server.' }]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleNewChat = () => {
    if (messages.length > 0) {
      setHistory((prev) => [...prev, `Chat ${prev.length + 1}: ${messages[0].text.substring(0, 15)}...`]);
    }
    setMessages([]);
  };

  return (
    <div className="container">
      <div className="sidebar">
        <button className="new-chat" onClick={handleNewChat}>+ New Chat</button>
        <h3>Chat History</h3>
        <div id="history-list">
          {history.length === 0 ? <p style={{color: '#666', fontSize: '14px'}}>No history yet.</p> : null}
          {history.map((item, index) => (
            <div key={index} className="history-item">{item}</div>
          ))}
        </div>
      </div>

      <div className="main">
        <div className="header">OSINT Investigation Assistant</div>
        <div id="chat-box">
          {messages.length === 0 ? <div className="bot">Hello! I am your OSINT Assistant. Ask me anything!</div> : null}
          {messages.map((msg, index) => (
            <div key={index} className={msg.sender === 'user' ? 'user' : 'bot'}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="input-area">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about OSINT..." 
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
