import React, { useState } from 'react';
import SideMenu from '../components/SideMenu';
import { useUserData } from '../hooks/useUserData'; // Importe o hook
import Classes from '../components/Classes'; // Importe o componente Classes
import UserClasses from '../components/ClassesUser'; // Importe o componente UserClasses
import Acessos from '../components/Acessos'; // Importe o componente Acessos
import FerramentasPorAcesso from '../components/FerramentasPorAcesso'; // Importe o componente FerramentasPorAcesso
import './FerramentasADM.css'; // Importe os estilos da página

function FerramentasADM() {
  // Usando o hook para obter os dados do usuário
  const { role, userName, userPhoto, userId } = useUserData();

  // Estados para controlar a exibição dos modais
  const [showClasses, setShowClasses] = useState(false); // Modal Classes
  const [showUserClasses, setShowUserClasses] = useState(false); // Modal UserClasses
  const [showAcessos, setShowAcessos] = useState(false); // Modal Acessos
  const [showFerramentasPorAcesso, setShowFerramentasPorAcesso] = useState(false); // Modal FerramentasPorAcesso
  const [expandedGroupIndex, setExpandedGroupIndex] = useState(null);

  // Função para expandir/retrair grupos de botões
  const toggleGroup = (index) => {
    if (expandedGroupIndex === index) {
      setExpandedGroupIndex(null); // Retrai o grupo se já estiver expandido
    } else {
      setExpandedGroupIndex(index); // Expande o grupo clicado
    }
  };

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
            <h2>Gerenciamento de Classes</h2>
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

          {/* Grupo 2: Gerenciamento de Acessos */}
          <div
            className={`button-group ${expandedGroupIndex === 1 ? 'expanded' : ''}`}
            onClick={() => toggleGroup(1)}
          >
            <h2>Gerenciamento de Acessos</h2>
            {expandedGroupIndex === 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); setShowAcessos(true); }}>
                  Criar Novos Acessos
                </button>
                <button onClick={(e) => { e.stopPropagation(); setShowFerramentasPorAcesso(true); }}>
                  Alterar Ferramentas por Acesso
                </button>
              </>
            )}
          </div>

          {/* Grupo 3: Outras Ferramentas */}
          <div
            className={`button-group ${expandedGroupIndex === 2 ? 'expanded' : ''}`}
            onClick={() => toggleGroup(2)}
          >
            <h2>Outras Ferramentas</h2>
            {expandedGroupIndex === 2 && (
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

        {/* Exibe o modal Acessos se showAcessos for true */}
        {showAcessos && <Acessos onClose={() => setShowAcessos(false)} />}

        {/* Exibe o modal FerramentasPorAcesso se showFerramentasPorAcesso for true */}
        {showFerramentasPorAcesso && (
          <FerramentasPorAcesso onClose={() => setShowFerramentasPorAcesso(false)} />
        )}
      </div>
    </div>
  );
}

export default FerramentasADM;