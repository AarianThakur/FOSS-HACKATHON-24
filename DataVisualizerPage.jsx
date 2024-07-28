// src/pages/DataVisualizerPage.jsx
import React from 'react';
import DataVisualizer from '../components/DataVisualizer';

const DataVisualizerPage = () => (
  <div className="dark:bg-gray-900 dark:text-white min-h-screen p-4">
    <h1 className="text-2xl font-bold mb-4">Data Visualizer</h1>
    <DataVisualizer />
  </div>
);

export default DataVisualizerPage;
