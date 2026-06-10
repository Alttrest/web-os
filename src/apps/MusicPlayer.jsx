import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  // Reliable Lofi Radio Stream URL (Lofi Girl / Chillhop usually have open icecast streams, using a generic stable one)
  const STREAM_URL = "https://play.streamafrica.net/lofiradio";

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => {
          console.error("Autoplay prevented", e);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#09090b', color: 'white', borderRadius: '12px', overflow: 'hidden' }}>
      <audio ref={audioRef} src={STREAM_URL} preload="none" />
      
      {/* Visualizer / Art Mockup */}
      <div style={{ flex: 1, backgroundColor: '#18181b', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ 
          width: '120px', height: '120px', 
          borderRadius: '50%', 
          background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: isPlaying ? 'spin 10s linear infinite' : 'none',
          boxShadow: isPlaying ? '0 0 40px rgba(139, 92, 246, 0.4)' : 'none',
          transition: 'box-shadow 0.5s'
        }}>
          <Music size={48} color="white" />
        </div>
        
        {/* Animated Sound Waves */}
        {isPlaying && (
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0 20px', opacity: 0.2 }}>
            {Array.from({ length: 15 }).map((_, i) => (
              <div key={i} style={{ 
                width: '10px', backgroundColor: 'white',
                animation: `wave ${Math.random() * 0.5 + 0.5}s ease-in-out infinite alternate`
              }} />
            ))}
          </div>
        )}
      </div>
      
      {/* Controls */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>Lofi Hip Hop Radio</h3>
          <p style={{ margin: 0, color: '#a1a1aa', fontSize: '13px', marginTop: '4px' }}>Live Stream - Beats to relax/study to</p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px', marginTop: '8px' }}>
          <button 
            onClick={() => setIsMuted(!isMuted)}
            style={{ background: 'none', border: 'none', color: isMuted ? '#ef4444' : '#a1a1aa', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
          
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--primary)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white', boxShadow: '0 4px 16px rgba(59, 130, 246, 0.4)' }}
          >
            {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" style={{ marginLeft: '4px' }} />}
          </button>

          <div style={{ width: '24px' }}></div> {/* Spacer for balance */}
        </div>
      </div>
      <style>
        {`
          @keyframes spin { 100% { transform: rotate(360deg); } }
          @keyframes wave { 
            0% { height: 5px; } 
            100% { height: 40px; } 
          }
        `}
      </style>
    </div>
  );
};

export default MusicPlayer;
