import React, { useRef, useState, useEffect } from 'react';
import { Camera, Image as ImageIcon, Video, RotateCcw } from 'lucide-react';
import { writeFile } from '../utils/vfs';

const CameraApp = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState('');
  const [lastPhoto, setLastPhoto] = useState(null);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      setHasPermission(true);
      setError('');
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Camera error:", err);
      setError('Could not access camera. Please allow permissions.');
      setHasPermission(false);
    }
  };

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const imageDataUrl = canvas.toDataURL('image/png');
    setLastPhoto(imageDataUrl);
    
    // Save to VFS
    const filename = `photo_${Date.now()}.png`;
    writeFile(['Images'], filename, imageDataUrl);
    alert(`Saved to Images/${filename} in File Manager!`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#000', color: 'white' }}>
      
      {/* Viewport */}
      <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {error ? (
          <div style={{ color: '#ef4444', textAlign: 'center', padding: '20px' }}>
            <Video size={48} style={{ marginBottom: '16px' }} />
            <p>{error}</p>
            <button 
              onClick={startCamera}
              style={{ marginTop: '16px', padding: '8px 16px', background: 'var(--primary)', border: 'none', borderRadius: '4px', color: 'white', cursor: 'pointer' }}
            >
              <RotateCcw size={16} style={{ display: 'inline', marginRight: '8px' }} />
              Retry
            </button>
          </div>
        ) : (
          <>
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} 
            />
            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </>
        )}
      </div>

      {/* Controls */}
      <div style={{ height: '80px', backgroundColor: '#111', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {lastPhoto ? (
            <img src={lastPhoto} alt="Last captured" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <ImageIcon size={24} color="#555" />
          )}
        </div>

        <button 
          onClick={takePhoto}
          disabled={!hasPermission}
          style={{ 
            width: '64px', height: '64px', borderRadius: '50%', 
            backgroundColor: 'transparent', border: '4px solid white', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            cursor: hasPermission ? 'pointer' : 'default',
            opacity: hasPermission ? 1 : 0.5
          }}
        >
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'white' }} />
        </button>

        <div style={{ width: '48px' }} /> {/* Spacer */}
      </div>

    </div>
  );
};

export default CameraApp;
