import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_LOGS = [
  "Initializing WebOS Kernel v2.0.0...",
  "[ OK ] Mounted virtual filesystem",
  "[ OK ] Loading graphics drivers (Framer Motion)",
  "[ OK ] Starting Window Manager",
  "[ OK ] Initializing audio subsystem",
  "[ OK ] Establishing connection to virtual network",
  "Mounting applications...",
  "Loading Calculator, Terminal, Notepad...",
  "Loading 2048, Music Player, Paint...",
  "Applying dark theme CSS variables...",
  "[ OK ] Desktop Environment Ready",
  "Starting user session..."
];

const BootScreen = ({ onBootComplete }) => {
  const [logs, setLogs] = useState([]);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    // 1. Simulate fast boot logs
    let currentLogIndex = 0;
    const logInterval = setInterval(() => {
      if (currentLogIndex < BOOT_LOGS.length) {
        setLogs(prev => [...prev, BOOT_LOGS[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(logInterval);
        // After logs, switch to logo
        setTimeout(() => setShowLogo(true), 400);
      }
    }, 100); // 100ms per log = 1.2s total logs

    // 2. Boot finishes after 3.5 seconds total
    const bootTimer = setTimeout(() => {
      onBootComplete();
    }, 3500);

    return () => {
      clearInterval(logInterval);
      clearTimeout(bootTimer);
    };
  }, [onBootComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        color: 'white',
        overflow: 'hidden'
      }}
    >
      <AnimatePresence mode="wait">
        {!showLogo ? (
          <motion.div
            key="logs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              fontFamily: 'monospace',
              fontSize: '14px',
              color: '#22c55e',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              alignItems: 'flex-start'
            }}
          >
            {logs.map((log, idx) => (
              <div key={idx} style={{ 
                opacity: idx === logs.length - 1 ? 1 : 0.7,
                textShadow: '0 0 8px rgba(34, 197, 94, 0.4)'
              }}>
                {log}
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="logo"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            {/* Advanced Glowing Logo */}
            <div style={{
              position: 'relative',
              width: '100px',
              height: '100px',
              marginBottom: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* Outer Glow */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '30px',
                  background: 'linear-gradient(135deg, transparent 40%, #3b82f6, #8b5cf6)',
                  opacity: 0.5,
                  filter: 'blur(8px)'
                }}
              />
              {/* Inner Logo Box */}
              <div style={{
                position: 'relative',
                width: '80px',
                height: '80px',
                borderRadius: '24px',
                background: 'linear-gradient(135deg, #1e293b, #0f172a)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'inset 0 0 20px rgba(255,255,255,0.05), 0 0 40px rgba(59, 130, 246, 0.3)'
              }}>
                <span style={{ fontSize: '36px', fontWeight: 800, background: 'linear-gradient(to right, #60a5fa, #c084fc)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                  A.s
                </span>
              </div>
            </div>

            <h1 style={{ 
              fontSize: '28px', 
              fontWeight: 300, 
              letterSpacing: '8px', 
              marginBottom: '40px',
              background: 'linear-gradient(to right, #ffffff, #94a3b8)',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }}>
              ALTTRE.S IOS
            </h1>

            {/* macOS style sleek loading spinner/bar */}
            <div style={{
              width: '200px',
              height: '2px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '2px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <motion.div 
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  width: '50%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)'
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BootScreen;
