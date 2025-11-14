import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: {
      '.js': 'jsx',
      '.jsx': 'jsx'
    },
    include: /src\/.+\.(js|jsx)$/
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  server: {
    host: true,
    port: 5173
  }
});
