// src/services/userService.js
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

// Função para buscar o role do usuário no Firestore
export const getUserRole = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid)); // Busca o documento do usuário no Firestore
    if (userDoc.exists()) {
      return userDoc.data().role; // Retorna o role do usuário
    }
    return "guest"; // Role padrão caso o documento não exista
  } catch (error) {
    console.error("Erro ao buscar o role do usuário:", error.message);
    throw error;
  }
};