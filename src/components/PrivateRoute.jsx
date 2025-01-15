import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Supondo que você tenha um contexto de autenticação

export default function PrivateRoute({ children }) {
  const { user, isLoading } = useAuth(); // Obtém o estado de autenticação e carregamento
  const location = useLocation(); // Obtém a localização atual

  // Exibe um spinner ou mensagem de carregamento enquanto verifica a autenticação
  if (isLoading) {
    return <div>Carregando...</div>;
  }

  // Se o usuário não estiver autenticado, redirecione para a página de login
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // Se o usuário estiver autenticado, renderize o componente filho
  return children;
}