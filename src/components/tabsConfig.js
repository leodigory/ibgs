// src/components/tabsConfig.js
import React from 'react';

export const renderMenu = (allowedTabs, navigate, isExpanded, photoURL, firstName, fileInputRef, handleLogout) => {
  return (
    <>
      {/* Lista de botões do menu */}
      <ul>
        {allowedTabs.includes('Home') && (
          <li onClick={() => navigate('/Home')}>
            <img src="/home.png" alt="Home" className="menu-item-icon" />
            {isExpanded && <span className="menu-item-text">Home</span>}
          </li>
        )}
        {allowedTabs.includes('Ferramentas ADM') && (
          <li onClick={() => navigate('/ferramentas-adm')}>
            <img src="/ferramenta.png" alt="Ferramentas ADM" className="menu-item-icon" />
            {isExpanded && <span className="menu-item-text">Ferramentas ADM</span>}
          </li>
        )}
        {allowedTabs.includes('Ferramentas Lideranca') && (
          <li onClick={() => navigate('/ferramentas-lideranca')}>
            <img src="/ferramenta.png" alt="Ferramentas Lideranca" className="menu-item-icon" />
            {isExpanded && <span className="menu-item-text">Ferramentas Liderança</span>}
          </li>
        )}
        {allowedTabs.includes('Culto') && (
          <li onClick={() => navigate('/culto')}>
            <img src="/culto.png" alt="Culto" className="menu-item-icon" />
            {isExpanded && <span className="menu-item-text">Culto</span>}
          </li>
        )}
        {allowedTabs.includes('Calendário') && (
          <li onClick={() => navigate('/calendario')}>
            <img src="/calendario.png" alt="Calendário" className="menu-item-icon" />
            {isExpanded && <span className="menu-item-text">Calendário</span>}
          </li>
        )}
        {allowedTabs.includes('Oferta') && (
          <li onClick={() => navigate('/oferta')}>
            <img src="/oferta.png" alt="Oferta" className="menu-item-icon" />
            {isExpanded && <span className="menu-item-text">Oferta</span>}
          </li>
        )}
        {allowedTabs.includes('Quero ser membro') && (
          <li onClick={() => navigate('/membro')}>
            <img src="/membro.png" alt="Quero ser membro" className="menu-item-icon" />
            {isExpanded && <span className="menu-item-text">Quero ser membro</span>}
          </li>
        )}
        {allowedTabs.includes('Sobre') && (
          <li onClick={() => navigate('/sobre')}>
            <img src="/sobre.png" alt="Sobre" className="menu-item-icon" />
            {isExpanded && <span className="menu-item-text">Sobre</span>}
          </li>
        )}
      </ul>
      {/* Círculo pequeno com a foto do perfil e texto abaixo (quando o menu está retraído) */}
      <div className="mini-profile-container">
        <div className="mini-profile" onClick={() => fileInputRef.current.click()}>
          <img src={photoURL} alt="Mini Profile" onError={(e) => { e.target.src = '/default-profile.png'; }} />
        </div>
        <p className="mini-profile-name">{firstName}</p>
      </div>
      {/* Botão de Logout */}
      <div className="logout-container">
        <button className="logout-button" onClick={handleLogout}>
          <img src="/log-out.png" alt="Logout" className="logout-icon" />
          {isExpanded && <span className="logout-text">Logout</span>}
        </button>
      </div>
    </>
  );
};