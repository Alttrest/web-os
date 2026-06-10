import React from 'react';
import { Settings as SettingsIcon, Monitor, Wifi, Battery, User } from 'lucide-react';

const Settings = () => {
  return (
    <div style={{ display: 'flex', height: '100%', backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden' }}>
      {/* Sidebar */}
      <div style={{ width: '200px', backgroundColor: '#f1f5f9', borderRight: '1px solid #e2e8f0', padding: '16px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 600, color: '#334155', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <SettingsIcon size={18} /> Settings
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {['System', 'Display', 'Network', 'Battery', 'Accounts'].map((item, i) => (
            <button key={item} style={{ 
              display: 'flex', alignItems: 'center', gap: '8px', 
              padding: '8px 12px', border: 'none', 
              backgroundColor: i === 0 ? 'var(--primary)' : 'transparent', 
              color: i === 0 ? 'white' : '#475569', 
              borderRadius: '6px', textAlign: 'left', cursor: 'pointer',
              fontWeight: i === 0 ? 500 : 400
            }}>
              {i === 0 && <Monitor size={16} />}
              {i === 1 && <Monitor size={16} />}
              {i === 2 && <Wifi size={16} />}
              {i === 3 && <Battery size={16} />}
              {i === 4 && <User size={16} />}
              {item}
            </button>
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div style={{ flex: 1, padding: '24px', backgroundColor: '#fff', color: '#334155' }}>
        <h2 style={{ margin: '0 0 24px 0', fontSize: '24px', fontWeight: 600 }}>System Properties</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '14px' }}>OS Version</div>
              <div style={{ color: '#64748b', fontSize: '13px' }}>Alttre.s ios (Build 1002)</div>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '14px' }}>Processor</div>
              <div style={{ color: '#64748b', fontSize: '13px' }}>Virtual Web Engine v8</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '14px' }}>Memory</div>
              <div style={{ color: '#64748b', fontSize: '13px' }}>8 GB DDR4 (Simulated)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
