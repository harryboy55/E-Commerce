import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token");

  // If not logged in, redirect to home or login page
  if (!token) {
    return <Navigate to="/" />;
  }

  return element; // If logged in, allow access to protected routes
};

export default ProtectedRoute;
