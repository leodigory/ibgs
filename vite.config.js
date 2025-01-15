import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // ou './' para caminhos relativos
  plugins: [react()],
  build: {
    outDir: 'dist', // Pasta onde os arquivos de build serão gerados
    sourcemap: true, // Gera sourcemaps para depuração
    emptyOutDir: true, // Limpa a pasta de build antes de gerar novos arquivos
  },

});