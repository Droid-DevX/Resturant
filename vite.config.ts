import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import pkg from './package.json';

// Extract the subpath unless on Netlify which should always be root /
const base = process.env.NETLIFY || process.env.NODE_ENV !== 'production'
  ? '/'
  : new URL(pkg.homepage).pathname;

export default defineConfig({
  base,
  plugins: [react()],
});