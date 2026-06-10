import React, { useState, useEffect } from 'react';
import { Gamepad2, RotateCcw } from 'lucide-react';

const EMOJIS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

const Memory = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffledCards = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji }));
    setCards(shuffledCards);
    setFlipped([]);
    setSolved([]);
    setDisabled(false);
  };

  const handleClick = (index) => {
    if (disabled || flipped.includes(index) || solved.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setDisabled(true);
      const firstCard = cards[newFlipped[0]].emoji;
      const secondCard = cards[newFlipped[1]].emoji;

      if (firstCard === secondCard) {
        setSolved([...solved, newFlipped[0], newFlipped[1]]);
        setFlipped([]);
        setDisabled(false);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 1000);
      }
    }
  };

  const isGameOver = solved.length === cards.length && cards.length > 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', color: 'var(--text-primary)' }}>
      <div style={{ marginBottom: '16px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <Gamepad2 size={24} color="var(--primary)" /> Memory Game
        </h2>
        {isGameOver && (
          <div style={{ marginTop: '8px', color: 'var(--success)', fontWeight: 'bold' }}>
            You Won! 🎉
          </div>
        )}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '8px',
        padding: '16px',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '16px',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || solved.includes(index);
          return (
            <div
              key={card.id}
              onClick={() => handleClick(index)}
              style={{
                width: '60px',
                height: '60px',
                background: isFlipped ? 'var(--primary)' : 'rgba(15, 23, 42, 0.8)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                cursor: disabled || isFlipped ? 'default' : 'pointer',
                transition: 'all 0.3s',
                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                boxShadow: isFlipped ? '0 4px 12px rgba(59, 130, 246, 0.4)' : 'none'
              }}
            >
              <div style={{ transform: isFlipped ? 'rotateY(180deg)' : 'none' }}>
                {isFlipped ? card.emoji : '?'}
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={initializeGame}
        style={{
          marginTop: '24px',
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
        <RotateCcw size={18} /> Restart
      </button>
    </div>
  );
};

export default Memory;
