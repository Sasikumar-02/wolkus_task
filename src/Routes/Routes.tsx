import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import DashboardLayout from '../Layout';
import LoginPage from '../Login';
import SignUpPage from '../SignUp';
import PrivateRoute from './PrivateRoute'; 

const AppRoutes = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <Routes>
      <Route index path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route element={<DashboardLayout />}>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute
              element={<Dashboard onToggleTheme={toggleTheme} 
              theme={theme}/>}

            />
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
