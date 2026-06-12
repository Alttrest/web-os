import React, { useState, useEffect, useCallback } from 'react';
import { RotateCcw, Trophy } from 'lucide-react';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const INITIAL_SPEED = 150;

const Snake = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 15, y: 5 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const generateFood = useCallback((currentSnake) => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
      // Check if food is on snake
      const onSnake = currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
      if (!onSnake) break;
    }
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
    setFood(generateFood(INITIAL_SNAKE));
  };

  const handleKeyDown = (e) => {
    // Prevent default scrolling for arrow keys
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
    }

    setDirection(prevDir => {
      switch (e.key) {
        case 'ArrowUp':
          return prevDir.y !== 1 ? { x: 0, y: -1 } : prevDir;
        case 'ArrowDown':
          return prevDir.y !== -1 ? { x: 0, y: 1 } : prevDir;
        case 'ArrowLeft':
          return prevDir.x !== 1 ? { x: -1, y: 0 } : prevDir;
        case 'ArrowRight':
          return prevDir.x !== -1 ? { x: 1, y: 0 } : prevDir;
        case ' ': // Spacebar to pause
          setIsPaused(p => !p);
          return prevDir;
        default:
          return prevDir;
      }
    });
  };

  useEffect(() => {
    if (gameOver || isPaused) return;

    const moveSnake = () => {
      setSnake(prevSnake => {
        const head = prevSnake[0];
        const newHead = {
          x: head.x + direction.x,
          y: head.y + direction.y
        };

        // Check wall collision
        if (
          newHead.x < 0 || 
          newHead.x >= GRID_SIZE || 
          newHead.y < 0 || 
          newHead.y >= GRID_SIZE
        ) {
          setGameOver(true);
          return prevSnake;
        }

        // Check self collision
        if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Check food collision
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(s => {
            const newScore = s + 10;
            if (newScore > highScore) setHighScore(newScore);
            return newScore;
          });
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop(); // Remove tail if no food eaten
        }

        return newSnake;
      });
    };

    const gameInterval = setInterval(moveSnake, INITIAL_SPEED);
    return () => clearInterval(gameInterval);
  }, [direction, food, gameOver, isPaused, highScore, generateFood]);

  const containerRef = React.useRef(null);
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', color: 'var(--text-primary)', padding: '20px', outline: 'none' }}
    >
      <div style={{ marginBottom: '20px', textAlign: 'center', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>Score: {score}</div>
        <h2 style={{ fontSize: '24px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
          <Trophy size={24} color="var(--primary)" /> Snake
        </h2>
        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>High: {highScore}</div>
      </div>

      <div style={{
        position: 'relative',
        width: `${GRID_SIZE * CELL_SIZE}px`,
        height: `${GRID_SIZE * CELL_SIZE}px`,
        backgroundColor: 'var(--glass-bg)',
        border: '2px solid var(--glass-border)',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
      }}>
        {/* Food */}
        <div style={{
          position: 'absolute',
          left: `${food.x * CELL_SIZE}px`,
          top: `${food.y * CELL_SIZE}px`,
          width: `${CELL_SIZE}px`,
          height: `${CELL_SIZE}px`,
          backgroundColor: '#ef4444',
          borderRadius: '50%',
          boxShadow: '0 0 10px #ef4444'
        }} />

        {/* Snake */}
        {snake.map((segment, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: `${segment.x * CELL_SIZE}px`,
              top: `${segment.y * CELL_SIZE}px`,
              width: `${CELL_SIZE}px`,
              height: `${CELL_SIZE}px`,
              backgroundColor: index === 0 ? '#3b82f6' : '#60a5fa',
              borderRadius: index === 0 ? '4px' : '2px',
              border: '1px solid rgba(0,0,0,0.2)'
            }}
          />
        ))}

        {gameOver && (
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(4px)'
          }}>
            <h3 style={{ fontSize: '32px', color: '#ef4444', marginBottom: '16px' }}>Game Over!</h3>
            <button 
              onClick={resetGame}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 24px',
                background: 'var(--primary)',
                color: 'white',
                border: 'none',
                borderRadius: '24px',
                cursor: 'pointer',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)'
              }}
            >
              <RotateCcw size={18} /> Play Again
            </button>
          </div>
        )}

        {isPaused && !gameOver && (
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(2px)'
          }}>
            <h3 style={{ fontSize: '24px', color: 'white' }}>PAUSED</h3>
          </div>
        )}
      </div>

      <div style={{ marginTop: '20px', color: 'var(--text-secondary)', fontSize: '14px', textAlign: 'center' }}>
        Use Arrow Keys to move. Press Spacebar to pause.
      </div>
    </div>
  );
};

export default Snake;
