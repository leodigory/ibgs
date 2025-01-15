// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { login as authLogin, logout as authLogout, isAuthenticated, getCurrentUser } from '../config/auth';

// Cria o contexto de autenticação
export const AuthContext = createContext();

// Hook personalizado para usar o contexto de autenticação
export function useAuth() {
  return useContext(AuthContext);
}

// Provedor de autenticação
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Verifica se o usuário está autenticado ao carregar o componente
  useEffect(() => {
    const checkAuth = async () => {
      if (isAuthenticated()) {
        const currentUser = getCurrentUser();
        setUser(currentUser);
      }
    };
    checkAuth();
  }, []);

  // Função para fazer login
  const login = async (email, password) => {
    try {
      const userData = await authLogin(email, password);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData)); // Armazena o usuário no localStorage
    } catch (error) {
      throw error;
    }
  };

  // Função para fazer logout
  const logout = async () => {
    await authLogout();
    setUser(null);
    localStorage.removeItem('user'); // Remove o usuário do localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}