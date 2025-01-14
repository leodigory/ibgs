import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Define o diretório base para o deploy (ajuste conforme necessário)
  base: '/', // Use './' para caminhos relativos ou '/nome-do-projeto/' se estiver em um subdiretório

  // Plugins do Vite
  plugins: [react()],

  // Configurações de build
  build: {
    outDir: 'dist', // Pasta onde o build será gerado
    sourcemap: true, // Gera sourcemaps para depuração
    emptyOutDir: true, // Limpa a pasta de build antes de gerar novos arquivos
  },

  // Configurações do servidor de desenvolvimento
  server: {
    port: 3000, // Porta do servidor de desenvolvimento
    open: true, // Abre o navegador automaticamente ao iniciar o servidor
  },

  // Configurações de preview (útil para testar o build localmente)
  preview: {
    port: 3000, // Porta do servidor de preview
    open: true, // Abre o navegador automaticamente ao iniciar o preview
  },
});