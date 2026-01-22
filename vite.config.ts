import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// GitHub Pages project URL will be:
// https://zjy19901124.github.io/rallyroo-rc-store/
const repoName = "rallyroo-rc-store";

export default defineConfig(({ mode }) => ({
  base: `/${repoName}/`,

  // Dev server only (ignored by GitHub Pages)
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },

  plugins: [
    react(),
    // Only enable Lovable component tagging in development
    mode === "development" ? componentTagger() : null,
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
