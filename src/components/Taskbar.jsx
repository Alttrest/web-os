import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { motion } from 'framer-motion';

const Taskbar = ({ windows, activeWindowId, onWindowClick, openApp, APPS }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Convert APPS object to array for mapping in dock
  const appKeys = Object.keys(APPS);

  return (
    <>
      {/* Top Menu Bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '32px',
        background: 'rgba(15, 23, 42, 0.4)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        zIndex: 9999,
        color: 'white',
        fontSize: '13px',
        fontWeight: 500
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <strong style={{ cursor: 'pointer' }} onClick={() => openApp('about')}>Alttre.s ios</strong>
          <span style={{ opacity: 0.8 }}>File</span>
          <span style={{ opacity: 0.8 }}>Edit</span>
          <span style={{ opacity: 0.8 }}>View</span>
          <span style={{ opacity: 0.8 }}>Window</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span>{formatTime(time)}</span>
        </div>
      </div>

      {/* macOS style Dock */}
      <div style={{
        position: 'fixed',
        bottom: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '8px 12px',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '24px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        zIndex: 9999
      }}>
        
        {/* Render all available apps as Dock icons */}
        {appKeys.map(appId => {
          const app = APPS[appId];
          const isOpen = windows.some(w => w.appId === appId);
          const isActive = activeWindowId === windows.find(w => w.appId === appId)?.id;
          
          return (
            <div key={appId} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
              <motion.button
                onClick={() => {
                  const win = windows.find(w => w.appId === appId);
                  if (win) {
                    if (win.isMinimized) {
                      onWindowClick(win.id); // Unminimize
                    } else if (isActive) {
                      onWindowClick(win.id); // Minimize if active
                    } else {
                      onWindowClick(win.id); // Focus
                    }
                  } else {
                    openApp(appId);
                  }
                }}
                whileHover={{ scale: 1.2, y: -10 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}
              >
                {/* Scale up the original desktop icon size slightly for the dock */}
                {React.cloneElement(app.desktopIcon, { size: 28 })}
              </motion.button>
              
              {/* Indicator dot if app is open */}
              {isOpen && (
                <div style={{
                  position: 'absolute',
                  bottom: '-6px',
                  width: '4px',
                  height: '4px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  opacity: isActive ? 1 : 0.5,
                  boxShadow: isActive ? '0 0 8px white' : 'none'
                }} />
              )}
            </div>
          );
        })}

      </div>
    </>
  );
};

export default Taskbar;
