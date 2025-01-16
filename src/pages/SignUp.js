import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from '../firebase'; // Importa auth e db
import './SignUp.css';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      // Cria o usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Cria um documento no Firestore para o usuário
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        phone: phone,
        address: address,
        birthDate: birthDate,
        role: "visitante", // Cargo padrão
        createdAt: new Date().toISOString(), // Data de criação
      });

      // Redireciona para a página inicial após o cadastro
      navigate('/');
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error.message);
      alert("Erro ao cadastrar: " + error.message); // Exibe um alerta com o erro
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h4>Seja bem-vindo(a)!</h4>
        <h5>Tenha acesso a programação da IBGS!</h5>

        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="tel"
          placeholder="Telefone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Endereço"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        <input
          type="date"
          placeholder="Data de Nascimento"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          required
        />

        <button onClick={handleSignUp}>Cadastrar</button>

        <button className="back-button" onClick={() => navigate('/')}>
          Voltar para o Login
        </button>
      </div>
    </div>
  );
}

export default SignUp;