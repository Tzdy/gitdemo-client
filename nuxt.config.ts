import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    baseURL: "/gitdemo/",
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "/api",
      gitBase: process.env.NUXT_PUBLIC_GIT_BASE || "/git",
      // NUXT_PUBLIC前缀也要加。
      // gitBase 和 GIT_BASE必须一致，还需要保证 加上 || "/git" 不然部署后不能读取环境变量
    },
  },
  typescript: {
    shim: false,
  },
  modules: ["@pinia/nuxt"],
  vite: {
    plugins: [
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), "icons")],
        // 指定symbolId格式
        symbolId: "icon-[dir]-[name]",
      }),
    ],
  },
});
