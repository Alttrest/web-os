import React from 'react';
import { Info } from 'lucide-react';

const About = () => {
  return (
    <div style={{ color: 'var(--text-primary)', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <div style={{ 
          width: '64px', height: '64px', 
          background: 'linear-gradient(135deg, var(--primary) 0%, #8b5cf6 100%)',
          borderRadius: '16px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(59, 130, 246, 0.4)'
        }}>
          <Info size={32} color="white" />
        </div>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 600, margin: 0 }}>alttre.os</h1>
          <p style={{ color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>Version 2.0.0 (Web Edition)</p>
        </div>
      </div>
      
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.05)', 
        borderRadius: '8px', 
        padding: '16px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        flex: 1
      }}>
        <p style={{ marginBottom: '16px', lineHeight: 1.6 }}>
          Welcome to <strong>alttre.os</strong>! This is a modern, web-based operating system created for the Hack Club WebOS 1 mission.
        </p>
        <p style={{ marginBottom: '16px', lineHeight: 1.6 }}>
          It features a premium glassmorphism design, a fully functional window manager with draggable and resizable windows, and custom applications like Devlogs and Live Weather.
        </p>
        
        <h3 style={{ marginTop: '24px', marginBottom: '12px', fontSize: '16px', color: 'var(--primary)' }}>Features:</h3>
        <ul style={{ marginLeft: '20px', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
          <li>Premium UI with Glassmorphism</li>
          <li>Draggable & Resizable Window Manager</li>
          <li>Interactive Taskbar</li>
          <li>Weather App (Extra Feature)</li>
          <li>Built with React + Vite + Framer Motion</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
