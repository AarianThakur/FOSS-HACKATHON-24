// src/pages/Cryptocurrency.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const cryptocurrencies = [
  { name: 'Bitcoin', symbol: 'bitcoin' },
  { name: 'Ethereum', symbol: 'ethereum' },
  { name: 'Cardano', symbol: 'cardano' },
  { name: 'Solana', symbol: 'solana' },
  { name: 'Polkadot', symbol: 'polkadot' },
  { name: 'Ripple', symbol: 'ripple' },
  { name: 'Dogecoin', symbol: 'dogecoin' },
  { name: 'Litecoin', symbol: 'litecoin' },
  { name: 'Chainlink', symbol: 'chainlink' },
  { name: 'Stellar', symbol: 'stellar' },
];

const CryptoCurrency = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCryptocurrencyData = async () => {
      try {
        const responses = await Promise.all(
          cryptocurrencies.map((crypto) =>
            axios.get(`https://cors-anywhere.herokuapp.com/https://api.coingecko.com/api/v3/simple/price?ids=${crypto.symbol}&vs_currencies=usd`)
          )
        );
        const newData = responses.reduce((acc, response, index) => {
          const crypto = cryptocurrencies[index];
          acc[crypto.symbol] = response.data[crypto.symbol].usd;
          return acc;
        }, {});
        setData(newData);
        setError('');
      } catch (err) {
        setError('Error fetching cryptocurrency data.');
        setData({});
      }
    };

    fetchCryptocurrencyData();
  }, []);

  return (
    <div>
      <h1>Cryptocurrency Prices</h1>
      {error && <p>{error}</p>}
      <ul>
        {cryptocurrencies.map((crypto) => (
          <li key={crypto.symbol}>
            {crypto.name}: ${data[crypto.symbol] || 'Loading...'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CryptoCurrency;
