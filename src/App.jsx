import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'; // Ensure Tailwind CSS is imported here
import GuessNumbers from './pages/guess-numbers';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-400">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome to LameGames</h1>
      <Link to="/guess-numbers">
        <button className="py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300">
          Go to Guess the Number Game
        </button>
      </Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/guess-numbers" element={<GuessNumbers />} />
      </Routes>
    </Router>
  );
}

export default App;