import React, { useState } from 'react';
import { Save } from 'lucide-react';

const Notepad = () => {
  const [text, setText] = useState('Welcome to Notepad!\n\nYou can write your notes here.');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '8px 16px', backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0', gap: '8px' }}>
        <button style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', border: 'none', backgroundColor: 'var(--primary)', color: 'white', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}>
          <Save size={14} /> Save
        </button>
        <span style={{ fontSize: '13px', color: '#64748b', marginLeft: 'auto' }}>Untitled.txt</span>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ flex: 1, padding: '16px', border: 'none', resize: 'none', outline: 'none', fontFamily: 'var(--font-mono, monospace)', fontSize: '14px', lineHeight: 1.5, color: '#334155' }}
        spellCheck="false"
      />
    </div>
  );
};

export default Notepad;
