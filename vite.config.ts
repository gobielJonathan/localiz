import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  build: {
    lib: {
      entry: {
        react: path.resolve(__dirname, "packages/react.ts"),
      },
      name: "localiz", // Replace with your library name
      formats: ["es", "cjs"],
    },
    outDir: "dist", // Output directory for the build
    rollupOptions: {
      output: {
        // entryFileNames: "[name].js", // Ensures the file is named index.js in the output
      },
    },
  },
});
