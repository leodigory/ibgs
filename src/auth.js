import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"; // Importa funções do Firestore
import { auth, db } from './firebase'; // Importa auth e db

// Função para cadastrar um novo usuário
export const signUp = async (email, password, additionalData) => {
  try {
    // Cria o usuário no Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Adiciona dados adicionais ao Firestore
    await setDoc(doc(db, "users", user.uid), {
      ...additionalData,
      role: "visitante", // Cargo padrão
      createdAt: new Date().toISOString(), // Data de criação
    });

    return user;
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error.message);
    throw error;
  }
};

// Função para fazer login
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Erro ao fazer login:", error.message);
    throw error;
  }
};

// Função para fazer logout
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Erro ao fazer logout:", error.message);
    throw error;
  }
};

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
      return userDoc.data(); // Retorna todos os dados do usuário
    }
    return null; // Retorna null se o documento não existir
  } catch (error) {
    console.error("Erro ao buscar os dados do usuário:", error.message);
    throw error;
  }
};