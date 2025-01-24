import { collection, setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

// Função para enviar os títulos para o Firebase
export const enviarTitulosParaFirebase = async (titulos) => {
  try {
    // Referência para a coleção FerramentasLider no Firestore
    const ferramentasLiderCollectionRef = collection(db, 'FerramentasLider');

    // Itera sobre os títulos e os adiciona ao Firestore
    for (const titulo of titulos) {
      // Cria um documento com o ID igual ao título e o campo "name" com o mesmo valor
      const ferramentaDocRef = doc(ferramentasLiderCollectionRef, titulo);
      await setDoc(ferramentaDocRef, { name: titulo }, { merge: true });
    }
  } catch (error) {
    console.error("Erro ao enviar títulos para o Firebase:", error);
  }
};