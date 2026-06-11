import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { getFS, writeFile, readFile, getFolderByPath } from '../utils/vfs';
import { FileCode, Play, Save, TerminalSquare, RefreshCw } from 'lucide-react';

const PythonIDE = () => {
  const [code, setCode] = useState('print("Hello, Stardance!")\n\ndef calculate_score(points):\n    return points * 10\n\nprint("Score:", calculate_score(5))');
  const [filename, setFilename] = useState('main.py');
  const [files, setFiles] = useState([]);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  
  // Resizable panel states
  const [sidebarWidth, setSidebarWidth] = useState(200);
  const [terminalHeight, setTerminalHeight] = useState(150);

  // Load available Python files from VFS
  const loadFiles = () => {
    const fs = getFS();
    const docs = getFolderByPath(fs, ['Documents']) || {};
    const pyFiles = Object.keys(docs).filter(k => k.endsWith('.py'));
    setFiles(pyFiles);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  const handleSave = () => {
    let name = filename;
    if (!name.endsWith('.py')) name += '.py';
    writeFile(['Documents'], name, code);
    loadFiles();
    setOutput(`[System] Saved to Documents/${name}`);
  };

  const handleLoad = (name) => {
    const content = readFile(['Documents'], name);
    if (content !== null) {
      setCode(content);
      setFilename(name);
      setOutput(`[System] Loaded ${name}`);
    }
  };

  const handleRun = () => {
    setIsRunning(true);
    setOutput('Starting Python kernel...');
    
    // Simulate execution delay
    setTimeout(() => {
      try {
        // Very basic mock execution for demo purposes
        let simulatedOutput = '';
        const lines = code.split('\n');
        for (const line of lines) {
          if (line.trim().startsWith('print(')) {
            // Extract stuff between print("...") loosely
            const match = line.match(/print\((.*?)\)/);
            if (match) {
              const content = match[1].replace(/['"]/g, '').split(',').join(' ');
              simulatedOutput += content + '\n';
            }
          }
        }
        
        if (!simulatedOutput) {
          simulatedOutput = "Process finished with exit code 0\n(Mock Execution: Add print('...') to see output)";
        }
        
        setOutput(simulatedOutput);
      } catch (err) {
        setOutput(`Traceback (most recent call last):\n  File "${filename}", line 1\nSyntaxError: invalid syntax`);
      }
      setIsRunning(false);
    }, 800);
  };

  return (
    <div style={{ display: 'flex', height: '100%', backgroundColor: '#1e1e1e', color: '#d4d4d4', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Sidebar (File Explorer) */}
      <div style={{ width: `${sidebarWidth}px`, minWidth: '100px', maxWidth: '500px', backgroundColor: '#252526', borderRight: '1px solid #333', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '10px 16px', fontSize: '11px', fontWeight: 'bold', letterSpacing: '1px', color: '#888', textTransform: 'uppercase', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Explorer</span>
          <RefreshCw size={12} style={{ cursor: 'pointer' }} onClick={loadFiles} />
        </div>
        
        <div style={{ padding: '0 8px', flex: 1, overflowY: 'auto' }}>
          {files.map(f => (
            <div 
              key={f}
              onClick={() => handleLoad(f)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 8px', cursor: 'pointer', fontSize: '13px', backgroundColor: filename === f ? '#37373d' : 'transparent', color: filename === f ? '#fff' : '#ccc' }}
              onMouseOver={(e) => { if (filename !== f) e.currentTarget.style.backgroundColor = '#2a2d2e'; }}
              onMouseOut={(e) => { if (filename !== f) e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              <FileCode size={14} color="#facc15" /> {f}
            </div>
          ))}
          {files.length === 0 && (
            <div style={{ padding: '8px', fontSize: '12px', color: '#666' }}>No .py files found</div>
          )}
        </div>
      </div>

      {/* Vertical Splitter */}
      <div 
        style={{ width: '4px', cursor: 'col-resize', backgroundColor: 'transparent', zIndex: 10 }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#007acc'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        onPointerDown={(e) => {
          e.preventDefault();
          const startX = e.clientX;
          const startWidth = sidebarWidth;
          const onMove = (me) => setSidebarWidth(Math.max(100, Math.min(500, startWidth + (me.clientX - startX))));
          const onUp = () => { document.removeEventListener('pointermove', onMove); document.removeEventListener('pointerup', onUp); };
          document.addEventListener('pointermove', onMove);
          document.addEventListener('pointerup', onUp);
        }}
      />

      {/* Main Editor Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        
        {/* Editor Topbar */}
        <div style={{ height: '40px', backgroundColor: '#1e1e1e', borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', flexShrink: 0 }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileCode size={16} color="#facc15" />
            <input 
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              style={{ background: 'transparent', border: '1px solid transparent', color: '#fff', outline: 'none', fontSize: '13px', padding: '2px 4px' }}
              onFocus={(e) => e.target.style.border = '1px solid #007acc'}
              onBlur={(e) => e.target.style.border = '1px solid transparent'}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={handleSave}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'transparent', border: 'none', color: '#ccc', cursor: 'pointer', fontSize: '12px', padding: '4px 8px', borderRadius: '4px' }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#333'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <Save size={14} /> Save
            </button>
            <button 
              onClick={handleRun}
              disabled={isRunning}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#0f6120', border: 'none', color: '#fff', cursor: isRunning ? 'default' : 'pointer', fontSize: '12px', padding: '4px 12px', borderRadius: '4px', fontWeight: 'bold', opacity: isRunning ? 0.5 : 1 }}
            >
              <Play size={14} /> {isRunning ? 'Running...' : 'Run'}
            </button>
          </div>
        </div>

        {/* Monaco Editor */}
        <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
          <Editor
            height="100%"
            language="python"
            theme="vs-dark"
            value={code}
            onChange={(val) => setCode(val || '')}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
              scrollBeyondLastLine: false,
              roundedSelection: false,
              padding: { top: 16 }
            }}
          />
        </div>

        {/* Horizontal Splitter */}
        <div 
          style={{ height: '4px', cursor: 'row-resize', backgroundColor: 'transparent', zIndex: 10 }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#007acc'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          onPointerDown={(e) => {
            e.preventDefault();
            const startY = e.clientY;
            const startHeight = terminalHeight;
            const onMove = (me) => setTerminalHeight(Math.max(50, Math.min(400, startHeight - (me.clientY - startY))));
            const onUp = () => { document.removeEventListener('pointermove', onMove); document.removeEventListener('pointerup', onUp); };
            document.addEventListener('pointermove', onMove);
            document.addEventListener('pointerup', onUp);
          }}
        />

        {/* Mock Terminal Output */}
        <div style={{ height: `${terminalHeight}px`, minHeight: '50px', maxHeight: '400px', backgroundColor: '#1e1e1e', borderTop: '1px solid #333', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
          <div style={{ padding: '6px 16px', fontSize: '11px', color: '#888', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px', borderBottom: '1px solid #2d2d2d' }}>
            <TerminalSquare size={12} /> Output Console
          </div>
          <div style={{ flex: 1, padding: '12px 16px', fontFamily: "'Fira Code', monospace", fontSize: '13px', color: '#ccc', overflowY: 'auto', whiteSpace: 'pre-wrap' }}>
            {output || 'Run your code to see output here...'}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PythonIDE;
