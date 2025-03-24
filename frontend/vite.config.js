import { defineConfig as config } from 'vite';
import react from '@vitejs/plugin-react';

export default config({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://169.254.252.62:3006',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
});