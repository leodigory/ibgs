import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulação de autenticação
    if (email === 'admin@igreja.com' && password === 'admin123') {
      login({ email }); // Armazena o usuário no contexto
      navigate('/'); // Redireciona para a Home
    } else if (email === 'usuario@igreja.com' && password === 'user123') {
      login({ email }); // Armazena o usuário no contexto
      navigate('/'); // Redireciona para a Home
    } else {
      setError('Email ou senha incorretos');
    }
  };

  return (
    <div className="login-page">
      {/* Div para o fundo do GIF */}
      <div className="video-background"></div>

      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>IBGS Login</h2>
          {error && <p className="error">{error}</p>}
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
