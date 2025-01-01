import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ element }) => {
  const token = localStorage.getItem("token");

  // If the user is logged in, redirect to the dashboard (or home page)
  if (token) {
    return <Navigate to="/" />;
  }

  return element;
};

export default PublicRoute;
