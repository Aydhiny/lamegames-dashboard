import React, { useState, useEffect, useRef } from 'react';

const Snake = () => {
  const [snake, setSnake] = useState([{ x: 0, y: 0 }]);
  const [direction, setDirection] = useState('RIGHT');
  const [food, setFood] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const boardSize = 20; // Board size in terms of cells
  const cellSize = 20; // Size of each cell in pixels
  const speed = 200; // Speed of the snake (milliseconds)

  const intervalRef = useRef(null);

  useEffect(() => {
    // Initialize food position
    placeFood();

    // Start the game loop
    intervalRef.current = setInterval(() => {
      if (!isGameOver) {
        moveSnake();
      }
    }, speed);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [direction, isGameOver]);

  const placeFood = () => {
    const x = Math.floor(Math.random() * boardSize) * cellSize;
    const y = Math.floor(Math.random() * boardSize) * cellSize;
    setFood({ x, y });
  };

  const moveSnake = () => {
    setSnake((prevSnake) => {
      const newSnake = [...prevSnake];
      const head = { ...newSnake[0] };

      switch (direction) {
        case 'RIGHT':
          head.x += cellSize;
          break;
        case 'LEFT':
          head.x -= cellSize;
          break;
        case 'UP':
          head.y -= cellSize;
          break;
        case 'DOWN':
          head.y += cellSize;
          break;
        default:
          break;
      }

      // Check for collisions
      if (checkCollision(head)) {
        endGame();
        return prevSnake;
      }

      newSnake.unshift(head); // Add new head to the snake
      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => prev + 1);
        placeFood();
      } else {
        newSnake.pop(); // Remove the last segment of the snake if not eating food
      }

      return newSnake;
    });
  };

  const checkCollision = (head) => {
    // Check if snake collides with walls
    if (head.x < 0 || head.x >= boardSize * cellSize || head.y < 0 || head.y >= boardSize * cellSize) {
      return true;
    }

    // Check if snake collides with itself
    return snake.some((segment) => segment.x === head.x && segment.y === head.y);
  };

  const endGame = () => {
    setIsGameOver(true);
    clearInterval(intervalRef.current);
    alert('Game Over!');
  };

  const handleKeyPress = (e) => {
    switch (e.key) {
      case 'ArrowRight':
        if (direction !== 'LEFT') setDirection('RIGHT');
        break;
      case 'ArrowLeft':
        if (direction !== 'RIGHT') setDirection('LEFT');
        break;
      case 'ArrowUp':
        if (direction !== 'DOWN') setDirection('UP');
        break;
      case 'ArrowDown':
        if (direction !== 'UP') setDirection('DOWN');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [direction]);

  return (
    <div className="relative w-screen h-screen bg-gray-800 overflow-hidden flex flex-col items-center justify-center">
      <div
        className="absolute"
        style={{
          width: `${boardSize * cellSize}px`,
          height: `${boardSize * cellSize}px`,
          backgroundColor: 'black',
          position: 'relative',
        }}
      >
        {snake.map((segment, index) => (
          <div
            key={index}
            className="absolute bg-green-500"
            style={{
              width: `${cellSize}px`,
              height: `${cellSize}px`,
              top: `${segment.y}px`,
              left: `${segment.x}px`,
            }}
          />
        ))}
        <div
          className="absolute bg-red-500"
          style={{
            width: `${cellSize}px`,
            height: `${cellSize}px`,
            top: `${food.y}px`,
            left: `${food.x}px`,
          }}
        />
      </div>
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

export default Snake;