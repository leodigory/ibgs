// src/config/auth.js

// Função para simular o login
export const login = async (email, password) => {
    // Simulação de uma requisição de login
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'usuario@example.com' && password === 'senha123') {
          resolve({
            id: 1,
            name: 'Usuário Teste',
            email: 'usuario@example.com',
          });
        } else {
          reject(new Error('Credenciais inválidas'));
        }
      }, 1000); // Simula um atraso de 1 segundo
    });
  };
  
  // Função para simular o logout
  export const logout = async () => {
    // Simulação de uma requisição de logout
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 500); // Simula um atraso de 0.5 segundos
    });
  };
  
  // Função para verificar se o usuário está autenticado
  export const isAuthenticated = () => {
    // Verifica se há um usuário no localStorage (ou outro método de armazenamento)
    const user = JSON.parse(localStorage.getItem('user'));
    return !!user; // Retorna true se o usuário existir, caso contrário, false
  };
  
  // Função para obter o usuário atual
  export const getCurrentUser = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  };