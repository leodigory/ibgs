import React, { useState, useEffect, useRef } from 'react';
import SideMenu from '../components/SideMenu';
import { useUserData } from '../hooks/useUserData';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import './FerramentasLider.css';

function FerramentasLideranca() {
  const { role, userName, userPhoto, userId, acessos } = useUserData();

  // Estados para controlar a exibição dos modais
  const [showFerramenta1, setShowFerramenta1] = useState(false);
  const [showFerramenta2, setShowFerramenta2] = useState(false);
  const [showLouvor, setShowLouvor] = useState(false);
  const [showMensagem, setShowMensagem] = useState(false);
  const [showEscala, setShowEscala] = useState(false);
  const [expandedGroupIndex, setExpandedGroupIndex] = useState(null);

  // Estado para armazenar a lista de grupos
  const [grupos, setGrupos] = useState([]);

  // Referência para armazenar o conteúdo dos grupos
  const conteudoPorTituloRef = useRef({});

  // Função para formatar o título (substitui underscores por espaços e capitaliza)
  const formatarTitulo = (titulo) => {
    return titulo
      .replace(/_/g, ' ') // Substitui underscores por espaços
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitaliza a primeira letra de cada palavra
  };

  // Busca as ferramentas liberadas com base nos acessos do usuário
  useEffect(() => {
    const fetchFerramentasLiberadas = async () => {
      const ferramentas = new Set(); // Usamos um Set para evitar duplicatas

      for (const acesso of acessos) {
        try {
          const acessoDoc = await getDoc(doc(db, 'acessos', acesso)); // Busca o documento de acesso

          if (acessoDoc.exists()) {
            const ferramentasDoAcesso = acessoDoc.data().ferramentas || [];
            ferramentasDoAcesso.forEach((ferramenta) => {
              ferramentas.add(ferramenta);
            });
          } else {
            console.warn(`Documento de acesso "${acesso}" não encontrado no Firestore.`);
          }
        } catch (error) {
          console.error(`Erro ao buscar ferramentas do acesso ${acesso}:`, error);
        }
      }

      const ferramentasArray = Array.from(ferramentas);

      // Atualiza os grupos com base nas ferramentas liberadas
      const novosGrupos = ferramentasArray.map((ferramenta) => ({
        titulo: formatarTitulo(ferramenta), // Formata o título
        visivel: true, // Todos os grupos liberados são visíveis
      }));

      console.log("Novos grupos atualizados:", novosGrupos); // Depuração
      setGrupos(novosGrupos); // Atualiza o estado dos grupos
    };

    if (acessos && acessos.length > 0) {
      fetchFerramentasLiberadas();
    } else {
      console.warn("Nenhum acesso encontrado ou acessos está vazio.");
      setGrupos([]); // Define grupos como array vazio
    }
  }, [acessos]);

  // Função para expandir/retrair grupos de botões
  const toggleGroup = (index) => {
    if (expandedGroupIndex === index) {
      setExpandedGroupIndex(null);
    } else {
      setExpandedGroupIndex(index);
    }
  };

  // Função para capturar o conteúdo dos grupos dinamicamente
  const capturarConteudo = (titulo, conteudo) => {
    if (conteudo) {
      conteudoPorTituloRef.current[titulo] = conteudo;
    }
  };

  return (
    <div className="ferramentas-lideranca-container">
      <SideMenu role={role} userName={userName} userPhoto={userPhoto} userId={userId} />

      <div className="ferramentas-lideranca-content">
        <div className="title-container">
          <h1>Ferramentas de Liderança</h1>
        </div>

        {/* Lista de grupos de botões */}
        <div className="button-groups">
          {grupos.map((grupo, index) => (
            grupo.visivel && ( // Verifica se o grupo está visível
              <div
                key={index}
                className={`button-group ${expandedGroupIndex === index ? 'expanded' : ''}`}
                onClick={() => toggleGroup(index)}
              >
                <h2>{grupo.titulo}</h2>
                {expandedGroupIndex === index && ( // Verifica se o grupo está expandido
                  <>
                    {/* Renderiza o conteúdo dinamicamente com base no título */}
                    <div ref={(el) => capturarConteudo(grupo.titulo, el)}>
                      {grupo.titulo === "Gerenciamento De Culto" && (
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
                      {grupo.titulo === "Gerencimaneto Louvor" && (
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
                      {grupo.titulo === "Gerenciamento De Equipes" && (
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
                  </>
                )}
              </div>
            )
          ))}
        </div>

        {/* Modais */}
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