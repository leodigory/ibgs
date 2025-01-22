// src/services/FerramentasService.js
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

// Função para retornar os títulos dos grupos
export const getGroupTitles = () => {
  return [
    { name: 'Gerenciamento de Equipes' },
    { name: 'Outras Ferramentas' },
    { name: 'Gerenciamento de Culto' },
  ];
};

// Função para inicializar a coleção FerramentasLider
export const initializeFerramentasLider = async () => {
  const groupTitles = getGroupTitles();

  // Verifica se a coleção já existe
  const ferramentasLiderCollection = collection(db, 'FerramentasLider');
  const snapshot = await getDocs(ferramentasLiderCollection);

  if (snapshot.empty) {
    // Se a coleção não existir, cria os documentos com os títulos dos grupos
    groupTitles.forEach(async (group) => {
      const id = group.name.toLowerCase().replace(/\s+/g, '_'); // Gera o ID a partir do nome
      await setDoc(doc(db, 'FerramentasLider', id), { name: group.name });
    });
    
  } else {
    
  }
};