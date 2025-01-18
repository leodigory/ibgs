import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirecionar após o logout
import { auth } from '../firebase'; // Importa o auth do Firebase
import { signOut } from 'firebase/auth'; // Importa a função de logout do Firebase
import './SideMenu.css';

function SideMenu({ role }) {
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

  return (
    <div className={`side-menu ${isExpanded ? 'expanded' : ''}`}>
      <div className="menu-icon" onClick={toggleMenu}>
        ☰
      </div>
      <ul>
        <li>
          <img src="/culto.png" alt="Culto" className="menu-item-icon" /> {/* Ícone */}
          {isExpanded && <span className="menu-item-text">Culto</span>} {/* Texto */}
        </li>
        <li>
          <img src="/oferta.png" alt="Oferta" className="menu-item-icon" /> {/* Ícone */}
          {isExpanded && <span className="menu-item-text">Oferta</span>} {/* Texto */}
        </li>
        <li>
          <img src="/calendario.png" alt="Calendário" className="menu-item-icon" /> {/* Ícone */}
          {isExpanded && <span className="menu-item-text">Calendário</span>} {/* Texto */}
        </li>
        {role === 'visitante' && (
          <li>
            <img src="/membro.png" alt="Quero ser membro" className="menu-item-icon" /> {/* Ícone */}
            {isExpanded && <span className="menu-item-text">Quero ser membro</span>} {/* Texto */}
          </li>
        )}
        <li>
          <img src="/sobre.png" alt="Sobre" className="menu-item-icon" /> {/* Ícone */}
          {isExpanded && <span className="menu-item-text">Sobre</span>} {/* Texto */}
        </li>
      </ul>
      {/* Botão de Logout */}
      <div className="logout-container">
        <button className="logout-button" onClick={handleLogout}>
          <img src="/log-out.png" alt="Logout" className="logout-icon" /> {/* Ícone */}
          {isExpanded && <span className="logout-text">Logout</span>} {/* Texto */}
        </button>
      </div>
    </div>
  );
}

export default SideMenu;