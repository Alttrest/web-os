import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Sun, Zap, Cpu, MemoryStick, PenLine } from 'lucide-react';

const BaseWidget = ({ children, initialX, initialY, title }) => (
  <motion.div
    drag
    dragMomentum={false}
    initial={{ x: initialX, y: initialY }}
    style={{
      position: 'absolute',
      backgroundColor: 'rgba(20, 20, 25, 0.4)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      borderRadius: '20px',
      padding: '20px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      color: 'white',
      cursor: 'grab',
      zIndex: 1,
      pointerEvents: 'auto',
      display: 'flex',
      flexDirection: 'column'
    }}
    whileDrag={{ cursor: 'grabbing', scale: 1.02, zIndex: 999, boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
  >
    {title && (
      <div style={{ fontSize: '12px', fontWeight: 600, color: '#888', marginBottom: '16px', letterSpacing: '1px', textTransform: 'uppercase' }}>
        {title}
      </div>
    )}
    {children}
  </motion.div>
);

const WeatherWidget = () => (
  <BaseWidget initialX={40} initialY={100} title="Weather">
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
      <div style={{ position: 'relative', width: '48px', height: '48px' }}>
        <Sun size={48} color="#FFD700" style={{ position: 'absolute', top: -12, left: -12, opacity: 1, zIndex: 1 }} />
        <Cloud size={48} color="#ffffff" fill="#ffffff" style={{ position: 'absolute', top: 0, left: 0, zIndex: 2 }} />
      </div>
      <div style={{ marginLeft: '10px' }}>
        <div style={{ fontSize: '36px', fontWeight: 200, lineHeight: 1 }}>24°</div>
        <div style={{ fontSize: '14px', color: 'var(--primary, #00f0ff)', marginTop: '4px' }}>Partly Cloudy</div>
        <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>Istanbul, TR</div>
      </div>
    </div>
  </BaseWidget>
);

const SystemStatsWidget = () => {
  const [cores, setCores] = useState('?');
  const [ram, setRam] = useState('?');

  useEffect(() => {
    setCores(navigator.hardwareConcurrency || '?');
    setRam(navigator.deviceMemory ? `${navigator.deviceMemory}GB` : '?');
  }, []);

  return (
    <BaseWidget initialX={40} initialY={260} title="System">
      <div style={{ display: 'flex', gap: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div style={{ position: 'relative', width: '60px', height: '60px', borderRadius: '50%', border: '4px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div 
              animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', borderTop: '4px solid var(--primary, #00f0ff)', borderRight: '4px solid transparent', borderBottom: '4px solid transparent', borderLeft: '4px solid transparent' }} 
            />
            <Cpu size={20} color="#fff" />
          </div>
          <div style={{ fontSize: '16px', fontWeight: 500 }}>{cores}</div>
          <div style={{ fontSize: '10px', color: '#888' }}>CORES</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div style={{ position: 'relative', width: '60px', height: '60px', borderRadius: '50%', border: '4px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div 
              animate={{ rotate: -360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', borderTop: '4px solid #ff00ff', borderRight: '4px solid transparent', borderBottom: '4px solid transparent', borderLeft: '4px solid transparent' }} 
            />
            <MemoryStick size={20} color="#fff" />
          </div>
          <div style={{ fontSize: '16px', fontWeight: 500 }}>{ram}</div>
          <div style={{ fontSize: '10px', color: '#888' }}>RAM</div>
        </div>
      </div>
    </BaseWidget>
  );
};

const StickyNoteWidget = () => (
  <BaseWidget initialX={40} initialY={440} title="Quick Note">
    <div style={{ position: 'relative' }}>
      <PenLine size={16} color="var(--primary, #00f0ff)" style={{ position: 'absolute', top: 0, right: 0 }} />
      <textarea 
        placeholder="Write something..."
        style={{
          width: '180px', height: '100px', backgroundColor: 'transparent',
          border: 'none', color: '#fff', fontSize: '14px', resize: 'none',
          outline: 'none', fontFamily: 'inherit'
        }}
        onPointerDownCapture={(e) => e.stopPropagation()} // allows selecting text without dragging
      />
    </div>
  </BaseWidget>
);

const Widgets = () => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
      <WeatherWidget />
      <SystemStatsWidget />
      <StickyNoteWidget />
    </div>
  );
};

export default Widgets;
