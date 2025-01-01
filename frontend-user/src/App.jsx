import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Header from './components/Header';
import Footer from './components/Footer';
import Wishlist from './pages/Wishlist';
import Confirmation from './pages/Confirmation';
import SearchPage from './pages/SearchPage';
import ProtectedRoute from "./pages/ProtectedRoute";
import PublicRoute from "./pages/PublicRoute";

const App = () => {
  const token = localStorage.getItem("token");  // Check if the user is logged in

  return (
    <Router>
      <Header />
      <Routes>
        {/* Public Routes (only accessible for logged-out users) */}
        <Route path="/" element={token ? <Home /> : <PublicRoute element={<Home />} />} />
        <Route path="/search" element={token ? <SearchPage /> : <PublicRoute element={<SearchPage />} />} />

        {/* Protected Routes (only accessible for logged-in users) */}
        <Route path="/cart" element={token ? <ProtectedRoute element={<Cart />} /> : <PublicRoute element={<Home />} />} />
        <Route path="/checkout" element={token ? <ProtectedRoute element={<Checkout />} /> : <PublicRoute element={<Home />} />} />
        <Route path="/wishlist" element={token ? <ProtectedRoute element={<Wishlist />} /> : <PublicRoute element={<Home />} />} />
        <Route path="/confirmation" element={token ? <ProtectedRoute element={<Confirmation />} /> : <PublicRoute element={<Home />} />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
