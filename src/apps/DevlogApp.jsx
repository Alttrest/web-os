import React, { useState, useEffect } from 'react';
import { getFS, readFile, writeFile } from '../utils/vfs';
import { BookOpen, Save, Edit3 } from 'lucide-react';

const DevlogApp = () => {
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [savedStatus, setSavedStatus] = useState('');

  useEffect(() => {
    // Try to load DEVLOG.md from Documents
    const fs = getFS();
    const existingContent = readFile(['Documents'], 'DEVLOG.md');
    if (existingContent) {
      setContent(existingContent);
    } else {
      const initialContent = `# My Stardance Devlog\n\n**Day 1:** I am trying to add a folder mechanic for my OS and I want to make a PDF doc editor with STL viewer.\n\n**Day 2:** I added an STL viewer and 3D viewer. I added a Python editor based on Monaco editor. I finished the filesystem. I saw some bugs about the window system localhost before the deployment update and I fixed them.`;

      setContent(initialContent);
      writeFile(['Documents'], 'DEVLOG.md', initialContent);
    }
  }, []);

  const handleSave = () => {
    writeFile(['Documents'], 'DEVLOG.md', content);
    setIsEditing(false);
    setSavedStatus('Saved!');
    setTimeout(() => setSavedStatus(''), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'var(--glass-bg)', color: 'var(--text-primary)' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid var(--glass-border)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
          <BookOpen size={18} color="var(--primary)" />
          <span>DEVLOG.md</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {savedStatus && <span style={{ color: '#22c55e', fontSize: '12px' }}>{savedStatus}</span>}
          
          {isEditing ? (
            <button 
              onClick={handleSave}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--primary)', border: 'none', color: 'white', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 500 }}
            >
              <Save size={14} /> Save
            </button>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
            >
              <Edit3 size={14} /> Edit
            </button>
          )}
        </div>
      </div>

      {/* Editor/Viewer */}
      <div style={{ flex: 1, padding: '24px', overflowY: 'auto', fontFamily: isEditing ? 'monospace' : 'inherit' }}>
        {isEditing ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.3)',
              color: '#e5e5e5',
              border: '1px solid var(--glass-border)',
              borderRadius: '8px',
              padding: '16px',
              outline: 'none',
              resize: 'none',
              fontFamily: '"Fira Code", monospace',
              fontSize: '14px',
              lineHeight: '1.5'
            }}
          />
        ) : (
          <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
            {content.split('\n').map((line, i) => {
              if (line.startsWith('# ')) return <h1 key={i} style={{ marginTop: '0', borderBottom: '1px solid var(--glass-border)', paddingBottom: '8px' }}>{line.substring(2)}</h1>;
              if (line.startsWith('## ')) return <h2 key={i}>{line.substring(3)}</h2>;
              if (line.startsWith('**') && line.includes('**', 2)) {
                // Simple bold parsing for "Day X:"
                const parts = line.split('**');
                return <p key={i}><strong>{parts[1]}</strong>{parts.slice(2).join('**')}</p>;
              }
              if (line.trim() === '') return <br key={i} />;
              return <p key={i} style={{ margin: '8px 0' }}>{line}</p>;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DevlogApp;
