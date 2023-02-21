import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import '../App'

export default function SearchLocationWeather() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const API_KEY = '85949a76c886a99b91355b504b7e952e';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    setWeatherData(data);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter city name:
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
        </label>
        <button type="submit"><BiSearch /></button>
      </form>
      {weatherData && (
        <div>
          <p>Current temperature: {weatherData.main.temp}°C</p>
          <p>Feels like: {weatherData.main.feels_like}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} km/h</p>
        </div>
      )}
    </div>
  );
}