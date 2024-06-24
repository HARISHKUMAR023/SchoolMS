import React, { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PublicRouteProps {
  children?: ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token');

  if (token) {
    return <Navigate to="/dashboard" />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default PublicRoute;
