import { createContext, useContext, useState } from 'react';

// Cria o contexto de autenticação
export const AuthContext = createContext();

// Hook personalizado para usar o contexto de autenticação
export function useAuth() {
  return useContext(AuthContext);
}

// Provedor de autenticação
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Função para simular o login
  const login = async (email, password) => {
    // Simulação de uma requisição de login
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'usuario@example.com' && password === 'senha123') {
          const userData = {
            id: 1,
            name: 'Usuário Teste',
            email: 'usuario@example.com',
          };
          setUser(userData); // Define o usuário no estado
          resolve(userData);
        } else {
          reject(new Error('Credenciais inválidas'));
        }
      }, 1000); // Simula um atraso de 1 segundo
    });
  };

  // Função para fazer logout
  const logout = () => {
    setUser(null); // Remove o usuário do estado
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}