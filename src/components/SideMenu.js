// components/SideMenu.js
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { fetchAllowedTabs } from '../services/roleService'; // Serviço para buscar abas permitidas
import { convertToBase64, uploadPhoto } from '../services/imageService'; // Serviço para manipulação de imagens
import './SideMenu.css';

function SideMenu({ role, userName, userPhoto, userId }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [photoURL, setPhotoURL] = useState(userPhoto || '/default-profile.png');
  const [allowedTabs, setAllowedTabs] = useState([]); // Abas permitidas para o usuário
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Busca as abas permitidas para o role do usuário
  useEffect(() => {
    const fetchTabs = async () => {
      const tabs = await fetchAllowedTabs(role); // Usa o serviço para buscar as abas permitidas
      setAllowedTabs(tabs);
    };

    fetchTabs();
  }, [role]);

  // Busca a foto do perfil do Firestore ao carregar o componente ou quando o userId mudar
  useEffect(() => {
    const fetchPhotoURL = async () => {
      if (userId) {
        try {
          const userDoc = await getDoc(doc(db, 'users', userId));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setPhotoURL(userData.photoURL || '/default-profile.png');
          }
        } catch (error) {
          console.error('Erro ao buscar a foto do perfil:', error);
        }
      }
    };

    fetchPhotoURL();
  }, [userId]);

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error.message);
    }
  };

  // Função para lidar com o upload da foto
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !userId) return;

    try {
      // Usa o serviço para fazer upload da foto
      const base64 = await uploadPhoto(file, userId);

      // Atualiza o estado local com a nova URL da foto
      setPhotoURL(base64);

      // Limpa o valor do input de arquivo para permitir a seleção da mesma imagem novamente
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      alert(error.message); // Exibe mensagem de erro (ex: "A imagem deve ter no máximo 1 MB.")
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
        <div className="profile-picture" onClick={() => fileInputRef.current.click()}>
          <img src={photoURL} alt="Profile" onError={(e) => { e.target.src = '/default-profile.png'; }} />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handlePhotoUpload}
            accept="image/*"
          />
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
    </div>
  );
}

export default SideMenu;