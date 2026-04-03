import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * @param {boolean} isAuthenticated - Passed from your AuthContext or App state
 */
const ProtectedRoute = ({ isAuthenticated }) => {
  // If not logged in, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If logged in, render the child routes (Dashboard, Inventory, etc.)
  return <Outlet />;
};

export default ProtectedRoute;