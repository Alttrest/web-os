import React, { useState, useRef, useEffect } from 'react';

const Terminal = () => {
  const [history, setHistory] = useState([
    { type: 'output', text: 'Welcome to WebOS Terminal v1.0.0' },
    { type: 'output', text: 'Type "help" to see available commands.' }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, { type: 'input', text: `user@webos:~$ ${input}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({ type: 'output', text: 'Available commands: help, date, clear, echo [text], whoami' });
        break;
      case 'date':
        newHistory.push({ type: 'output', text: new Date().toString() });
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'whoami':
        newHistory.push({ type: 'output', text: 'guest_user' });
        break;
      default:
        if (cmd.startsWith('echo ')) {
          newHistory.push({ type: 'output', text: input.substring(5) });
        } else {
          newHistory.push({ type: 'output', text: `Command not found: ${cmd}` });
        }
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#000', color: '#22c55e', fontFamily: 'monospace', padding: '16px', fontSize: '14px', overflowY: 'auto' }}>
      {history.map((line, i) => (
        <div key={i} style={{ marginBottom: '4px', opacity: line.type === 'input' ? 0.8 : 1 }}>
          {line.text}
        </div>
      ))}
      <form onSubmit={handleCommand} style={{ display: 'flex', marginTop: '8px' }}>
        <span style={{ marginRight: '8px', color: '#3b82f6' }}>user@webos:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1, backgroundColor: 'transparent', border: 'none', color: '#22c55e', outline: 'none', fontFamily: 'monospace', fontSize: '14px' }}
          autoFocus
        />
      </form>
      <div ref={bottomRef} />
    </div>
  );
};

export default Terminal;
