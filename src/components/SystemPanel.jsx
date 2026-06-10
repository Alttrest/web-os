import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, LayoutGrid, SlidersHorizontal, Clock as ClockIcon, Sun, Moon } from 'lucide-react';

const SystemPanel = ({ isOpen, brightness, setBrightness, username }) => {
  const [activeTab, setActiveTab] = useState('control'); // 'today', 'widgets', 'control', 'history'

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '320px',
            height: '100%',
            backgroundColor: '#262626',
            borderLeft: '1px solid rgba(255,255,255,0.05)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            color: '#e5e5e5',
            padding: '24px',
            boxShadow: '-10px 0 30px rgba(0,0,0,0.5)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 600, color: 'var(--primary)' }}>System Panel</h2>
            <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#888', letterSpacing: '1px' }}>{username || 'USER SESSION'}</p>
          </div>

          {/* Menu Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
            <MenuItem icon={<Calendar size={18} />} label="Today" active={activeTab === 'today'} onClick={() => setActiveTab('today')} />
            <MenuItem icon={<LayoutGrid size={18} />} label="Widgets" active={activeTab === 'widgets'} onClick={() => setActiveTab('widgets')} />
            <MenuItem icon={<SlidersHorizontal size={18} />} label="Control Center" active={activeTab === 'control'} onClick={() => setActiveTab('control')} />
            <MenuItem icon={<ClockIcon size={18} />} label="History" active={activeTab === 'history'} onClick={() => setActiveTab('history')} />
          </div>

          {/* Dynamic Content Area */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <AnimatePresence mode="wait">
              {activeTab === 'control' && (
                <motion.div key="control" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <div style={{ padding: '16px', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '12px', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <Sun size={18} color="var(--primary)" />
                      <span style={{ fontSize: '14px', fontWeight: 500 }}>Brightness</span>
                    </div>
                    <input 
                      type="range" min="30" max="100" 
                      value={brightness} onChange={(e) => setBrightness(e.target.value)}
                      style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
                    />
                  </div>
                  <div style={{ padding: '16px', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 500 }}>Volume</span>
                    <input type="range" min="0" max="100" defaultValue="75" style={{ width: '100%', accentColor: 'var(--primary)', marginTop: '12px', cursor: 'pointer' }} />
                  </div>
                </motion.div>
              )}
              {activeTab === 'today' && (
                <motion.div key="today" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} style={{ textAlign: 'center', padding: '32px 0', color: '#888' }}>
                  <Calendar size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                  <p>No events today.</p>
                </motion.div>
              )}
              {activeTab === 'widgets' && (
                <motion.div key="widgets" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} style={{ textAlign: 'center', padding: '32px 0', color: '#888' }}>
                  <LayoutGrid size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                  <p>Widgets coming soon...</p>
                </motion.div>
              )}
              {activeTab === 'history' && (
                <motion.div key="history" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} style={{ textAlign: 'center', padding: '32px 0', color: '#888' }}>
                  <ClockIcon size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                  <p>No recent activity.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* System Load Indicators */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <ProgressBar label="CPU LOAD" value="12%" percentage={12} color="var(--primary)" />
            <ProgressBar label="MEMORY" value="4.2 GB" percentage={52} color="#8b5cf6" />
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

const MenuItem = ({ icon, label, active, onClick }) => (
  <div 
    onClick={onClick}
    style={{
      display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 16px',
      cursor: 'pointer', borderRadius: '8px',
      borderRight: active ? '3px solid var(--primary)' : '3px solid transparent',
      color: active ? 'white' : '#888',
      backgroundColor: active ? 'rgba(0, 240, 255, 0.05)' : 'transparent',
      transition: 'all 0.2s',
    }}
    onMouseOver={(e) => { if (!active) e.currentTarget.style.color = 'white'; }}
    onMouseOut={(e) => { if (!active) e.currentTarget.style.color = '#888'; }}
  >
    {icon}
    <span style={{ fontSize: '14px', fontWeight: 500 }}>{label}</span>
  </div>
);

const ProgressBar = ({ label, value, percentage, color }) => (
  <div style={{ padding: '12px', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '10px', color: '#888', letterSpacing: '1px' }}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
    <div style={{ width: '100%', height: '4px', backgroundColor: '#333', borderRadius: '2px', overflow: 'hidden' }}>
      <div style={{ width: `${percentage}%`, height: '100%', backgroundColor: color, boxShadow: `0 0 10px ${color}` }} />
    </div>
  </div>
);

export default SystemPanel;
