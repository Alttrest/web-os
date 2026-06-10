import React, { useRef, useState, useEffect } from 'react';
import { Eraser, PaintBucket, Trash2 } from 'lucide-react';

const Paint = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#ffffff');
  const [size, setSize] = useState(5);
  const [tool, setTool] = useState('brush'); // brush or eraser

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#0f172a'; // dark background
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    return { x, y };
  };

  const startDrawing = (e) => {
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(x, y);
    ctx.strokeStyle = tool === 'eraser' ? '#0f172a' : color;
    ctx.lineWidth = size;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.closePath();
      setIsDrawing(false);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#1e293b', borderRadius: '8px', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px', backgroundColor: '#334155', borderBottom: '1px solid #475569' }}>
        <input 
          type="color" 
          value={color} 
          onChange={(e) => { setColor(e.target.value); setTool('brush'); }} 
          style={{ cursor: 'pointer', border: 'none', background: 'none', width: '32px', height: '32px' }}
        />
        <input 
          type="range" 
          min="1" max="20" 
          value={size} 
          onChange={(e) => setSize(e.target.value)} 
          style={{ width: '100px' }}
        />
        <button 
          onClick={() => setTool('brush')}
          style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', background: tool === 'brush' ? 'var(--primary)' : 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          <PaintBucket size={16} /> Brush
        </button>
        <button 
          onClick={() => setTool('eraser')}
          style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', background: tool === 'eraser' ? 'var(--primary)' : 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          <Eraser size={16} /> Eraser
        </button>
        <button 
          onClick={clearCanvas}
          style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: 'auto' }}
        >
          <Trash2 size={16} /> Clear
        </button>
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        style={{ flex: 1, width: '100%', height: '100%', cursor: 'crosshair' }}
      />
    </div>
  );
};

export default Paint;
