import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App";

export default function CurrentLocationWeather() {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const API_KEY = "85949a76c886a99b91355b504b7e952e";

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=${API_KEY}`)
        .then((response) => {
          setWeather(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [location]);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=${API_KEY}`)
        .then((response) => {
          setForecast(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [location]);

  console.log(forecast.list.filter(reading => reading.dt_txt.includes("18:00:00")))

  return (
    <div>
      {weather ? (
        <div>
          <h1>
            {weather.name}, {weather.sys.country}
          </h1>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Feel like: {weather.main.feels_like}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} km/h</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
