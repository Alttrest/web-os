import React, { useState, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Center } from '@react-three/drei';
import { BoxGeometry, MeshStandardMaterial, Mesh } from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { Box } from 'lucide-react';
import { readFile } from '../utils/vfs';

// A simple fallback box if no STL is loaded
const FallbackBox = () => (
  <mesh>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="hotpink" />
  </mesh>
);

const StlModel = ({ url }) => {
  const [geometry, setGeometry] = useState(null);

  useEffect(() => {
    if (!url) return;
    
    const loader = new STLLoader();
    loader.load(
      url,
      (geo) => {
        setGeometry(geo);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      (error) => {
        console.error('An error happened loading STL', error);
      }
    );
  }, [url]);

  if (!geometry) return <FallbackBox />;

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color="#3b82f6" roughness={0.3} metalness={0.2} />
    </mesh>
  );
};

const StlViewerApp = ({ filePath }) => {
  const [stlUrl, setStlUrl] = useState(null);
  const [filename, setFilename] = useState('No File Selected');

  useEffect(() => {
    if (filePath) {
      // Assuming filePath is an array: ['Documents', 'model.stl']
      const name = filePath[filePath.length - 1];
      setFilename(name);
      
      const content = readFile(filePath.slice(0, -1), name);
      if (content) {
        // If content is base64 data URI, use it directly
        setStlUrl(content);
      }
    } else {
      // Load a sample STL from the web for demonstration
      setFilename('Sample Model (Default)');
      setStlUrl('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/models/stl/ascii/slotted_disk.stl');
    }
  }, [filePath]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setStlUrl(event.target.result);
      setFilename(file.name);
    };
    reader.readAsDataURL(file);
    e.target.value = null;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#0f172a', color: 'white' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(0,0,0,0.3)', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Box size={20} color="#3b82f6" style={{ marginRight: '12px' }} />
          <div style={{ fontWeight: 'bold' }}>3D Viewer - {filename}</div>
        </div>
        
        <label style={{ background: '#3b82f6', border: 'none', color: 'white', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>
          Upload .STL
          <input type="file" accept=".stl" style={{ display: 'none' }} onChange={handleFileUpload} />
        </label>
      </div>

      {/* 3D Canvas */}
      <div style={{ flex: 1, position: 'relative', cursor: 'grab' }} onMouseDown={(e) => e.target.style.cursor = 'grabbing'} onMouseUp={(e) => e.target.style.cursor = 'grab'}>
        <Canvas shadows camera={{ position: [0, 0, 150], fov: 50 }}>
          <Suspense fallback={null}>
            <Stage environment="city" intensity={0.6}>
              <Center>
                <StlModel url={stlUrl} />
              </Center>
            </Stage>
          </Suspense>
          <OrbitControls makeDefault autoRotate autoRotateSpeed={1} />
        </Canvas>

        {/* Overlay Instructions */}
        <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'rgba(0,0,0,0.6)', padding: '8px 16px', borderRadius: '20px', fontSize: '12px', backdropFilter: 'blur(4px)', pointerEvents: 'none' }}>
          Left Click: Rotate | Right Click: Pan | Scroll: Zoom
        </div>
      </div>
    </div>
  );
};

export default StlViewerApp;
