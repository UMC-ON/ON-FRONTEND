import { defineConfig } from 'vite';
//import vercel from 'vite-plugin-vercel';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 3000,
  },
  //plugins: [react(), vercel()],
});
