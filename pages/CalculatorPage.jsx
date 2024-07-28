import React, { useState } from 'react';

function CalculatorPage() {
  const [initialInvestment, setInitialInvestment] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [investmentYears, setInvestmentYears] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const initial = parseFloat(initialInvestment);
    const rate = parseFloat(interestRate) / 100;
    const years = parseInt(investmentYears);

    if (isNaN(initial) || isNaN(rate) || isNaN(years)) {
      setResult('Please enter valid numbers in all fields.');
      return;
    }

    let totalAmount = initial;

    for (let i = 1; i <= years; i++) {
      totalAmount *= 1 + rate;
    }

    setResult(`After ${years} years, your investment will be worth $${totalAmount.toFixed(2)}.`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-blue-500">
      <div className="container bg-purple-300 rounded-lg shadow-lg p-10 w-96 flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold text-purple-800 mb-5">Investment Calculator</h1>
        <div className="input-container mb-5 w-full">
          <label htmlFor="initial-investment" className="block mb-2 text-lg font-bold text-purple-700">Initial Investment in $:</label>
          <input
            type="number"
            id="initial-investment"
            placeholder="Enter initial investment"
            value={initialInvestment}
            onChange={(e) => setInitialInvestment(e.target.value)}
            className="w-full p-3 border border-purple-400 rounded-md"
          />
        </div>
        <div className="input-container mb-5 w-full">
          <label htmlFor="interest-rate" className="block mb-2 text-lg font-bold text-purple-700">Annual Interest Rate in %:</label>
          <input
            type="number"
            id="interest-rate"
            placeholder="Enter annual interest rate"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full p-3 border border-purple-400 rounded-md"
          />
        </div>
        <div className="input-container mb-5 w-full">
          <label htmlFor="investment-years" className="block mb-2 text-lg font-bold text-purple-700">Number of Years:</label>
          <input
            type="number"
            id="investment-years"
            placeholder="Enter number of years"
            value={investmentYears}
            onChange={(e) => setInvestmentYears(e.target.value)}
            className="w-full p-3 border border-purple-400 rounded-md"
          />
        </div>
        <button onClick={handleCalculate} className="bg-purple-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-purple-800">Calculate</button>
        <div id="result" className="result-container mt-5 text-lg text-purple-800 bg-purple-200 rounded-md w-full py-3">
          {result}
        </div>
      </div>
    </div>
  );
}

export default CalculatorPage;
