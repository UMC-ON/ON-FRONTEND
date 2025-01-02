import { defineConfig } from 'vite';
//import vercel from 'vite-plugin-vercel';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 443,
  },
  //plugins: [react(), vercel()],
});
