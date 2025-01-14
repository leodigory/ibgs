import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Garante que o build seja gerado na pasta 'dist'
    sourcemap: true, // Gera sourcemaps para depuração
  },
  server: {
    port: 3000, // Define a porta do servidor de desenvolvimento
  },
});