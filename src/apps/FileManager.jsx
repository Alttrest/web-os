import React, { useState, useEffect } from 'react';
import { Folder, FileText, HardDrive, Image as ImageIcon, Music, Video, Download, Trash2, Plus, ArrowLeft } from 'lucide-react';
import { getFS, saveFS, getFolderByPath } from '../utils/vfs';

const FileManager = () => {
  const [fileSystem, setFileSystem] = useState({});
  const [currentPath, setCurrentPath] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemType, setNewItemType] = useState('folder'); // 'folder' or 'file'

  const refreshFS = () => {
    setFileSystem(getFS());
  };

  useEffect(() => {
    refreshFS();
    // Set up a short interval to poll for VFS changes (e.g. from Terminal or Camera)
    const interval = setInterval(refreshFS, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNavigate = (folderName) => {
    setCurrentPath([...currentPath, folderName]);
    setSelectedItem(null);
  };

  const handleNavigateUp = () => {
    if (currentPath.length > 0) {
      setCurrentPath(currentPath.slice(0, -1));
      setSelectedItem(null);
    }
  };

  const handleCreate = () => {
    if (!newItemName.trim()) return;
    
    const newFs = JSON.parse(JSON.stringify(fileSystem)); // deep copy
    const current = getFolderByPath(newFs, currentPath);
    if (!current) return;

    if (current[newItemName]) {
      alert("Item already exists!");
      return;
    }

    if (newItemType === 'folder') {
      current[newItemName] = { type: 'folder', contents: {} };
    } else {
      current[newItemName] = { type: 'file', content: '' };
    }

    saveFS(newFs);
    refreshFS();
    setIsCreating(false);
    setNewItemName('');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      const newFs = JSON.parse(JSON.stringify(fileSystem));
      const current = getFolderByPath(newFs, currentPath);
      if (current) {
        current[file.name] = { type: 'file', content };
        saveFS(newFs);
        refreshFS();
      }
    };
    reader.readAsDataURL(file);
    e.target.value = null; // reset input
  };

  const handleDelete = () => {
    if (!selectedItem) return;

    const newFs = JSON.parse(JSON.stringify(fileSystem));
    const current = getFolderByPath(newFs, currentPath);
    if (!current) return;

    delete current[selectedItem];
    saveFS(newFs);
    refreshFS();
    setSelectedItem(null);
  };

  const currentFolder = getFolderByPath(fileSystem, currentPath) || {};

  const getIconForType = (type, name) => {
    if (type === 'folder') return <Folder size={32} color="#60a5fa" />;
    if (name.endsWith('.png') || name.endsWith('.jpg')) return <ImageIcon size={32} color="#34d399" />;
    if (name.endsWith('.mp3')) return <Music size={32} color="#f472b6" />;
    if (name.endsWith('.mp4')) return <Video size={32} color="#fbbf24" />;
    if (name.endsWith('.stl')) return <Box size={32} color="#3b82f6" />;
    if (name.endsWith('.pdf')) return <FileText size={32} color="#ef4444" />;
    return <FileText size={32} color="#94a3b8" />;
  };

  return (
    <div style={{ display: 'flex', height: '100%', color: 'var(--text-primary)', backgroundColor: 'var(--glass-bg)', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
      
      {/* Sidebar */}
      <div style={{ width: '200px', backgroundColor: 'rgba(15, 23, 42, 0.6)', borderRight: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '16px', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Locations
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '0 8px' }}>
          <button onClick={() => setCurrentPath([])} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', background: currentPath.length === 0 ? 'rgba(255,255,255,0.1)' : 'transparent', border: 'none', color: 'var(--text-primary)', borderRadius: '6px', cursor: 'pointer', textAlign: 'left' }}>
            <HardDrive size={18} color="#94a3b8" /> System Drive
          </button>
          <button onClick={() => setCurrentPath(['Documents'])} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', background: currentPath[0] === 'Documents' ? 'rgba(255,255,255,0.1)' : 'transparent', border: 'none', color: 'var(--text-primary)', borderRadius: '6px', cursor: 'pointer', textAlign: 'left' }}>
            <FileText size={18} color="#60a5fa" /> Documents
          </button>
          <button onClick={() => setCurrentPath(['Images'])} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', background: currentPath[0] === 'Images' ? 'rgba(255,255,255,0.1)' : 'transparent', border: 'none', color: 'var(--text-primary)', borderRadius: '6px', cursor: 'pointer', textAlign: 'left' }}>
            <ImageIcon size={18} color="#34d399" /> Images
          </button>
          <button onClick={() => setCurrentPath(['Downloads'])} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', background: currentPath[0] === 'Downloads' ? 'rgba(255,255,255,0.1)' : 'transparent', border: 'none', color: 'var(--text-primary)', borderRadius: '6px', cursor: 'pointer', textAlign: 'left' }}>
            <Download size={18} color="#fbbf24" /> Downloads
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Topbar */}
        <div style={{ height: '56px', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', padding: '0 16px', gap: '16px', backgroundColor: 'rgba(255,255,255,0.02)' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={handleNavigateUp} 
              disabled={currentPath.length === 0}
              style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: currentPath.length === 0 ? 'var(--text-secondary)' : 'var(--text-primary)', padding: '6px 12px', borderRadius: '4px', cursor: currentPath.length === 0 ? 'default' : 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <ArrowLeft size={16} />
            </button>
            <button 
              onClick={refreshFS}
              style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'var(--text-primary)', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              🔄
            </button>
          </div>

          <div style={{ flex: 1, background: 'rgba(0,0,0,0.2)', padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--glass-border)', fontSize: '14px', color: 'var(--text-secondary)' }}>
            C:/{currentPath.join('/')}
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <label style={{ background: 'var(--primary)', border: 'none', color: 'white', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}>
              <Download size={16} style={{ transform: 'rotate(180deg)' }} /> Upload
              <input type="file" style={{ display: 'none' }} onChange={handleFileUpload} />
            </label>
            <button 
              onClick={() => setIsCreating(true)}
              style={{ background: 'var(--primary)', border: 'none', color: 'white', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}
            >
              <Plus size={16} /> New
            </button>
            <button 
              onClick={handleDelete}
              disabled={!selectedItem}
              style={{ background: selectedItem ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.05)', border: 'none', color: selectedItem ? '#ef4444' : 'var(--text-secondary)', padding: '6px 12px', borderRadius: '4px', cursor: selectedItem ? 'pointer' : 'default', display: 'flex', alignItems: 'center' }}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Files Grid */}
        <div style={{ flex: 1, padding: '24px', display: 'flex', alignContent: 'flex-start', flexWrap: 'wrap', gap: '24px', overflowY: 'auto' }}>
          
          {isCreating && (
            <div style={{ width: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              {newItemType === 'folder' ? <Folder size={32} color="#60a5fa" /> : <FileText size={32} color="#94a3b8" />}
              <input 
                autoFocus
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCreate();
                  if (e.key === 'Escape') setIsCreating(false);
                }}
                style={{ width: '100%', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--primary)', color: 'white', padding: '4px', borderRadius: '4px', fontSize: '12px', textAlign: 'center' }}
                placeholder="Name..."
              />
              <select 
                value={newItemType} 
                onChange={(e) => setNewItemType(e.target.value)}
                style={{ width: '100%', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--glass-border)', color: 'white', padding: '2px', borderRadius: '4px', fontSize: '10px' }}
              >
                <option value="folder">Folder</option>
                <option value="file">File</option>
              </select>
            </div>
          )}

          {Object.entries(currentFolder).map(([name, item]) => (
            <div 
              key={name}
              onClick={() => setSelectedItem(name)}
              onDoubleClick={() => {
                if (item.type === 'folder') {
                  handleNavigate(name);
                } else if (name.endsWith('.png') || name.endsWith('.jpg')) {
                  const imgWindow = window.open('', '_blank');
                  imgWindow.document.write(`<img src="${item.content}" style="max-width:100%;" />`);
                } else if (name.endsWith('.stl')) {
                  // In a real OS we would call openApp('stl', { filePath: [...currentPath, name] })
                  // For now, let's just trigger a global event or if the user clicks it, it tells them to open the 3D Viewer app.
                  alert(`To view ${name}, open the 3D Viewer app from the start menu!`);
                } else if (name.endsWith('.pdf')) {
                  alert(`To view/edit ${name}, open the PDF Editor from the start menu!`);
                } else {
                  alert(`Opening file: ${name}\n\nContent:\n${item.content}`);
                }
              }}
              style={{ 
                width: '100px', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                gap: '8px', 
                padding: '12px 8px',
                borderRadius: '8px',
                cursor: 'pointer',
                background: selectedItem === name ? 'rgba(255,255,255,0.1)' : 'transparent',
                border: `1px solid ${selectedItem === name ? 'var(--primary)' : 'transparent'}`
              }}
              onMouseOver={(e) => {
                if (selectedItem !== name) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
              }}
              onMouseOut={(e) => {
                if (selectedItem !== name) e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {getIconForType(item.type, name)}
              <div style={{ fontSize: '12px', textAlign: 'center', wordBreak: 'break-all', userSelect: 'none' }}>
                {name}
              </div>
            </div>
          ))}

          {Object.keys(currentFolder).length === 0 && !isCreating && (
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: 'var(--text-secondary)' }}>
              This folder is empty
            </div>
          )}
        </div>
        
        {/* Status Bar */}
        <div style={{ height: '32px', borderTop: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', padding: '0 16px', fontSize: '12px', color: 'var(--text-secondary)', backgroundColor: 'rgba(0,0,0,0.2)' }}>
          {Object.keys(currentFolder).length} items {selectedItem ? `| Selected: ${selectedItem}` : ''}
        </div>
      </div>
    </div>
  );
};

export default FileManager;
