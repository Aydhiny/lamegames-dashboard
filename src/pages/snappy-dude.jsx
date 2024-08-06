import React, { useState, useEffect, useRef } from 'react';

const SnappyDude = () => {
  const [birdY, setBirdY] = useState(100);
  const [velocity, setVelocity] = useState(0);
  const [pipeX, setPipeX] = useState(window.innerWidth);
  const [pipeHeight, setPipeHeight] = useState(150);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const birdRef = useRef(null);
  const requestRef = useRef(null);

  const gameLoop = () => {
    if (isGameOver) return;

    setVelocity((prev) => prev + 0.5);
    setBirdY((prev) => Math.min(window.innerHeight - 50, prev + velocity));

    setPipeX((prev) => {
      if (prev < -50) {
        setScore((prev) => prev + 1);
        return window.innerWidth;
      }
      return prev - 5;
    });

    const birdElement = birdRef.current;
    if (birdElement) {
      const birdRect = birdElement.getBoundingClientRect();

      if (birdRect.top < 0 || birdRect.bottom > window.innerHeight) {
        endGame();
      }

      if (
        birdRect.left < pipeX + 50 &&
        birdRect.right > pipeX &&
        (birdRect.top < pipeHeight || birdRect.bottom > pipeHeight + 100)
      ) {
        endGame();
      }
    }

    requestRef.current = requestAnimationFrame(gameLoop);
  };

  const endGame = () => {
    setIsGameOver(true);
    cancelAnimationFrame(requestRef.current);
    alert('Game Over!');
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, [isGameOver]);

  const handleFlap = () => {
    if (!isGameOver) {
      setVelocity(-10);
    }
  };

  return (
    <div className="relative w-screen h-screen bg-blue-200 overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute bottom-0 w-full h-16 bg-gradient-to-r from-gray-600 via-gray-800 to-gray-600"></div>
      <div
        ref={birdRef}
        className={`absolute bg-yellow-500 rounded-full w-12 h-12 transition-transform duration-300 ease-in-out ${isGameOver ? 'opacity-50' : ''}`}
        style={{ top: birdY, left: 50 }}
      />
      <div
        className="absolute bg-green-600 w-12"
        style={{ top: 0, left: pipeX, height: pipeHeight }}
      />
      <div
        className="absolute bg-green-600 w-12"
        style={{ top: pipeHeight + 100, left: pipeX, height: window.innerHeight - pipeHeight - 100 }}
      />
      <button
        onClick={handleFlap}
        className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-red-500 text-white rounded ${isGameOver ? 'opacity-50' : ''} hover:bg-red-400 transition duration-300`}
        disabled={isGameOver}
      >
        Flap
      </button>
      <div className="absolute top-5 left-5 text-white text-2xl font-bold">Score: {score}</div>
      <button
        onClick={() => window.history.back()}
        className="absolute bottom-4 left-4 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
      >
        &lt; Back
      </button>
    </div>
  );
};

export default SnappyDude;