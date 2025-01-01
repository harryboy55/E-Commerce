import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, adminOnly = false }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // Assuming role is stored in localStorage
  
  // If no token or the user is not an admin (if adminOnly is true)
  if (!token || (adminOnly && userRole !== "admin")) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
