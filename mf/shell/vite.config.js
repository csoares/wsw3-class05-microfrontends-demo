import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";

// The shell (host): it builds without the slices' code. It only knows their
// names and where their remoteEntry.js lives; the code arrives in the browser,
// at run time.
export default defineConfig({
  root: fileURLToPath(new URL(".", import.meta.url)),
  plugins: [
    react(),
    federation({
      name: "shell",
      dts: false,
      remotes: {
        catalogue: { type: "module", name: "catalogue", entry: "http://localhost:4101/remoteEntry.js" },
        cart: { type: "module", name: "cart", entry: "http://localhost:4102/remoteEntry.js" },
      },
      shared: {
        react: { singleton: true, requiredVersion: "^19.0.0" },
        "react-dom": { singleton: true, requiredVersion: "^19.0.0" },
      },
    }),
  ],
  preview: { port: 4100, strictPort: true },
  build: { target: "esnext" },
});
