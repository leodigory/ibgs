import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Importe o Firestore
import './FerramentasPorAcesso.css'; // Importação do CSS

function AcessosPorUsuario({ onClose }) {
  const [filtro, setFiltro] = useState(''); // Estado para o filtro de nome
  const [usuarios, setUsuarios] = useState([]); // Lista de usuários com classe "liderança"
  const [acessosDisponiveis, setAcessosDisponiveis] = useState([]); // Lista de acessos disponíveis
  const [acessosSelecionados, setAcessosSelecionados] = useState({}); // Acessos selecionados por usuário

  // Busca os usuários com a classe "liderança" e os acessos disponíveis ao carregar o componente
  useEffect(() => {
    const fetchData = async () => {
      // Busca os usuários com a classe "liderança"
      const usuariosSnapshot = await getDocs(collection(db, 'users'));
      const usuariosList = [];
      usuariosSnapshot.forEach((doc) => {
        const usuario = { id: doc.id, ...doc.data() };
        if (usuario.role === 'liderança', 'administrador') {
          usuariosList.push(usuario);
        }
      });
      setUsuarios(usuariosList);

      // Inicializa os acessos selecionados para cada usuário
      const acessosIniciais = {};
      usuariosList.forEach((usuario) => {
        acessosIniciais[usuario.id] = usuario.acessos || [];
      });
      setAcessosSelecionados(acessosIniciais);

      // Busca os acessos disponíveis
      const acessosSnapshot = await getDocs(collection(db, 'acessos'));
      const acessosList = [];
      acessosSnapshot.forEach((doc) => {
        acessosList.push(doc.data().name);
      });
      setAcessosDisponiveis(acessosList);
    };

    fetchData();
  }, []);

  // Função para atualizar os acessos de um usuário e salvar no Firebase
  const handleAcessoChange = async (userId, acesso) => {
    const novosAcessos = acessosSelecionados[userId] ? [...acessosSelecionados[userId]] : [];
    if (novosAcessos.includes(acesso)) {
      // Remove o acesso se já estiver selecionado
      novosAcessos.splice(novosAcessos.indexOf(acesso), 1);
    } else {
      // Adiciona o acesso se não estiver selecionado
      novosAcessos.push(acesso);
    }

    // Atualiza o estado local
    setAcessosSelecionados((prev) => ({
      ...prev,
      [userId]: novosAcessos,
    }));

    // Atualiza o Firestore
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { acessos: novosAcessos });
      
    } catch (error) {
      console.error('Erro ao atualizar acessos:', error);
    }
  };

  // Filtra os usuários pelo nome
  const usuariosFiltrados = usuarios.filter((usuario) =>
    usuario.name.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="acessos-usuario-modal">
      <div className="acessos-usuario-content">
        <div className="modal-header">
          <h2>Alterar Acessos por Usuário</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        {/* Campo de filtro por nome */}
        <input
          type="text"
          placeholder="Filtrar por nome"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="filtro-input"
        />

        {/* Lista de usuários */}
        <div className="usuarios-list">
          {usuariosFiltrados.map((usuario) => (
            <div key={usuario.id} className="usuario-item">
              <h3>{usuario.name}</h3>
              <div className="acessos-list">
                {acessosDisponiveis.map((acesso, index) => (
                  <div key={index} className="acesso-item">
                    <label>
                      <input
                        type="checkbox"
                        checked={acessosSelecionados[usuario.id]?.includes(acesso)}
                        onChange={() => handleAcessoChange(usuario.id, acesso)}
                      />
                      {acesso}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AcessosPorUsuario;