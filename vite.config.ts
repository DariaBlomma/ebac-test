import {
  fileURLToPath,
  URL,
} from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const isProduction = process.env.NODE_ENV === 'production';

// https://vitejs.dev/config/
export default defineConfig({
  base: isProduction ? '/ebac-test/' : '/',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import \'./src/assets/styles/variables.scss\';',
      },
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
