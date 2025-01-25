import { collection, setDoc, doc, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

// Função para limpar todos os documentos da coleção
const limparColecao = async (colecaoRef) => {
  try {
    // Busca todos os documentos da coleção
    const querySnapshot = await getDocs(colecaoRef);

    // Itera sobre os documentos e os exclui
    querySnapshot.forEach(async (documento) => {
      await deleteDoc(doc(colecaoRef, documento.id));
      console.log(`Documento "${documento.id}" excluído com sucesso.`);
    });

    console.log("Todos os documentos da coleção foram excluídos.");
  } catch (error) {
    console.error("Erro ao limpar a coleção:", error);
  }
};

// Função para enviar os títulos para o Firebase
export const enviarTitulosParaFirebase = async (titulos) => {
  try {
    // Referência para a coleção FerramentasLider no Firestore
    const ferramentasLiderCollectionRef = collection(db, 'FerramentasLider');

    // Limpa a coleção antes de adicionar os novos títulos
    await limparColecao(ferramentasLiderCollectionRef);

    // Exibe os títulos que estão sendo enviados
    console.log("Títulos a serem enviados para o Firebase:", titulos);

    // Verifica se há títulos para enviar
    if (!titulos || titulos.length === 0) {
      console.warn("Nenhum título encontrado para enviar.");
      return;
    }

    // Itera sobre os títulos e os adiciona ao Firestore
    for (const titulo of titulos) {
      try {
        // Exibe o título que está sendo processado
        console.log("Enviando título:", titulo);

        // Cria um documento com o ID igual ao título e o campo "name" com o mesmo valor
        const ferramentaDocRef = doc(ferramentasLiderCollectionRef, titulo);
        await setDoc(ferramentaDocRef, { name: titulo }, { merge: true });

        // Confirmação de envio
        console.log(`Título "${titulo}" enviado com sucesso para o Firebase.`);
      } catch (error) {
        console.error(`Erro ao enviar o título "${titulo}":`, error);
      }
    }

    console.log("Todos os títulos foram enviados para o Firebase.");
  } catch (error) {
    console.error("Erro ao enviar títulos para o Firebase:", error);
  }
};