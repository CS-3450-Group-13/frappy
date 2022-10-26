import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './auth';

export default function EmployeeRoutes() {
  let auth = useAuth();

  return auth?.role === 'employee' || auth?.role === 'manager' ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
}
