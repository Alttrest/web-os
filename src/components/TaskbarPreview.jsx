import React from 'react';
import { motion } from 'framer-motion';
import { Menu, Wifi, Battery, Calculator, Calendar, Gamepad2, Settings, Globe } from 'lucide-react';

const TaskbarPreview = () => {
  const mockApps = [
    { icon: <Calculator size={16} /> },
    { icon: <Calendar size={16} /> },
    { icon: <Gamepad2 size={16} /> },
    { icon: <Settings size={16} /> },
    { icon: <Globe size={16} /> },
  ];

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      style={{
        position: 'absolute',
        bottom: '12px',
        left: '12px',
        right: '12px',
        height: '48px',
        backgroundColor: 'rgba(15, 15, 20, 0.6)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 16px',
        zIndex: 10,
        pointerEvents: 'none',
      }}
    >
      {/* Left - Start Menu and Apps */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '6px', backgroundColor: 'rgba(0, 240, 255, 0.1)', border: '1px solid rgba(0, 240, 255, 0.2)' }}>
          <Menu size={16} color="#00f0ff" />
        </div>
        <div style={{ width: '1px', height: '18px', backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
        <div style={{ display: 'flex', gap: '6px' }}>
          {mockApps.map((app, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                color: 'rgba(255, 255, 255, 0.6)',
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
              }}
            >
              {app.icon}
            </div>
          ))}
        </div>
      </div>

      {/* Right - System Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(255, 255, 255, 0.7)' }}>
        <span style={{ fontSize: '12px', fontWeight: 600 }}>10:00 AM</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.8 }}>
          <Wifi size={14} />
          <Battery size={14} />
        </div>
      </div>
    </motion.div>
  );
};

export default TaskbarPreview;
