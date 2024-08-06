import React, { useState, useEffect, useRef } from 'react';
import '../App.css';

const JumpJack = () => {
  const [isJumping, setIsJumping] = useState(false);
  const [jackPosition, setJackPosition] = useState(200); 
  const [obstaclePosition, setObstaclePosition] = useState(window.innerWidth); 
  const [score, setScore] = useState(0); 
  const [gameOver, setGameOver] = useState(false); 
  const jumpHeight = 100; 
  const gravity = 5;
  const jumpDuration = 300; 
  const gameInterval = 20; 
  const obstacleWidth = 60; // Adjusted obstacle width

  const gameRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver) {
        setJackPosition((prev) => Math.min(200, prev + gravity)); 
        setObstaclePosition((prev) => {
          if (prev > -obstacleWidth) {
            return prev - 10;
          } else {
            setScore((prev) => prev + 1); // Increment score
            return window.innerWidth; // Reset position to the right edge
          }
        }); 
      }
    }, gameInterval);

    return () => clearInterval(interval);
  }, [gameOver]);

  useEffect(() => {
    if (isJumping) {
      setJackPosition((prev) => Math.max(200 - jumpHeight, prev - jumpHeight)); 
      setTimeout(() => setJackPosition((prev) => Math.min(200, prev + jumpHeight)), jumpDuration);
      setIsJumping(false);
    }
  }, [isJumping]);

  const handleJump = () => {
    if (jackPosition === 200 && !gameOver) { 
      setIsJumping(true);
    }
  };

  const checkCollision = () => {
    return (
      obstaclePosition < 110 &&
      obstaclePosition > 50 &&
      jackPosition > 150
    );
  };

  useEffect(() => {
    if (checkCollision()) {
      setGameOver(true);
      setObstaclePosition(window.innerWidth); 
    }
  }, [obstaclePosition, jackPosition]);

  return (
    <div
      ref={gameRef}
      className="relative w-screen h-screen bg-blue-200 overflow-hidden flex flex-col items-center"
      onClick={handleJump}
    >
      <div className="absolute bottom-0 w-full h-16 bg-gradient-to-r from-gray-600 via-gray-800 to-gray-600"></div>
      <div
        className={`absolute bg-green-500 w-16 h-16 ${gameOver ? 'opacity-50' : ''}`}
        style={{ bottom: `${jackPosition}px`, left: '50px', transition: 'bottom 0.3s ease' }}
      ></div>
      <div
        className="absolute bg-red-500 w-16 h-16"
        style={{ bottom: '16px', left: `${obstaclePosition}px`, transition: 'left 0.2s ease' }}
      ></div>
      {gameOver && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-lg text-center">
          <h2 className="text-xl font-bold">Game Over!</h2>
          <p className="mt-2">Final Score: {score}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-400 transition duration-300"
          >
            Play Again
          </button>
        </div>
      )}
      <button
        onClick={() => window.history.back()}
        className="absolute bottom-4 left-4 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
      >
        &lt; Back
      </button>
      <div className="absolute top-4 right-4 text-white font-bold">Score: {score}</div>
      <div className="absolute bottom-4 right-4 text-white font-bold">Click to Jump!</div>
    </div>
  );
};

export default JumpJack;