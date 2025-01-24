import { enviarTitulosParaFirebase } from './buscatituloFerramentas';

// Função para ler o código-fonte de um componente e extrair títulos
export const lerTitulosDaPagina = (componente) => {
  try {
    // Obtém o código-fonte do componente como uma string
    const codigoFonte = componente.toString();

    // Regex para encontrar os títulos dentro das condições grupo.titulo === "..."
    const regex = /grupo\.titulo\s*===\s*"([^"]+)"/g;

    // Array para armazenar os títulos encontrados
    const titulosEncontrados = [];

    // Executa a regex no código-fonte
    let match;
    while ((match = regex.exec(codigoFonte)) !== null) {
      titulosEncontrados.push(match[1]); // Adiciona o título encontrado ao array
    }

    // Envia os títulos para o Firebase
    if (titulosEncontrados.length > 0) {
      enviarTitulosParaFirebase(titulosEncontrados);
    }
  } catch (error) {
    console.error("Erro ao ler títulos da página:", error);
  }
};