import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Importe o Firestore
import './Classes.css'; // Estilos do componente

function Classes({ onClose }) {
  const [classes, setClasses] = useState([]); // Lista de classes
  const [newClassName, setNewClassName] = useState(''); // Nome da nova classe
  const [tabs, setTabs] = useState([]); // Lista de abas disponíveis
  const [loading, setLoading] = useState(false); // Estado de carregamento
  const [error, setError] = useState(''); // Mensagem de erro
  const [filterText, setFilterText] = useState(''); // Estado para o filtro de texto

  // Busca as classes e as abas do Firestore ao carregar o componente
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Busca as classes
        const classesSnapshot = await getDocs(collection(db, 'classes'));
        const classesList = [];
        classesSnapshot.forEach((doc) => {
          classesList.push({ id: doc.id, name: doc.data().name, roles: doc.data().roles || [] });
        });
        setClasses(classesList);

        // Busca as abas
        const tabsSnapshot = await getDocs(collection(db, 'tabs'));
        const tabsList = [];
        tabsSnapshot.forEach((doc) => {
          tabsList.push(doc.id); // Assume que o nome da aba é o ID do documento
        });
        setTabs(tabsList);
      } catch (error) {
        setError('Erro ao carregar dados.');
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Função para adicionar uma nova classe
  const handleAddClass = async () => {
    if (!newClassName.trim()) {
      setError('O nome da classe não pode estar vazio.');
      return;
    }

    // Verifica se a classe já existe
    if (classes.some((cls) => cls.name === newClassName)) {
      setError('Uma classe com esse nome já existe.');
      return;
    }

    try {
      // Adiciona a nova classe ao Firestore
      const newClassRef = await addDoc(collection(db, 'classes'), {
        name: newClassName,
        roles: [], // Inicializa sem abas selecionadas
      });

      // Atualiza a lista de classes localmente
      setClasses([...classes, { id: newClassRef.id, name: newClassName, roles: [] }]);
      setNewClassName(''); // Limpa o campo de texto
      setError(''); // Limpa a mensagem de erro
      alert('Classe adicionada com sucesso!');
    } catch (error) {
      setError('Erro ao adicionar classe.');
      console.error('Erro ao adicionar classe:', error);
    }
  };

  // Função para excluir uma classe
  const handleDeleteClass = async (id) => {
    try {
      await deleteDoc(doc(db, 'classes', id)); // Exclui a classe do Firestore
      setClasses(classes.filter((cls) => cls.id !== id)); // Atualiza a lista local
      alert('Classe excluída com sucesso!');
    } catch (error) {
      setError('Erro ao excluir classe.');
      console.error('Erro ao excluir classe:', error);
    }
  };

  // Função para atualizar as abas selecionadas de uma classe
  const handleTabSelection = async (classId, tabName) => {
    try {
      const classRef = doc(db, 'classes', classId);
      const classData = classes.find((cls) => cls.id === classId);

      // Verifica se a aba já está selecionada
      const updatedRoles = classData.roles.includes(tabName)
        ? classData.roles.filter((role) => role !== tabName) // Remove a aba
        : [...classData.roles, tabName]; // Adiciona a aba

      // Atualiza o Firestore
      await updateDoc(classRef, { roles: updatedRoles });

      // Atualiza a lista de classes localmente
      setClasses(
        classes.map((cls) =>
          cls.id === classId ? { ...cls, roles: updatedRoles } : cls
        )
      );
      alert('Aba atualizada com sucesso!');
    } catch (error) {
      setError('Erro ao atualizar abas da classe.');
      console.error('Erro ao atualizar abas da classe:', error);
    }
  };

  // Função para garantir que o texto seja sempre em minúsculas
  const handleInputChange = (e) => {
    setNewClassName(e.target.value.toLowerCase()); // Converte o texto para minúsculas
    setError(''); // Limpa a mensagem de erro ao digitar
  };

  // Função para filtrar as classes com base no texto digitado
  const filteredClasses = classes.filter((cls) =>
    cls.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="classes-modal">
      <div className="classes-content">
        {/* Cabeçalho do modal */}
        <div className="modal-header">
          <h2>Gerenciar Classes</h2>
          <div className="filter-classes">
            <input
              type="text"
              placeholder="Filtrar classes..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>
          <button className="close-button" onClick={onClose}>X</button>
        </div>

        {/* Mensagem de erro */}
        {error && <p className="error-message">{error}</p>}

        {/* Formulário para adicionar nova classe */}
        <div className="add-class">
          <input
            type="text"
            placeholder="Nova Classe"
            value={newClassName}
            onChange={handleInputChange} // Garante que o texto seja em minúsculas
            onKeyPress={(e) => e.key === 'Enter' && handleAddClass()} // Adiciona ao pressionar Enter
          />
          <button onClick={handleAddClass}>+</button>
        </div>

        {/* Lista de classes e abas */}
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <div className="classes-list">
            {filteredClasses.length > 0 ? (
              filteredClasses.map((cls) => (
                <div key={cls.id} className="class-item">
                  <h3>{cls.name}</h3>
                  <div className="tabs-list">
                    {tabs.map((tab) => (
                      <label key={tab} className="tab-checkbox">
                        <input
                          type="checkbox"
                          checked={cls.roles.includes(tab)}
                          onChange={() => handleTabSelection(cls.id, tab)}
                          className="hidden-checkbox"
                        />
                        <div className="checkmark"></div>
                        {tab}
                      </label>
                    ))}
                  </div>
                  <button onClick={() => handleDeleteClass(cls.id)}>Excluir</button>
                </div>
              ))
            ) : (
              <p className="no-results">Classe não existe na lista</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Classes; 