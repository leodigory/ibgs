import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './Acessos.css';

function Acessos({ onClose }) {
  const [novoAcesso, setNovoAcesso] = useState('');
  const [acessos, setAcessos] = useState([]);
  const [ferramentas, setFerramentas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        // Busca os acessos do Firestore
        const acessosSnapshot = await getDocs(collection(db, 'acessos'));
        const acessosList = [];
        acessosSnapshot.forEach((doc) => {
          acessosList.push({ id: doc.id, name: doc.data().name, ferramentas: doc.data().ferramentas || [] });
        });
        setAcessos(acessosList);

        // Busca as ferramentas da coleção FerramentasLider
        const ferramentasSnapshot = await getDocs(collection(db, 'FerramentasLider'));
        const ferramentasList = [];
        ferramentasSnapshot.forEach((doc) => {
          ferramentasList.push({ id: doc.id, name: doc.data().name });
        });
        setFerramentas(ferramentasList);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    fetchData();
  }, []);

  const handleAdicionarAcesso = async () => {
    if (!novoAcesso.trim()) return;

    const acessoName = novoAcesso.toLowerCase();
    const acessoId = acessoName.replace(/\s+/g, '_');

    try {
      const acessoRef = doc(db, 'acessos', acessoId);
      await setDoc(acessoRef, { name: acessoName, ferramentas: [] });

      setAcessos((prev) => [...prev, { id: acessoId, name: acessoName, ferramentas: [] }]);
      setNovoAcesso('');
    } catch (error) {
      console.error('Erro ao adicionar acesso:', error);
    }
  };

  const handleExcluirAcesso = async (acessoId) => {
    try {
      await deleteDoc(doc(db, 'acessos', acessoId));
      setAcessos((prev) => prev.filter((acesso) => acesso.id !== acessoId));
    } catch (error) {
      console.error('Erro ao excluir acesso:', error);
    }
  };

  const handleToggleFerramenta = async (acessoId, ferramentaId) => {
    try {
      const acesso = acessos.find((a) => a.id === acessoId);
      const updatedFerramentas = acesso.ferramentas.includes(ferramentaId)
        ? acesso.ferramentas.filter((f) => f !== ferramentaId)
        : [...acesso.ferramentas, ferramentaId];

      await updateDoc(doc(db, 'acessos', acessoId), { ferramentas: updatedFerramentas });

      setAcessos((prev) =>
        prev.map((a) => (a.id === acessoId ? { ...a, ferramentas: updatedFerramentas } : a))
      );
    } catch (error) {
      console.error('Erro ao atualizar ferramentas:', error);
    }
  };

  return (
    <div className="acessos-modal">
      <div className="acessos-content">
        <div className="modal-header">
          <h2>Gerenciar Acessos</h2>
          <button className="close-button" onClick={onClose}>X</button>
        </div>

        <div className="add-acesso">
          <input
            type="text"
            placeholder="Digite o nome do acesso"
            value={novoAcesso}
            onChange={(e) => setNovoAcesso(e.target.value)}
          />
          <button onClick={handleAdicionarAcesso}>Adicionar</button>
        </div>

        <div className="acessos-list">
          {acessos.map((acesso) => (
            <div key={acesso.id} className="acesso-item">
              <h3>{acesso.name}</h3>
              <button className="excluir-button" onClick={() => handleExcluirAcesso(acesso.id)}>Excluir</button>

              <div className="ferramentas-list">
                {ferramentas.map((ferramenta) => (
                  <div key={ferramenta.id} className="ferramenta-item">
                    <label>
                      <input
                        type="checkbox"
                        checked={acesso.ferramentas.includes(ferramenta.id)}
                        onChange={() => handleToggleFerramenta(acesso.id, ferramenta.id)}
                      />
                      {ferramenta.name}
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

export default Acessos;