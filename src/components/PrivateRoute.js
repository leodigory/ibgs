import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { auth } from '../firebase'; // Importa o auth do Firebase
import { getUserRole } from '../services/userService'; // Função para buscar o role do usuário
import { fetchAllowedTabs } from '../services/roleService'; // Função para buscar as páginas permitidas

function PrivateRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar o carregamento
  const [isAuthorized, setIsAuthorized] = useState(false); // Estado para controlar a autorização
  const location = useLocation(); // Hook para obter a localização atual (nome da página)

  // Função para normalizar strings (ignorar barras, espaços, hifens e capitalização)
  const normalizeString = (str) => {
    return str
      .toLowerCase() // Transforma em minúsculas
      .replace(/\//g, '') // Remove barras
      .replace(/\s+/g, '') // Remove espaços
      .replace(/-/g, ''); // Remove hifens
  };

  useEffect(() => {
    let isMounted = true; // Flag para verificar se o componente está montado

    // Verifica se o usuário está autenticado
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (isMounted) {
        if (user) {
          setIsAuthenticated(true); // Usuário autenticado

          // Busca o role do usuário
          try {
            const userRole = await getUserRole(user.uid);

            // Busca as páginas permitidas para o role do usuário
            const allowedTabs = await fetchAllowedTabs(userRole);

            // Normaliza a página atual
            const currentPage = normalizeString(location.pathname);

            // Normaliza as páginas permitidas e verifica se a página atual está na lista
            const isAllowed = allowedTabs.some((tab) => {
              const normalizedTab = normalizeString(tab);
              return normalizedTab === currentPage;
            });

            if (isAllowed) {
              setIsAuthorized(true); // Usuário tem permissão para acessar a página
            } else {
              setIsAuthorized(false); // Usuário não tem permissão
            }
          } catch (error) {
            console.error('Erro ao verificar permissões:', error);
            setIsAuthorized(false); // Em caso de erro, nega a permissão
          }
        } else {
          setIsAuthenticated(false); // Usuário não autenticado
        }
        setIsLoading(false); // Finaliza o carregamento
      }
    });

    // Limpa o listener ao desmontar o componente
    return () => {
      isMounted = false; // Marca o componente como desmontado
      unsubscribe(); // Remove o listener
    };
  }, [location.pathname]); // Executa o efeito sempre que a página muda

  // Se estiver carregando, exibe uma mensagem ou um spinner
  if (isLoading) {
    return <div>Carregando...</div>;
  }

  // Se o usuário não estiver autenticado, redireciona para a página de login
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  // Se o usuário estiver autenticado, mas não tiver permissão, redireciona para /home
  if (!isAuthorized) {
    return <Navigate to="/home" />;
  }

  // Se o usuário estiver autenticado e tiver permissão, renderiza o componente filho
  return children;
}

export default PrivateRoute;