import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h1>Login</h1>
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
    </div>
  );
}

export default Login;