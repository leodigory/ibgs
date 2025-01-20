// src/services/userService.js
import { getDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase'; // Importe o auth do Firebase

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

// Função para buscar os dados completos do usuário no Firestore
export const getUserData = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid)); // Busca o documento do usuário no Firestore
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return {
        role: userData.role || "guest", // Role do usuário (padrão: "guest")
        name: userData.name || "Usuário", // Nome do usuário (padrão: "Usuário")
        photoURL: userData.photoURL || "/default-profile.png", // Foto do usuário (padrão: "/default-profile.png")
      };
    }
    return {
      role: "guest",
      name: "Usuário",
      photoURL: "/default-profile.png",
    }; // Dados padrão caso o documento não exista
  } catch (error) {
    console.error("Erro ao buscar os dados do usuário:", error.message);
    throw error;
  }
};

// Função para buscar todos os dados do usuário (role, nome, foto, etc.)
export const fetchUserData = async () => {
  try {
    const user = auth.currentUser; // Obtém o usuário autenticado
    if (user) {
      const userData = await getUserData(user.uid); // Busca os dados do usuário
      return {
        role: userData.role,
        userName: userData.name,
        userPhoto: userData.photoURL,
        userId: user.uid,
      };
    }
    return null; // Retorna null se não houver usuário autenticado
  } catch (error) {
    console.error("Erro ao buscar os dados do usuário:", error.message);
    throw error;
  }
};