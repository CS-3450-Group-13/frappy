import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './auth';

export default function ManagerRoutes() {
  let auth = useAuth();

  return auth?.userInfo.role === 'manager' ? <Outlet /> : <Navigate to="/" />;
}
