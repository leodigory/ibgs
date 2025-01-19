// src/services/imageService.js
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

// Função para converter a imagem em base64
export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

// Função para fazer upload da foto no Firestore
export const uploadPhoto = async (file, userId) => {
  if (!file || !userId) return;

  // Verifica o tamanho da imagem (1 MB = 1 * 1024 * 1024 bytes)
  if (file.size > 1 * 1024 * 1024) {
    throw new Error('A imagem deve ter no máximo 1 MB.');
  }

  try {
    // Converte a imagem para base64
    const base64 = await convertToBase64(file);

    // Atualiza a URL da foto no Firestore
    const userDoc = doc(db, 'users', userId);
    await updateDoc(userDoc, { photoURL: base64 });

    return base64; // Retorna a URL da imagem em base64
  } catch (error) {
    console.error('Erro ao fazer upload da foto:', error);
    throw error;
  }
};