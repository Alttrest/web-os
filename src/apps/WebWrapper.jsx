import React, { useState } from 'react';
import { RefreshCw, ExternalLink } from 'lucide-react';

const WebWrapper = ({ url, title }) => {
  const [iframeUrl, setIframeUrl] = useState(url);
  const [key, setKey] = useState(0); // To force reload

  const handleReload = () => {
    setKey(k => k + 1);
  };

  const openExternal = () => {
    window.open(url, '_blank');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#0d0d0f' }}>
      {/* Mini toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '8px 16px', backgroundColor: '#1a1a1a', borderBottom: '1px solid #333', gap: '12px' }}>
        <button onClick={handleReload} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <RefreshCw size={16} />
        </button>
        <span style={{ color: '#ccc', fontSize: '12px', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {iframeUrl}
        </span>
        <button onClick={openExternal} style={{ background: 'none', border: 'none', color: '#00f0ff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
          <ExternalLink size={14} /> Open in new tab
        </button>
      </div>

      {/* Warning message for iframe blocks */}
      <div style={{ position: 'absolute', bottom: '10px', left: '10px', fontSize: '10px', color: '#555', pointerEvents: 'none' }}>
        If it fails to load, the website might block iframe embedding. Use the "Open in new tab" button.
      </div>

      <div style={{ flex: 1, backgroundColor: 'white' }}>
        <iframe
          key={key}
          src={iframeUrl}
          title={title}
          style={{ width: '100%', height: '100%', border: 'none' }}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>
    </div>
  );
};

export default WebWrapper;
