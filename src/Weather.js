import { useState } from 'react';
import axios from 'axios';
import style from './Weather.module.css';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const API_KEY = "239402e81d6f43f2a0460837241006";

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await axios.get(
                `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
            );
            setWeatherData(response.data);
            setError('');
        } catch (error) {
            setWeatherData(null);
            setError('Failed to fetch weather data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={style.WeatherApp}>
            <h1>Weather App</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            {loading && <p>Loading data...</p>}
            {error && <p>{error}</p>}
            {weatherData && <div className={style.weatherCards}>
                <div className={style.weatherCard}>
                    <h3>Temperature</h3>
                    <p>{weatherData.current.temp_c}°C</p>
                </div>
                <div className={style.weatherCard}>
                    <h3>Humidity</h3>
                    <p>{weatherData.current.humidity}%</p>
                </div>
                <div className={style.weatherCard}>
                    <h3>Condition</h3>
                    <p>{weatherData.current.condition.text}</p>
                </div>
                <div className={style.weatherCard}>
                    <h3>Wind Speed</h3>
                    <p>{weatherData.current.wind_kph} kph</p>
                </div>
            </div>
            }

        </div>
    )
}

export default Weather;