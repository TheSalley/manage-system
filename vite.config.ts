import path from "path";
import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import Inspect from "vite-plugin-inspect";

const pathSrc = path.resolve(__dirname, "src");

export default defineConfig({
  build: {
    rollupOptions: {
      // output: {
      //   chunkFileNames: "static/js/toutiao_plan/[name]-[hash].js",
      //   entryFileNames: "static/js/toutiao_plan/[name]-[hash].js",
      //   assetFileNames: "static/[ext]/toutiao_plan/[name]-[hash].[ext]",
      // },
    },
  },
  resolve: {
    alias: {
      "@": pathSrc,
    },
  },
  worker: {
    rollupOptions: {
      // output: {
      //   chunkFileNames: "static/js/toutiao_plan/[name]-[hash].js",
      //   entryFileNames: "static/js/toutiao_plan/[name]-[hash].js",
      //   assetFileNames: "static/[ext]/toutiao_plan/[name]-[hash].[ext]",
      // },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        chartset: false,
      },
    },
  },
  plugins: [
    Vue(),
    AutoImport({
      imports: ["vue"],
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: "Icon",
        }),
      ],
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          enabledCollections: ["ep"],
        }),
      ],
    }),
    Icons({
      autoInstall: true,
    }),
    Inspect(),
  ],
  server: {
    proxy: {
      "/api": {
        target: "https://api.iweiqidian.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
