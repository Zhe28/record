import { imgLazyload } from "@mdit/plugin-img-lazyload";
import { tasklist } from "@mdit/plugin-tasklist";
import { pagefindPlugin } from "vitepress-plugin-pagefind";
import { withMermaid } from "vitepress-plugin-mermaid";
import { name as base } from "../../package.json";

// https://vitepress.dev/reference/site-config
export default withMermaid({
  base: `/${base}`,
  title: "我的笔记",
  lang: "zh-cn",
  description: "记录自己笔记的地方",
  head: [["link", { rel: "icon", href: base + "/learning.svg" }]],
  rewrites: {},
  // 开启 clearUrls 功能，将 /notes/src/index.html 重写为 /notes/index.html
  cleanUrls: true,
  themeConfig: {
    outline: "deep",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "然叔", link: "/notes/src/ranshu/loader" },
      { text: "杂谈", link: "/notes/src/others/HumanSystemOptimization" },
      { text: "CSS", link: "/notes/src/css/bfc" },
      { text: "JavaScript", link: "/notes/src/javascript/eventLoop" },
    ],

    sidebar: {
      "/notes/src/ranshu": [
        { text: "webpack常见的loader", link: "./loader" },
        { text: "webpack常见的plugin", link: "./plugin" },
        { text: "提升前端构建工具的性能", link: "./performanceImprovements" },
        { text: "浏览器缓存", link: "./browseCache" },
      ],
      "/notes/src/others": [{ text: "身体系统调优不完全指南", link: "./HumanSystemOptimization" }],
      "/notes/src/css": [{ text: "CSS 中的 BFC", link: "/notes/src/css/bfc" }],
      "/notes/src/javascript": [
        { text: "并发模型和事件循环", link: "./eventLoop" },
        { text: "防抖和节流", link: "./debounceAndThrottle" },
      ],
    },

    socialLinks: [{ icon: "github", link: "https://github.com/Zhe28" }],
  },
  markdown: {
    config: (md) => {
      md.use(imgLazyload).use(tasklist);
    },
  },
  // outDir: "../../../dist/notes",
  vite: {
    build: {
      target: "esnext",
      emptyOutDir: true,
      chunkSizeWarningLimit: 40960000,
      assetsInlineLimit: 40960000,
    },
    plugins: [pagefindPlugin()],
  },
});
