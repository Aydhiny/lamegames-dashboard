import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { login } = useUser(); 

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        login({ username: name, token: data.token });
        navigate('/');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gray-800">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Register</h1>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Register
          </button>
        </form>
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

export default Register;
