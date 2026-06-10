import React, { useState, useEffect } from 'react';
import { CloudRain, Sun, Cloud, Wind, Search } from 'lucide-react';

const Weather = () => {
  const [city, setCity] = useState('San Francisco');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState({
    temp: 72,
    condition: 'Sunny',
    humidity: 45,
    wind: 12
  });

  // Mock fetching weather data for the sake of the workshop
  // Real implementation would use an API like OpenWeatherMap
  const fetchWeather = (cityName) => {
    setLoading(true);
    setTimeout(() => {
      const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'];
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
      setWeather({
        temp: Math.floor(Math.random() * 40) + 50, // 50 to 90
        condition: randomCondition,
        humidity: Math.floor(Math.random() * 50) + 30,
        wind: Math.floor(Math.random() * 20) + 2
      });
      setCity(cityName);
      setLoading(false);
    }, 800);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchWeather(searchQuery);
      setSearchQuery('');
    }
  };

  const getWeatherIcon = () => {
    switch (weather.condition) {
      case 'Sunny': return <Sun size={64} color="#fbbf24" />;
      case 'Rainy': return <CloudRain size={64} color="#94a3b8" />;
      default: return <Cloud size={64} color="#e2e8f0" />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px' }}>
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={16} color="var(--text-secondary)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text" 
            placeholder="Search city..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px 10px 36px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: 'white',
              outline: 'none',
              fontFamily: 'inherit'
            }}
          />
        </div>
        <button 
          type="submit"
          style={{
            background: 'var(--primary)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '0 16px',
            cursor: 'pointer',
            fontWeight: 500
          }}
        >
          Search
        </button>
      </form>

      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(180deg, rgba(59, 130, 246, 0.1) 0%, rgba(15, 23, 42, 0.4) 100%)',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.05)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {loading ? (
          <div style={{ color: 'var(--text-secondary)' }}>Fetching weather data...</div>
        ) : (
          <>
            <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '8px' }}>{city}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              {getWeatherIcon()}
              <div style={{ fontSize: '64px', fontWeight: 300, lineHeight: 1 }}>{weather.temp}°</div>
            </div>
            <div style={{ fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '32px' }}>
              {weather.condition}
            </div>

            <div style={{ display: 'flex', gap: '32px', width: '100%', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                <CloudRain size={20} />
                <span>{weather.humidity}% Humidity</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                <Wind size={20} />
                <span>{weather.wind} mph Wind</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Weather;
