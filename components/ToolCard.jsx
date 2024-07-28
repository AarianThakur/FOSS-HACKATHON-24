// src/components/ToolCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ToolCard = ({ title, description, link }) => (
  <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-transform transform hover:scale-105">
    <img className="w-full"  />
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{title}</div>
      <p className="text-gray-700 dark:text-gray-300 text-base">
        {description}
      </p>
    </div>
    <div className="px-6 pt-4 pb-2">
      <Link to={link} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Use
      </Link>
    </div>
  </div>
);

export default ToolCard;
