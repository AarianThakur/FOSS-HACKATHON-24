import React, { useState, useEffect } from 'react';


const PomodoroTimer = () => {
    const [minutes, setMinutes] = useState(15);
    const [seconds, setSeconds] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [enteredTime, setEnteredTime] = useState(null);
    const [breakMinutes, setBreakMinutes] = useState(0);
    const [breakSeconds, setBreakSeconds] = useState(0);
    const [isBreak, setIsBreak] = useState(false);
    const [totalSeconds, setTotalSeconds] = useState(15 * 60);
    const [originalMinutes, setOriginalMinutes] = useState(15);
    const [originalSeconds, setOriginalSeconds] = useState(0);

    useEffect(() => {
        let timer;
        if (!isPaused) {
            timer = setInterval(() => {
                if (minutes === 0 && seconds === 0) {
                    clearInterval(timer);
                    if (isBreak) {
                        setIsBreak(false);
                        setMinutes(originalMinutes);
                        setSeconds(originalSeconds);
                        setTotalSeconds(originalMinutes * 60 + originalSeconds);
                        startTimer();
                    } else {
                        openCompletionModal();
                    }
                } else {
                    if (seconds > 0) {
                        setSeconds(seconds - 1);
                    } else {
                        setSeconds(59);
                        setMinutes(minutes - 1);
                    }
                }
                updateCircle();
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isPaused, minutes, seconds]);

    const startTimer = () => {
        setTotalSeconds(minutes * 60 + seconds);
    };

    const formatTime = (minutes, seconds) => {
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const togglePauseResume = () => {
        setIsPaused(!isPaused);
    };

    const restartTimer = () => {
        setIsPaused(false);
        const newMinutes = enteredTime || 15;
        setMinutes(newMinutes);
        setSeconds(0);
        setTotalSeconds(newMinutes * 60);
        updateCircle();
    };

    const openTimeModal = () => {
        document.getElementById('timeModal').style.display = 'block';
    };

    const closeTimeModal = () => {
        document.getElementById('timeModal').style.display = 'none';
    };

    const setNewTime = () => {
        const newTime = document.getElementById('newTime').value;
        if (!isNaN(newTime) && newTime > 0) {
            const newMinutes = parseInt(newTime);
            setEnteredTime(newMinutes);
            setMinutes(newMinutes);
            setSeconds(0);
            setTotalSeconds(newMinutes * 60);
            setIsPaused(false);
            updateCircle();
            closeTimeModal();
            startTimer();
        } else {
            alert('Invalid input. Please enter a valid number greater than 0.');
        }
    };

    const openCompletionModal = () => {
        document.getElementById('completionModal').style.display = 'block';
    };

    const openBreakModal = () => {
        document.getElementById('completionModal').style.display = 'none';
        document.getElementById('breakModal').style.display = 'block';
    };

    const closeBreakModal = () => {
        document.getElementById('breakModal').style.display = 'none';
    };

    const setBreakTime = () => {
        const breakTime = document.getElementById('breakTime').value;
        if (!isNaN(breakTime) && breakTime > 0) {
            const breakMinutes = parseInt(breakTime);
            setBreakMinutes(breakMinutes);
            setBreakSeconds(0);
            setOriginalMinutes(enteredTime || 15);
            setOriginalSeconds(0);
            setMinutes(breakMinutes);
            setSeconds(0);
            setTotalSeconds(breakMinutes * 60);
            setIsBreak(true);
            updateCircle();
            closeBreakModal();
            startTimer();
        } else {
            alert('Invalid input. Please enter a valid number greater than 0.');
        }
    };

    const updateCircle = () => {
        const canvas = document.getElementById('timerCircle');
        const context = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 10;
        const remainingSeconds = minutes * 60 + seconds;
        const percentage = remainingSeconds / totalSeconds;
        const endAngle = 2 * Math.PI * percentage - 0.5 * Math.PI;

        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the background circle
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        context.fillStyle = '#e0e0e0';
        context.fill();

        // Draw the remaining time arc
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.arc(centerX, centerY, radius, -0.5 * Math.PI, endAngle, false);
        context.fillStyle = '#76c7c0';
        context.fill();
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(./assets/24_Pomodoro-technique_Hero.jpg)' }}>
            <h1 className="mb-5 text-3xl font-bold text-red-800">Pomodoro Timer</h1>
            <div className="flex flex-col items-center">
                <div className="relative w-48 h-48 mb-5">
                    <canvas id="timerCircle" width="200" height="200"></canvas>
                    <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full text-2xl">{formatTime(minutes, seconds)}</div>
                </div>
                <div className="flex flex-wrap justify-center space-x-4">
                    <button onClick={togglePauseResume} className="m-2 px-4 py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-800 transition-all duration-300">{isPaused ? 'Resume' : 'Pause'}</button>
                    <button onClick={restartTimer} className="m-2 px-4 py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-800 transition-all duration-300">Restart</button>
                    <button onClick={openTimeModal} className="m-2 px-4 py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-800 transition-all duration-300">Choose Time</button>
                </div>
            </div>

            <div id="timeModal" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 hidden">
                <div className="bg-gray-800 p-5 rounded-lg max-w-md w-full text-center">
                    <span className="text-xl font-bold text-gray-300 float-right cursor-pointer" onClick={closeTimeModal}>&times;</span>
                    <h2 className="text-2xl font-bold text-white mb-4">Choose Time</h2>
                    <input type="number" id="newTime" placeholder="Enter minutes" className="w-4/5 p-2 mb-4 rounded-lg" />
                    <button onClick={setNewTime} className="px-4 py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-800 transition-all duration-300">Set Time</button>
                </div>
            </div>

            <div id="completionModal" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 hidden">
                <div className="bg-gray-800 p-5 rounded-lg max-w-md w-full text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Timer Completed</h2>
                    <p className="text-white mb-4">Time is up! Take a break.</p>
                    <button onClick={openBreakModal} className="px-4 py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-800 transition-all duration-300">Set Break Time</button>
                </div>
            </div>

            <div id="breakModal" className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 hidden">
                <div className="bg-gray-800 p-5 rounded-lg max-w-md w-full text-center">
                    <span className="text-xl font-bold text-gray-300 float-right cursor-pointer" onClick={closeBreakModal}>&times;</span>
                    <h2 className="text-2xl font-bold text-white mb-4">Set Break Time</h2>
                    <input type="number" id="breakTime" placeholder="Enter break minutes" className="w-4/5 p-2 mb-4 rounded-lg" />
                    <button onClick={setBreakTime} className="px-4 py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-800 transition-all duration-300">Start Break</button>
                </div>
            </div>
        </div>
    );
};

export default PomodoroTimer;
