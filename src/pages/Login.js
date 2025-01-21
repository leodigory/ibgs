import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { signIn } from '../auth'; // Importa a função de login do Firebase
import { doc, getDoc } from "firebase/firestore"; // Importa funções do Firestore
import { db } from '../firebase'; // Importa o Firestore
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Estado para mensagens de erro
  const [successMessage, setSuccessMessage] = useState(''); // Estado para mensagens de sucesso
  const navigate = useNavigate();
  const location = useLocation(); // Hook para acessar o estado de navegação

  // Verifica se o estado de sucesso foi passado
  useEffect(() => {
    if (location.state?.signupSuccess) {
      setSuccessMessage('Cadastro realizado com sucesso!'); // Define a mensagem de sucesso
    }
  }, [location.state]);

  const handleLogin = async () => {
    setError(''); // Limpa mensagens de erro anteriores
    setSuccessMessage(''); // Limpa mensagens de sucesso anteriores

    try {
      // Autentica o usuário com Firebase
      const user = await signIn(email, password);

      // Busca os dados do usuário no Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.data();

      // Redireciona para a página inicial com base no papel (role) e dados do usuário
      navigate('/home', { 
        state: { 
          role: userData?.role || 'visitante', // Define o papel padrão como 'visitante'
          userName: userData?.name || '', // Nome do usuário
          userPhoto: userData?.photoURL || '/default-profile.png', // Foto do usuário (ou padrão)
          userId: user.uid, // ID do usuário
        } 
      });
    } catch (error) {
      setError('Credenciais inválidas!'); // Define a mensagem de erro
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
        <h1>Continue na comunidade!</h1>

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

        {/* Mensagem de Sucesso */}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        {/* Mensagem de Erro */}
        {error && (
          <div className="error-message">{error}</div>
        )}

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