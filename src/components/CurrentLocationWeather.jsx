import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from 'moment';
import 'moment/locale/ko';
import "../App";

moment.locale('ko');

export default function CurrentLocationWeather() {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const API_KEY = "85949a76c886a99b91355b504b7e952e";
  

  // 현지 위치 가져오기
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

  // 현재 위치의 날씨 가져오기
  useEffect(() => {
    if (location.latitude && location.longitude) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=${API_KEY}&lang=kr`)
        .then((response) => {
          setWeather(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      }
    }, [location]);
    
  // 5 days / 3 hours 가져오기
  useEffect(() => {
    if (location.latitude && location.longitude) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=${API_KEY}&lang=kr`)
        .then((response) => {
          const forecastList = response.data.list;
          const dailyData = forecastList.filter(item => item.dt_txt.includes("12:00:00"));
          // const formattedData = dailyData.map(item => ({
          //   description: item.weather[0].description
          // }));
          setForecast(dailyData);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [location]);
  


  // 5 days / 3 hours 필요한 부분 출력하기
  const renderForecastData = () => {
    if(forecast) {
      return forecast.map((data, idx) => {
        return (
          <div key = {idx}>
            <h2>{moment(data.dt_txt).calendar().substring(0, 3)}</h2>
            <p>Temperature: {Math.round(data.main.temp)}°C</p>
            <p>Weather: {data.weather[0].description}</p>
          </div>
        )
      });
    } else {
      return <p>Loading...</p>;
    }
  }

  return (
    <div>
      {weather ? (
        <div>
          <h1>
            {weather.name}, {weather.sys.country}
          </h1>
          <p>Weather: {weather.weather[0].description}</p>
          <p>온도: {Math.round(weather.main.temp)}°C</p>
          <p>일출: {moment.unix(weather.sys.sunrise).format('LT')}</p>
          <p>일몰: {moment.unix(weather.sys.sunset).format('LT')}</p>
          <p>Real Feel: {Math.round(weather.main.feels_like)}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} km/h</p>
          <div>
            <p>오후 1시 기준</p>
            {renderForecastData()}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
