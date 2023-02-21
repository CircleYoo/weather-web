import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App'

export default function WeekContainer() {
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const API_KEY = '85949a76c886a99b91355b504b7e952e';

    useEffect(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          });
        } else {
          console.log("Geolocation is not supported by this browser.");
        }
      }, []);

    componentDidMount = () => {
        const WeekWeatherURL = `api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.latitude}&appid=${API_KEY}`
        fetch(WeekWeatherURL)
        .then(res => res.json())
        .then(data => console.log("data list loaded", data.list))
    }
  return (
    <div>WeekContainer</div>
  )
}
