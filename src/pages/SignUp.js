import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
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
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [birthDateError, setBirthDateError] = useState(false);
  const [genderError, setGenderError] = useState(false);
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
    const numericValue = inputValue.replace(/\D/g, '');
    setPhone(numericValue);
  };

  const checkIfEmailExists = async (email) => {
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      return methods.length > 0;
    } catch (error) {
      console.error("Erro ao verificar e-mail:", error.message);
      return false;
    }
  };

  const handleSignUp = async () => {
    setError(''); // Limpa o erro anterior
    setNameError(false);
    setEmailError(false);
    setPasswordError(false);
    setPhoneError(false);
    setAddressError(false);
    setBirthDateError(false);
    setGenderError(false);

    let hasError = false;

    if (!validateName(name)) {
      setNameError(true);
      hasError = true;
    }

    if (!email) {
      setEmailError(true);
      hasError = true;
    }

    if (!validatePassword(password)) {
      setPasswordError(true);
      hasError = true;
    }

    if (!phone) {
      setPhoneError(true);
      hasError = true;
    }

    if (!validateAddress(address)) {
      setAddressError(true);
      hasError = true;
    }

    if (!birthDate) {
      setBirthDateError(true);
      hasError = true;
    }

    if (!gender) {
      setGenderError(true);
      hasError = true;
    }

    if (hasError) {
      setError('Por favor, corrija os campos destacados.');
      return;
    }

    try {
      // Verifica se o e-mail já está em uso
      const emailExists = await checkIfEmailExists(email);
      if (emailExists) {
        setEmailError(true);
        setError('Este e-mail já está em uso. Por favor, use outro e-mail.');
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
        setEmailError(true);
        setError('Este e-mail já está cadastrado. Por favor, use outro e-mail.');
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

        {/* Campo Nome Completo */}
        <label className="input-label">Nome Completo</label>
        <input
          type="text"
          placeholder="Digite seu nome completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={nameError ? 'input-error' : ''}
          required
        />

        {/* Seleção de Gênero */}
        <label className="input-label"></label>
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

        {/* Campo E-mail */}
        <label className="input-label">E-mail</label>
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={emailError ? 'input-error' : ''}
          required
        />

        {/* Campo Senha */}
        <label className="input-label">Senha</label>
        <input
          type="password"
          placeholder="Digite sua senha (mínimo 6 dígitos)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={passwordError ? 'input-error' : ''}
          required
        />

        {/* Campo Telefone */}
        <label className="input-label">Telefone</label>
        <input
          type="tel"
          placeholder="Digite seu telefone"
          value={phone}
          onChange={handlePhoneChange}
          className={phoneError ? 'input-error' : ''}
          inputMode="numeric"
          pattern="[0-9]*"
          required
        />

        {/* Campo Endereço */}
        <label className="input-label">Endereço</label>
        <input
          type="text"
          placeholder="Digite seu endereço (incluindo número)"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className={addressError ? 'input-error' : ''}
          required
        />

        {/* Campo Data de Nascimento */}
        <label className="input-label">Data de Nascimento</label>
        <input
          type="date"
          placeholder="Digite sua data de nascimento"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className={birthDateError ? 'input-error' : ''}
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