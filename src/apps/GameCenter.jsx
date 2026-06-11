import React, { useState } from 'react';
import { Gamepad2, Trophy, Brain, Dices } from 'lucide-react';

import TicTacToe from './TicTacToe';
import Memory from './Memory';
import Snake from './Snake';
import RNG from './RNG';

const GameCenter = () => {
  const [activeGame, setActiveGame] = useState(null);

  const games = [
    { id: 'tictactoe', name: 'Tic Tac Toe', icon: <Trophy size={32} />, component: <TicTacToe /> },
    { id: 'memory', name: 'Memory', icon: <Brain size={32} />, component: <Memory /> },
    { id: 'snake', name: 'Snake', icon: <Gamepad2 size={32} />, component: <Snake /> },
    { id: 'rng', name: 'Dice & Coin', icon: <Dices size={32} />, component: <RNG /> }
  ];

  if (activeGame) {
    const game = games.find(g => g.id === activeGame);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'var(--glass-bg)' }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--glass-border)', display: 'flex', gap: '16px', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.2)' }}>
          <button 
            onClick={() => setActiveGame(null)}
            style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            ← Back to Hub
          </button>
          <span style={{ fontWeight: 'bold', color: 'var(--text-primary)', fontSize: '16px' }}>{game.name}</span>
        </div>
        <div style={{ flex: 1, position: 'relative', overflow: 'auto' }}>
          {game.component}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'var(--glass-bg)', color: 'var(--text-primary)', padding: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '16px' }}>
        <Gamepad2 size={36} color="var(--primary)" /> 
        <h2 style={{ margin: 0, fontSize: '28px', fontWeight: 700 }}>Game Center</h2>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '20px' }}>
        {games.map(game => (
          <button
            key={game.id}
            onClick={() => setActiveGame(game.id)}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px',
              padding: '32px 16px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid var(--glass-border)',
              borderRadius: '16px', cursor: 'pointer', color: 'white', transition: 'all 0.2s ease',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.borderColor = 'var(--primary)';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.6)';
              e.currentTarget.style.borderColor = 'var(--glass-border)';
              e.currentTarget.style.transform = 'none';
            }}
          >
            {React.cloneElement(game.icon, { color: 'var(--primary)' })}
            <span style={{ fontWeight: 600, fontSize: '16px' }}>{game.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameCenter;
