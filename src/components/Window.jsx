import React, { useState, useRef, useEffect } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { X, Minus, Square, Maximize2 } from 'lucide-react';
import { playClickSound } from '../utils/audio';

const Window = ({ 
  window, 
  onClose, 
  onMinimize, 
  onMaximize, 
  onFocus, 
  isActive,
  taskbarStyle,
  children 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const dragControls = useDragControls();
  
  // Local state for free resizing
  const [localSize, setLocalSize] = useState({ width: window.width, height: window.height });

  const startResize = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Ensure we focus the window when resizing begins
    onFocus(window.id);
    setIsResizing(true);

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = localSize.width;
    const startHeight = localSize.height;

    const onPointerMove = (moveEvent) => {
      setLocalSize({
        width: Math.max(300, startWidth + (moveEvent.clientX - startX)),
        height: Math.max(200, startHeight + (moveEvent.clientY - startY))
      });
    };

    const onPointerUp = () => {
      setIsResizing(false);
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
    };

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
  };

  // Sync if App.jsx forces a change (rare, usually only on init)
  useEffect(() => {
    setLocalSize({ width: window.width, height: window.height });
  }, [window.width, window.height]);
  
  const topOffset = taskbarStyle === 'dock' ? 48 : 0;
  const bottomOffset = taskbarStyle === 'dock' ? 0 : 52;

  // Base style for the window
  const windowStyle = {
    position: 'absolute',
    top: window.y,
    left: window.x,
    width: window.isMaximized ? '100vw' : localSize.width,
    height: window.isMaximized ? `calc(100vh - ${topOffset + bottomOffset}px)` : localSize.height,
    zIndex: window.zIndex,
    display: window.isMinimized ? 'none' : 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    borderRadius: window.isMaximized ? '0' : '12px',
    transition: isDragging ? 'none' : 'border-radius 0.2s, top 0.2s, left 0.2s', // Removed width/height from transition for smooth resize
    ...(window.isMaximized && { top: topOffset, left: 0 })
  };

  return (
    <motion.div
      className={`glass ${isActive ? 'ring-1 ring-primary/50' : ''} ${window.isMaximized ? 'maximized-window' : ''}`}
      style={{
        ...windowStyle,
        boxShadow: isActive ? '0 12px 48px 0 rgba(0,0,0,0.45)' : 'var(--glass-shadow)',
      }}
      drag={!window.isMaximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      onDragStart={() => {
        setIsDragging(true);
        onFocus(window.id);
      }}
      onDragEnd={() => setIsDragging(false)}
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
          touchAction: 'none' // Fixes touch dragging issues
        }}
        onPointerDown={(e) => {
          if (!window.isMaximized) {
            dragControls.start(e);
          }
        }}
        onDoubleClick={() => onMaximize(window.id)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 500 }}>
          {window.icon}
          <span>{window.title}</span>
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }} onPointerDown={(e) => e.stopPropagation()}>
          <button 
            onClick={(e) => { e.stopPropagation(); playClickSound(); onMinimize(window.id); }}
            style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '4px' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Minus size={16} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); playClickSound(); onMaximize(window.id); }}
            style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '4px' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            {window.isMaximized ? <Square size={14} /> : <Maximize2 size={14} />}
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); playClickSound(); onClose(window.id); }}
            style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', borderRadius: '4px' }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--danger)'; e.currentTarget.style.color = 'white'; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--text-primary)'; }}
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Invisible Overlay to block iframe/canvas pointer events during dragging or resizing */}
      {(isDragging || isResizing) && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, cursor: isResizing ? 'nwse-resize' : 'grabbing' }} />
      )}

      {/* Window Content */}
      <div 
        style={{ 
          flex: 1, 
          overflow: 'auto', 
          position: 'relative',
          backgroundColor: 'rgba(15, 23, 42, 0.4)', // Slightly darker than glass for content area
          padding: '16px' // padding creates padding, wait, in 3D studio padding might ruin the canvas? No, App.jsx or Window handles padding.
        }}
      >
        {children}
      </div>

      {/* Resize Handle */}
      {!window.isMaximized && (
        <div 
          onPointerDown={startResize}
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '24px',
            height: '24px',
            cursor: 'nwse-resize',
            zIndex: 50,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            padding: '4px',
            color: 'rgba(255,255,255,0.4)',
            borderBottomRightRadius: '12px'
          }}
          title="Yeniden Boyutlandır"
          onMouseOver={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.9)'}
          onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="21 15 21 21 15 21"></polyline>
            <line x1="21" y1="21" x2="15" y2="15"></line>
          </svg>
        </div>
      )}
    </motion.div>
  );
};

export default Window;
