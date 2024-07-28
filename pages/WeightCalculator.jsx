import React, { useState } from 'react';

const WeightCalculator = () => {
  const [weight, setWeight] = useState('');
  const [planet, setPlanet] = useState('Earth');
  const [newWeight, setNewWeight] = useState('');
  const [error, setError] = useState(false);

  const handleCalculate = () => {
    if (isNaN(weight) || weight === '') {
      setError(true);
      setNewWeight('');
    } else {
      setError(false);
      let calculatedWeight;
      switch (planet) {
        case 'Mercury':
          calculatedWeight = weight * 0.38;
          break;
        case 'Venus':
          calculatedWeight = weight * 0.91;
          break;
        case 'Earth':
          calculatedWeight = weight;
          break;
        case 'Mars':
          calculatedWeight = (weight * 0.37) / 91.425683000300;
          break;
        case 'Jupiter':
          calculatedWeight = weight * 2.34;
          break;
        case 'Saturn':
          calculatedWeight = weight * 0.93;
          break;
        case 'Uranus':
          calculatedWeight = weight * 0.92;
          break;
        case 'Neptune':
          calculatedWeight = weight * 1.12;
          break;
        case 'Moon':
          calculatedWeight = weight * 0.165;
          break;
        default:
          calculatedWeight = weight;
          break;
      }
      setNewWeight(calculatedWeight.toFixed(2));
    }
  };

  const getImageSrc = (planet) => {
    switch (planet) {
      case 'Mercury':
        return "https://github.com/Asabeneh/30-Days-Of-JavaScript/blob/master/24_Day_Project_solar_system/24_day_starter/images/mercury.png?raw=true";
      case 'Venus':
        return "https://github.com/Asabeneh/30-Days-Of-JavaScript/blob/master/24_Day_Project_solar_system/24_day_starter/images/venus.png?raw=true";
      case 'Earth':
        return "https://github.com/Asabeneh/30-Days-Of-JavaScript/blob/master/24_Day_Project_solar_system/24_day_starter/images/earth.png?raw=true";
      case 'Mars':
        return "https://github.com/Asabeneh/30-Days-Of-JavaScript/blob/master/24_Day_Project_solar_system/24_day_starter/images/mars.png?raw=true";
      case 'Jupiter':
        return "https://github.com/Asabeneh/30-Days-Of-JavaScript/blob/master/24_Day_Project_solar_system/24_day_starter/images/jupiter.png?raw=true";
      case 'Saturn':
        return "https://github.com/Asabeneh/30-Days-Of-JavaScript/blob/master/24_Day_Project_solar_system/24_day_starter/images/saturn.png?raw=true";
      case 'Uranus':
        return "https://github.com/Asabeneh/30-Days-Of-JavaScript/blob/master/24_Day_Project_solar_system/24_day_starter/images/uranus.png?raw=true";
      case 'Neptune':
        return "https://github.com/Asabeneh/30-Days-Of-JavaScript/blob/master/24_Day_Project_solar_system/24_day_starter/images/neptune.png?raw=true";
      case 'Moon':
        return "https://github.com/Asabeneh/30-Days-Of-JavaScript/blob/master/24_Day_Project_solar_system/24_day_starter/images/moon.png?raw=true";
      default:
        return '';
    }
  };

  return (
    <div
      className="container mt-12 bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('https://github.com/Asabeneh/30-Days-Of-JavaScript/blob/master/24_Day_Project_solar_system/24_day_starter/images/galaxy.gif?raw=true')",
        height: '100vh', // Ensure the background covers the full height
        width: '100vw',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="font-extrabold text-white text-3xl flex justify-center items-center">
        Calculate a Weight of an Object on a Planet
      </div>
      <div className="flex justify-center mt-10">
        <input
          className="border-slate-400 h-10 w-48 p-3"
          placeholder="Mass in Kg"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <label htmlFor="planet" className="border-slate-500 ml-4">
          Planet
        </label>
        <select
          id="planet"
          className="border-slate-500 ml-4"
          value={planet}
          onChange={(e) => setPlanet(e.target.value)}
        >
          <option value="Mercury">Mercury</option>
          <option value="Venus">Venus</option>
          <option value="Earth">Earth</option>
          <option value="Mars">Mars</option>
          <option value="Jupiter">Jupiter</option>
          <option value="Saturn">Saturn</option>
          <option value="Uranus">Uranus</option>
          <option value="Neptune">Neptune</option>
          <option value="Moon">Moon</option>
        </select>
        <button
          id="calci"
          className="bg-yellow-300 font-mono p-2 ml-6"
          onClick={handleCalculate}
        >
          Calculate
        </button>
      </div>
      <div className="container flex mt-12">
        <img
          className="ml-20"
          id="image"
          src={getImageSrc(planet)}
          alt={`${planet}`}
        />
        {error ? (
          <div
            id="elementToDisplay"
            className="p-10 w-11/12 h-36 border-4 border-red-100 ml-96 bg-opacity-30 bg-gray-200 mt-20"
          >
            <div className="w-10/12 h-30 border-3 border-yellow-100 bg-gray-300 bg-opacity-40 p-3 ml-10">
              <p className="text-yellow-100 text-4xl ml-28 font-light">
                ENTER VALID MASS
              </p>
            </div>
          </div>
        ) : (
          <div
            id="mass"
            className="w-96 h-48 text-4xl text-yellow-200 font-medium flex justify-center items-center ml-48 border-gray-300 shadow-md"
          >
            {newWeight && `MASS at ${planet} is ${newWeight} kg`}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeightCalculator;
