import React, { useState } from 'react';

const WeatherAppPage = () => {
    const [city, setCity] = useState('');
    const [weatherInfo, setWeatherInfo] = useState(null);

    const getWeather = async () => {
        if (!city) {
            alert('Please enter a city name');
            return;
        }

        const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;

        try {
            const geocodeResponse = await fetch(geocodeUrl);
            const geocodeData = await geocodeResponse.json();

            if (geocodeData.results.length === 0) {
                setWeatherInfo('City not found');
                return;
            }

            const { latitude, longitude } = geocodeData.results[0];
            const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,weathercode&current_weather=true`;

            const weatherResponse = await fetch(weatherUrl);
            const weatherData = await weatherResponse.json();

            const weatherInfo = (
                <div>
                    <p><strong>City:</strong> {geocodeData.results[0].name}</p>
                    <p><strong>Temperature:</strong> {weatherData.current_weather.temperature}°C</p>
                    <p><strong>Weather:</strong> {getWeatherDescription(weatherData.current_weather.weathercode)}</p>
                </div>
            );

            setWeatherInfo(weatherInfo);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setWeatherInfo('Error fetching weather data');
        }
    };

    const getWeatherDescription = (code) => {
        const weatherDescriptions = {
            0: 'Clear sky',
            1: 'Mainly clear',
            2: 'Partly cloudy',
            3: 'Overcast',
            45: 'Fog',
            48: 'Depositing rime fog',
            51: 'Drizzle: Light',
            53: 'Drizzle: Moderate',
            55: 'Drizzle: Dense intensity',
            56: 'Freezing Drizzle: Light',
            57: 'Freezing Drizzle: Dense intensity',
            61: 'Rain: Slight',
            63: 'Rain: Moderate',
            65: 'Rain: Heavy intensity',
            66: 'Freezing Rain: Light',
            67: 'Freezing Rain: Heavy intensity',
            71: 'Snow fall: Slight',
            73: 'Snow fall: Moderate',
            75: 'Snow fall: Heavy intensity',
            77: 'Snow grains',
            80: 'Rain showers: Slight',
            81: 'Rain showers: Moderate',
            82: 'Rain showers: Violent',
            85: 'Snow showers: Slight',
            86: 'Snow showers: Heavy',
            95: 'Thunderstorm: Slight or moderate',
            96: 'Thunderstorm with slight hail',
            99: 'Thunderstorm with heavy hail',
        };
        return weatherDescriptions[code] || 'Unknown weather';
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-tl from-blue-400 to-blue-700">
            <div className="bg-gradient-to-tr from-blue-600 to-blue-800 p-6 rounded-lg border-2 border-blue-900">
                <h1 className="text-3xl font-bold text-white mb-4">Weather App</h1>
                <div className="mb-4">
                    <input
                        type="text"
                        id="cityInput"
                        placeholder="Enter city name"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full p-3 mb-4 border rounded-md"
                    />
                    <button
                        onClick={getWeather}
                        className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-all"
                    >
                        Get Weather
                    </button>
                </div>
                <div id="weatherInfo" className="bg-white bg-opacity-20 p-4 rounded-lg shadow-md text-white">
                    {weatherInfo}
                </div>
            </div>
        </div>
    );
};

export default WeatherAppPage;
