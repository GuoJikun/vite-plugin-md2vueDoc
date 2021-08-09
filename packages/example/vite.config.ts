import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { myPlugin } from "vite-plugin-md2vuedoc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    myPlugin({ markdown: { autoLink: true, highlight: true } }),
    vue({ include: [/\.vue$/, /\.md$/, /\.vd$/] }),
  ],
});
