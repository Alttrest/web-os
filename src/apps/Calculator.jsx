import React, { useState } from 'react';
import { Calculator as CalcIcon } from 'lucide-react';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handlePress = (val) => {
    if (display === '0' && !isNaN(val)) {
      setDisplay(val);
    } else {
      setDisplay(display + val);
    }
  };

  const calculate = () => {
    try {
      // eslint-disable-next-line no-eval
      const result = eval(display.replace('x', '*'));
      setEquation(display + '=');
      setDisplay(String(result));
    } catch (e) {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
  };

  const buttons = [
    ['C', '(', ')', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=', '']
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#1e293b', borderRadius: '12px', overflow: 'hidden' }}>
      <div style={{ padding: '24px', backgroundColor: '#0f172a', textAlign: 'right', flexShrink: 0 }}>
        <div style={{ color: '#64748b', fontSize: '14px', minHeight: '20px' }}>{equation}</div>
        <div style={{ color: 'white', fontSize: '36px', fontWeight: 300, overflow: 'hidden', textOverflow: 'ellipsis' }}>{display}</div>
      </div>
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
        {buttons.map((row, i) => (
          <div key={i} style={{ display: 'flex', gap: '8px', flex: 1 }}>
            {row.map((btn, j) => {
              if (!btn) return <div key={j} style={{ flex: 1 }} />;
              const isOperator = ['/', '*', '-', '+', '='].includes(btn);
              const isClear = btn === 'C';
              return (
                <button
                  key={j}
                  onClick={() => {
                    if (btn === '=') calculate();
                    else if (isClear) clear();
                    else handlePress(btn);
                  }}
                  style={{
                    flex: 1,
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '20px',
                    backgroundColor: isOperator ? 'var(--primary)' : isClear ? '#ef4444' : '#334155',
                    color: 'white',
                    cursor: 'pointer',
                    transition: 'opacity 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.opacity = 0.8}
                  onMouseOut={(e) => e.currentTarget.style.opacity = 1}
                >
                  {btn}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
