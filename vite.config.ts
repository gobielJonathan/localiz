import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

import path from "path";
import { fileURLToPath } from "url";
import vue from '@vitejs/plugin-vue';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [dts(), vue()],
  build: {
    lib: {
      entry: {
        react: path.resolve(__dirname, "packages/react.tsx"),
        vue: path.resolve(__dirname, "packages/vue.ts"),
        index: path.resolve(__dirname, "packages/index.ts"),
      },
      name: "localiz", // Replace with your library name
      formats: ["es", "cjs"],
    },
    outDir: "dist", // Output directory for the build
    rollupOptions: {
      external: ["react", "@types/react", "react/jsx-runtime", "react-dom", "vue"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsx",
          vue: "Vue",
        },
      },
    },
  },
});
