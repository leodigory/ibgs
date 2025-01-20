import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

// Função para verificar e adicionar uma página ao Firestore
export const checkAndAddPage = async (pageName) => {
  try {
    const pagesCollection = collection(db, 'pages');
    const pageDoc = doc(pagesCollection, pageName);

    // Verifica se a página já existe
    const pageSnapshot = await getDocs(pagesCollection);
    const pageExists = pageSnapshot.docs.some((doc) => doc.id === pageName);

    // Se a página não existir, adiciona ao Firestore
    if (!pageExists) {
      await setDoc(pageDoc, { name: pageName });
      console.log(`Página "${pageName}" adicionada ao Firestore.`);
    }
  } catch (error) {
    console.error(`Erro ao verificar/adicionar a página "${pageName}":`, error);
  }
};