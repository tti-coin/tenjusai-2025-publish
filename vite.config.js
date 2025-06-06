import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  base: '/tenjusai-2025-publish/', // GitHub Pages用（リポジトリ名に合わせる）
  build: {
    outDir: 'dist',
  },
});
