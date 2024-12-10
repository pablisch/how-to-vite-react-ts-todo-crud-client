import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  esbuild: {
    jsx: 'automatic',
  },
  build: {
    target: 'esnext', // Ensures modern output
  },
  optimizeDeps: {
    esbuildOptions: {
      supported: { 'import-meta': true }, // Ensure import.meta is supported
    },
  },
});
