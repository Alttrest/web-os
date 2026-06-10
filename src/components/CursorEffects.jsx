import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CursorEffects = ({ isActive }) => {
  const [clicks, setClicks] = useState([]);

  useEffect(() => {
    if (!isActive) return;

    const handleClick = (e) => {
      const newClick = { id: Date.now(), x: e.clientX, y: e.clientY };
      setClicks(prev => [...prev, newClick]);
      
      // Remove click effect after animation finishes
      setTimeout(() => {
        setClicks(prev => prev.filter(c => c.id !== newClick.id));
      }, 600);
    };

    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 999999 }}>
      <AnimatePresence>
        {clicks.map(click => (
          <motion.div
            key={click.id}
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              position: 'absolute',
              top: click.y - 20,
              left: click.x - 20,
              width: '40px',
              height: '40px',
              border: '2px solid var(--primary, #00f0ff)',
              borderRadius: '50%',
              boxShadow: '0 0 15px var(--primary, #00f0ff)'
            }}
          >
            {/* Particle splash */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{ 
                  x: Math.cos((i * 60) * Math.PI / 180) * 30, 
                  y: Math.sin((i * 60) * Math.PI / 180) * 30,
                  opacity: 0 
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{
                  position: 'absolute', top: '18px', left: '18px',
                  width: '4px', height: '4px', backgroundColor: '#fff',
                  borderRadius: '50%', boxShadow: '0 0 5px #fff'
                }}
              />
            ))}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CursorEffects;
