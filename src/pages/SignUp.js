import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from '../firebase';
import './SignUp.css';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateName = (name) => {
    const nameParts = name.split(' ');
    return nameParts.length >= 2; // Pelo menos um nome e um sobrenome
  };

  const validateAddress = (address) => {
    return /\d/.test(address); // Verifica se há pelo menos um número no endereço
  };

  const validatePassword = (password) => {
    return password.length >= 6; // Senha deve ter no mínimo 6 caracteres
  };

  const handlePhoneChange = (e) => {
    const inputValue = e.target.value;
    // Remove todos os caracteres que não são números
    const numericValue = inputValue.replace(/\D/g, '');
    setPhone(numericValue); // Atualiza o estado apenas com números
  };

  const checkIfUserExists = async (name, email) => {
    // Verifica se já existe um usuário com o mesmo nome ou e-mail
    const usersRef = collection(db, "users");
    const nameQuery = query(usersRef, where("name", "==", name));
    const emailQuery = query(usersRef, where("email", "==", email));

    const [nameSnapshot, emailSnapshot] = await Promise.all([
      getDocs(nameQuery),
      getDocs(emailQuery),
    ]);

    if (!nameSnapshot.empty) {
      return "Já existe um usuário com este nome.";
    }

    if (!emailSnapshot.empty) {
      return "Já existe um usuário com este e-mail.";
    }

    return null;
  };

  const handleSignUp = async () => {
    setError(''); // Limpa o erro anterior

    if (!validateName(name)) {
      setError('Por favor, insira seu nome completo (nome e sobrenome).');
      return;
    }

    if (!email || !password || !phone || !address || !birthDate || !gender) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (!validateAddress(address)) {
      setError('Por favor, insira o número da casa no endereço.');
      return;
    }

    if (!validatePassword(password)) {
      setError('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    try {
      // Verifica se já existe um usuário com o mesmo nome ou e-mail
      const userExistsError = await checkIfUserExists(name, email);
      if (userExistsError) {
        setError(userExistsError);
        return;
      }

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
        gender: gender,
        role: "visitante", // Cargo padrão
        createdAt: new Date().toISOString(), // Data de criação
      });

      // Redireciona para a página de login com um estado de sucesso
      navigate('/', { state: { signupSuccess: true } });
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error.message);
      if (error.code === 'auth/email-already-in-use') {
        setError('Este e-mail já está em uso. Por favor, use outro e-mail.');
      } else {
        setError('Erro ao cadastrar: ' + error.message);
      }
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h4>Seja bem-vindo(a)!</h4>
        <h5>Tenha acesso a programação da IBGS!</h5>

        {error && <div className="error-message">{error}</div>}

        <input
          type="text"
          placeholder="Nome Completo (Nome e Sobrenome)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <div className="gender-selection">
          <label>
            <input
              type="radio"
              name="gender"
              value="homem"
              checked={gender === 'homem'}
              onChange={(e) => setGender(e.target.value)}
              required
            />
            <span className="radio-custom"></span>
            Homem
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="mulher"
              checked={gender === 'mulher'}
              onChange={(e) => setGender(e.target.value)}
              required
            />
            <span className="radio-custom"></span>
            Mulher
          </label>
        </div>

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Senha (mínimo 6 dígitos)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="tel"
          placeholder="Telefone"
          value={phone}
          onChange={handlePhoneChange}
          inputMode="numeric" // Mostra o teclado numérico em dispositivos móveis
          pattern="[0-9]*"   // Garante que apenas números sejam aceitos
          required
        />

        <input
          type="text"
          placeholder="Endereço (incluindo número da casa)"
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