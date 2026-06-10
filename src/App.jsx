import React, { useState, useEffect } from 'react';
import { 
  Info, Cloud, Globe, Gamepad2, 
  Calculator as CalcIcon, Terminal as TerminalIcon, FileText, 
  Calendar as CalendarIcon, Clock as ClockIcon, Grid, 
  Music, Palette, Settings as SettingsIcon, Dices
} from 'lucide-react';
import Window from './components/Window';
import Taskbar from './components/Taskbar';
import BootScreen from './components/BootScreen';
import { AnimatePresence, motion } from 'framer-motion';

// Apps
import About from './apps/About';
import Weather from './apps/Weather';
import Browser from './apps/Browser';
import TicTacToe from './apps/TicTacToe';
import Memory from './apps/Memory';
import Calculator from './apps/Calculator';
import Terminal from './apps/Terminal';
import Notepad from './apps/Notepad';
import Calendar from './apps/Calendar';
import Clock from './apps/Clock';
import Game2048 from './apps/Game2048';
import MusicPlayer from './apps/MusicPlayer';
import Paint from './apps/Paint';
import Settings from './apps/Settings';
import RNG from './apps/RNG';

// Available Applications
const APPS = {
  about: {
    id: 'about', title: 'About Alttre.s ios',
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
  game2048: {
    id: 'game2048', title: '2048',
    icon: <Grid size={16} />, desktopIcon: <Grid size={24} />,
    component: <Game2048 />, defaultWidth: 350, defaultHeight: 450
  },
  tictactoe: {
    id: 'tictactoe', title: 'Tic Tac Toe',
    icon: <Gamepad2 size={16} />, desktopIcon: <Gamepad2 size={24} />,
    component: <TicTacToe />, defaultWidth: 350, defaultHeight: 450
  },
  memory: {
    id: 'memory', title: 'Memory Game',
    icon: <Gamepad2 size={16} />, desktopIcon: <Gamepad2 size={24} />,
    component: <Memory />, defaultWidth: 400, defaultHeight: 500
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
  rng: {
    id: 'rng', title: 'Dice & Coin',
    icon: <Dices size={16} />, desktopIcon: <Dices size={24} />,
    component: <RNG />, defaultWidth: 500, defaultHeight: 300
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
  }
};

function App() {
  const [windows, setWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);
  const [maxZIndex, setMaxZIndex] = useState(10);
  const [isBooting, setIsBooting] = useState(true);

  // Open the About app by default
  useEffect(() => {
    if (!isBooting) {
      openApp('about');
    }
  }, [isBooting]);

  const openApp = (appId) => {
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

  return (
    <>
      <AnimatePresence>
        {isBooting && (
          <BootScreen key="boot-screen" onBootComplete={() => setIsBooting(false)} />
        )}
      </AnimatePresence>

      <div className="desktop-bg" onClick={() => setActiveWindowId(null)} style={{ display: isBooting ? 'none' : 'block' }}>
        {/* Windows Area */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }}>
        <AnimatePresence>
          {windows.map(window => (
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
                onClose={closeWindow}
                onMinimize={toggleMinimize}
                onMaximize={toggleMaximize}
                onFocus={focusWindow}
              >
                {window.component}
              </Window>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Taskbar (Dock & Top Menu) */}
      <Taskbar 
        windows={windows} 
        activeWindowId={activeWindowId} 
        onWindowClick={(id) => {
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
      />
      </div>
    </>
  );
}

export default App;
