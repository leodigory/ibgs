import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase'; // Importe o Firestore
import './Classes.css'; // Estilos do componente

function Classes({ onClose }) {
  const [classes, setClasses] = useState([]); // Lista de classes
  const [newClassName, setNewClassName] = useState(''); // Nome da nova classe

  // Busca as classes do Firestore ao carregar o componente
  useEffect(() => {
    const fetchClasses = async () => {
      const querySnapshot = await getDocs(collection(db, 'classes'));
      const classesList = [];
      querySnapshot.forEach((doc) => {
        classesList.push({ id: doc.id, name: doc.data().name });
      });
      setClasses(classesList);
    };

    fetchClasses();
  }, []);

  // Função para adicionar uma nova classe
  const handleAddClass = async () => {
    if (!newClassName.trim()) return; // Verifica se o campo não está vazio

    try {
      // Adiciona a nova classe ao Firestore
      const newClassRef = await addDoc(collection(db, 'classes'), {
        name: newClassName,
      });

      // Atualiza a lista de classes localmente
      setClasses([...classes, { id: newClassRef.id, name: newClassName }]);
      setNewClassName(''); // Limpa o campo de texto
    } catch (error) {
      console.error('Erro ao adicionar classe:', error);
    }
  };

  // Função para excluir uma classe
  const handleDeleteClass = async (id) => {
    try {
      await deleteDoc(doc(db, 'classes', id)); // Exclui a classe do Firestore
      setClasses(classes.filter((cls) => cls.id !== id)); // Atualiza a lista local
    } catch (error) {
      console.error('Erro ao excluir classe:', error);
    }
  };

  // Função para garantir que o texto seja sempre em minúsculas
  const handleInputChange = (e) => {
    setNewClassName(e.target.value.toLowerCase()); // Converte o texto para minúsculas
  };

  return (
    <div className="classes-modal">
      <div className="classes-content">
        {/* Cabeçalho do modal */}
        <div className="modal-header">
          <h2>Gerenciar Classes</h2>
          <button className="close-button" onClick={onClose}>X</button>
        </div>

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

        {/* Lista de classes */}
        <div className="classes-list">
          {classes.map((cls) => (
            <div key={cls.id} className="class-item">
              <span>{cls.name}</span>
              <button onClick={() => handleDeleteClass(cls.id)}>X</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Classes;