import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "/Resturant/",

  plugins: [react()],
  server: {
    host: '[IP ADDRESS]',
    port: 5173,
  },
});