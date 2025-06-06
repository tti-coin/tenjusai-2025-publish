import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  base: './', // GitHub Pages用
  build: {
    outDir: 'dist',
  },
});
