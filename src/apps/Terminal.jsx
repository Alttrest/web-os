import React, { useState, useRef, useEffect } from 'react';

const Terminal = ({ triggerFatalError }) => {
  const [history, setHistory] = useState([
    { type: 'output', text: 'ZenithOS Kernel v2.0.0 [Terminal Mode]' },
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
    
    // BSOD Easter Egg
    if (cmd.includes('rm -rf') || cmd.includes('rm -r -f')) {
      if (triggerFatalError) {
        triggerFatalError();
      }
      return;
    }

    const newHistory = [...history, { type: 'input', text: `user@alttre.os ~$ ${input}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({ type: 'output', text: 'Commands: help, date, clear, echo [text], whoami, theme' });
        break;
      case 'date':
        newHistory.push({ type: 'output', text: new Date().toString() });
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'whoami':
        newHistory.push({ type: 'output', text: 'zenith_admin' });
        break;
      case 'theme':
        newHistory.push({ type: 'output', text: 'Theme is controlled by System Settings.' });
        break;
      default:
        if (cmd.startsWith('echo ')) {
          newHistory.push({ type: 'output', text: input.substring(5) });
        } else {
          newHistory.push({ type: 'output', text: `zsh: command not found: ${cmd}` });
        }
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%', 
      backgroundColor: 'rgba(10, 10, 12, 0.95)', 
      color: '#a3e635', 
      fontFamily: '"Fira Code", "JetBrains Mono", monospace', 
      fontSize: '13px', 
      overflow: 'hidden' 
    }}>
      {/* Fake macOS Traffic Lights Header */}
      <div style={{ display: 'flex', gap: '8px', padding: '12px 16px', backgroundColor: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#eab308' }} />
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22c55e' }} />
        <div style={{ flex: 1, textAlign: 'center', color: '#666', fontSize: '12px', marginTop: '-2px' }}>bash - 80x24</div>
      </div>

      {/* Terminal Content */}
      <div style={{ flex: 1, padding: '16px 20px', overflowY: 'auto' }}>
        {history.map((line, i) => (
          <div key={i} style={{ 
            marginBottom: '6px', 
            opacity: line.type === 'input' ? 0.7 : 1,
            color: line.type === 'input' ? '#e5e5e5' : '#a3e635',
            textShadow: line.type === 'input' ? 'none' : '0 0 8px rgba(163, 230, 53, 0.3)'
          }}>
            {line.text}
          </div>
        ))}
        
        <form onSubmit={handleCommand} style={{ display: 'flex', marginTop: '8px' }}>
          <span style={{ marginRight: '12px', color: 'var(--primary)', fontWeight: 'bold' }}>user@alttre.os ~$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ 
              flex: 1, 
              backgroundColor: 'transparent', 
              border: 'none', 
              color: '#e5e5e5', 
              outline: 'none', 
              fontFamily: 'inherit', 
              fontSize: '13px',
              caretColor: 'var(--primary)'
            }}
            autoFocus
          />
        </form>
        <div ref={bottomRef} style={{ height: '20px' }} />
      </div>
    </div>
  );
};

export default Terminal;
