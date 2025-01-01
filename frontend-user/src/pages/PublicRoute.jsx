import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ element }) => {
  const token = localStorage.getItem("token");

  // If logged in, redirect to home or any other route (so that public routes are not accessible)
  if (token) {
    return <Navigate to="/" />;
  }

  return element; // If not logged in, allow access to public routes
};

export default PublicRoute;
