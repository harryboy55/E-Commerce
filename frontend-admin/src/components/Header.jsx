import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const token = localStorage.getItem('token');  // Check for token
  const role = localStorage.getItem('role');    // Check for role (optional based on your needs)
  const navigate = useNavigate();

  const logout = () => {
    // Remove token and role from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    // Redirect to login page after logout
    navigate('/login');  // Or navigate('/'), depending on where you want to redirect
  };

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Admin Panel</h1>
        <nav>
          <ul className="flex space-x-6">
            {/* Link to Dashboard */}
            <li>
              <Link to="/" className="hover:text-gray-400">
                Dashboard
              </Link>
            </li>
            {/* Link to Orders */}
            <li>
              <Link to="/orders" className="hover:text-gray-400">
                Orders
              </Link>
            </li>
            {/* Link to Products */}
            <li>
              <Link to="/products" className="hover:text-gray-400">
                Products
              </Link>
            </li>
            {/* Link to Add Product */}
            <li>
              <Link to="/add-product" className="hover:text-gray-400">
                Add Product
              </Link>
            </li>
            {/* Conditional Rendering: Show Logout or Login */}
            {token || role ? (
              // Show Logout button if token or role is in localStorage
              <li>
                <button onClick={logout} className="hover:text-gray-400">
                  Logout
                </button>
              </li>
            ) : (
              // Show Login link if no token or role is found
              <li>
                <Link to="/login" className="hover:text-gray-400">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
