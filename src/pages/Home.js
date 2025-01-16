import React, { useEffect, useState } from 'react';
import { auth } from '../firebase'; // Importa o auth do Firebase
import { getUserRole } from '../auth'; // Importa a função para buscar o role
import SideMenu from '../components/SideMenu';
import './Home.css';

function Home() {
  const [role, setRole] = useState('guest'); // Estado para armazenar o role

  useEffect(() => {
    // Função para buscar o role do usuário logado
    const fetchUserRole = async () => {
      const user = auth.currentUser; // Pega o usuário logado
      if (user) {
        const userRole = await getUserRole(user.uid); // Busca o role do Firestore
        setRole(userRole); // Atualiza o estado com o role
      }
    };

    fetchUserRole(); // Chama a função ao carregar o componente
  }, []);

  return (
    <div className="home-container">
      <SideMenu role={role} /> {/* Passa o role para o SideMenu */}
      <h1>Bem-vindo à página inicial!</h1>
      <p>Você está logado como: <strong>{role}</strong></p>
      {role === 'admin' && <p>Acesso total ao sistema.</p>}
      {role === 'pastor' && <p>Acesso total ao sistema.</p>}
      {role === 'financeiro' && <p>Acesso ao setor financeiro.</p>}
      {role === 'lideranca' && <p>Acesso às ferramentas de liderança.</p>}
      {role === 'membro' && <p>Acesso limitado.</p>}
      {role === 'visitante' && <p>Acesso limitado.</p>}
    </div>
  );
}

export default Home;