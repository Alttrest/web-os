// Simple Web Audio API Synthesizer

let audioCtx = null;

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export const playClickSound = () => {
  try {
    const ctx = initAudio();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {
    console.error("Audio playback failed", e);
  }
};

export const playBootSound = () => {
  try {
    const ctx = initAudio();
    
    // Play a nice major chord (C E G C)
    const frequencies = [261.63, 329.63, 392.00, 523.25];
    
    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.value = freq;
      
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.1);
      // Fade out slowly
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      // Delay each note slightly for an arpeggio effect
      osc.start(ctx.currentTime + (i * 0.1));
      osc.stop(ctx.currentTime + 2.5);
    });
  } catch (e) {
    console.error("Audio playback failed", e);
  }
};
