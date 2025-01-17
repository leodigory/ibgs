import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirecionar após o logout
import './SideMenu.css';

function SideMenu({ role }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate(); // Hook para redirecionamento

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLogout = () => {
    // Aqui você pode adicionar a lógica de logout, como limpar o token de autenticação.
    console.log('Usuário deslogado');
    // Redireciona para a página de login (/login)
    navigate('/');
  };

  return (
    <div className={`side-menu ${isExpanded ? 'expanded' : ''}`}>
      <div className="menu-icon" onClick={toggleMenu}>
        ☰
      </div>
      <ul>
        <li>Culto</li>
        <li>Oferta</li>
        <li>Calendário</li>
        {role === 'visitante' && <li>Quero ser membro</li>} {/* Exibe apenas para visitantes */}
        <li>Sobre</li>
      </ul>
      {/* Botão de Logout */}
      <div className="logout-container">
        <button className="logout-button" onClick={handleLogout}>
          {isExpanded ? 'Logout' : <img src="/log-out.png" alt="Logout" className="logout-icon" />} {/* Mostra texto ou ícone */}
        </button>
      </div>
    </div>
  );
}

export default SideMenu;