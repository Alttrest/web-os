import React, { useState, useEffect } from 'react';
import { Play, Square, RotateCcw } from 'lucide-react';

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [stopwatch, setStopwatch] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [tab, setTab] = useState('clock');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => setStopwatch(s => s + 10), 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatStopwatch = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#1e293b', color: 'white', borderRadius: '8px', overflow: 'hidden' }}>
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <button 
          onClick={() => setTab('clock')}
          style={{ flex: 1, padding: '12px', background: tab === 'clock' ? 'rgba(255,255,255,0.1)' : 'transparent', border: 'none', color: 'white', cursor: 'pointer', fontWeight: 500 }}
        >
          Clock
        </button>
        <button 
          onClick={() => setTab('stopwatch')}
          style={{ flex: 1, padding: '12px', background: tab === 'stopwatch' ? 'rgba(255,255,255,0.1)' : 'transparent', border: 'none', color: 'white', cursor: 'pointer', fontWeight: 500 }}
        >
          Stopwatch
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        {tab === 'clock' ? (
          <>
            <div style={{ fontSize: '48px', fontWeight: 200, fontFamily: 'monospace', letterSpacing: '4px', textShadow: '0 0 20px var(--primary)' }}>
              {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
            <div style={{ fontSize: '18px', color: '#888', marginTop: '16px', letterSpacing: '2px' }}>
              {time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: '56px', fontWeight: 300, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
              {formatStopwatch(stopwatch)}
            </div>
            <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
              <button 
                onClick={() => setIsRunning(!isRunning)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '50%', background: isRunning ? '#ef4444' : 'var(--primary)', color: 'white', border: 'none', cursor: 'pointer' }}
              >
                {isRunning ? <Square size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
              </button>
              <button 
                onClick={() => { setIsRunning(false); setStopwatch(0); }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', cursor: 'pointer' }}
              >
                <RotateCcw size={20} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Clock;
