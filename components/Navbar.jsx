import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Navbar = () => (
  <nav className="bg-gradient-to-r from-blue-800 to-blue-900 p-4 text-white shadow-lg">
    <div className="container mx-auto flex justify-between items-center">
      <div className="flex items-center">
        <div className="mr-4">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8VoyAzKEObxQpgnX2HDrTH8CZ4SXaGXP3Tg&s" alt="Logo" className="h-10 w-10 rounded-full shadow-md" />
        </div>
        <ul className="flex space-x-6 text-lg">
          <li>
            <Link to="/" className="hover:text-blue-300 transition-colors duration-300">Home</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-blue-300 transition-colors duration-300">Contact</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-300 transition-colors duration-300">About</Link>
          </li>
        </ul>
      </div>
      <div className="flex items-center space-x-6">
        <a href="https://github.com/your-github-url" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors duration-300">
          <FontAwesomeIcon icon={faGithub} className="h-6 w-6" />
        </a>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-md transition-all duration-300">
          Login
        </button>
      </div>
    </div>
  </nav>
);

export default Navbar;
