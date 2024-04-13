import { tasklist } from "@mdit/plugin-tasklist";
import { chineseSearchOptimize, pagefindPlugin } from "vitepress-plugin-pagefind";
import { withMermaid } from "vitepress-plugin-mermaid";
import { name as _base } from "../../package.json";

const base = `/${_base}/`;
// https://vitepress.dev/reference/site-config
export default withMermaid({
  base,
  title: "我的笔记",
  lang: "zh-cn",
  description: "记录自己笔记的地方",
  head: [["link", { rel: "icon", href: base + "/learning.svg" }]],
  rewrites: {
    // "packages/notes/src/index.md": `/`,
  },
  // 开启 clearUrls 功能，将 /notes/src/index.html 重写为 /notes/index.html
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    outline: "deep",
    externalLinkIcon: true,
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "笔记", link: "/notes/src/" },
      { text: "文档（入口未开放）", link: "" },
    ],

    sidebar: {
      "/notes/src/optimizePerformance": [
        { text: "提升前端构建工具的性能", link: "./performanceImprovements" },
        { text: "浏览器缓存", link: "./browseCache" },
      ],
      "/notes/src/others": [{ text: "身体系统调优不完全指南", link: "./HumanSystemOptimization" }],
      "/notes/src/css": [{ text: "CSS 中的 BFC", link: "/notes/src/css/bfc" }],
      "/notes/src/javascript": [
        { text: "并发模型和事件循环", link: "./eventLoop" },
        { text: "防抖和节流", link: "./debounceAndThrottle" },
        { text: "JS隐形类型转换", link: "./implicitTypeConversion" },
      ],
      "/notes/src/webpack": [
        { text: "webpack常见的loader", link: "./loader" },
        {
          text: "webpack常见的plugin",
          link: "./plugin",
        },
      ],
      "/notes/src/vueDesign": [
        {
          text: "第四章 响应系统",
          collapsed: false,
          items: [
            { text: "4.3 一个简单的响应式系统", link: "./reactivitySystem" },
            { text: "4.4 分支切换和cleanup", link: "./switchBranchAndCleanup" },
            { text: "4.5 嵌套的 effect", link: "./nestedEffect" },
            { text: "4.6 避免无限递归循环", link: "./avoidInfiniteRecursion" },
            { text: "4.7 调度执行", link: "./scheduler" },
            { text: "4.8 computed和lazy", link: "./computedAndLazy" },
          ],
        },
      ],
    },

    socialLinks: [{ icon: "github", link: "https://github.com/Zhe28" }],
  },
  markdown: {
    config: (md) => {
      md.use(tasklist);
      // .use(excalidraw);
    },
    image: {
      lazyLoading: true,
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
    plugins: [
      pagefindPlugin({
        customSearchQuery: chineseSearchOptimize,
        resultOptimization: false,
      }),
    ],
  },
});
