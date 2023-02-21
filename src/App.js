import React from 'react';
import CurrentLocationWeather from './components/CurrentLocationWeather';
import SearchLocationWeather from './components/SearchLocationWeather';

function App() {
  return (
    <div>
      <SearchLocationWeather />
      <CurrentLocationWeather />
    </div>
  );
}

export default App;
