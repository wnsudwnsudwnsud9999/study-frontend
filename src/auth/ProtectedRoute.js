import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    // 로그인 안 되어 있으면 /login 으로 보냄
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
