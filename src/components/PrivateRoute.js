import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';

const PrivateRoute = ({ children }) => {
  const user = auth.currentUser; // Verifica se o usuário está autenticado

  // Se o usuário não estiver autenticado, redireciona para a página de login
  if (!user) {
    return <Navigate to="/" />;
  }

  // Se o usuário estiver autenticado, renderiza o componente filho
  return children;
};

export default PrivateRoute;