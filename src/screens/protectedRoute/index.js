import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ isLoggedOut, children }) {
  if (isLoggedOut()) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoute;
