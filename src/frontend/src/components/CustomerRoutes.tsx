import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './auth';

// Routes only visible once logged in as customer or employee
export default function CustomerRoutes() {
  let auth = useAuth();
  return auth?.userInfo.role !== 'none' ? <Outlet /> : <Navigate to="/" />;
}
