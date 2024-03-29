import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { myPlugin } from "vite-plugin-md2vuedoc";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [myPlugin({}), vue({ include: [/\.vue$/, /\.md$/, /\.vd$/] })],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
