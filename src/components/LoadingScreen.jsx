import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-900">
      <div className="flex flex-col items-center">
        <svg
          className="w-16 h-16 text-white animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V4a8 8 0 00-8 8z"
          />
        </svg>
        <p className="text-white mt-4 text-lg font-semibold">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
