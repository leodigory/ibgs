import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Ou use o caminho relativo apropriado, dependendo da sua estrutura
});
