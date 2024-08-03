import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import navigate hook

const Pong = () => {
  const canvasRef = useRef(null);
  const navigate = useNavigate(); // Use navigate hook for routing
  const [leftPaddleY, setLeftPaddleY] = useState(100);
  const [rightPaddleY, setRightPaddleY] = useState(100);
  const [ball, setBall] = useState({ x: 200, y: 150, dx: 1, dy: 1 });
  const [leftScore, setLeftScore] = useState(0);
  const [rightScore, setRightScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [ballReset, setBallReset] = useState(false);

  const canvasWidth = 800;
  const canvasHeight = 400;
  const paddleWidth = 10;
  const paddleHeight = 100;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const updateGame = () => {
      const newBall = { ...ball };

      // Move ball
      newBall.x += newBall.dx;
      newBall.y += newBall.dy;

      // Ball collision with top and bottom
      if (newBall.y <= 0 || newBall.y >= canvasHeight) {
        newBall.dy *= -1;
      }

      // Ball collision with paddles
      if (newBall.x <= paddleWidth && newBall.y > leftPaddleY && newBall.y < leftPaddleY + paddleHeight) {
        newBall.dx *= -1;
      }

      if (newBall.x >= canvasWidth - paddleWidth && newBall.y > rightPaddleY && newBall.y < rightPaddleY + paddleHeight) {
        newBall.dx *= -1;
      }

      // Ball out of bounds
      if (newBall.x < 0) {
        setBallReset(true);
        setRightScore(score => score + 1);
      } else if (newBall.x > canvasWidth) {
        setBallReset(true);
        setLeftScore(score => score + 1);
      }

      setBall(newBall);
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Draw paddles
      ctx.fillStyle = '#1d4ed8'; // Tailwind color for blue-800
      ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
      ctx.fillRect(canvasWidth - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);

      // Draw ball
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, 10, 0, Math.PI * 2);
      ctx.fillStyle = '#ef4444'; // Tailwind color for red-500
      ctx.fill();
      ctx.closePath();

      // Draw scores
      ctx.font = '24px Arial';
      ctx.fillStyle = '#ffffff'; // White color
      ctx.textAlign = 'center';
      ctx.fillText(`Left: ${leftScore} - Right: ${rightScore}`, canvasWidth / 2, 30);
    };

    const gameLoop = () => {
      if (!gameOver) {
        updateGame();
        draw();
        requestAnimationFrame(gameLoop);
      }
    };

    gameLoop();

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [ball, leftPaddleY, rightPaddleY, leftScore, rightScore, gameOver]);

  useEffect(() => {
    if (ballReset) {
      setBall({ x: canvasWidth / 2, y: canvasHeight / 2, dx: 1, dy: 1 });
      setBallReset(false);
      if (leftScore >= 10 || rightScore >= 10) {
        setGameOver(true);
      }
    }
  }, [ballReset]);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowUp':
        setRightPaddleY(y => Math.max(0, y - 10));
        break;
      case 'ArrowDown':
        setRightPaddleY(y => Math.min(canvasHeight - paddleHeight, y + 10));
        break;
      case 'w':
        setLeftPaddleY(y => Math.max(0, y - 10));
        break;
      case 's':
        setLeftPaddleY(y => Math.min(canvasHeight - paddleHeight, y + 10));
        break;
      default:
        break;
    }
  };

  const handleKeyUp = (e) => {
    // Handle key releases if needed
  };

  const startNewGame = () => {
    setLeftScore(0);
    setRightScore(0);
    setGameOver(false);
    setBall({ x: canvasWidth / 2, y: canvasHeight / 2, dx: 1, dy: 1 });
    setBallReset(false);
  };

  return (
    <div className="relative flex justify-items-center items-center justify-center w-screen h-screen bg-gray-900">
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        className="border border-gray-600"
      />
      {gameOver && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white py-2 px-4 rounded shadow-lg">
          <h2 className="text-xl">Game Over</h2>
          <button
            onClick={startNewGame}
            className="mt-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-400 transition duration-300"
          >
            New Game
          </button>
        </div>
      )}
      <button
        onClick={() => navigate('/')}
        className="absolute bottom-4 left-4 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
      >
        &lt; Back
      </button>
    </div>
  );
};

export default Pong;
