import React, { useEffect, useRef } from 'react';

const FluidWallpaper = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let hue = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    const mouse = { x: null, y: null };
    
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      for (let i = 0; i < 3; i++) {
        particles.push(new Particle(mouse.x, mouse.y));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 15 + 5;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `hsl(${hue}, 100%, 50%)`;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
      }
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const handleParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].size <= 0.2) {
          particles.splice(i, 1);
          i--;
        }
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.1)'; // Fade effect for trails
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      handleParticles();
      hue += 2;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
        backgroundColor: '#0a0a0f',
        zIndex: 0,
        pointerEvents: 'none' // Don't block clicks to desktop
      }}
    />
  );
};

export default FluidWallpaper;
