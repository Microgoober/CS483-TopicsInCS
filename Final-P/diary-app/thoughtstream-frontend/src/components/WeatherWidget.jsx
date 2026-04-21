import { useState, useEffect } from 'react';
import './WeatherWidget.css';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

function WeatherWidget({ defaultLocation }) {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(defaultLocation);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (city) => {
    if (!city || !API_KEY) {
      setError('Weather API not configured');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=imperial`
      );
      
      if (!response.ok) throw new Error('Weather fetch failed');
      
      const data = await response.json();
      setWeather({
        condition: data.weather[0].main,
        temperature: Math.round(data.main.temp),
        location: data.name,
        icon: getWeatherIcon(data.weather[0].main),
      });
    } catch (err) {
      console.error('Weather error:', err);
      setError('Could not fetch weather');
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition) => {
    const icons = {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Snow': '❄️',
      'Thunderstorm': '⛈️',
      'Drizzle': '🌦️',
      'Mist': '🌫️',
    };
    return icons[condition] || '🌡️';
  };

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    fetchWeather(location);
  };

  useEffect(() => {
    if (defaultLocation) {
      fetchWeather(defaultLocation);
    }
  }, [defaultLocation]);

  return (
    <div className="weather-widget">
      <div className="weather-header">
        <h3>🌤️ Weather</h3>
      </div>
      
      <form onSubmit={handleLocationSubmit} className="weather-location-form">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter city name"
          className="weather-input"
        />
        <button type="submit" className="weather-btn">Update</button>
      </form>
      
      {loading && <div className="weather-loading">Loading weather...</div>}
      
      {error && <div className="weather-error">{error}</div>}
      
      {weather && !loading && (
        <div className="weather-info">
          <div className="weather-icon">{weather.icon}</div>
          <div className="weather-details">
            <div className="weather-condition">{weather.condition}</div>
            <div className="weather-temp">{weather.temperature}°F</div>
            <div className="weather-location">{weather.location}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherWidget;