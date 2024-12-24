import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Doacoes from './pages/Doacoes';
import Frequencia from './pages/Frequencia';
import Servicos from './pages/Servicos';
import { useAuth } from './context/AuthContext';

function AppRoutes() {
  const { user } = useAuth();

  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
         <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doacoes"
        element={
          <ProtectedRoute>
            <Doacoes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/frequencia"
        element={
          <ProtectedRoute>
            <Frequencia />
          </ProtectedRoute>
        }
      />
      <Route
        path="/servicos"
        element={
          <ProtectedRoute>
            <Servicos />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
