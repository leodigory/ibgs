import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase'; // Importa o auth do Firebase

function PrivateRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar o carregamento

  useEffect(() => {
    // Verifica se o usuário está autenticado
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true); // Usuário autenticado
      } else {
        setIsAuthenticated(false); // Usuário não autenticado
      }
      setIsLoading(false); // Finaliza o carregamento
    });

    // Limpa o listener ao desmontar o componente
    return () => unsubscribe();
  }, []);

  // Se estiver carregando, exibe uma mensagem ou um spinner
  if (isLoading) {
    return <div>Carregando...</div>;
  }

  // Se o usuário estiver autenticado, renderiza o componente filho
  // Caso contrário, redireciona para a página de login
  return isAuthenticated ? children : <Navigate to="/" />;
}

export default PrivateRoute;