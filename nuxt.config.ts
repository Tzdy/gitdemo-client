import { defineNuxtConfig } from "nuxt";
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  modules: ["@lewebsimple/nuxt3-svg", '@pinia/nuxt'],
  vite: {
    plugins: [
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
    ]
  }
});
