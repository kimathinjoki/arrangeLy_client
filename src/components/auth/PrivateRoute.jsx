// components/auth/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

function PrivateRoute({ children, isAuthenticated }) {
  // If user is not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  // If user is authenticated, render the children components
  return children;
}

export default PrivateRoute;