import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../auth'; // Importa a função de login do Firebase
import { doc, getDoc } from "firebase/firestore"; // Importa funções do Firestore
import { db } from '../firebase'; // Importa o Firestore
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Autentica o usuário com Firebase
      const user = await signIn(email, password);

      // Busca o papel (role) do usuário no Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userRole = userDoc.data().role || 'visitante'; // Define o papel padrão como 'visitante'

      // Redireciona para a página inicial com base no papel (role) do usuário
      navigate('/home', { state: { role: userRole } });
    } catch (error) {
      alert('Credenciais inválidas!'); // Exibe um alerta em caso de erro
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

        {/* Campo de E-mail */}
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Campo de Senha */}
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Botão de Entrar */}
        <button onClick={handleLogin}>Entrar</button>

        {/* Texto de Cadastro */}
        <p className="signup-text" onClick={() => navigate('/signup')}>
          Não tem uma conta? <span>Cadastre-se</span>
        </p>
      </div>
      <div className="login-image"></div> {/* Lado direito (imagem) */}
    </div>
  );
}

export default Login;