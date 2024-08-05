import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'; 
import { Suspense, lazy } from 'react';
import LoadingScreen from './components/LoadingScreen'; 
const GuessNumbers = lazy(() => import('./pages/guess-numbers'));
const Pong = lazy(() => import('./pages/pong'));
const Game = lazy(() => import('./pages/2048'));
const Jumper = lazy(() => import('./pages/jumpers'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));

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
    {
      id: 'jumper',
      image: '/images/jumper.jpg',
      title: 'Jumper',
      difficulty: 'Hard',
      stars: 5,
    },
    {
      id:'snappy-dude',
      image: '/images/snappy.webp',
      title: 'Snappy Dude',
      difficulty: 'Hard',
      stars: 3,
    },
    {
      id:'n-word',
      image: '/images/random.webp',
      title: 'N-Word',
      difficulty: 'Insane',
      stars: 0,
    },
  ];

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-screen bg-gray-400 px-2 sm:px-4">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/videos/intro.mp4"
        preload="auto"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gray-900 opacity-25"></div>
      <div className="relative z-10 w-full max-w-screen-lg">
        <div className="flex flex-col md:flex-row justify-between items-center p-3 rounded-lg bg-blue-950 bg-opacity-10 mb-4">
          <div className="text-white font-semibold text-lg mb-2 md:mb-0">
            {username}
          </div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            <Link to="/login">
              <button className="py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300 text-sm sm:text-base">
                Log In
              </button>
            </Link>
            <Link to="/register">
              <button className="py-2 px-4 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition duration-300 text-sm sm:text-base">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-gray-800 text-center">
          Welcome to <span className='font-bold text-sky-100'>LameGames</span>
        </h1>
        <div className="w-full max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-2 rounded-lg">
            {games.map(game => (
              <div key={game.id} className="bg-white rounded-lg shadow-lg p-2 flex flex-col transform transition duration-300 hover:scale-105">
                <img loading="lazy" src={game.image} alt={game.title} className="w-full h-32 object-cover rounded-t-lg" />
                <h2 className="text-sm sm:text-lg md:text-xl font-bold mt-2 truncate">{game.title}</h2>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base">Difficulty: {game.difficulty}</p>
                <div className="flex items-center mt-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <svg key={index} className={`w-4 h-4 md:w-5 md:h-5 ${index < game.stars ? 'text-yellow-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 .587l3.668 7.568L24 9.764l-6 5.897 1.416 8.282L12 18.897 4.584 23.943 6 15.661 0 9.764l8.332-1.609z" />
                    </svg>
                  ))}
                </div>
                <Link to={`/${game.id}`} className="block mt-4">
                  <button className="py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300 w-full text-sm sm:text-base">
                    Play Now
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

}

function App() {
  return (
   <Router>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/guess-numbers" element={<GuessNumbers />} />
          <Route path="/pong" element={<Pong />} />
          <Route path="/2048" element={<Game />} />
          <Route path="/jumpers" element={<Jumper />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Add routes for additional games here */}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;