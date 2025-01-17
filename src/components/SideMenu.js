import React, { useState } from 'react';
import './SideMenu.css';

function SideMenu({ role }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
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
    </div>
  );
}

export default SideMenu;