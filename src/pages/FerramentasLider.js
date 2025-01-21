import React, { useState } from 'react';
import SideMenu from '../components/SideMenu';
import { useUserData } from '../hooks/useUserData'; // Importe o hook
import './FerramentasLider.css';

function FerramentasLideranca() {
  // Usando o hook para obter os dados do usuário
  const { role, userName, userPhoto, userId } = useUserData();

  // Estados para controlar a exibição dos modais
  const [showFerramenta1, setShowFerramenta1] = useState(false); // Modal Agenda de Reuniões
  const [showFerramenta2, setShowFerramenta2] = useState(false); // Modal Feedback da Equipe
  const [showLouvor, setShowLouvor] = useState(false); // Modal Louvor
  const [showMensagem, setShowMensagem] = useState(false); // Modal Mensagem
  const [showEscala, setShowEscala] = useState(false); // Modal Escala
  const [expandedGroupIndex, setExpandedGroupIndex] = useState(null);

  // Função para expandir/retrair grupos de botões
  const toggleGroup = (index) => {
    if (expandedGroupIndex === index) {
      setExpandedGroupIndex(null);
    } else {
      setExpandedGroupIndex(index);
    }
  };

  return (
    <div className="ferramentas-lideranca-container">
      {/* Inclua o SideMenu */}
      <SideMenu role={role} userName={userName} userPhoto={userPhoto} userId={userId} />

      {/* Conteúdo da página Ferramentas de Liderança */}
      <div className="ferramentas-lideranca-content">
        {/* Título com tarja branca */}
        <div className="title-container">
          <h1>Ferramentas de Liderança</h1>
        </div>

        {/* Lista de grupos de botões */}
        <div className="button-groups">
          {/* Grupo 1: Gerenciamento de Equipes */}
          <div
            className={`button-group ${expandedGroupIndex === 0 ? 'expanded' : ''}`}
            onClick={() => toggleGroup(0)}
          >
            <h2>Gerenciamento de Equipes</h2>
            {expandedGroupIndex === 0 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); setShowFerramenta1(true); }}>
                  Agenda de Reuniões
                </button>
                <button onClick={(e) => { e.stopPropagation(); setShowFerramenta2(true); }}>
                  Feedback da Equipe
                </button>
              </>
            )}
          </div>

          {/* Grupo 2: Outras Ferramentas */}
          <div
            className={`button-group ${expandedGroupIndex === 1 ? 'expanded' : ''}`}
            onClick={() => toggleGroup(1)}
          >
            <h2>Outras Ferramentas</h2>
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

          {/* Grupo 3: Gerenciamento de Culto */}
          <div
            className={`button-group ${expandedGroupIndex === 2 ? 'expanded' : ''}`}
            onClick={() => toggleGroup(2)}
          >
            <h2>Gerenciamento de Culto</h2>
            {expandedGroupIndex === 2 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); setShowLouvor(true); }}>
                  Louvor
                </button>
                <button onClick={(e) => { e.stopPropagation(); setShowMensagem(true); }}>
                  Mensagem
                </button>
                <button onClick={(e) => { e.stopPropagation(); setShowEscala(true); }}>
                  Escala
                </button>
              </>
            )}
          </div>

          {/* Adicione mais grupos conforme necessário */}
        </div>

        {/* Modais */}
        {showFerramenta1 && (
          <div className="modal">
            <div className="modal-content">
              <h2>Agenda de Reuniões</h2>
              <p>Organize e gerencie as reuniões da sua equipe de forma eficiente.</p>
              <button onClick={() => setShowFerramenta1(false)}>Fechar</button>
            </div>
          </div>
        )}

        {showFerramenta2 && (
          <div className="modal">
            <div className="modal-content">
              <h2>Feedback da Equipe</h2>
              <p>Colete e analise feedbacks para melhorar o desempenho da equipe.</p>
              <button onClick={() => setShowFerramenta2(false)}>Fechar</button>
            </div>
          </div>
        )}

        {showLouvor && (
          <div className="modal">
            <div className="modal-content">
              <h2>Louvor</h2>
              <p>Gerencie as músicas e escalas de louvor para os cultos.</p>
              <button onClick={() => setShowLouvor(false)}>Fechar</button>
            </div>
          </div>
        )}

        {showMensagem && (
          <div className="modal">
            <div className="modal-content">
              <h2>Mensagem</h2>
              <p>Prepare e compartilhe as mensagens para os cultos e reuniões.</p>
              <button onClick={() => setShowMensagem(false)}>Fechar</button>
            </div>
          </div>
        )}

        {showEscala && (
          <div className="modal">
            <div className="modal-content">
              <h2>Escala</h2>
              <p>Defina e gerencie as escalas de participantes para os cultos e eventos.</p>
              <button onClick={() => setShowEscala(false)}>Fechar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FerramentasLideranca;