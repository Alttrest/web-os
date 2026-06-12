import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, Calendar, Gamepad2, Settings, Globe } from 'lucide-react';

const DockPreview = () => {
  const mockApps = [
    { icon: <Calculator size={20} />, label: 'Calculator' },
    { icon: <Calendar size={20} />, label: 'Calendar' },
    { icon: <Gamepad2 size={20} />, label: 'Games' },
    { icon: <Settings size={20} />, label: 'Settings' },
    { icon: <Globe size={20} />, label: 'Browser' },
  ];

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      style={{
        position: 'absolute',
        bottom: '36px',
        left: 0,
        right: 0,
        margin: '0 auto',
        width: 'fit-content',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        padding: '10px 24px',
        backgroundColor: 'rgba(15, 15, 20, 0.5)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
        zIndex: 10,
        pointerEvents: 'none',
      }}
    >
      {mockApps.map((app, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            color: 'rgba(255, 255, 255, 0.8)',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          }}
        >
          {app.icon}
        </div>
      ))}
    </motion.div>
  );
};

export default DockPreview;
