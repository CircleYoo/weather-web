import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import moment from "moment";
import "moment/locale/ko";
import "../App";

moment.locale("ko");

export default function SearchLocationWeather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const API_KEY = "85949a76c886a99b91355b504b7e952e";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=kr`;
    const response = await fetch(url);
    const data = await response.json();
    setWeather(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter city name:
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
        </label>
        <button type="submit">
          <BiSearch />
        </button>
      </form>
      {weather && (
        <div>
          <p>Weather: {weather.weather[0].description}</p>
          <p>온도: {Math.round(weather.main.temp)}°C</p>
          <p>Real Feel: {Math.round(weather.main.feels_like)}°C</p>
          <p>일출: {moment.unix(weather.sys.sunrise).format("LT")}</p>
          <p>일몰: {moment.unix(weather.sys.sunset).format("LT")}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} km/h</p>
        </div>
      )}
    </div>
  );
}
