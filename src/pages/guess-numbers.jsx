import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { useNavigate } from 'react-router-dom';

function GuessNumbers() {
    const [textField, setTextField] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);
    const [showWinMessage, setShowWinMessage] = useState(false);
    const [showLoseMessage, setShowLoseMessage] = useState(false);
    const [randNumber, setRandNumber] = useState(randomizer());
    const [confettiOpacity, setConfettiOpacity] = useState(1);
    const [feedback, setFeedback] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (showConfetti) {
            const fadeOutConfetti = setTimeout(() => {
                setConfettiOpacity(0);
                setTimeout(() => {
                    setShowConfetti(false);
                    setConfettiOpacity(1);
                }, 500); 
            }, 5000); 

            return () => clearTimeout(fadeOutConfetti);
        }
    }, [showConfetti]);

    useEffect(() => {
        if (showWinMessage) {
            const hideWinMessage = setTimeout(() => {
                setShowWinMessage(false);
            }, 5000); // Hide win message after 5 seconds

            return () => clearTimeout(hideWinMessage);
        }
    }, [showWinMessage]);

    function checkNumber() {
        const userNumber = Number(textField);
        const diff = Math.abs(userNumber - randNumber);

        if (userNumber === randNumber) {
            setShowWinMessage(true);
            setShowConfetti(true);
            setRandNumber(randomizer());
            setTextField('');
            setFeedback('');
            setShowLoseMessage(false);
        } else {
            if (diff <= 5) {
                setFeedback('Hotter');
            } else if (diff <= 10) {
                setFeedback('Hot');
            } else if (diff <= 20) {
                setFeedback('Cold');
            } else {
                setFeedback('Colder');
            }
            setShowLoseMessage(true);
            setTimeout(() => setShowLoseMessage(false), 2000); // Hide lose message after 2 seconds
        }
    }

    return (
        <div className="relative flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 w-screen h-screen p-4">
            {showConfetti && (
                <Confetti
                    style={{ opacity: confettiOpacity }}
                />
            )}
            {showWinMessage && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-auto max-w-xs">
                    <div className="bg-green-500 text-white py-2 px-4 rounded shadow-lg text-center">
                        You win!
                    </div>
                </div>
            )}
            {showLoseMessage && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-auto max-w-xs">
                    <div className="bg-red-500 text-white py-2 px-4 rounded shadow-lg text-center">
                        You lose!
                    </div>
                </div>
            )}
            <div className="bg-white p-4 rounded shadow-lg w-full max-w-md text-center">
                <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">Guess the Number</h1>
                <p className="text-base md:text-lg text-gray-700 mb-6">
                    We have selected a random number between <br />
                    <span className="font-bold text-blue-500">
                        {randNumber - 15}  {/* Adjust range here */}
                    </span>
                    <br /> and <br />
                    <span className="font-bold text-blue-500">
                        {randNumber + 15}  {/* Adjust range here */}
                    </span>.
                </p>
                {feedback && (
                    <p className={`mt-4 text-base md:text-lg font-bold ${feedback === 'Hotter' || feedback === 'Hot' ? 'text-orange-500' : 'text-blue-500'}`}>
                        {feedback}
                    </p>
                )}
                <input  
                    id="textField"
                    type="text"
                    placeholder="Guess the number..."
                    value={textField}
                    onChange={(e) => setTextField(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-base md:text-lg" 
                />
                <button 
                    onClick={checkNumber} 
                    className="w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300 text-base md:text-lg"
                >
                    Guess the number
                </button>
            </div>
            <button 
                onClick={() => navigate('/')} 
                className="absolute bottom-4 left-4 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300 text-base md:text-lg"
            >
                &lt; Back
            </button>
        </div>
    );
}

function randomizer() {
    return Math.floor(Math.random() * 200) + 1; 
}

export default GuessNumbers;
