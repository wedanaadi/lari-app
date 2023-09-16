import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react-swc";
import * as path from 'path'

export default defineConfig({
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './resources/js') },
      { find: '#', replacement: path.resolve(__dirname, './resources/assets') }
    ],
  },
  plugins: [
    react(),
    laravel({
      input: ["resources/css/app.css", "resources/js/main.tsx"],
      refresh: true,
    }),
  ],
});
