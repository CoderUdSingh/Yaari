import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/authSlice";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useSelector(selectUser);

  if (!user) {
    return <Navigate to={"/login"} replace />;
  }
  return children;
};

export default ProtectedRoute;
