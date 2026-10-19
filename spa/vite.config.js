import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The SPA: one Vite project, one build, one dist/ and one deploy. Nothing
// special at all - that is the point.
export default defineConfig({
  root: fileURLToPath(new URL(".", import.meta.url)),
  plugins: [react()],
  preview: { port: 4000, strictPort: true },
});
