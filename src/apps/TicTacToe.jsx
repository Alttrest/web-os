import React, { useState } from 'react';
import { RotateCcw, Trophy } from 'lucide-react';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(square => square !== null);

  const handleClick = (i) => {
    if (board[i] || winner) return;
    const newBoard = [...board];
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', color: 'var(--text-primary)' }}>
      <div style={{ marginBottom: '24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <Trophy size={24} color="var(--primary)" /> Tic Tac Toe
        </h2>
        <div style={{ marginTop: '8px', fontSize: '16px', color: winner || isDraw ? 'var(--primary)' : 'var(--text-secondary)' }}>
          {winner ? `Winner: ${winner} 🎉` : isDraw ? "It's a Draw! 🤝" : `Next Player: ${xIsNext ? 'X' : 'O'}`}
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '8px', 
        background: 'var(--glass-border)', 
        padding: '8px', 
        borderRadius: '12px' 
      }}>
        {board.map((square, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            style={{
              width: '80px',
              height: '80px',
              background: 'rgba(15, 23, 42, 0.8)',
              border: 'none',
              borderRadius: '8px',
              fontSize: '36px',
              fontWeight: 'bold',
              color: square === 'X' ? '#3b82f6' : '#ef4444',
              cursor: square || winner ? 'default' : 'pointer',
              transition: 'background 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseOver={(e) => {
              if (!square && !winner) e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.9)';
            }}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.8)'}
          >
            {square}
          </button>
        ))}
      </div>

      <button 
        onClick={resetGame}
        style={{
          marginTop: '32px',
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
        <RotateCcw size={18} /> Restart Game
      </button>
    </div>
  );
};

export default TicTacToe;
