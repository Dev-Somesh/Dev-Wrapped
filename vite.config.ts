import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react()],
  // Note: API keys are NOT embedded in the build bundle
  // They are stored server-side in Netlify environment variables
  // Client calls serverless function which proxies Gemini API calls
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});
