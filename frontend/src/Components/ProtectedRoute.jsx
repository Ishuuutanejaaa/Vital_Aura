import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('token'); // Check if the user has a valid token
  
  if (!token) {
    // If no token is found, redirect to the login page
    return <Navigate to="/" />;
  }

  return element; // If token is present, render the requested component
};

export default ProtectedRoute;
