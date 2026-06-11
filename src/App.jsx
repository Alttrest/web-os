import React, { useState, useEffect } from 'react';
import { 
  Info, Cloud, Globe, Gamepad2, 
  Calculator as CalcIcon, Terminal as TerminalIcon, FileText, 
  Calendar as CalendarIcon, Clock as ClockIcon, Grid, 
  Music, Palette, Settings as SettingsIcon, Dices, PlaySquare, Camera, Headphones, Folder, Box, Code, Cuboid
} from 'lucide-react';
import Window from './components/Window';
import Taskbar from './components/Taskbar';
import BootScreen from './components/BootScreen';
import SetupScreen from './components/SetupScreen';
import WelcomeScreen from './components/WelcomeScreen';
import SystemPanel from './components/SystemPanel';
import BsodScreen from './components/BsodScreen';
import FluidWallpaper from './components/FluidWallpaper';
import ParticlesWallpaper from './components/ParticlesWallpaper';
import Widgets from './components/Widgets';
import CursorEffects from './components/CursorEffects';
import { AnimatePresence, motion } from 'framer-motion';
import { playBootSound, playClickSound } from './utils/audio';

// Apps
import About from './apps/About';
import Weather from './apps/Weather';
import Browser from './apps/Browser';
import Calculator from './apps/Calculator';
import Terminal from './apps/Terminal';
import Notepad from './apps/Notepad';
import Calendar from './apps/Calendar';
import Clock from './apps/Clock';
import MusicPlayer from './apps/MusicPlayer';
import Paint from './apps/Paint';
import Settings from './apps/Settings';
import WebWrapper from './apps/WebWrapper';
import InstaClone from './apps/InstaClone';
import FileManager from './apps/FileManager';
import CameraApp from './apps/CameraApp';
import DevlogApp from './apps/DevlogApp';
import GameCenter from './apps/GameCenter';
import PdfApp from './apps/PdfApp';
import StlViewerApp from './apps/StlViewerApp';
import PythonIDE from './apps/PythonIDE';
import ThreeDEditor from './apps/ThreeDEditor';

// Desktop Clock Component (Analog)
const DesktopClock = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const secondsDegrees = ((time.getSeconds() / 60) * 360) + 90;
  const minsDegrees = ((time.getMinutes() / 60) * 360) + ((time.getSeconds() / 60) * 6) + 90;
  const hourDegrees = ((time.getHours() / 12) * 360) + ((time.getMinutes() / 60) * 30) + 90;

  return (
    <motion.div 
      drag 
      dragMomentum={false}
      style={{
        position: 'absolute', top: '40%', right: '8%', transform: 'translateY(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1,
        pointerEvents: 'auto', cursor: 'grab'
      }}
      whileDrag={{ cursor: 'grabbing', scale: 1.05, zIndex: 999 }}
    >
      {/* Analog Clock Face */}
      <div style={{
        position: 'relative', width: '200px', height: '200px',
        borderRadius: '50%', border: '1px solid rgba(255,255,255,0.05)',
        boxShadow: '0 0 40px rgba(0,0,0,0.5)',
        background: 'rgba(20,20,25,0.4)', backdropFilter: 'blur(8px)'
      }}>
        {/* Center Dot */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary)', zIndex: 10, boxShadow: '0 0 10px var(--primary)' }} />
        
        {/* Hour Hand */}
        <div style={{
          position: 'absolute', top: '50%', left: '20%', width: '30%', height: '4px',
          backgroundColor: '#ffffff', transformOrigin: '100%',
          transform: `translateY(-50%) rotate(${hourDegrees}deg)`, borderRadius: '4px', transition: 'all 0.05s'
        }} />
        
        {/* Minute Hand */}
        <div style={{
          position: 'absolute', top: '50%', left: '10%', width: '40%', height: '2px',
          backgroundColor: 'rgba(255,255,255,0.6)', transformOrigin: '100%',
          transform: `translateY(-50%) rotate(${minsDegrees}deg)`, borderRadius: '2px', transition: 'all 0.05s'
        }} />
        
        {/* Second Hand */}
        <div style={{
          position: 'absolute', top: '50%', left: '10%', width: '40%', height: '1px',
          backgroundColor: 'var(--primary)', transformOrigin: '100%',
          transform: `translateY(-50%) rotate(${secondsDegrees}deg)`, transition: 'all 0.05s cubic-bezier(0.1, 2.7, 0.58, 1)'
        }} />
      </div>
      
      <div style={{ fontSize: '16px', fontWeight: 300, color: '#888', letterSpacing: '6px', marginTop: '40px' }}>
        {time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).toUpperCase()}
      </div>
    </motion.div>
  );
};

