import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs';

const copyManifest = () => {
  return {
    name: 'copy-manifest',
    writeBundle: () => {
      // Ensure dist directory exists
      if (!fs.existsSync('dist')) {
        fs.mkdirSync('dist', { recursive: true });
      }
      
      // Ensure icons directory exists
      if (!fs.existsSync('dist/icons')) {
        fs.mkdirSync('dist/icons', { recursive: true });
      }
      
      // Copy manifest
      fs.copyFileSync('manifest.json', 'dist/manifest.json');
      
      // Create a simple SVG icon for the extension
      const iconSvg = `<svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="128" height="128" fill="#000"/>
        <text x="64" y="64" font-family="Arial" font-size="48" fill="white" text-anchor="middle" dominant-baseline="middle">MT</text>
      </svg>`;
      
      fs.writeFileSync('dist/icons/icon.svg', iconSvg);
      fs.copyFileSync('dist/icons/icon.svg', 'dist/icons/icon16.png');
      fs.copyFileSync('dist/icons/icon.svg', 'dist/icons/icon48.png');
      fs.copyFileSync('dist/icons/icon.svg', 'dist/icons/icon128.png');
    }
  };
};

export default defineConfig({
  plugins: [react(), copyManifest()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
        format: 'es'
      }
    },
    target: 'es2015',
    modulePreload: {
      polyfill: false
    },
    cssCodeSplit: false,
    sourcemap: false,
    minify: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
});