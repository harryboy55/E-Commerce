import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import Login from './pages/Login';
import Header from './components/Header';
import Orders from './pages/Orders';
import OrderDetailPage from './pages/OrderDetails';
import ProtectedRoute from "./pages/ProtectedRoute";
import PublicRoute from "./pages/PublicRoute";

const App = () => (
  <Router>
    <Header />
    <Routes>
      {/* Public Route for Login */}
      <Route path="/login" element={<PublicRoute element={<Login />} />} />

      {/* Protected Routes for Admin */}
      <Route path="/" element={<ProtectedRoute element={<Dashboard />} adminOnly={true} />} />
      <Route path="/products" element={<ProtectedRoute element={<Products />} adminOnly={true} />} />
      <Route path="/add-product" element={<ProtectedRoute element={<AddProduct />} adminOnly={true} />} />
      <Route path="/orders" element={<ProtectedRoute element={<Orders />} adminOnly={true} />} />
      <Route path="/orders/:orderId" element={<ProtectedRoute element={<OrderDetailPage />} adminOnly={true} />} />
    </Routes>
  </Router>
);

export default App;