// Available Applications
const APPS = {
  about: {
    id: 'about', title: 'About alttre.os',
    icon: <Info size={16} />, desktopIcon: <Info size={24} />,
    component: <About />, defaultWidth: 500, defaultHeight: 400
  },
  browser: {
    id: 'browser', title: 'Browser',
    icon: <Globe size={16} />, desktopIcon: <Globe size={24} />,
    component: <Browser />, defaultWidth: 800, defaultHeight: 500
  },
  calculator: {
    id: 'calculator', title: 'Calculator',
    icon: <CalcIcon size={16} />, desktopIcon: <CalcIcon size={24} />,
    component: <Calculator />, defaultWidth: 300, defaultHeight: 400
  },
  terminal: {
    id: 'terminal', title: 'Terminal',
    icon: <TerminalIcon size={16} />, desktopIcon: <TerminalIcon size={24} />,
    component: <Terminal />, defaultWidth: 600, defaultHeight: 400
  },
  files: {
    id: 'files', title: 'Files',
    icon: <Folder size={16} />, desktopIcon: <Folder size={24} />,
    component: <FileManager />, defaultWidth: 700, defaultHeight: 500
  },
  notepad: {
    id: 'notepad', title: 'Notepad',
    icon: <FileText size={16} />, desktopIcon: <FileText size={24} />,
    component: <Notepad />, defaultWidth: 500, defaultHeight: 400
  },
  calendar: {
    id: 'calendar', title: 'Calendar',
    icon: <CalendarIcon size={16} />, desktopIcon: <CalendarIcon size={24} />,
    component: <Calendar />, defaultWidth: 350, defaultHeight: 400
  },
  clock: {
    id: 'clock', title: 'Clock & Timer',
    icon: <ClockIcon size={16} />, desktopIcon: <ClockIcon size={24} />,
    component: <Clock />, defaultWidth: 350, defaultHeight: 300
  },
  gamecenter: {
    id: 'gamecenter', title: 'Game Center',
    icon: <Gamepad2 size={16} />, desktopIcon: <Gamepad2 size={24} />,
    component: <GameCenter />, defaultWidth: 600, defaultHeight: 500
  },
  music: {
    id: 'music', title: 'Lofi Player',
    icon: <Music size={16} />, desktopIcon: <Music size={24} />,
    component: <MusicPlayer />, defaultWidth: 400, defaultHeight: 300
  },
  paint: {
    id: 'paint', title: 'Paint',
    icon: <Palette size={16} />, desktopIcon: <Palette size={24} />,
    component: <Paint />, defaultWidth: 600, defaultHeight: 500
  },
  settings: {
    id: 'settings', title: 'Settings',
    icon: <SettingsIcon size={16} />, desktopIcon: <SettingsIcon size={24} />,
    component: <Settings />, defaultWidth: 600, defaultHeight: 400
  },
  weather: {
    id: 'weather', title: 'Live Weather',
    icon: <Cloud size={16} />, desktopIcon: <Cloud size={24} />,
    component: <Weather />, defaultWidth: 400, defaultHeight: 500
  },
  youtube: {
    id: 'youtube', title: 'YouTube',
    icon: <PlaySquare size={16} />, desktopIcon: <PlaySquare size={24} />,
    component: <WebWrapper url="https://www.youtube.com/embed/" title="YouTube" />, defaultWidth: 800, defaultHeight: 500
  },
  ytmusic: {
    id: 'ytmusic', title: 'YT Music',
    icon: <Headphones size={16} />, desktopIcon: <Headphones size={24} />,
    component: <WebWrapper url="https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG" title="YT Music" />, defaultWidth: 800, defaultHeight: 500
  },
  instagram: {
    id: 'instagram', title: 'Instagram',
    icon: <Camera size={16} />, desktopIcon: <Camera size={24} />,
    component: <InstaClone />, defaultWidth: 450, defaultHeight: 700
  },
  camera: {
    id: 'camera', title: 'Photo Booth',
    icon: <Camera size={16} />, desktopIcon: <Camera size={24} />,
    component: <CameraApp />, defaultWidth: 500, defaultHeight: 600
  },
  devlog: {
    id: 'devlog', title: 'Stardance Devlog',
    icon: <FileText size={16} />, desktopIcon: <FileText size={24} />,
    component: <DevlogApp />, defaultWidth: 600, defaultHeight: 500
  },
  pdf: {
    id: 'pdf', title: 'PDF Editor',
    icon: <FileText size={16} />, desktopIcon: <FileText size={24} />,
    component: <PdfApp />, defaultWidth: 800, defaultHeight: 600
  },
  stl: {
    id: 'stl', title: '3D Viewer',
    icon: <Box size={16} />, desktopIcon: <Box size={24} />,
    component: <StlViewerApp />, defaultWidth: 700, defaultHeight: 500
  },
  python: {
    id: 'python', title: 'Python IDE',
    icon: <Code size={16} />, desktopIcon: <Code size={24} />,
    component: <PythonIDE />, defaultWidth: 800, defaultHeight: 600
  },
  studio: {
    id: 'studio', title: '3D Studio',
    icon: <Cuboid size={16} />, desktopIcon: <Cuboid size={24} />,
    component: <ThreeDEditor />, defaultWidth: 900, defaultHeight: 600
  }
};

