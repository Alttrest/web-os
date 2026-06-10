import React, { useState } from 'react';
import { Globe, Search, RefreshCw, ArrowLeft, ArrowRight } from 'lucide-react';

const Browser = () => {
  const [url, setUrl] = useState('https://www.wikipedia.org/');
  const [inputUrl, setInputUrl] = useState('https://www.wikipedia.org/');
  const [loading, setLoading] = useState(false);

  const handleNavigate = (e) => {
    e.preventDefault();
    let finalUrl = inputUrl.trim();
    
    // Check if it's a domain (has a dot and no spaces)
    if (finalUrl.includes('.') && !finalUrl.includes(' ')) {
      if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
        finalUrl = 'https://' + finalUrl;
      }
      // Doğrudan URL'yi kullan (Proxy iptal edildi)
      setUrl(finalUrl);
    } else {
      // It's a search query, redirect to Bing Search (Bing allows iframe embed usually)
      finalUrl = `https://www.bing.com/search?q=${encodeURIComponent(finalUrl)}`;
      setUrl(finalUrl);
    }
    
    setLoading(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden' }}>
      {/* Browser Toolbar */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px', 
        padding: '12px', 
        backgroundColor: '#f1f5f9',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div style={{ display: 'flex', gap: '8px', color: '#64748b' }}>
          <ArrowLeft size={18} style={{ cursor: 'pointer' }} />
          <ArrowRight size={18} style={{ cursor: 'pointer', opacity: 0.5 }} />
          <RefreshCw size={18} style={{ cursor: 'pointer' }} onClick={() => setLoading(true)} />
        </div>
        
        <form 
          onSubmit={handleNavigate}
          style={{ 
            flex: 1, 
            display: 'flex', 
            alignItems: 'center', 
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '6px 16px',
            border: '1px solid #cbd5e1',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)'
          }}
        >
          <Search size={14} color="#94a3b8" style={{ marginRight: '8px' }} />
          <input 
            type="text" 
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            style={{ 
              border: 'none', 
              outline: 'none', 
              width: '100%', 
              fontSize: '14px',
              color: '#334155'
            }}
          />
        </form>
      </div>

      {/* Browser Content */}
      <div style={{ flex: 1, position: 'relative', backgroundColor: 'white' }}>
        {loading && (
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '3px', backgroundColor: 'var(--primary)', animation: 'loadingBar 1s ease-in-out' }} />
        )}
        <iframe 
          src={url} 
          style={{ width: '100%', height: '100%', border: 'none' }}
          title="Browser"
          onLoad={() => setLoading(false)}
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
      <style>
        {`
          @keyframes loadingBar {
            0% { width: 0%; }
            50% { width: 70%; }
            100% { width: 100%; opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};

export default Browser;
