import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Importe o Firestore
import './ClassesUser.css'; // Estilos do componente

function UserClasses({ onClose }) {
  const [users, setUsers] = useState([]); // Lista de usuários
  const [classes, setClasses] = useState([]); // Lista de classes
  const [selectedClass, setSelectedClass] = useState({}); // Classe selecionada para cada usuário

  // Busca os usuários e as classes do Firestore ao carregar o componente
  useEffect(() => {
    const fetchData = async () => {
      // Busca os usuários
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const usersList = [];
      usersSnapshot.forEach((doc) => {
        usersList.push({ id: doc.id, ...doc.data() });
      });
      setUsers(usersList);

      // Busca as classes
      const classesSnapshot = await getDocs(collection(db, 'classes'));
      const classesList = [];
      classesSnapshot.forEach((doc) => {
        classesList.push({ id: doc.id, name: doc.data().name });
      });
      setClasses(classesList);
    };

    fetchData();
  }, []);

  // Função para atualizar a classe do usuário
  const handleClassChange = async (userId, newClass) => {
    try {
      // Atualiza o Firestore
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { role: newClass });

      // Atualiza o estado local
      setSelectedClass((prev) => ({ ...prev, [userId]: newClass }));
    } catch (error) {
      console.error('Erro ao atualizar classe do usuário:', error);
    }
  };

  return (
    <div className="user-classes-modal">
      <div className="user-classes-content">
        {/* Cabeçalho do modal */}
        <div className="modal-header">
          <h2>Gerenciar Classes de Usuários</h2>
          <button className="close-button" onClick={onClose}>X</button>
        </div>

        {/* Lista de usuários e classes */}
        <div className="users-list">
          {users.map((user) => (
            <div key={user.id} className="user-item">
              <h3>{user.name}</h3>
              <div className="classes-list">
                {classes.map((cls) => (
                  <label key={cls.id} className="class-checkbox">
                    <input
                      type="radio"
                      name={`user-${user.id}`}
                      value={cls.name}
                      checked={selectedClass[user.id] === cls.name || user.role === cls.name}
                      onChange={() => handleClassChange(user.id, cls.name)}
                    />
                    {cls.name}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserClasses;