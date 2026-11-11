import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://pearlora.nighttealabs.tech',
  vite: { plugins: [tailwindcss()] },
});
