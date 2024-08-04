import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import navigate hook

const SIZE = 4;
const START_TILES = 2;

const getEmptyBoard = () => Array(SIZE).fill(null).map(() => Array(SIZE).fill(0));

const getRandomPosition = () => ({
  x: Math.floor(Math.random() * SIZE),
  y: Math.floor(Math.random() * SIZE),
});

const addRandomTile = (board) => {
  const { x, y } = getRandomPosition();
  if (board[x][y] === 0) {
    board[x][y] = Math.random() > 0.1 ? 2 : 4;
  } else {
    addRandomTile(board);
  }
};

const move = (board, direction) => {
  const newBoard = board.map(row => row.slice()); // Clone the board
  let hasMoved = false;

  const slideRow = (row) => {
    const newRow = row.filter(value => value !== 0);
    const mergedRow = [];
    let skip = false;

    for (let i = 0; i < newRow.length; i++) {
      if (skip) {
        skip = false;
        continue;
      }

      if (i < newRow.length - 1 && newRow[i] === newRow[i + 1]) {
        mergedRow.push(newRow[i] * 2);
        hasMoved = true;
        skip = true;
      } else {
        mergedRow.push(newRow[i]);
      }
    }

    return [...mergedRow, ...Array(SIZE - mergedRow.length).fill(0)];
  };

  switch (direction) {
    case 'ArrowLeft':
      for (let i = 0; i < SIZE; i++) {
        const newRow = slideRow(newBoard[i]);
        if (!arraysEqual(newBoard[i], newRow)) {
          hasMoved = true;
        }
        newBoard[i] = newRow;
      }
      break;

    case 'ArrowRight':
      for (let i = 0; i < SIZE; i++) {
        const reversedRow = newBoard[i].slice().reverse();
        const newRow = slideRow(reversedRow).reverse();
        if (!arraysEqual(newBoard[i], newRow)) {
          hasMoved = true;
        }
        newBoard[i] = newRow;
      }
      break;

    case 'ArrowUp':
      for (let col = 0; col < SIZE; col++) {
        const column = newBoard.map(row => row[col]);
        const newColumn = slideRow(column);
        if (!arraysEqual(column, newColumn)) {
          hasMoved = true;
        }
        for (let row = 0; row < SIZE; row++) {
          newBoard[row][col] = newColumn[row];
        }
      }
      break;

    case 'ArrowDown':
      for (let col = 0; col < SIZE; col++) {
        const column = newBoard.map(row => row[col]).reverse();
        const newColumn = slideRow(column).reverse();
        if (!arraysEqual(column, newColumn)) {
          hasMoved = true;
        }
        for (let row = 0; row < SIZE; row++) {
          newBoard[row][col] = newColumn[row];
        }
      }
      break;

    default:
      break;
  }

  if (hasMoved) {
    addRandomTile(newBoard);
  }

  return newBoard;
};

// Helper function to compare two arrays
const arraysEqual = (a, b) => {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

const Game = () => {
  const [board, setBoard] = useState(getEmptyBoard);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('highScore')) || 0);
  const navigate = useNavigate(); // Use navigate hook for routing

  useEffect(() => {
    const newBoard = getEmptyBoard();
    for (let i = 0; i < START_TILES; i++) {
      addRandomTile(newBoard);
    }
    setBoard(newBoard);
  }, []);

  const handleKeyDown = (e) => {
    const newBoard = move(board, e.key);
    setBoard(newBoard);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [board]);

  const updateHighScore = (newScore) => {
    if (newScore > highScore) {
      setHighScore(newScore);
      localStorage.setItem('highScore', newScore);
    }
  };

  const handleTileClick = (x, y) => {
    // Implement tile click logic here
  };

  const renderBoard = () => (
    <div className="grid grid-cols-4 gap-2">
      {board.map((row, rowIndex) =>
        row.map((tile, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`w-16 h-16 flex items-center justify-center rounded-lg text-white text-xl font-bold ${getTileClass(tile)}`}
            onClick={() => handleTileClick(rowIndex, colIndex)}
          >
            {tile !== 0 ? tile : ''}
          </div>
        ))
      )}
    </div>
  );

  const getTileClass = (tile) => {
    const tileClasses = {
      2: 'bg-gray-200 text-gray-800',
      4: 'bg-gray-300 text-gray-800',
      8: 'bg-gray-400 text-white',
      16: 'bg-gray-500 text-white',
      32: 'bg-gray-600 text-white',
      64: 'bg-gray-700 text-white',
      128: 'bg-gray-800 text-white',
      256: 'bg-gray-900 text-white',
      512: 'bg-gray-900 text-white',
      1024: 'bg-gray-900 text-white',
      2048: 'bg-yellow-500 text-white',
    };
    return tileClasses[tile] || 'bg-gray-800 text-white';
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-screen h-screen bg-gray-800">
      <h1 className="text-4xl font-bold text-white mb-4">2048</h1>
      <div className="absolute top-4 right-4 text-white">
        <p className="text-xl">Score: {score}</p>
        <p className="text-xl">High Score: {highScore}</p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {renderBoard()}
      </div>
      <button
        onClick={() => navigate('/')}
        className="absolute bottom-4 left-4 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
      >
        &lt; Back
      </button>
    </div>
  );
};

export default Game;