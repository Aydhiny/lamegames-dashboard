import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'; // Ensure Tailwind CSS is imported here
import GuessNumbers from './pages/guess-numbers';
import Pong from './pages/pong';

function Home() {
  const username = "Guest";
  const games = [
    {
      id: 'guess-numbers',
      image: '/images/guessNumber.avif',
      title: 'Guess the Number',
      difficulty: 'Easy',
      stars: 1,
    },
    {
      id: 'pong',
      image: '/images/pong.webp',
      title: 'Pong',
      difficulty: 'Medium',
      stars: 4,
    },
    {
      id: '2048',
      image: '/images/2048.avif',
      title: '2048 Puzzle',
      difficulty: 'Medium',
      stars: 4,
    },
    // Add more games here...
  ];

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-screen bg-gray-400">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/videos/intro.mp4"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gray-900 opacity-25"></div>
      <div className="relative z-10 px-4 py-2">
        <div className="flex justify-between items-center p-3 rounded-lg bg-blue-950 bg-opacity-10">
          <div className="text-white font-semibold text-lg">
            {username}
          </div>
          <div className="space-x-4">
            <Link to="/login">
              <button className="py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300">
                Log In
              </button>
            </Link>
            <Link to="/signup">
              <button className="py-2 px-4 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition duration-300">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
        <h1 className="text-3xl m-5 font-bold mb-4 text-gray-800 text-center">
          Welcome to <span className='font-bold text-sky-100'>LameGames</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-blue-950 bg-opacity-10 p-2 rounded-lg">
          {games.map(game => (
            <div key={game.id} className="bg-white rounded-lg shadow-lg p-4 transform transition duration-300 hover:scale-105">
              <img src={game.image} alt={game.title} className="w-full h-32 object-cover rounded-t-lg" />
              <h2 className="text-xl font-bold mt-2">{game.title}</h2>
              <p className="text-gray-600">Difficulty: {game.difficulty}</p>
              <div className="flex items-center mt-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <svg key={index} className={`w-5 h-5 ${index < game.stars ? 'text-yellow-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 .587l3.668 7.568L24 9.764l-6 5.897 1.416 8.282L12 18.897 4.584 23.943 6 15.661 0 9.764l8.332-1.609z" />
                  </svg>
                ))}
              </div>
              <Link to={`/${game.id}`} className="block mt-4">
                <button className="py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300 w-full">
                  Play Now
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/guess-numbers" element={<GuessNumbers />} />
                <Route path="/pong" element={<Pong />} />
        {/* Add routes for additional games here */}
      </Routes>
    </Router>
  );
}

export default App;