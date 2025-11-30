import { useState } from "react";

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; //API KEY

  const getWeather = async () => {
    console.log("Button clicked!");
    if (!city) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );

       console.log(response);

      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
      } else {
        alert(data.message);
        setWeather(null);
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Weather App</h1>

      <input
        type="text"
        placeholder="Enter City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: '0.5rem', width: '200px' }}
      />

      <button
        style={{ padding: '0.5rem 1rem', marginLeft: '1rem' }}
        onClick={getWeather}  // attach API call
      >
        Get Weather
      </button>

      {weather && (
        <div style={{ marginTop: '2rem' }}>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>{weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
