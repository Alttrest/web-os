import React, { useState, useRef, useEffect } from 'react';
import { getFS, getFolderByPath, readFile, writeFile, createFolder, deleteItem } from '../utils/vfs';

const Terminal = ({ triggerFatalError }) => {
  const [history, setHistory] = useState([
    { type: 'output', text: 'ZenithOS Kernel v2.0.0 [Terminal Mode]' },
    { type: 'output', text: 'Type "help" to see available commands.' }
  ]);
  const [input, setInput] = useState('');
  const [currentPath, setCurrentPath] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmdLine = input.trim();
    const args = cmdLine.split(' ');
    const cmd = args[0].toLowerCase();
    
    // BSOD Easter Egg
    if (cmdLine.includes('rm -rf') || cmdLine.includes('rm -r -f')) {
      if (triggerFatalError) {
        triggerFatalError();
      }
      return;
    }

    const pathString = currentPath.length === 0 ? '~' : `~/${currentPath.join('/')}`;
    const newHistory = [...history, { type: 'input', text: `user@alttre.os ${pathString}$ ${input}` }];

    const fs = getFS();

    switch (cmd) {
      case 'help':
        newHistory.push({ type: 'output', text: 'Commands: help, date, clear, echo, whoami, ls, cd, mkdir, touch, rm, cat' });
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
      case 'ls': {
        const folder = getFolderByPath(fs, currentPath);
        if (folder) {
          const items = Object.keys(folder).map(key => {
            return folder[key].type === 'folder' ? `<${key}>` : key;
          }).join('  ');
          newHistory.push({ type: 'output', text: items || '(empty directory)' });
        } else {
          newHistory.push({ type: 'output', text: 'ls: cannot access directory' });
        }
        break;
      }
      case 'cd': {
        const dir = args[1];
        if (!dir || dir === '~') {
          setCurrentPath([]);
        } else if (dir === '..') {
          if (currentPath.length > 0) {
            setCurrentPath(currentPath.slice(0, -1));
          }
        } else {
          const folder = getFolderByPath(fs, currentPath);
          if (folder && folder[dir] && folder[dir].type === 'folder') {
            setCurrentPath([...currentPath, dir]);
          } else {
            newHistory.push({ type: 'output', text: `cd: no such directory: ${dir}` });
          }
        }
        break;
      }
      case 'mkdir': {
        const dir = args[1];
        if (dir) {
          const success = createFolder(currentPath, dir);
          if (!success) newHistory.push({ type: 'output', text: `mkdir: cannot create directory '${dir}'` });
        } else {
          newHistory.push({ type: 'output', text: 'mkdir: missing operand' });
        }
        break;
      }
      case 'touch': {
        const file = args[1];
        if (file) {
          const success = writeFile(currentPath, file, '');
          if (!success) newHistory.push({ type: 'output', text: `touch: cannot create file '${file}'` });
        } else {
          newHistory.push({ type: 'output', text: 'touch: missing operand' });
        }
        break;
      }
      case 'rm': {
        const item = args[1];
        if (item) {
          const success = deleteItem(currentPath, item);
          if (!success) newHistory.push({ type: 'output', text: `rm: cannot remove '${item}': No such file or directory` });
        } else {
          newHistory.push({ type: 'output', text: 'rm: missing operand' });
        }
        break;
      }
      case 'cat': {
        const file = args[1];
        if (file) {
          const content = readFile(currentPath, file);
          if (content !== null) {
            newHistory.push({ type: 'output', text: content });
          } else {
            newHistory.push({ type: 'output', text: `cat: ${file}: No such file or directory` });
          }
        } else {
          newHistory.push({ type: 'output', text: 'cat: missing operand' });
        }
        break;
      }
      default:
        if (cmd === 'echo') {
          newHistory.push({ type: 'output', text: args.slice(1).join(' ') });
        } else {
          newHistory.push({ type: 'output', text: `zsh: command not found: ${cmd}` });
        }
    }

    setHistory(newHistory);
    setInput('');
  };

  const pathString = currentPath.length === 0 ? '~' : `~/${currentPath.join('/')}`;

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
      <div style={{ flex: 1, padding: '16px 20px', overflowY: 'auto', whiteSpace: 'pre-wrap' }}>
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
          <span style={{ marginRight: '12px', color: 'var(--primary)', fontWeight: 'bold', whiteSpace: 'nowrap' }}>user@alttre.os {pathString}$</span>
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
