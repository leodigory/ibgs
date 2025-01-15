import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // Obtém a função de login do contexto
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password); // Faz o login
      navigate('/'); // Redireciona para a página inicial após o login
    } catch (error) {
      alert(error.message); // Exibe uma mensagem de erro
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required // Adiciona validação de campo obrigatório
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required // Adiciona validação de campo obrigatório
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}