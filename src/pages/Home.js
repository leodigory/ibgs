import React from 'react';
import { useLocation } from 'react-router-dom';
import './Home.css'; // Importe o CSS

function Home() {
  const location = useLocation();
  const { role } = location.state || { role: 'guest' };

  return (
    <div className="home-container">
      <div className="home-box">
        <h1>Bem-vindo à página inicial!</h1>
        <p>Você está logado como: <strong>{role}</strong></p>
        {role === 'admin' && <p>Acesso total ao sistema.</p>}
        {role === 'pastor' && <p>Acesso total ao sistema.</p>}
        {role === 'financeiro' && <p>Acesso ao setor financeiro.</p>}
        {role === 'lideranca' && <p>Acesso às ferramentas de liderança.</p>}
        {role === 'membros' && <p>Acesso limitado.</p>}
      </div>
    </div>
  );
}

export default Home;