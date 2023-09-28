import { imgLazyload } from "@mdit/plugin-img-lazyload";
import { tasklist } from "@mdit/plugin-tasklist";
import { pagefindPlugin } from "vitepress-plugin-pagefind";
import { withMermaid } from "vitepress-plugin-mermaid";

const baseUrl: string = "/record";
// https://vitepress.dev/reference/site-config
export default withMermaid({
  base: baseUrl,
  title: "我的笔记",
  lang: "zh-cn",
  description: "记录自己笔记的地方",
  head: [["link", { rel: "icon", href: baseUrl + "/learning.svg" }]],
  themeConfig: {
    outline: "deep",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "然叔", link: "/ranshu/loader" },
      { text: "杂谈", link: "/others/HumanSystemOptimization" },
      { text: "CSS", link: "/css/bfc" },
      { text: "JavaScript", link: "/javascript/eventLoop" },
    ],

    sidebar: {
      "/ranshu": [
        { text: "webpack常见的loader", link: "/ranshu/loader" },
        { text: "webpack常见的plugin", link: "/ranshu/plugin" },
        { text: "提升前端构建工具的性能", link: "/ranshu/performanceImprovements" },
        { text: "浏览器缓存", link: "/ranshu/browseCache" },
      ],
      "/others": [{ text: "身体系统调优不完全指南", link: "/others/HumanSystemOptimization" }],
      "/css": [{ text: "CSS 中的 BFC", link: "/css/bfc" }],
      "/javascript": [
        { text: "并发模型和事件循环", link: "/javascript/eventLoop" },
        { text: "防抖和节流", link: "/javascript/debounceAndThrottle" },
      ],
    },

    socialLinks: [{ icon: "github", link: "https://github.com/Zhe28" }],
  },
  markdown: {
    config: (md) => {
      md.use(imgLazyload).use(tasklist);
    },
  },
  // outDir: "../dist",
  vite: {
    build: { target: "esnext", assetsInlineLimit: 409600 },
    plugins: [pagefindPlugin()],
  },
});
