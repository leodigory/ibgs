import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  // Aqui você pode implementar a lógica para verificar se o usuário está autenticado
  // Por exemplo, verificar se há um token no localStorage
  return localStorage.getItem('token') !== null;
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;