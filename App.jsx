// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CypherTools from './pages/CypherTools';
import PomodoroTimer from './pages/PomodoroTimer';
import PasswordGenerator from './pages/PasswordGenerator';
import WorldMap from './pages/WorldMap';
import WeightCalculator from './pages/WeightCalculator';
import './App.css';
import DataVisualizerPage from './pages/DataVisualizerPage';
import LocationFinder from './components/LocationFinder';
import CryptoCurrency from './pages/CryptoCurrency';
import SchedulePage from './pages/SchedulePage';
import SimpleInterestPage from './pages/SimpleInterestPage';
import CalculatorPage from './pages/CalculatorPage'
import UrlShortenerPage from './pages/UrlShortenerPage';
import WeatherAppPage from './pages/WeatherAppPage';
import SteganographyAppPage from './pages/SteganographyAppPage';

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      
      <Route path="/cypher-tools" element={<CypherTools />} />
      <Route path="/pomodoro-timer" element={<PomodoroTimer />} />
      <Route path="/password-generator" element={<PasswordGenerator />} />
      <Route path="/world-map" element={<WorldMap />} />
      <Route path="/weight-calculator" element={<WeightCalculator />} />
      <Route path="/data-visualizer" element={<DataVisualizerPage />} />
      <Route path="/location-finder" element={<LocationFinder />} />
      <Route path="/cryptocurrency" element={<CryptoCurrency />} />
      <Route path="/schedulepage" element={<SchedulePage />} />
      <Route path="/simpleinterestpage" element={<SimpleInterestPage />} />
      <Route path="/calculatorpage" element={<CalculatorPage />} />
      <Route path="/urlshortenerpage" element={<UrlShortenerPage />} />
      <Route path="/urlweather" element={<WeatherAppPage />} />
      <Route path="/urlstegano" element={<SteganographyAppPage />} />
    </Routes>
    
  </Router>



);

export default App;
