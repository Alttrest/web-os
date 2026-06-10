import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FluidWallpaper from './FluidWallpaper';
import ParticlesWallpaper from './ParticlesWallpaper';

const SetupScreen = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState({
    name: '',
    wallpaper: 'particles',
    taskbar: 'dock',
    customImage: null,
    cursor: 'default',
    customCursor: null
  });

  const nextStep = (e) => {
    e?.preventDefault();
    if (step === 1 && !config.name.trim()) return;
    if (step < 4) {
      setStep(s => s + 1);
    } else {
      onComplete(config);
    }
  };

  const handleCustomUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setConfig({ ...config, wallpaper: 'custom', customImage: e.target.result });
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  // Live Cursor Preview during Step 4
  useEffect(() => {
    if (step === 4) {
      if (config.cursor === 'interactive-ring') {
        const svgCursor = `url("data:image/svg+xml;utf8,<svg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><circle cx='12' cy='12' r='8' fill='none' stroke='%2300f0ff' stroke-width='2'/><circle cx='12' cy='12' r='2' fill='%2300f0ff'/><line x1='12' y1='0' x2='12' y2='6' stroke='%2300f0ff' stroke-width='2' stroke-linecap='round'/><line x1='12' y1='18' x2='12' y2='24' stroke='%2300f0ff' stroke-width='2' stroke-linecap='round'/><line x1='0' y1='12' x2='6' y2='12' stroke='%2300f0ff' stroke-width='2' stroke-linecap='round'/><line x1='18' y1='12' x2='24' y2='12' stroke='%2300f0ff' stroke-width='2' stroke-linecap='round'/></svg>") 12 12, crosshair`;
        document.body.style.cursor = svgCursor;
      } else {
        document.body.style.cursor = config.cursor;
      }
    } else {
      document.body.style.cursor = 'default';
    }
  }, [step, config.cursor]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        backgroundColor: '#050505',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        zIndex: 9999, color: 'white' // removed static cursor: 'default' so body cursor applies
      }}
    >
      {/* Live Preview Backgrounds */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        {config.wallpaper === 'zenith' && <div style={{ width: '100%', height: '100%', background: 'radial-gradient(circle at 50% 50%, #1a1a24 0%, #050505 100%)' }} />}
        {config.wallpaper === 'fluid' && <FluidWallpaper />}
        {config.wallpaper === 'particles' && <ParticlesWallpaper />}
        {config.wallpaper === 'custom' && config.customImage && <div style={{ width: '100%', height: '100%', backgroundImage: `url(${config.customImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />}
        
        {/* Subtle overlay so text is still readable */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.4)', pointerEvents: 'none' }} />
      </div>

      <div style={{ position: 'absolute', top: '40px', display: 'flex', gap: '16px', zIndex: 2 }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{
            width: '12px', height: '12px', borderRadius: '50%',
            backgroundColor: step >= i ? 'var(--primary, #00f0ff)' : 'rgba(255,255,255,0.2)',
            boxShadow: step >= i ? '0 0 10px var(--primary, #00f0ff)' : 'none',
            transition: 'all 0.3s'
          }} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.form 
            key="step1"
            onSubmit={nextStep}
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '480px', zIndex: 2 }}
          >
            <h2 style={{ fontSize: '28px', fontWeight: 500, marginBottom: '8px' }}>Welcome</h2>
            <p style={{ fontSize: '15px', color: '#ccc', marginBottom: '32px' }}>Let's set up your environment. What's your name?</p>
            
            <input
              type="text" value={config.name} onChange={(e) => setConfig({ ...config, name: e.target.value })}
              placeholder="Your Name" autoFocus
              style={{
                width: '100%', backgroundColor: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff', fontSize: '18px', textAlign: 'center', padding: '16px', borderRadius: '12px',
                outline: 'none', transition: 'all 0.3s', backdropFilter: 'blur(10px)'
              }}
              onFocus={(e) => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = '0 0 15px rgba(0, 240, 255, 0.2)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
            />
            <button type="submit" disabled={!config.name.trim()} style={btnStyle(config.name.trim())}>Continue</button>
          </motion.form>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '700px', zIndex: 2 }}
          >
            <h2 style={{ fontSize: '28px', fontWeight: 500, marginBottom: '8px' }}>Wallpaper Engine</h2>
            <p style={{ fontSize: '15px', color: '#ccc', marginBottom: '32px' }}>Choose your background (Preview active).</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '100%' }}>
              <SelectionCard 
                title="Zenith Dark" desc="Static clean gradient"
                active={config.wallpaper === 'zenith'} 
                onClick={() => setConfig({ ...config, wallpaper: 'zenith' })} 
              />
              <SelectionCard 
                title="RGB Fluid" desc="Interactive colorful trails"
                active={config.wallpaper === 'fluid'} 
                onClick={() => setConfig({ ...config, wallpaper: 'fluid' })} 
              />
              <SelectionCard 
                title="3D Particles" desc="Interactive star network"
                active={config.wallpaper === 'particles'} 
                onClick={() => setConfig({ ...config, wallpaper: 'particles' })} 
              />
              <SelectionCard 
                title="Custom Image" desc="Upload local wallpaper"
                active={config.wallpaper === 'custom'} 
                onClick={handleCustomUpload} 
              />
            </div>
            <button onClick={nextStep} style={btnStyle(true)}>Continue</button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '500px', zIndex: 2 }}
          >
            <h2 style={{ fontSize: '28px', fontWeight: 500, marginBottom: '8px' }}>Taskbar Layout</h2>
            <p style={{ fontSize: '15px', color: '#ccc', marginBottom: '32px' }}>Choose your workflow style (Preview active below).</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '100%' }}>
              <SelectionCard 
                title="Classic (Windows)" desc="Full width bottom bar"
                active={config.taskbar === 'classic'} 
                onClick={() => setConfig({ ...config, taskbar: 'classic' })} 
              />
              <SelectionCard 
                title="Dock (macOS)" desc="Centered floating capsule"
                active={config.taskbar === 'dock'} 
                onClick={() => setConfig({ ...config, taskbar: 'dock' })} 
              />
            </div>
            <button onClick={nextStep} style={btnStyle(true)}>Continue</button>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div 
            key="step4"
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '600px', zIndex: 2 }}
          >
            <h2 style={{ fontSize: '28px', fontWeight: 500, marginBottom: '8px' }}>Cursor Style</h2>
            <p style={{ fontSize: '15px', color: '#ccc', marginBottom: '32px' }}>Choose your pointer (Live Preview active).</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '100%' }}>
              <SelectionCard 
                title="Default" desc="Standard pointer"
                active={config.cursor === 'default'} 
                onClick={() => setConfig({ ...config, cursor: 'default' })} 
              />
              <SelectionCard 
                title="Crosshair" desc="Precision targeting"
                active={config.cursor === 'crosshair'} 
                onClick={() => setConfig({ ...config, cursor: 'crosshair' })} 
              />
              <SelectionCard 
                title="Interactive Ring" desc="Neon blast on click (Recommended)"
                active={config.cursor === 'interactive-ring'} 
                onClick={() => setConfig({ ...config, cursor: 'interactive-ring' })} 
              />
              <SelectionCard 
                title="Cell" desc="Spreadsheet style cross"
                active={config.cursor === 'cell'} 
                onClick={() => setConfig({ ...config, cursor: 'cell' })} 
              />
            </div>
            <button onClick={nextStep} style={btnStyle(true)}>Finish Setup</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live Preview for Taskbar/Dock */}
      <AnimatePresence>
        {step >= 3 && config.taskbar === 'dock' && (
          <motion.div
            initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
            style={{
              position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
              display: 'flex', alignItems: 'center', gap: '24px', padding: '12px 32px',
              backgroundColor: 'rgba(20, 20, 25, 0.6)', backdropFilter: 'blur(10px)',
              borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)', zIndex: 3, pointerEvents: 'none'
            }}
          >
            {[1,2,3,4,5].map(i => (
              <div key={i} style={{ width: '24px', height: '24px', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
            ))}
          </motion.div>
        )}
        
        {step >= 3 && config.taskbar === 'classic' && (
          <motion.div
            initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '52px',
              backgroundColor: 'rgba(15, 15, 20, 0.85)', backdropFilter: 'blur(15px)',
              borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex',
              justifyContent: 'space-between', alignItems: 'center', padding: '0 16px', zIndex: 3, pointerEvents: 'none'
            }}
          >
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '4px', backgroundColor: 'var(--primary, #00f0ff)', opacity: 0.8 }} />
              <div style={{ width: '32px', height: '32px', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
              <div style={{ width: '32px', height: '32px', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.3)' }} />
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.3)' }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const SelectionCard = ({ title, desc, active, onClick }) => (
  <div 
    onClick={onClick}
    style={{
      padding: '24px', backgroundColor: active ? 'rgba(0, 240, 255, 0.15)' : 'rgba(0,0,0,0.5)',
      border: active ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.1)',
      borderRadius: '16px', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center',
      backdropFilter: 'blur(10px)',
      boxShadow: active ? '0 0 20px rgba(0, 240, 255, 0.2)' : 'none'
    }}
  >
    <div style={{ fontSize: '18px', fontWeight: 500, color: active ? 'var(--primary)' : '#fff', marginBottom: '8px' }}>{title}</div>
    <div style={{ fontSize: '13px', color: '#bbb' }}>{desc}</div>
  </div>
);

const btnStyle = (active) => ({
  marginTop: '40px',
  backgroundColor: 'var(--primary, #00f0ff)', color: '#000',
  border: 'none', padding: '14px 40px', borderRadius: '12px',
  fontSize: '15px', fontWeight: 600, cursor: 'pointer',
  opacity: active ? 1 : 0, pointerEvents: active ? 'auto' : 'none',
  boxShadow: '0 4px 15px rgba(0, 240, 255, 0.3)', transition: 'all 0.2s'
});

export default SetupScreen;
