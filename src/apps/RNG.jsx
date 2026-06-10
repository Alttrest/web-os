import React, { useState } from 'react';
import { Dices, Coins } from 'lucide-react';

const RNG = () => {
  const [diceResult, setDiceResult] = useState(1);
  const [coinResult, setCoinResult] = useState('Heads');
  const [isRolling, setIsRolling] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  const rollDice = () => {
    setIsRolling(true);
    setTimeout(() => {
      setDiceResult(Math.floor(Math.random() * 6) + 1);
      setIsRolling(false);
    }, 500);
  };

  const flipCoin = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setCoinResult(Math.random() > 0.5 ? 'Heads' : 'Tails');
      setIsFlipping(false);
    }, 500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#1e293b', color: 'white', borderRadius: '8px', overflow: 'hidden' }}>
      <div style={{ flex: 1, display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        
        {/* Dice Section */}
        <div style={{ flex: 1, borderRight: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <h3 style={{ margin: '0 0 24px 0', fontSize: '18px', fontWeight: 500, color: '#94a3b8' }}>Roll a Dice</h3>
          
          <div style={{ 
            width: '100px', height: '100px', 
            backgroundColor: 'white', color: '#1e293b', 
            borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '48px', fontWeight: 'bold',
            transform: isRolling ? 'rotate(360deg)' : 'rotate(0deg)',
            transition: 'transform 0.5s ease-in-out',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
          }}>
            {diceResult}
          </div>

          <button 
            onClick={rollDice}
            disabled={isRolling}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '32px', padding: '10px 24px', backgroundColor: 'var(--primary)', color: 'white', border: 'none', borderRadius: '24px', cursor: 'pointer', fontWeight: 600 }}
          >
            <Dices size={18} /> Roll
          </button>
        </div>

        {/* Coin Section */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <h3 style={{ margin: '0 0 24px 0', fontSize: '18px', fontWeight: 500, color: '#94a3b8' }}>Flip a Coin</h3>
          
          <div style={{ 
            width: '100px', height: '100px', 
            backgroundColor: '#eab308', color: 'white', 
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '24px', fontWeight: 'bold',
            transform: isFlipping ? 'rotateY(720deg)' : 'rotateY(0deg)',
            transition: 'transform 0.5s ease-in-out',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2), inset 0 0 20px rgba(0,0,0,0.2)',
            border: '4px solid #fef08a'
          }}>
            {coinResult}
          </div>

          <button 
            onClick={flipCoin}
            disabled={isFlipping}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '32px', padding: '10px 24px', backgroundColor: '#eab308', color: 'white', border: 'none', borderRadius: '24px', cursor: 'pointer', fontWeight: 600 }}
          >
            <Coins size={18} /> Flip
          </button>
        </div>

      </div>
    </div>
  );
};

export default RNG;
