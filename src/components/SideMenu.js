import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './SideMenu.css';

function SideMenu({ role, userName, userPhoto, userId }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [photoURL, setPhotoURL] = useState(userPhoto || '/default-profile.png');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

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
      console.log('Usuário deslogado com sucesso');
      navigate('/');
    } catch (error) {
      console.error('Erro ao fazer logout:', error.message);
    }
  };

  // Função para converter a imagem em base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Função para lidar com o upload da foto
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !userId) return;

    // Verifica o tamanho da imagem (1 MB = 1 * 1024 * 1024 bytes)
    if (file.size > 1 * 1024 * 1024) {
      alert('A imagem deve ter no máximo 1 MB.');
      return;
    }

    try {
      // Converte a imagem para base64
      const base64 = await convertToBase64(file);

      // Atualiza a URL da foto no Firestore
      const userDoc = doc(db, 'users', userId);
      await updateDoc(userDoc, { photoURL: base64 });

      // Atualiza o estado local com a nova URL da foto
      setPhotoURL(base64);
      console.log('Foto atualizada com sucesso:');

      // Limpa o valor do input de arquivo para permitir a seleção da mesma imagem novamente
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Erro ao fazer upload da foto:', error);
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
      <li onClick={() => navigate('/Home')}> {/* Navega para a página FerramentasADM */}
            <img src="/home.png" alt="Home" className="menu-item-icon" />
            {isExpanded && <span className="menu-item-text">Home</span>}
          </li>
        {(role === 'administrador') && (
          <li onClick={() => navigate('/ferramentas-adm')}> {/* Navega para a página FerramentasADM */}
            <img src="/ferramenta.png" alt="Ferramentas ADM" className="menu-item-icon" />
            {isExpanded && <span className="menu-item-text">Ferramentas ADM</span>}
          </li>
        )}
        <li>
          <img src="/culto.png" alt="Culto" className="menu-item-icon" />
          {isExpanded && <span className="menu-item-text">Culto</span>}
        </li>
        <li>
          <img src="/calendario.png" alt="Calendário" className="menu-item-icon" />
          {isExpanded && <span className="menu-item-text">Calendário</span>}
        </li>
        <li>
          <img src="/oferta.png" alt="Oferta" className="menu-item-icon" />
          {isExpanded && <span className="menu-item-text">Oferta</span>}
        </li>
        {(role === 'visitante' || role === 'administrador') && (
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