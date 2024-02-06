import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import React from 'react';

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  if (auth?.username) {
    return <Outlet />;
  }
  // else if (auth?.username) {
  //   return <Navigate to="/lounge" state={{ from: location }} replace />;
  // }
  else {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }
};

export default RequireAuth;
