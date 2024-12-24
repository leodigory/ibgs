import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userInfo) => {
    setUser(userInfo); // Aqui você pode configurar os dados do usuário após login
  };

  const logout = () => {
    setUser(null); // Remove o usuário ao fazer logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
