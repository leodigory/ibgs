import React, { useEffect, useState } from 'react';
import { auth } from '../firebase'; // Importa o auth do Firebase
import { getUserRole, getUserData } from '../auth'; // Importa as funções para buscar o role e os dados do usuário
import SideMenu from '../components/SideMenu';
import './Home.css';

function Home() {
  const [role, setRole] = useState('guest'); // Estado para armazenar o role
  const [userName, setUserName] = useState(''); // Estado para armazenar o nome do usuário

  useEffect(() => {
    // Função para buscar o role e o nome do usuário logado
    const fetchUserData = async () => {
      const user = auth.currentUser; // Pega o usuário logado
      if (user) {
        const userRole = await getUserRole(user.uid); // Busca o role do Firestore
        const userData = await getUserData(user.uid); // Busca os dados do usuário no Firestore
        setRole(userRole); // Atualiza o estado com o role
        setUserName(userData.name); // Atualiza o estado com o nome do usuário
      }
    };

    fetchUserData(); // Chama a função ao carregar o componente
  }, []);

  return (
    <div className="home-container">
      <SideMenu role={role} /> {/* Passa o role para o SideMenu */}
      <h1>Bem-vindo à página inicial, <strong>{userName}</strong>!</h1>
      <p>Você está logado como: <strong>{role}</strong></p>
      {role === 'admin' && <p>Acesso total ao sistema.</p>}
      {role === 'pastor' && <p>Acesso total ao sistema.</p>}
      {role === 'financeiro' && <p>Acesso ao setor financeiro.</p>}
      {role === 'lideranca' && <p>Acesso às ferramentas de liderança.</p>}
      {role === 'membro' && <p>Acesso mebro liberado.</p>}
      {role === 'visitante' && <p>Acesso limitado.</p>}
    </div>
  );
}

export default Home;