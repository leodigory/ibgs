import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Login.css'; // Importe o arquivo CSS

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulação de autenticação
    const users = [
      { email: 'pastor@igreja.com', password: '123', role: 'Pastor', name: 'Pastor João', photo: 'https://via.placeholder.com/50' },
      { email: 'lider@igreja.com', password: '123', role: 'Liderança', name: 'Líder Maria', photo: 'https://via.placeholder.com/50' },
      { email: 'membro@igreja.com', password: '123', role: 'Membro', name: 'Membro Carlos', photo: 'https://via.placeholder.com/50' },
    ];

    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      login(user);
      navigate('/');
    } else {
      alert('Email ou senha incorretos!');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button onClick={handleLogin} className="login-button">
          Entrar
        </button>
      </div>
    </div>
  );
};

export default Login;