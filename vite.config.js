import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        favoritos: resolve(__dirname, 'favoritos.html'),
        detalles: resolve(__dirname, 'detalles.html'),
      },
    },
  },
});
