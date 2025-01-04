import { defineConfig } from 'vite';
import vercel from 'vite-plugin-vercel';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 443,
    // port: 3000,
    // host: 'localhost',
  },
  plugins: [react(), vercel()],
  // plugins: [react()],
});