function App() {
  const [windows, setWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [maxZIndex, setMaxZIndex] = useState(10);
  const [isBooting, setIsBooting] = useState(true);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [isWelcoming, setIsWelcoming] = useState(false);
  const [username, setUsername] = useState('GUEST');
  const [isSystemPanelOpen, setIsSystemPanelOpen] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [hasFatalError, setHasFatalError] = useState(false);
  const [wallpaperType, setWallpaperType] = useState('zenith');
  const [taskbarStyle, setTaskbarStyle] = useState('dock');
  const [customWallpaper, setCustomWallpaper] = useState(null);
  const [cursorStyle, setCursorStyle] = useState('default');
  const [customCursor, setCustomCursor] = useState(null);

  // Apply Cursor
  useEffect(() => {
    if (cursorStyle === 'custom' && customCursor) {
      document.body.style.cursor = `url(${customCursor}), auto`;
    } else if (cursorStyle === 'interactive-ring') {
      const svgCursor = `url("data:image/svg+xml;utf8,<svg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><circle cx='12' cy='12' r='8' fill='none' stroke='%2300f0ff' stroke-width='2'/><circle cx='12' cy='12' r='2' fill='%2300f0ff'/><line x1='12' y1='0' x2='12' y2='6' stroke='%2300f0ff' stroke-width='2' stroke-linecap='round'/><line x1='12' y1='18' x2='12' y2='24' stroke='%2300f0ff' stroke-width='2' stroke-linecap='round'/><line x1='0' y1='12' x2='6' y2='12' stroke='%2300f0ff' stroke-width='2' stroke-linecap='round'/><line x1='18' y1='12' x2='24' y2='12' stroke='%2300f0ff' stroke-width='2' stroke-linecap='round'/></svg>") 12 12, crosshair`;
      document.body.style.cursor = svgCursor;
    } else {
      document.body.style.cursor = cursorStyle;
    }
  }, [cursorStyle, customCursor]);

  // Open the About app by default when desktop loads
  useEffect(() => {
    if (!isBooting && isSetupComplete && !isWelcoming) {
      openApp('about');
      playBootSound();
    }
  }, [isBooting, isSetupComplete, isWelcoming]);

  const openApp = (appId) => {
    playClickSound();
    const appInfo = APPS[appId];
    if (!appInfo) return;

    // Check if window is already open
    const existingWindow = windows.find(w => w.appId === appId);
    if (existingWindow) {
      focusWindow(existingWindow.id);
      if (existingWindow.isMinimized) {
        toggleMinimize(existingWindow.id);
      }
      return;
    }

    const newZIndex = maxZIndex + 1;
    setMaxZIndex(newZIndex);

    // Calculate center of screen
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    const startX = Math.max(0, (screenW - appInfo.defaultWidth) / 2 + (windows.length * 20)); 
    const startY = Math.max(32, (screenH - appInfo.defaultHeight) / 2 + (windows.length * 20)); // 32 offset for top bar

    const newWindow = {
      id: `${appId}-${Date.now()}`,
      appId,
      title: appInfo.title,
      icon: appInfo.icon,
      component: appInfo.component,
      isMinimized: false,
      isMaximized: false,
      zIndex: newZIndex,
      x: startX,
      y: startY,
      width: appInfo.defaultWidth,
      height: appInfo.defaultHeight,
    };

    setWindows([...windows, newWindow]);
    setActiveWindowId(newWindow.id);
  };

  const closeWindow = (id) => {
    setWindows(windows.filter(w => w.id !== id));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const toggleMinimize = (id) => {
    setWindows(windows.map(w => {
      if (w.id === id) {
        if (!w.isMinimized && activeWindowId === id) {
          // Minimizing active window
          setActiveWindowId(null);
        } else if (w.isMinimized) {
          // Unminimizing
          focusWindow(id);
        }
        return { ...w, isMinimized: !w.isMinimized };
      }
      return w;
    }));
  };

  const toggleMaximize = (id) => {
    focusWindow(id);
    setWindows(windows.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
  };

  const focusWindow = (id) => {
    if (activeWindowId === id) return;
    
    const newZIndex = maxZIndex + 1;
    setMaxZIndex(newZIndex);
    
    setWindows(windows.map(w => w.id === id ? { ...w, zIndex: newZIndex } : w));
    setActiveWindowId(id);
  };

  if (hasFatalError) {
    return <BsodScreen />;
  }

  return (
    <>
      {/* Global Cursor Click Effects */}
      <CursorEffects isActive={cursorStyle === 'interactive-ring'} />

      {/* Brightness Overlay */}
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        backgroundColor: 'black',
        opacity: 1 - (brightness / 100),
        pointerEvents: 'none',
        zIndex: 99999
      }} />

      <AnimatePresence>
        {isBooting && (
          <BootScreen key="boot-screen" onBootComplete={() => setIsBooting(false)} />
        )}
        {!isBooting && !isSetupComplete && (
          <SetupScreen key="setup-screen" onComplete={(config) => {
            setUsername(config.name.toUpperCase());
            setWallpaperType(config.wallpaper);
            setTaskbarStyle(config.taskbar);
            setCustomWallpaper(config.customImage);
            setCursorStyle(config.cursor);
            setCustomCursor(config.customCursor);
            setIsSetupComplete(true);
            setIsWelcoming(true);
          }} />
        )}
        {isWelcoming && (
          <WelcomeScreen key="welcome-screen" name={username} onComplete={() => setIsWelcoming(false)} />
        )}
      </AnimatePresence>

      <div className="desktop-bg" onClick={() => { setActiveWindowId(null); setIsSystemPanelOpen(false); }} style={{ display: (!isBooting && isSetupComplete && !isWelcoming) ? 'flex' : 'none' }}>
        
        {/* Dynamic Wallpaper Injection */}
        {wallpaperType === 'fluid' && <FluidWallpaper />}
        {wallpaperType === 'particles' && <ParticlesWallpaper />}
        {wallpaperType === 'custom' && customWallpaper && <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: `url(${customWallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />}

        <DesktopClock />
        <Widgets />

        {/* Windows Area */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }}>
        <AnimatePresence>
          {windows.map(window => {
            const appInfo = APPS[window.appId];
            return (
              <motion.div 
                key={window.id} 
                style={{ pointerEvents: 'auto', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Window
                  window={window}
                  isActive={activeWindowId === window.id}
                  taskbarStyle={taskbarStyle}
                  onClose={closeWindow}
                  onMinimize={toggleMinimize}
                  onMaximize={() => toggleMaximize(window.id)}
                  onFocus={() => focusWindow(window.id)}
                >
                  {React.cloneElement(appInfo.component, { triggerFatalError: () => setHasFatalError(true) })}
                </Window>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Taskbar (Dock & Top Menu) */}
      <Taskbar 
        windows={windows} 
        activeWindowId={activeWindowId} 
        taskbarStyle={taskbarStyle}
        onWindowClick={(id) => {
          playClickSound();
          const win = windows.find(w => w.id === id);
          if (win.isMinimized) {
            toggleMinimize(id);
          } else if (activeWindowId === id) {
            toggleMinimize(id);
          } else {
            focusWindow(id);
          }
        }} 
        openApp={openApp}
        APPS={APPS}
        toggleSystemPanel={() => setIsSystemPanelOpen(!isSystemPanelOpen)}
      />

      {/* Right Side System Panel */}
      <SystemPanel 
        isOpen={isSystemPanelOpen} 
        brightness={brightness} 
        setBrightness={setBrightness}
        username={username}
      />
      </div>
    </>
  );
}

export default App;
