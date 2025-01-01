import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle login logic
  const handleLogin = () => {
    // Simple login check (replace this with actual authentication logic)
    if (username === 'admin' && password === 'admin') {
      // Set token in localStorage for authentication
      localStorage.setItem('token', 'userToken');  // You can set a real token here
      
      // Set role in localStorage (optional, depending on your app)
      localStorage.setItem('role', 'admin');
      
      // Redirect to dashboard or home page
      navigate('/');  // Redirect to the dashboard or home after successful login
    } else {
      alert('Invalid credentials');
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <div>
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
        </div>
        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
