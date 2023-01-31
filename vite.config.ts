import {
  fileURLToPath,
  URL,
} from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) =>
// const env = loadEnv(mode, process.cwd(), '');
// * experiment, not final version of config
  // eslint-disable-next-line implicit-arrow-linebreak
  ({
    // base: env.VITE_BASE_PATH,
    base: '/ebac-test/',
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
  }));
