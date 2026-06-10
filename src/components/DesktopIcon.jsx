import React from 'react';

const DesktopIcon = ({ label, icon, onClick, onDoubleClick }) => {
  return (
    <div
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80px',
        height: '90px',
        padding: '8px',
        borderRadius: '8px',
        cursor: 'pointer',
        gap: '8px',
        transition: 'background-color 0.2s',
      }}
      onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
    >
      <div 
        style={{ 
          width: '48px', 
          height: '48px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(4px)',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          color: 'var(--text-primary)'
        }}
      >
        {icon}
      </div>
      <span 
        style={{ 
          fontSize: '12px', 
          textAlign: 'center', 
          color: 'white',
          textShadow: '0 1px 2px rgba(0,0,0,0.8)',
          fontWeight: 500
        }}
      >
        {label}
      </span>
    </div>
  );
};

export default DesktopIcon;
