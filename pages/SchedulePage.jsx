import React, { useState, useEffect } from 'react';

const SchedulePage = () => {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');
    const [timeInput, setTimeInput] = useState('');

    const addTask = () => {
        if (taskInput && timeInput) {
            const newTask = { task: taskInput, time: timeInput, completed: false, isCurrent: false };
            setTasks(prevTasks => [...prevTasks, newTask]);
            setTaskInput('');
            setTimeInput('');
        }
    };

    const toggleTaskCompletion = (index) => {
        setTasks(prevTasks => 
            prevTasks.map((task, idx) => 
                idx === index 
                ? { ...task, completed: !task.completed } 
                : task
            )
        );
    };

    useEffect(() => {
        const checkCurrentTask = () => {
            const now = new Date();
            const currentTime = now.toTimeString().substring(0, 5);

            setTasks(prevTasks => 
                prevTasks.map(task => ({
                    ...task,
                    isCurrent: task.time === currentTime && !task.completed
                }))
            );
        };

        const intervalId = setInterval(checkCurrentTask, 1000);

        return () => clearInterval(intervalId);
    }, [tasks]);

    const activeTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);

    return (
        <div className="flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundColor: '#1E3A8A' }}>
            <div className="bg-blue-800 bg-opacity-90 rounded-lg shadow-lg p-8 w-full max-w-2xl text-center">
                <h1 className="text-3xl text-white mb-6">Schedules</h1>
                <div className="flex flex-col mb-6">
                    <input 
                        type="text" 
                        className="p-3 mb-3 border border-blue-500 rounded-lg w-full bg-blue-100 text-blue-900" 
                        placeholder="Enter task" 
                        value={taskInput} 
                        onChange={(e) => setTaskInput(e.target.value)} 
                    />
                    <input 
                        type="time" 
                        className="p-3 mb-3 border border-blue-500 rounded-lg w-full bg-blue-100 text-blue-900" 
                        value={timeInput} 
                        onChange={(e) => setTimeInput(e.target.value)} 
                    />
                    <button 
                        className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all" 
                        onClick={addTask}
                    >
                        Add Task
                    </button>
                </div>
                <div className="flex justify-between">
                    <div className="w-1/2 mr-2">
                        <h2 className="text-2xl text-white mb-4">Tasks</h2>
                        <ul className="list-none p-0">
                            {activeTasks.map((task, index) => (
                                <li 
                                    key={index} 
                                    className={`bg-blue-400 p-3 mb-3 border border-blue-300 rounded-lg flex justify-between items-center ${task.isCurrent ? 'bg-gray-200 border-blue-400' : ''}`}
                                >
                                    <input 
                                        type="checkbox" 
                                        className="mr-3" 
                                        checked={task.completed} 
                                        onChange={() => toggleTaskCompletion(index)} 
                                    />
                                    <span>{task.task}</span>
                                    <span className="font-bold mr-3">{task.time}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-1/2 ml-2">
                        <h2 className="text-2xl text-white mb-4">Completed Tasks</h2>
                        <ul className="list-none p-0">
                            {completedTasks.map((task, index) => (
                                <li 
                                    key={index} 
                                    className="bg-blue-600 p-3 mb-3 border border-blue-500 rounded-lg flex justify-between items-center line-through text-white"
                                >
                                    <span>{task.task}</span>
                                    <span className="font-bold mr-3">{task.time}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchedulePage;
