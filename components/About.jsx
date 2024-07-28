import React from 'react';

const About = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-green-600 mb-6 text-center">About Us</h1>
        <p className="text-lg mb-4 text-gray-700 text-center">
          Welcome to our open-source community! Our mission is to empower developers and enthusiasts by providing a collaborative platform where innovative ideas can flourish. We believe in the power of open-source software to drive technological advancement and foster a spirit of inclusivity and creativity.
        </p>
        <h2 className="text-3xl font-semibold text-green-600 mb-4 text-center">Our Vision</h2>
        <p className="text-lg mb-4 text-gray-700 text-center">
          We envision a world where technology is accessible to everyone, and collaboration transcends boundaries. By sharing knowledge and resources, we aim to create a sustainable ecosystem that nurtures growth and development for all contributors.
        </p>
        <h2 className="text-3xl font-semibold text-green-600 mb-4 text-center">What We Do</h2>
        <ul className="text-lg mb-4 text-gray-700 list-disc list-inside">
          <li><strong>Collaborative Projects:</strong> We host a variety of projects that span multiple disciplines, encouraging participation from developers of all skill levels.</li>
          <li><strong>Educational Resources:</strong> Our platform offers tutorials, documentation, and community support to help you learn and grow.</li>
          <li><strong>Community Events:</strong> Join us for hackathons, webinars, and meetups to connect with like-minded individuals and expand your network.</li>
        </ul>
        <h2 className="text-3xl font-semibold text-green-600 mb-4 text-center">Join Us</h2>
        <p className="text-lg mb-4 text-gray-700 text-center">
          We invite you to be a part of our vibrant community. Whether you're a seasoned developer or just starting, your contributions are valued and essential to our collective success. Together, we can build something extraordinary.
        </p>
        <h2 className="text-3xl font-semibold text-green-600 mb-4 text-center">Get Involved</h2>
        <ul className="text-lg mb-4 text-gray-700 list-disc list-inside">
          <li><strong>Contribute to Projects:</strong> Check out our repositories and start contributing today.</li>
          <li><strong>Report Issues:</strong> Help us improve by reporting bugs and suggesting enhancements.</li>
          <li><strong>Engage with the Community:</strong> Participate in discussions, share your ideas, and collaborate with others.</li>
        </ul>
        <p className="text-lg text-gray-700 text-center">
          Thank you for being a part of our journey. Let's create a better, more inclusive future with open-source technology.
        </p>
      </div>
    </div>
  );
};

export default About;
