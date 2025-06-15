import React, { use } from "react";
import { AuthContext } from "../context/AuthContext";
import Loading from "../shared/Loading";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = (children) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();
  
  if (loading) return <Loading />;
  if (!user) return <Navigate to="/auth/login" state={location.pathname} />;
  
  return children;
};

export default PrivateRoute;
