import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Importe o CSS

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulação de autenticação
    if (username === 'admin' && password === 'admin123') {
      navigate('/home', { state: { role: 'admin' } });
    } else if (username === 'pastor' && password === 'pastor123') {
      navigate('/home', { state: { role: 'pastor' } });
    } else {
      alert('Credenciais inválidas!');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Logo SVG */}
        <img 
          src="/logo.png" 
          alt="Logo da Igreja" 
          className="church-logo"
        />
        <h1>Continue na comunidade</h1>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Entrar</button>
        <p className="signup-text" onClick={() => navigate('/signup')}>
          Não tem uma conta? <span>Cadastre-se</span>
        </p>
      </div>
      <div className="login-image"></div> {/* Lado direito (imagem) */}
    </div>
  );
}

export default Login;