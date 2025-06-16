import React from "react";
import Loading from "../shared/Loading";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({children}) => {
  const { user, loading } = useAuth()
  const location = useLocation();
  
  if (loading) return <Loading />;
  if (!user) return <Navigate to="/auth/login" state={location.pathname} />;
  
  return children;
};

export default PrivateRoute;
