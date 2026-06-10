import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WelcomeScreen = ({ name, onComplete }) => {
  const [step, setStep] = useState(0);

  const greetings = [
    "Hello", "Hola", "Bonjour", "Ciao", "Merhaba"
  ];

  useEffect(() => {
    // Cycle through greetings quickly
    if (step < greetings.length) {
      const timer = setTimeout(() => {
        setStep(s => s + 1);
      }, 600); // 0.6s per greeting
      return () => clearTimeout(timer);
    } else if (step === greetings.length) {
      // Show final "Welcome [Name]" for 2 seconds
      const timer = setTimeout(() => {
        setStep(s => s + 1);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      // Finish
      onComplete();
    }
  }, [step, greetings.length, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        color: 'white',
      }}
    >
      <AnimatePresence mode="wait">
        {step < greetings.length ? (
          <motion.div
            key={greetings[step]}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{
              fontSize: '48px',
              fontWeight: 200,
              fontFamily: 'serif',
              letterSpacing: '2px'
            }}
          >
            {greetings[step]}
          </motion.div>
        ) : step === greetings.length ? (
          <motion.div
            key="final-welcome"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px'
            }}
          >
            <h1 style={{ fontSize: '42px', fontWeight: 300, margin: 0, letterSpacing: '2px' }}>
              Welcome, <span style={{ color: 'var(--primary, #00f0ff)', fontWeight: 600 }}>{name}</span>
            </h1>
            <p style={{ fontSize: '16px', color: '#888', letterSpacing: '4px', margin: 0 }}>
              PREPARING WORKSPACE...
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
};

export default WelcomeScreen;
