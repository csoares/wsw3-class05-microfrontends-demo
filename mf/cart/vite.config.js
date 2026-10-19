import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

// The cart micro frontend: its own Vite project, its own build, its own port
// (4102). It publishes remoteEntry.js, and what it exposes is the mount
// contract - nothing else.
export default defineConfig({
  root: fileURLToPath(new URL(".", import.meta.url)),
  plugins: [
    react(),
    federation({
      name: "cart",
      filename: "remoteEntry.js",
      dts: false,
      exposes: { "./mount": "./src/mount.jsx" },
      // one React for the whole page, whoever loads first.
      shared: {
        react: { singleton: true, requiredVersion: "^19.0.0" },
        "react-dom": { singleton: true, requiredVersion: "^19.0.0" },
      },
    }),
  ],
  preview: { port: 4102, strictPort: true },
  build: { target: "esnext" },
});
