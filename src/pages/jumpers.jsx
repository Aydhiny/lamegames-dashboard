import React, { useState, useEffect, useRef } from 'react';

const Jumper = () => {
  const [isJumping, setIsJumping] = useState(false);
  const [position, setPosition] = useState(200); 
  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);
  const gameRef = useRef(null);

  const handleJump = () => {
    if (!isJumping) {
      setIsJumping(true);
      setPosition(100); 
      setTimeout(() => {
        setPosition(200);
        setIsJumping(false);
      }, 500);
    }
  };

  useEffect(() => {
    const gameInterval = setInterval(() => {
      setObstacles((prevObstacles) => {
        const newObstacles = prevObstacles
          .map((obstacle) => ({
            ...obstacle,
            x: obstacle.x - 10, 
          }))
          .filter((obstacle) => obstacle.x > -50); 

        if (Math.random() < 0.02) {
          newObstacles.push({
            x: 500,
            width: 50,
            height: 50,
          });
        }

        return newObstacles;
      });

      // Check for collisions
      obstacles.forEach((obstacle) => {
        if (
          obstacle.x < 100 &&
          obstacle.x > 50 &&
          position < 150
        ) {
          alert('Game Over!');
          setObstacles([]);
          setScore(0);
        }
      });

      setScore((prevScore) => prevScore + 1);
    }, 100);

    return () => clearInterval(gameInterval);
  }, [obstacles, position]);

  return (
    <div
      ref={gameRef}
      className="relative flex items-center justify-center min-h-screen bg-blue-900 overflow-hidden"
    >
      <div
        className="absolute bottom-10 left-10 bg-yellow-400 h-8 w-8 rounded-full"
        style={{ bottom: position + 'px' }}
      />
      {obstacles.map((obstacle, index) => (
        <div
          key={index}
          className="absolute bg-red-500"
          style={{
            left: obstacle.x + 'px',
            width: obstacle.width + 'px',
            height: obstacle.height + 'px',
            bottom: '0',
          }}
        />
      ))}
      <button
        onClick={handleJump}
        className="absolute top-5 right-5 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
      >
        Jump
      </button>
      <div className="absolute bottom-5 left-5 text-white text-lg">
        Score: {score}
      </div>
    </div>
  );
};

export default Jumper;
