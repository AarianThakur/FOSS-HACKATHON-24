import React, { useState } from 'react';

const SimpleInterestPage = () => {
    const [initialInvestment, setInitialInvestment] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [investmentYears, setInvestmentYears] = useState('');
    const [result, setResult] = useState('');

    const calculateInterest = () => {
        const principal = parseFloat(initialInvestment);
        const rate = parseFloat(interestRate);
        const years = parseInt(investmentYears);

        if (isNaN(principal) || isNaN(rate) || isNaN(years)) {
            setResult("Please enter valid numbers in all fields.");
            return;
        }

        const interest = (principal * rate * years) / 100;
        setResult(`Your interest will be worth $${interest.toFixed(2)}.`);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 bg-cover" style={{ backgroundImage: 'url("./assets/1216090.png")' }}>
            <h1 className="text-5xl font-bold text-blue-400 mb-8 text-center font-impact">
                Simple Interest Calculator
            </h1>

            <div className="bg-blue-800 p-10 rounded-lg shadow-lg w-full max-w-lg text-center">
                <div className="mb-6">
                    <label htmlFor="initial-investment" className="block text-lg font-bold mb-2 text-gray-200">Amount in $:</label>
                    <input
                        type="number"
                        id="initial-investment"
                        placeholder="Enter amount"
                        value={initialInvestment}
                        onChange={(e) => setInitialInvestment(e.target.value)}
                        className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-200"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="interest-rate" className="block text-lg font-bold mb-2 text-gray-200">Annual Interest Rate in %:</label>
                    <input
                        type="number"
                        id="interest-rate"
                        placeholder="Enter annual interest rate"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-200"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="investment-years" className="block text-lg font-bold mb-2 text-gray-200">Number of Years:</label>
                    <input
                        type="number"
                        id="investment-years"
                        placeholder="Tenure in years"
                        value={investmentYears}
                        onChange={(e) => setInvestmentYears(e.target.value)}
                        className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-200"
                    />
                </div>

                <button 
                    id="calculate-button" 
                    onClick={calculateInterest} 
                    className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all"
                >
                    Calculate
                </button>
                <div id="result" className="mt-6 p-4 rounded-lg text-lg font-bold text-gray-900 bg-blue-200">
                    {result}
                </div>
            </div>
        </div>
    );
};

export default SimpleInterestPage;
