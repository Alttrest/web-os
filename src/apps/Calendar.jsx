import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar = () => {
  const [date, setDate] = useState(new Date());

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const startDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const year = date.getFullYear();
  const month = date.getMonth();
  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const totalDays = daysInMonth(year, month);
  const startDay = startDayOfMonth(year, month);

  const prevMonth = () => setDate(new Date(year, month - 1, 1));
  const nextMonth = () => setDate(new Date(year, month + 1, 1));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#fff', borderRadius: '8px', padding: '16px', color: '#334155' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>
          {date.toLocaleString('en-US', { month: 'long' })} {year}
        </h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={prevMonth} style={{ background: 'none', border: '1px solid #e2e8f0', borderRadius: '4px', cursor: 'pointer', padding: '4px' }}>
            <ChevronLeft size={16} />
          </button>
          <button onClick={nextMonth} style={{ background: 'none', border: '1px solid #e2e8f0', borderRadius: '4px', cursor: 'pointer', padding: '4px' }}>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center', fontWeight: 500, fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>
        {days.map(d => <div key={d}>{d}</div>)}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', flex: 1, gridAutoRows: '1fr', overflowY: 'auto', paddingBottom: '8px' }}>
        {Array.from({ length: startDay }).map((_, i) => <div key={`empty-${i}`} />)}
        {Array.from({ length: totalDays }).map((_, i) => {
          const day = i + 1;
          const isToday = day === currentDay && month === currentMonth && year === currentYear;
          return (
            <div key={day} style={{ 
              display: 'flex', alignItems: 'center', justifyContent: 'center', 
              backgroundColor: isToday ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
              color: isToday ? 'white' : 'inherit',
              borderRadius: '8px',
              fontSize: '14px',
              cursor: 'default',
              minHeight: '36px'
            }}>
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
