import React, { useState } from 'react';
import WeatherCard from './WeatherCard';

const API_KEY = 'f8eb0fe062ecac27b6c7bca275b0df71'; // API- key

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    if (!city) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      if (!res.ok) throw new Error('City not found');
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <h1>Weather App 🌤️</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {weather && <WeatherCard data={weather} />}
    </div>
  );
}

export default App;
