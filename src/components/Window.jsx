import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Square, Maximize2 } from 'lucide-react';

const Window = ({ 
  window, 
  onClose, 
  onMinimize, 
  onMaximize, 
  onFocus, 
  isActive,
  children 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragConstraintsRef = useRef(null);
  
  // Base style for the window
  const windowStyle = {
    position: 'absolute',
    top: window.y,
    left: window.x,
    width: window.isMaximized ? '100vw' : window.width,
    height: window.isMaximized ? 'calc(100vh - var(--taskbar-height))' : window.height,
    zIndex: window.zIndex,
    display: window.isMinimized ? 'none' : 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    borderRadius: window.isMaximized ? '0' : '12px',
    transition: isDragging ? 'none' : 'width 0.2s, height 0.2s, border-radius 0.2s, top 0.2s, left 0.2s',
    ...(window.isMaximized && { top: 0, left: 0 })
  };

  return (
    <motion.div
      className={`glass ${isActive ? 'ring-1 ring-primary/50' : ''}`}
      style={{
        ...windowStyle,
        boxShadow: isActive ? '0 12px 48px 0 rgba(0,0,0,0.45)' : 'var(--glass-shadow)',
      }}
      drag={!window.isMaximized}
      dragMomentum={false}
      dragElastic={0}
      onDragStart={() => {
        setIsDragging(true);
        onFocus(window.id);
      }}
      onDragEnd={() => setIsDragging(false)}
      dragHandleClassName="window-header"
      onMouseDown={() => onFocus(window.id)}
    >
      {/* Window Header */}
      <div 
        className="window-header"
        style={{
          height: 'var(--window-header-height)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 12px',
          background: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
          borderBottom: '1px solid var(--glass-border)',
          cursor: window.isMaximized ? 'default' : 'grab',
        }}
        onDoubleClick={() => onMaximize(window.id)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 500 }}>
          {window.icon}
          <span>{window.title}</span>
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={(e) => { e.stopPropagation(); onMinimize(window.id); }}
            style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '4px' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Minus size={16} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onMaximize(window.id); }}
            style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '4px' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            {window.isMaximized ? <Square size={14} /> : <Maximize2 size={14} />}
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(window.id); }}
            style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '4px' }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--danger)'; e.currentTarget.style.color = 'white'; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--text-primary)'; }}
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div 
        style={{ 
          flex: 1, 
          overflow: 'auto', 
          position: 'relative',
          backgroundColor: 'rgba(15, 23, 42, 0.4)', // Slightly darker than glass for content area
          padding: '16px'
        }}
        onPointerDown={(e) => e.stopPropagation()} // Prevent dragging from content
      >
        {children}
      </div>
    </motion.div>
  );
};

export default Window;
