import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute({ children }) {
  const { user } = useAuth(); // Obtém o estado de autenticação

  // Se o usuário não estiver autenticado, redirecione para a página de login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Se o usuário estiver autenticado, renderize o componente filho
  return children;
}