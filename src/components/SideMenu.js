import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirecionar após o logout
import { auth } from '../firebase'; // Importa o auth do Firebase
import { signOut } from 'firebase/auth'; // Importa a função de logout do Firebase
import './SideMenu.css';

function SideMenu({ role, userName, userPhoto }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate(); // Hook para redirecionamento

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLogout = async () => {
    try {
      // Faz o logout no Firebase
      await signOut(auth);
      console.log('Usuário deslogado com sucesso');
      
      // Redireciona para a página de login
      navigate('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error.message);
    }
  };

  // Extrai o primeiro nome do usuário
  const firstName = userName ? userName.split(' ')[0] : '';

  return (
    <div className={`side-menu ${isExpanded ? 'expanded' : ''}`}>
      <div className="menu-icon" onClick={toggleMenu}>
        ☰
      </div>
      {/* Perfil do usuário (exibido apenas quando o menu está expandido) */}
      <div className="user-profile">
        <div className="profile-picture">
          <img src={userPhoto || '/default-profile.png'} alt="Profile" />
        </div>
        <div className="profile-info">
          <h3>{userName}</h3>
          <div className="role-tag">
            <p>Classe: {role}</p>
          </div>
          <p className="role-info">Acesso como {role} liberado</p>
        </div>
      </div>
      {/* Lista de botões do menu */}
      <ul>
        <li>
          <img src="/culto.png" alt="Culto" className="menu-item-icon" />
          {isExpanded && <span className="menu-item-text">Culto</span>}
        </li>
        <li>
          <img src="/oferta.png" alt="Oferta" className="menu-item-icon" />
          {isExpanded && <span className="menu-item-text">Oferta</span>}
        </li>
        <li>
          <img src="/calendario.png" alt="Calendário" className="menu-item-icon" />
          {isExpanded && <span className="menu-item-text">Calendário</span>}
        </li>
        {role === 'visitante' && (
          <li>
            <img src="/membro.png" alt="Quero ser membro" className="menu-item-icon" />
            {isExpanded && <span className="menu-item-text">Quero ser membro</span>}
          </li>
        )}
        <li>
          <img src="/sobre.png" alt="Sobre" className="menu-item-icon" />
          {isExpanded && <span className="menu-item-text">Sobre</span>}
        </li>
      </ul>
      {/* Círculo pequeno com a foto do perfil e texto abaixo (quando o menu está retraído) */}
      <div className="mini-profile-container">
        <div className="mini-profile">
          <img src={userPhoto || '/default-profile.png'} alt="Mini Profile" />
        </div>
        <p className="mini-profile-name">{firstName}</p> {/* Exibe o primeiro nome */}
      </div>
      {/* Botão de Logout */}
      <div className="logout-container">
        <button className="logout-button" onClick={handleLogout}>
          <img src="/log-out.png" alt="Logout" className="logout-icon" />
          {isExpanded && <span className="logout-text">Logout</span>}
        </button>
      </div>
    </div>
  );
}

export default SideMenu;