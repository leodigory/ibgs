import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import { getUserRole, getUserData } from '../auth';
import SideMenu from '../components/SideMenu';
import Classes from '../components/Classes'; // Importe o componente Classes
import UserClasses from '../components/userClasses'; // Importe o componente UserClasses
import './FerramentasADM.css'; // Importe os estilos da página

function FerramentasADM() {
  const [role, setRole] = useState('guest');
  const [userName, setUserName] = useState('');
  const [userPhoto, setUserPhoto] = useState('/default-profile.png');
  const [userId, setUserId] = useState(null);
  const location = useLocation();

  // Estados para controlar a exibição dos modais
  const [showClasses, setShowClasses] = useState(false); // Modal Classes
  const [showUserClasses, setShowUserClasses] = useState(false); // Modal UserClasses

  // Estado para controlar qual grupo está expandido (usando um índice numérico)
  const [expandedGroupIndex, setExpandedGroupIndex] = useState(null);

  // Função para expandir/retrair um grupo
  const toggleGroup = (index) => {
    if (expandedGroupIndex === index) {
      setExpandedGroupIndex(null); // Retrai o grupo se já estiver expandido
    } else {
      setExpandedGroupIndex(index); // Expande o grupo clicado
    }
  };

  // Busca os dados do usuário ao carregar o componente
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRole = await getUserRole(user.uid);
        const userData = await getUserData(user.uid);
        setRole(userRole);
        setUserName(userData.name);
        setUserPhoto(userData.photoURL || '/default-profile.png');
        setUserId(user.uid);
      }
    };

    // Se houver dados no estado de navegação, use-os
    if (location.state) {
      setRole(location.state.role);
      setUserName(location.state.userName);
      setUserPhoto(location.state.userPhoto || '/default-profile.png');
      setUserId(location.state.userId);
    } else {
      // Caso contrário, busque os dados do Firestore
      fetchUserData();
    }
  }, [location.state]);

  return (
    <div className="ferramentas-adm-container">
      {/* Inclua o SideMenu */}
      <SideMenu role={role} userName={userName} userPhoto={userPhoto} userId={userId} />

      {/* Conteúdo da página Ferramentas Administrativas */}
      <div className="ferramentas-adm-content">
        {/* Título com tarja branca */}
        <div className="title-container">
          <h1>Ferramentas Administrativas</h1>
        </div>

        {/* Lista de grupos de botões */}
        <div className="button-groups">
          {/* Grupo 1: Gerenciamento de Classes */}
          <div
            className={`button-group ${expandedGroupIndex === 0 ? 'expanded' : ''}`}
            onClick={() => toggleGroup(0)}
          >
            <h2>1. Gerenciamento de Classes</h2>
            {expandedGroupIndex === 0 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); setShowClasses(true); }}>
                  Classes
                </button>
                <button onClick={(e) => { e.stopPropagation(); setShowUserClasses(true); }}>
                  Alterar Classes de Usuários
                </button>
              </>
            )}
          </div>

          {/* Grupo 2: Outras Ferramentas */}
          <div
            className={`button-group ${expandedGroupIndex === 1 ? 'expanded' : ''}`}
            onClick={() => toggleGroup(1)}
          >
            <h2>2. Outras Ferramentas</h2>
            {expandedGroupIndex === 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); alert('Botão 1 clicado!'); }}>
                  Botão 1
                </button>
                <button onClick={(e) => { e.stopPropagation(); alert('Botão 2 clicado!'); }}>
                  Botão 2
                </button>
              </>
            )}
          </div>

          {/* Adicione mais grupos conforme necessário */}
        </div>

        {/* Exibe o modal Classes se showClasses for true */}
        {showClasses && <Classes onClose={() => setShowClasses(false)} />}

        {/* Exibe o modal UserClasses se showUserClasses for true */}
        {showUserClasses && <UserClasses onClose={() => setShowUserClasses(false)} />}
      </div>
    </div>
  );
}

export default FerramentasADM;