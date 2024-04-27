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
        {
          text: "提升前端构建工具的性能",
          link: "/notes/src/optimizePerformance/performanceImprovements",
        },
        { text: "浏览器缓存", link: "/notes/src/optimizePerformance/browseCache" },
      ],
      "/notes/src/others": [
        { text: "身体系统调优不完全指南", link: "/notes/src/others/HumanSystemOptimization" },
      ],
      "/notes/src/css": [
        { text: "CSS 中的 BFC", link: "/notes/src/css/bfc" },
        {
          text: "CSS 布局",
          items: [{ text: "Flexbox 布局", link: "/notes/src/css/flexbox" }],
        },
      ],
      "/notes/src/javascript": [
        { text: "并发模型和事件循环", link: "/notes/src/javascript/eventLoop" },
        { text: "防抖和节流", link: "/notes/src/javascript/debounceAndThrottle" },
        { text: "JS隐形类型转换", link: "/notes/src/javascript/implicitTypeConversion" },
        {
          text: "tcp 协议",
          collapsed: false,
          items: [{ text: "websocket", link: "/notes/src/javascript/protocol/websocket" }],
        },
      ],
      "/notes/src/webpack": [
        { text: "webpack常见的loader", link: "/notes/src/webpack/loader" },
        { text: "webpack常见的plugin", link: "/notes/src/webpack/plugin" },
      ],
      "/notes/src/vueDesign": [
        {
          text: "第四章 响应系统",
          collapsed: false,
          items: [
            { text: "4.3 一个简单的响应式系统", link: "/notes/src/vueDesign/reactivitySystem" },
            { text: "4.4 分支切换和cleanup", link: "/notes/src/vueDesign/switchBranchAndCleanup" },
            { text: "4.5 嵌套的 effect", link: "/notes/src/vueDesign/nestedEffect" },
            { text: "4.6 避免无限递归循环", link: "/notes/src/vueDesign/avoidInfiniteRecursion" },
            { text: "4.7 调度执行", link: "/notes/src/vueDesign/scheduler" },
            { text: "4.8 computed和lazy", link: "/notes/src/vueDesign/computedAndLazy" },
            { text: "4.9 watch 的实现原理", link: "/notes/src/vueDesign/watch" },
            {
              text: "4.10 立即执行的 watch 函数和回调时机",
              link: "/notes/src/vueDesign/watchEffect",
            },
          ],
        },
        {
          text: "第五章 非原始值的相应方案",
          collapsed: false,
          items: [{ text: "5.3 代理 Object", link: "/notes/src/vueDesign/proxyObject" }],
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
