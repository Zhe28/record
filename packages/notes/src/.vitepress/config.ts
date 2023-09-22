import { defineConfig } from "vitepress";
import { imgLazyload } from "@mdit/plugin-img-lazyload";
import { tasklist } from "@mdit/plugin-tasklist";
import { chineseSearchOptimize, pagefindPlugin } from "vitepress-plugin-pagefind";
import { attrs } from "@mdit/plugin-attrs";

const baseUrl: string = "/record";
// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: baseUrl,
  title: "我的笔记",
  description: "记录自己笔记的地方",
  head: [["link", { rel: "icon", href: baseUrl + "/learning.svg" }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "然叔", link: "/ranshu/loader" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: {
      "/ranshu": [
        { text: "webpack常见的loader", link: "/ranshu/loader" },
        { text: "webpack常见的plugin", link: "/ranshu/plugin" },
        { text: "提升前端构建工具的性能", link: "/ranshu/performanceImprovements" },
      ],
    },

    socialLinks: [{ icon: "github", link: "https://github.com/Zhe28" }],
  },
  markdown: {
    config: (md) => {
      md.use(imgLazyload).use(tasklist, {}).use(attrs, {});
    },
  },
  // outDir: "../dist",
  vite: {
    build: { target: "esnext", emptyOutDir: true, assetsInlineLimit: 409600 },
    plugins: [pagefindPlugin({ customSearchQuery: chineseSearchOptimize })],
  },
});
