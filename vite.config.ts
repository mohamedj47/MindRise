import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  // تحميل المتغيرات من .env
  const env = loadEnv(mode, process.cwd(), '');
  const getEnv = (key: string) => process.env[key] || env[key] || '';

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src') // يسهل استدعاء الملفات من src
      }
    },
    define: {
      'process.env.API_KEY': JSON.stringify(getEnv('API_KEY')),
      'process.env.API_KEY_2': JSON.stringify(getEnv('API_KEY_2')),
      'process.env.API_KEY_3': JSON.stringify(getEnv('API_KEY_3')),
      'process.env.API_KEY_4': JSON.stringify(getEnv('API_KEY_4')),
      'process.env.API_KEY_5': JSON.stringify(getEnv('API_KEY_5')),
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      rollupOptions: {
        input: path.resolve(__dirname, 'index.html'), // نقطة الدخول واضحة
      }
    }
  };
});

