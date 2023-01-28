import {
  fileURLToPath,
  URL,
} from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const isProduction = process.env.APP_ENV === 'production';

// https://vitejs.dev/config/
export default defineConfig({
  base: isProduction ? '/ebac-test/' : '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
