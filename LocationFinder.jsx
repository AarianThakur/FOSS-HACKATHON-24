


// src/components/LocationFinder.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix marker icon issue with leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const LocationFinder = () => {
  const [city, setCity] = useState('');
  const [locationData, setLocationData] = useState(null);
  const [error, setError] = useState('');

  const apiKey = '158fab496d326ae0a028f74731bc5382'; // Replace with your OpenWeatherMap API key

  const getLocationData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      console.log('API Response:', response);
      const data = response.data;
      setLocationData({
        country: data.sys.country,
        lat: data.coord.lat,
        lon: data.coord.lon,
      });
      setError('');
    } catch (error) {
      console.error('Error fetching location data:', error);
      setError('City not found. Please enter a valid city name.');
      setLocationData(null);
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    if (city.trim() !== '') {
      getLocationData();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Location Finder</h1>
      <div className="mb-4">
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Enter city name"
          className="px-4 py-2 border rounded-md shadow-sm"
        />
        <button
          onClick={handleSearch}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm"
        >
          Search
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {locationData && (
        <div className="mt-4 p-4 border rounded-md bg-white shadow-sm w-full">
          <p><strong>Country:</strong> {locationData.country}</p>
          <p><strong>Latitude:</strong> {locationData.lat}</p>
          <p><strong>Longitude:</strong> {locationData.lon}</p>
          <MapContainer
            center={[locationData.lat, locationData.lon]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: '400px', width: '100%' }}
            key={locationData.lat + locationData.lon} // Ensure map re-renders with new location
          >
            <ChangeView center={[locationData.lat, locationData.lon]} zoom={13} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[locationData.lat, locationData.lon]}>
              <Popup>
                {city}, {locationData.country}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
    </div>
  );
};

export default LocationFinder;
