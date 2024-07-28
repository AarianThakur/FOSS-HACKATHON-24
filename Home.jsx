// src/pages/Home.jsx
import React from 'react';
import ToolCard from '../components/ToolCard';
import '../styles/animations.css'; // Import custom CSS for animations

const tools = [
  {
    title: 'ASCCI RSA Convertor',
    description: 'Encrypt and decrypt your data.',
    
    link: '/cypher-tools',
  },
  {
    title: 'Pomodoro Timer',
    description: 'Improve your productivity with the Pomodoro technique.',
    
    link: '/pomodoro-timer',
  },
  {
    title: 'Password Generator',
    description: 'Create a Unique Password.',

    link: '/password-generator',
  },
  {
    title: 'World Map',
    description: 'View the current time for any country.',

    link: '/world-map',
  },
  {
    title: 'Weight Calculator (Planets)',
    description: 'Calculate the weight at Other Planets.',

    link: '/weight-calculator',
  },
  {
    title: 'Location Finder',
    description: 'Find the location and coordinates of a city.',

    link: '/location-finder',
  },
  {
    title: 'Data Visualizer',
    description: 'Visualize data with interactive charts.',

    link: '/data-visualizer',
  },
  {
    title: 'Cryptocurrency Rates',
    description: 'View the latest cryptocurrency rates.',
    
    link: '/cryptocurrency',
  },
  {
    title: 'Schedules',
    description: 'Manage your tasks and schedules.',
  
    link: '/schedulepage',
  },
  {
    title: 'Simple Interest Calculator',
    description: 'Calculate Simple Interest.',
   
    link: '/simpleinterestpage',
  },
  {
    title: 'Calculator',
    description: 'Perform basic calculations.',
   
    link: '/calculatorpage',
  },
  {
    title: 'URL Shortener',
    description: 'Shorten your URLs.',
  
    link: '/urlshortenerpage',
  },
  {
    title: 'Weather App',
    description: 'Check the weather.',
    
    link: '/weather-app',
  },
  {
    title: 'steganography App',
    description: 'encodes a messages and images ',
    link: 'urlstegano',
  }
];

const Home = () => (
  <div className="relative min-h-screen">
    <div className="absolute inset-0 z-0">
      <img
        src="data:image/jpeg;base64,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"
        alt="Background GIF"
        className="w-full h-full object-cover opacity-90"
      />
    </div>
    <div className="relative z-10 p-4 bg-black bg-opacity-60 min-h-screen">
      <h1 className="text-4xl font-bold text-white mb-6">Web Dev Kits</h1>
      <p className="text-lg text-white mb-10">
        Welcome to the Web Dev Kits application. Use the navbar to navigate through the tools.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ml-16">
        {tools.map((tool) => (
          <ToolCard
          
            key={tool.title}
            title={tool.title}
            description={tool.description}
            image={tool.image}
            link={tool.link}
          />
        ))}
      </div>
    </div>
  </div>
);

export default Home;
