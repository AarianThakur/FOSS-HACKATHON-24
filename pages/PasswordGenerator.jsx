import React, { useState } from 'react';

function generatePassword(length) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_";
    let retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

const PasswordGenerator = () => {
    const [passwordLength, setPasswordLength] = useState(10);
    const [password, setPassword] = useState('');

    const handleSliderChange = (event) => {
        setPasswordLength(event.target.value);
    };

    const handleGeneratePassword = () => {
        const newPassword = generatePassword(parseInt(passwordLength));
        setPassword(newPassword);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-cover bg-center p-4" style={{ backgroundImage: `url('./assets/Screenshot 2024-07-28 175538.png')` }}>
            <div className="w-full max-w-lg bg-gray-100 p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-2xl font-semibold mb-4">Password Generator</h1>
                <div className="flex flex-col items-center mb-6">
                    <input
                        type="range"
                        min="1"
                        max="20"
                        value={passwordLength}
                        className="w-full h-4 bg-gray-300 rounded-lg cursor-pointer mb-2"
                        id="mySlider"
                        onChange={handleSliderChange}
                    />
                    <p className="text-lg">Password Length: 
                        <span id="sliderValue" className="font-bold ml-2">{passwordLength}</span>
                    </p>
                </div>
                <button 
                    id="generateButton" 
                    className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-full hover:bg-blue-700 transition-colors mb-4"
                    onClick={handleGeneratePassword}
                >
                    Generate Password
                </button>
                <p className="text-lg">Password: 
                    <span id="generatedPassword" className="font-bold text-lg ml-2" style={{ fontSize: '18px' }}>{password}</span>
                </p>
            </div>
        </div>
    );
};

export default PasswordGenerator;
