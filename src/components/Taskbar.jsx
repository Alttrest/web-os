import React, { useState, useEffect } from 'react';
import { Menu, Wifi, Battery, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Taskbar = ({ windows, activeWindowId, taskbarStyle, onWindowClick, openApp, APPS, toggleSystemPanel }) => {
  const [time, setTime] = useState(new Date());
  const [isAppDrawerOpen, setIsAppDrawerOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const dockApps = ['calculator', 'calendar', 'gamecenter', 'settings', 'browser'];
  const isDock = taskbarStyle === 'dock';

  const renderAppDrawerMenu = (bottomOffset = false) => (
    <AnimatePresence>
      {isAppDrawerOpen && (
        <motion.div
          initial={{ opacity: 0, y: bottomOffset ? 10 : -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: bottomOffset ? 10 : -10 }}
          style={{
            position: 'absolute',
            top: bottomOffset ? 'auto' : '40px',
            bottom: bottomOffset ? '56px' : 'auto',
            left: '0px',
            width: '220px',
            backgroundColor: 'rgba(20, 20, 25, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '8px',
            padding: '6px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            maxHeight: '400px',
            overflowY: 'auto'
          }}
        >
          {Object.values(APPS).map(app => (
            <div
              key={app.id}
              onClick={() => {
                openApp(app.id);
                setIsAppDrawerOpen(false);
              }}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 10px',
                cursor: 'pointer', borderRadius: '6px', color: '#ccc', transition: 'all 0.1s'
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#fff'; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#ccc'; }}
            >
              {React.cloneElement(app.icon, { size: 14 })}
              <span style={{ fontSize: '13px', fontWeight: 400 }}>{app.title}</span>
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );

  const renderSystemTray = () => (
    <div 
      style={{ display: 'flex', alignItems: 'center', gap: '24px', cursor: 'pointer' }}
      onClick={toggleSystemPanel}
    >
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: '13px', fontWeight: 600 }}>
          {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </div>
        {!isDock && (
          <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>
            {time.toLocaleDateString('en-US')}
          </div>
        )}
        {isDock && (
          <div style={{ fontSize: '13px', fontWeight: 600 }}>
            {time.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }).toUpperCase()}
          </div>
        )}
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Wifi size={16} />
        <Battery size={16} />
        <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#333', overflow: 'hidden', border: '1px solid #555' }}>
          <User size={16} style={{ margin: '3px' }} />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {isDock ? (
        <>
          {/* Top Bar - macOS / ZenithOS Style */}
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, height: '48px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '0 24px', color: '#e5e5e5', zIndex: 999,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative' }}>
              <Menu 
                size={20} color={isAppDrawerOpen ? "#fff" : "var(--primary)"} 
                style={{ cursor: 'pointer', transition: 'color 0.2s' }} 
                onClick={() => setIsAppDrawerOpen(!isAppDrawerOpen)}
              />
              <strong style={{ fontSize: '18px', fontWeight: 600, color: 'var(--primary)', letterSpacing: '1px' }}>
                alttre.os
              </strong>
              {renderAppDrawerMenu(false)}
            </div>
            {renderSystemTray()}
          </div>

          {/* Minimalist Dock - Pill Shape */}
          <div style={{
            position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
            display: 'flex', alignItems: 'center', gap: '24px', padding: '12px 32px',
            backgroundColor: 'rgba(20, 20, 25, 0.6)', backdropFilter: 'blur(10px)',
            borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)', zIndex: 1000
          }}>
            {dockApps.map(appId => {
              const app = APPS[appId];
              const isActive = windows.some(w => w.appId === appId);
              return (
                <div key={appId} onClick={() => openApp(appId)}
                  style={{
                    position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center',
                    cursor: 'pointer', color: isActive ? '#fff' : '#888', transition: 'color 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
                  onMouseOut={(e) => { if (!isActive) e.currentTarget.style.color = '#888'; }}
                >
                  {app.icon}
                  {isActive && (
                    <motion.div layoutId="active-dot" style={{ position: 'absolute', bottom: '-8px', width: '4px', height: '4px', backgroundColor: 'var(--primary)', borderRadius: '50%', boxShadow: '0 0 8px var(--primary)' }} />
                  )}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* Classic Taskbar - Windows Style */
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, height: '52px',
          backgroundColor: 'rgba(15, 15, 20, 0.85)', backdropFilter: 'blur(15px)',
          borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex',
          justifyContent: 'space-between', alignItems: 'center', padding: '0 16px',
          color: '#e5e5e5', zIndex: 1000
        }}>
          {/* Left - Start Button & Apps */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', height: '100%', position: 'relative' }}>
            <div 
              onClick={() => setIsAppDrawerOpen(!isAppDrawerOpen)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px',
                backgroundColor: isAppDrawerOpen ? 'rgba(255,255,255,0.1)' : 'transparent',
                borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s'
              }}
              onMouseOver={(e) => { if (!isAppDrawerOpen) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; }}
              onMouseOut={(e) => { if (!isAppDrawerOpen) e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              <Menu size={20} color="var(--primary)" />
            </div>
            {renderAppDrawerMenu(true)}
            
            <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255,255,255,0.1)' }} />

            {/* Pinned/Open Apps */}
            <div style={{ display: 'flex', gap: '4px', height: '100%', alignItems: 'center' }}>
              {dockApps.map(appId => {
                const app = APPS[appId];
                const isActive = windows.some(w => w.appId === appId);
                return (
                  <div key={appId} onClick={() => openApp(appId)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: '40px', height: '40px', borderRadius: '8px',
                      backgroundColor: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
                      cursor: 'pointer', color: isActive ? 'var(--primary)' : '#888',
                      borderBottom: isActive ? '2px solid var(--primary)' : '2px solid transparent',
                      transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = isActive ? 'rgba(255,255,255,0.05)' : 'transparent'}
                  >
                    {app.icon}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right - System Tray */}
          {renderSystemTray()}
        </div>
      )}
    </>
  );
};

export default Taskbar;
