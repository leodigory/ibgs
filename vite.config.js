import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // Use './' para caminhos relativos
  plugins: [react()],
  build: {
    outDir: 'dist', // Pasta de saída do build
  },
});