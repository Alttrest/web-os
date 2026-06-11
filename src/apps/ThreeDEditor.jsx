import React, { useState, Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, TransformControls, Grid, Environment } from '@react-three/drei';
import { Box, Circle, Move, Maximize, RotateCw, Trash2, MousePointer2 } from 'lucide-react';
import { HexColorPicker } from 'react-colorful';

const SceneObject = ({ obj, isSelected, onSelect, transformMode }) => {
  const [mesh, setMesh] = useState(null);

  return (
    <group>
      <mesh
        ref={setMesh}
        position={obj.position}
        scale={obj.scale}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(obj.id);
        }}
      >
        {obj.type === 'box' ? <boxGeometry args={[1, 1, 1]} /> : <sphereGeometry args={[0.5, 32, 32]} />}
        <meshStandardMaterial color={obj.color} roughness={0.4} metalness={0.1} />
      </mesh>
      
      {isSelected && mesh && (
        <TransformControls object={mesh} mode={transformMode} />
      )}
    </group>
  );
};

const ThreeDEditor = () => {
  const [objects, setObjects] = useState([
    { id: 1, type: 'box', position: [0, 0.5, 0], scale: [1, 1, 1], color: '#3b82f6' }
  ]);
  const [selectedId, setSelectedId] = useState(1);
  const [transformMode, setTransformMode] = useState('translate'); // translate, scale, rotate
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleAddObject = (type) => {
    const newObj = {
      id: Date.now(),
      type,
      position: [Math.random() * 2 - 1, 0.5, Math.random() * 2 - 1],
      scale: [1, 1, 1],
      color: type === 'box' ? '#3b82f6' : '#ef4444'
    };
    setObjects([...objects, newObj]);
    setSelectedId(newObj.id);
  };

  const handleDelete = () => {
    setObjects(objects.filter(o => o.id !== selectedId));
    setSelectedId(null);
  };

  const handleChangeColor = (e) => {
    setObjects(objects.map(o => o.id === selectedId ? { ...o, color: e.target.value } : o));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#0f172a', color: 'white' }}>
      {/* Top Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(0,0,0,0.4)', gap: '16px', zIndex: 10 }}>
        
        {/* Add Objects */}
        <div style={{ display: 'flex', gap: '8px', borderRight: '1px solid rgba(255,255,255,0.1)', paddingRight: '16px' }}>
          <button onClick={() => handleAddObject('box')} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Box size={14} /> Add Box
          </button>
          <button onClick={() => handleAddObject('sphere')} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Circle size={14} /> Add Sphere
          </button>
        </div>

        {/* Transform Modes */}
        <div style={{ display: 'flex', gap: '4px', borderRight: '1px solid rgba(255,255,255,0.1)', paddingRight: '16px' }}>
          <button 
            onClick={() => setTransformMode('translate')} 
            style={{ background: transformMode === 'translate' ? 'var(--primary)' : 'transparent', border: '1px solid transparent', color: 'white', padding: '6px', borderRadius: '4px', cursor: 'pointer' }}
            title="Move (Yukarı/Aşağı/Sağa/Sola)"
          >
            <Move size={16} />
          </button>
          <button 
            onClick={() => setTransformMode('scale')} 
            style={{ background: transformMode === 'scale' ? 'var(--primary)' : 'transparent', border: '1px solid transparent', color: 'white', padding: '6px', borderRadius: '4px', cursor: 'pointer' }}
            title="Scale (Boyut Ayarla)"
          >
            <Maximize size={16} />
          </button>
          <button 
            onClick={() => setTransformMode('rotate')} 
            style={{ background: transformMode === 'rotate' ? 'var(--primary)' : 'transparent', border: '1px solid transparent', color: 'white', padding: '6px', borderRadius: '4px', cursor: 'pointer' }}
            title="Rotate (Döndür)"
          >
            <RotateCw size={16} />
          </button>
        </div>

        {/* Selected Object Properties */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flex: 1 }}>
          {selectedId ? (
            <>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center', borderRight: '1px solid rgba(255,255,255,0.1)', paddingRight: '16px', position: 'relative' }}>
                {['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7', '#ffffff', '#333333'].map(color => (
                  <button
                    key={color}
                    onClick={() => setObjects(objects.map(o => o.id === selectedId ? { ...o, color } : o))}
                    style={{
                      width: '20px', height: '20px', borderRadius: '50%', backgroundColor: color, padding: 0,
                      cursor: 'pointer', border: objects.find(o => o.id === selectedId)?.color === color ? '2px solid white' : '2px solid transparent',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.4)', transition: 'transform 0.1s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    title="Renk Seç"
                  />
                ))}
                
                {/* Modern Custom Color Picker */}
                <button 
                  onClick={() => setShowColorPicker(!showColorPicker)}
                  style={{
                    width: '20px', height: '20px', borderRadius: '50%', padding: 0, marginLeft: '4px',
                    cursor: 'pointer', border: '2px solid rgba(255,255,255,0.5)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.4)', transition: 'transform 0.1s',
                    background: 'conic-gradient(red, yellow, green, cyan, blue, magenta, red)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  title="Modern Renk Seçiciyi Aç"
                />

                {showColorPicker && (
                  <div style={{ position: 'absolute', top: '30px', right: '0', zIndex: 50, backgroundColor: '#1e293b', padding: '12px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px', fontWeight: 'bold' }}>
                      Özel Renk
                      <button onClick={() => setShowColorPicker(false)} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}>✕</button>
                    </div>
                    <HexColorPicker 
                      color={objects.find(o => o.id === selectedId)?.color || '#ffffff'} 
                      onChange={(color) => setObjects(objects.map(o => o.id === selectedId ? { ...o, color } : o))} 
                    />
                  </div>
                )}
              </div>
              <button onClick={handleDelete} style={{ background: 'transparent', border: 'none', color: '#ef4444', padding: '6px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Trash2 size={16} /> Sil
              </button>
            </>
          ) : (
            <span style={{ fontSize: '12px', color: '#888', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MousePointer2 size={14} /> Select an object to edit
            </span>
          )}
        </div>
      </div>

      {/* Viewport */}
      <div style={{ flex: 1, position: 'relative' }}>
        <Canvas shadows camera={{ position: [5, 5, 5], fov: 50 }} onPointerMissed={() => setSelectedId(null)}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          
          <Suspense fallback={null}>
            {objects.map(obj => (
              <SceneObject 
                key={obj.id} 
                obj={obj} 
                isSelected={obj.id === selectedId} 
                onSelect={setSelectedId} 
                transformMode={transformMode}
              />
            ))}
            <Grid infiniteGrid fadeDistance={20} sectionColor="#444" cellColor="#222" />
            <Environment preset="city" />
          </Suspense>
          
          {/* We use makeDefault so TransformControls can disable OrbitControls when dragging */}
          <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2 + 0.1} />
        </Canvas>
      </div>
    </div>
  );
};

export default ThreeDEditor;
