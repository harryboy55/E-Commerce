// src/components/Header.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input, message } from 'antd';
import { SearchOutlined, HeartOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { GoogleLogin } from '@react-oauth/google';

const Header = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
  }, []);

  const handleLoginSuccess = (response) => {
    const { credential } = response;

    if (credential) {
      fetch('http://localhost:5000/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: credential }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);
            setToken(data.token);
          }
        })
        .catch((err) => console.error('Login error:', err));
    } else {
      console.error('Google login failed: No credential received');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setToken(null);
    navigate('/');
  };

  const handleProtectedRoute = (route) => {
    if (!user) {
      message.warning('Please log in first.');
    } else {
      navigate(route);
    }
  };

  // Search functionality
  const handleSearch = () => {
    if (searchQuery) {
      navigate(`/search?q=${searchQuery}`);
    } else {
      message.warning('Please enter a search query');
    }
  };

  return (
    <header className="bg-black text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white">
          BOOKSHOP
        </Link>

        {/* Search Bar */}
        <div className="flex-1 mx-8 flex items-center relative">
          <Input
            placeholder="Search for books..."
            className="rounded-md pr-10" // added padding for the icon
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onPressEnter={handleSearch} // Press Enter to search
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={handleSearch}
          >
            <SearchOutlined className='text-black'/>
          </span>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          {/* Wishlist Icon */}
          <div
            className="text-white text-lg cursor-pointer"
            onClick={() => handleProtectedRoute('/wishlist')}
          >
            <HeartOutlined style={{ color: 'white' }} />
          </div>

          {/* Cart Icon */}
          <div
            className="text-white text-lg cursor-pointer"
            onClick={() => handleProtectedRoute('/cart')}
          >
            <ShoppingCartOutlined style={{ color: 'white' }} />
          </div>

          {/* User Icon and Login */}
          {user ? (
            <div className="flex items-center space-x-3">
              <span className="text-white">{user.name}</span>
              {/* <Link to="/profile" className="text-white text-lg"> */}
                <UserOutlined style={{ color: 'white' }} />
              {/* </Link> */}
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onFailure={(error) => console.error('Google login failed:', error)}
              useOneTap
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
