import React from 'react';
import { Link } from 'react-router-dom';

const WelcomeOverlay = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex flex-col items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4">Welcome!</h2>
        <p className="text-gray-600 mb-6">Join us to start playing exciting games!</p>
        <div className="flex flex-col space-y-4">
          <Link to="/login">
            <button className="py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300 w-full">
              Log In
            </button>
          </Link>
          <Link to="/register">
            <button className="py-2 px-4 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition duration-300 w-full">
              Sign Up
            </button>
          </Link>
          <button
            onClick={onClose}
            className="py-2 px-4 bg-gray-700 text-white font-semibold rounded hover:bg-gray-600 transition duration-300 w-full">
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeOverlay;