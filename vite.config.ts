import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Explicit base path for production
  base: "/",

  server: {
    host: "0.0.0.0",
    port: 3001,
  },

  preview: {
    host: "0.0.0.0",
    port: 3001,
  },

  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // Production build optimizations
  build: {
    outDir: "dist",
    sourcemap: mode === "development",
    minify: "esbuild",
    target: "es2015",
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk for better caching
          vendor: ["react", "react-dom", "react-router-dom"],
          // UI components chunk
          ui: ["@radix-ui/react-dialog", "@radix-ui/react-dropdown-menu", "@radix-ui/react-toast"],
          // Firebase chunk
          firebase: ["firebase/app", "firebase/auth", "firebase/firestore", "firebase/storage"],
          // Supabase chunk
          supabase: ["@supabase/supabase-js"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
}));
