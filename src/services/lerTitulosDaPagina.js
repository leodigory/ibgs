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

    // Exibe os títulos encontrados no console
    console.log("Títulos encontrados:", titulosEncontrados);

    // Envia os títulos para o Firebase
    if (titulosEncontrados.length > 0) {
      console.log("Enviando títulos para o Firebase...");
      enviarTitulosParaFirebase(titulosEncontrados);
    } else {
      console.log("Nenhum título encontrado para enviar.");
    }
  } catch (error) {
    console.error("Erro ao ler títulos da página:", error);
  }
};