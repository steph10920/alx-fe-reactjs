import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const isAuthenticated = false; // Simulate authentication status

  return isAuthenticated ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
