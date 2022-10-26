import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './auth';

export default function CustomerRoutes() {
  let auth = useAuth();

  return auth?.role !== 'none' ? <Outlet /> : <Navigate to="/" />;
}
