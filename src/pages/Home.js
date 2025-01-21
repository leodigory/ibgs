import React from 'react';
import SideMenu from '../components/SideMenu';
import { useUserData } from '../hooks/useUserData'; // Importe o hook personalizado
import './Home.css'; // Importe os estilos da página

function Home() {
  // Usando o hook para obter os dados do usuário
  const { role, userName, userPhoto, userId } = useUserData();

  return (
    <div className="home-container">
      {/* Passa as informações para o SideMenu */}
      <SideMenu role={role} userName={userName} userPhoto={userPhoto} userId={userId} />

      {/* Conteúdo da página dentro de um container */}
      <div className="home-content">
        <h1>Bem-vindo à página inicial, <strong>{userName}</strong>!</h1>
        <p>Você está logado como: <strong>{role}</strong></p>

        {/* Mensagens condicionais com base no role */}
        {role === 'admin' && <p>Acesso total ao sistema.</p>}
        {role === 'pastor' && <p>Acesso total ao sistema.</p>}
        {role === 'financeiro' && <p>Acesso ao setor financeiro.</p>}
        {role === 'lideranca' && <p>Acesso às ferramentas de liderança.</p>}
        {role === 'membro' && <p>Acesso membro liberado.</p>}
        {role === 'visitante' && <p>Acesso limitado.</p>}
      </div>
    </div>
  );
}

export default Home;