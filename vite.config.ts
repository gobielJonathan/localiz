import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [dts()],
  build: {
    lib: {
      entry: {
        react: path.resolve(__dirname, "packages/react.tsx"),
        index: path.resolve(__dirname, "packages/index.ts"),
      },
      name: "localiz", // Replace with your library name
      formats: ["es", "cjs"],
    },
    outDir: "dist", // Output directory for the build
    rollupOptions: {
      external: ["react", "@types/react", "react/jsx-runtime", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsx",
        },
      },
    },
  },
});
