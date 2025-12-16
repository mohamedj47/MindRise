
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const getEnv = (key: string) => process.env[key] || env[key] || '';

  return {
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(getEnv('API_KEY')),
      'process.env.API_KEY_2': JSON.stringify(getEnv('API_KEY_2')),
      'process.env.API_KEY_3': JSON.stringify(getEnv('API_KEY_3')),
      'process.env.API_KEY_4': JSON.stringify(getEnv('API_KEY_4')),
      'process.env.API_KEY_5': JSON.stringify(getEnv('API_KEY_5')),
    },
    build: {
      outDir: 'dist',
      sourcemap: false
    }
  };
});
