import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Monitor, Wifi, Battery, User, Palette } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('Personalization');
  
  // System states
  const [accent, setAccent] = useState('#00f0ff');

  const changeAccent = (color) => {
    setAccent(color);
    document.documentElement.style.setProperty('--primary', color);
    
    // Quick hack to update elements that might have hardcoded #00f0ff
    // We will update the CSS var, and in a real app we'd use Context.
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
      if (el.style.color === 'rgb(0, 240, 255)') el.style.color = color;
      if (el.style.backgroundColor === 'rgb(0, 240, 255)') el.style.backgroundColor = color;
      if (el.style.borderColor === 'rgb(0, 240, 255)') el.style.borderColor = color;
    });
  };

  const changeWallpaper = (type) => {
    const bg = document.querySelector('.desktop-bg');
    if (!bg) return;
    
    if (type === 'zenith') {
      bg.style.backgroundColor = '#0d0d0f';
      bg.style.backgroundImage = 'radial-gradient(circle at 50% 50%, #15151a 0%, #08080a 100%)';
    } else if (type === 'pitch') {
      bg.style.backgroundColor = '#000000';
      bg.style.backgroundImage = 'none';
    } else if (type === 'ocean') {
      bg.style.backgroundColor = '#020617';
      bg.style.backgroundImage = 'radial-gradient(circle at 50% 50%, #0f172a 0%, #020617 100%)';
    }
  };

  return (
    <div style={{ display: 'flex', height: '100%', backgroundColor: '#1a1a1a', borderRadius: '8px', overflow: 'hidden', color: '#e5e5e5' }}>
      {/* Sidebar */}
      <div style={{ width: '200px', backgroundColor: '#121212', borderRight: '1px solid #333', padding: '16px' }}>
        <h3 style={{ margin: '0 0 24px 0', fontSize: '18px', fontWeight: 600, color: 'var(--primary, #00f0ff)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <SettingsIcon size={18} /> Settings
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {['Personalization', 'System', 'Network', 'Battery', 'Accounts'].map((item) => {
            const isActive = activeTab === item;
            return (
              <button key={item} onClick={() => setActiveTab(item)} style={{ 
                display: 'flex', alignItems: 'center', gap: '12px', 
                padding: '10px 12px', border: 'none', 
                backgroundColor: isActive ? 'rgba(255,255,255,0.05)' : 'transparent', 
                color: isActive ? 'white' : '#888', 
                borderRadius: '6px', textAlign: 'left', cursor: 'pointer',
                fontWeight: isActive ? 500 : 400,
                transition: 'all 0.2s'
              }}>
                {item === 'Personalization' && <Palette size={16} />}
                {item === 'System' && <Monitor size={16} />}
                {item === 'Network' && <Wifi size={16} />}
                {item === 'Battery' && <Battery size={16} />}
                {item === 'Accounts' && <User size={16} />}
                {item}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Content */}
      <div style={{ flex: 1, padding: '32px', backgroundColor: '#1a1a1a', overflowY: 'auto' }}>
        <h2 style={{ margin: '0 0 32px 0', fontSize: '24px', fontWeight: 600 }}>{activeTab}</h2>
        
        {activeTab === 'Personalization' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Accent Color */}
            <div>
              <h3 style={{ fontSize: '14px', color: '#888', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>Accent Color</h3>
              <div style={{ display: 'flex', gap: '16px' }}>
                {[
                  { name: 'Zenith Cyan', value: '#00f0ff' },
                  { name: 'Neon Purple', value: '#a855f7' },
                  { name: 'Crimson Red', value: '#ef4444' },
                  { name: 'Emerald Green', value: '#10b981' },
                  { name: 'Amber Gold', value: '#f59e0b' }
                ].map(c => (
                  <button 
                    key={c.value}
                    onClick={() => changeAccent(c.value)}
                    style={{
                      width: '40px', height: '40px', borderRadius: '50%',
                      backgroundColor: c.value, border: 'none', cursor: 'pointer',
                      boxShadow: accent === c.value ? `0 0 0 4px #1a1a1a, 0 0 0 6px ${c.value}` : 'none',
                      transition: 'all 0.2s'
                    }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Wallpaper */}
            <div>
              <h3 style={{ fontSize: '14px', color: '#888', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>Background Style</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                <button 
                  onClick={() => changeWallpaper('zenith')}
                  style={{ height: '80px', borderRadius: '8px', background: 'radial-gradient(circle at 50% 50%, #15151a 0%, #08080a 100%)', border: '1px solid #333', cursor: 'pointer', color: 'white', fontWeight: 500 }}
                >
                  Zenith
                </button>
                <button 
                  onClick={() => changeWallpaper('pitch')}
                  style={{ height: '80px', borderRadius: '8px', background: '#000000', border: '1px solid #333', cursor: 'pointer', color: 'white', fontWeight: 500 }}
                >
                  Pitch Black
                </button>
                <button 
                  onClick={() => changeWallpaper('ocean')}
                  style={{ height: '80px', borderRadius: '8px', background: 'radial-gradient(circle at 50% 50%, #0f172a 0%, #020617 100%)', border: '1px solid #333', cursor: 'pointer', color: 'white', fontWeight: 500 }}
                >
                  Deep Ocean
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'System' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '20px', fontWeight: 'bold' }}>a</div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 500 }}>System</div>
                <div style={{ color: '#888', fontSize: '13px', marginTop: '4px' }}>alttre.os (Build 1002)</div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', backgroundColor: '#262626', borderRadius: '12px', border: '1px solid #333' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '14px', color: '#fff' }}>Processor</div>
                <div style={{ color: '#888', fontSize: '13px', marginTop: '4px' }}>Virtual Web Engine v8</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', backgroundColor: '#262626', borderRadius: '12px', border: '1px solid #333' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '14px', color: '#fff' }}>Memory</div>
                <div style={{ color: '#888', fontSize: '13px', marginTop: '4px' }}>8 GB DDR4 (Simulated)</div>
              </div>
            </div>
          </div>
        )}
        
        {['Network', 'Battery', 'Accounts'].includes(activeTab) && (
          <div style={{ color: '#888', fontStyle: 'italic' }}>
            These settings are managed by the host browser and cannot be modified within the virtual environment.
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
