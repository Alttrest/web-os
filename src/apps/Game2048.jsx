import React, { useState, useEffect, useCallback } from 'react';

const Game2048 = () => {
  // Simple 2048 implementation for the web os
  const [board, setBoard] = useState(Array(16).fill(0));
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Initialize game
  useEffect(() => {
    resetGame();
  }, []);

  const addRandomTile = (currentBoard) => {
    const emptySpots = currentBoard.map((val, idx) => val === 0 ? idx : -1).filter(idx => idx !== -1);
    if (emptySpots.length === 0) return currentBoard;
    const randomSpot = emptySpots[Math.floor(Math.random() * emptySpots.length)];
    const newBoard = [...currentBoard];
    newBoard[randomSpot] = Math.random() < 0.9 ? 2 : 4;
    return newBoard;
  };

  const resetGame = () => {
    let newBoard = Array(16).fill(0);
    newBoard = addRandomTile(newBoard);
    newBoard = addRandomTile(newBoard);
    setBoard(newBoard);
    setScore(0);
    setGameOver(false);
  };

  const moveLeft = useCallback(() => {
    let newBoard = [...board];
    let newScore = score;
    let moved = false;

    for (let i = 0; i < 4; i++) {
      let row = newBoard.slice(i * 4, i * 4 + 4).filter(val => val !== 0);
      for (let j = 0; j < row.length - 1; j++) {
        if (row[j] === row[j + 1]) {
          row[j] *= 2;
          newScore += row[j];
          row.splice(j + 1, 1);
        }
      }
      const newRow = [...row, ...Array(4 - row.length).fill(0)];
      for (let j = 0; j < 4; j++) {
        if (newBoard[i * 4 + j] !== newRow[j]) moved = true;
        newBoard[i * 4 + j] = newRow[j];
      }
    }

    if (moved) {
      newBoard = addRandomTile(newBoard);
      setBoard(newBoard);
      setScore(newScore);
    }
  }, [board, score]);

  const moveRight = useCallback(() => {
    let newBoard = [...board];
    let newScore = score;
    let moved = false;

    for (let i = 0; i < 4; i++) {
      let row = newBoard.slice(i * 4, i * 4 + 4).filter(val => val !== 0);
      for (let j = row.length - 1; j > 0; j--) {
        if (row[j] === row[j - 1]) {
          row[j] *= 2;
          newScore += row[j];
          row.splice(j - 1, 1);
          j--;
        }
      }
      const newRow = [...Array(4 - row.length).fill(0), ...row];
      for (let j = 0; j < 4; j++) {
        if (newBoard[i * 4 + j] !== newRow[j]) moved = true;
        newBoard[i * 4 + j] = newRow[j];
      }
    }

    if (moved) {
      newBoard = addRandomTile(newBoard);
      setBoard(newBoard);
      setScore(newScore);
    }
  }, [board, score]);

  const moveUp = useCallback(() => {
    let newBoard = [...board];
    let newScore = score;
    let moved = false;

    for (let j = 0; j < 4; j++) {
      let col = [newBoard[j], newBoard[j + 4], newBoard[j + 8], newBoard[j + 12]].filter(val => val !== 0);
      for (let i = 0; i < col.length - 1; i++) {
        if (col[i] === col[i + 1]) {
          col[i] *= 2;
          newScore += col[i];
          col.splice(i + 1, 1);
        }
      }
      const newCol = [...col, ...Array(4 - col.length).fill(0)];
      for (let i = 0; i < 4; i++) {
        if (newBoard[i * 4 + j] !== newCol[i]) moved = true;
        newBoard[i * 4 + j] = newCol[i];
      }
    }

    if (moved) {
      newBoard = addRandomTile(newBoard);
      setBoard(newBoard);
      setScore(newScore);
    }
  }, [board, score]);

  const moveDown = useCallback(() => {
    let newBoard = [...board];
    let newScore = score;
    let moved = false;

    for (let j = 0; j < 4; j++) {
      let col = [newBoard[j], newBoard[j + 4], newBoard[j + 8], newBoard[j + 12]].filter(val => val !== 0);
      for (let i = col.length - 1; i > 0; i--) {
        if (col[i] === col[i - 1]) {
          col[i] *= 2;
          newScore += col[i];
          col.splice(i - 1, 1);
          i--;
        }
      }
      const newCol = [...Array(4 - col.length).fill(0), ...col];
      for (let i = 0; i < 4; i++) {
        if (newBoard[i * 4 + j] !== newCol[i]) moved = true;
        newBoard[i * 4 + j] = newCol[i];
      }
    }

    if (moved) {
      newBoard = addRandomTile(newBoard);
      setBoard(newBoard);
      setScore(newScore);
    }
  }, [board, score]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault(); // Prevent scrolling
      }
      if (gameOver) return;
      switch (e.key) {
        case 'ArrowUp': moveUp(); break;
        case 'ArrowDown': moveDown(); break;
        case 'ArrowLeft': moveLeft(); break;
        case 'ArrowRight': moveRight(); break;
        default: break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moveUp, moveDown, moveLeft, moveRight, gameOver]);

  const getColor = (value) => {
    const colors = {
      0: '#cbd5e1', 2: '#eee4da', 4: '#ede0c8', 8: '#f2b179',
      16: '#f59563', 32: '#f67c5f', 64: '#f65e3b', 128: '#edcf72',
      256: '#edcc61', 512: '#edc850', 1024: '#edc53f', 2048: '#edc22e'
    };
    return colors[value] || '#3c3a32';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f8fafc', height: '100%', padding: '16px', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '300px', marginBottom: '16px' }}>
        <div>
          <h2 style={{ margin: 0, color: '#475569', fontSize: '32px', fontWeight: 800 }}>2048</h2>
          <p style={{ margin: 0, color: '#64748b', fontSize: '12px' }}>Use arrow keys to move</p>
        </div>
        <div style={{ backgroundColor: '#475569', color: 'white', padding: '8px 16px', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '10px', textTransform: 'uppercase', opacity: 0.8 }}>Score</span>
          <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{score}</span>
        </div>
      </div>

      <div style={{ backgroundColor: '#94a3b8', padding: '8px', borderRadius: '8px', position: 'relative' }}>
        {gameOver && (
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255,255,255,0.7)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '32px', margin: 0, color: '#334155' }}>Game Over!</h3>
            <button onClick={resetGame} style={{ marginTop: '16px', padding: '8px 24px', backgroundColor: '#475569', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Try Again</button>
          </div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
          {board.map((cell, i) => (
            <div key={i} style={{ 
              width: '60px', height: '60px', 
              backgroundColor: getColor(cell), 
              color: cell > 4 ? 'white' : '#776e65',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: cell > 1000 ? '16px' : cell > 100 ? '20px' : '24px',
              fontWeight: 'bold', borderRadius: '4px'
            }}>
              {cell !== 0 ? cell : ''}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Game2048;
