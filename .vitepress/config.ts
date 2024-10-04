import { tasklist } from "@mdit/plugin-tasklist";
import { chineseSearchOptimize, pagefindPlugin } from "vitepress-plugin-pagefind";
import { withMermaid } from "vitepress-plugin-mermaid";
import { name as _base } from "../package.json";
import { webSidebar } from "./sidebar/web";
import { othersSidebar } from "./sidebar/others";
import { vueDesignSidebar } from "./sidebar/vue-design-sidebar";
import { linuxSidebar } from "./sidebar/linux-sidebar";
import { processSidebar } from "./sidebar/process";

const base = `/${_base}/`;

// https://vitepress.dev/reference/site-config
export default async () =>
  withMermaid({
    base,
    title: "我的笔记",
    lang: "zh-cn",
    description: "记录自己笔记的地方",
    head: [["link", { rel: "icon", href: base + "/learning.svg" }]],
    rewrites: {
      // "packages/notes/src/index.md": `/`,
      "packages/notes/src/:page": ":page",
    },
    // 开启 clearUrls 功能，将 /notes/src/index.html 重写为 /notes/src/index
    cleanUrls: true,
    lastUpdated: true,
    themeConfig: {
      // outline 中要显示的标题级别
      outline: "deep",
      // 显示外部链接
      externalLinkIcon: true,
      // https://vitepress.dev/reference/default-theme-config
      nav: [
        { text: "笔记", link: "/" },
        // { text: "文档（入口未开放）", link: "" },
      ],

      sidebar: {
        "packages/notes/src/web": webSidebar(),
        "/packages/notes/src/others": othersSidebar(),
        "/packages/notes/src/vue-design": vueDesignSidebar(),
        "/packages/notes/src/linux": linuxSidebar(),
        "/packages/notes/src/process": processSidebar(),
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
          // resultOptimization: false,
        }),
      ],
    },
    sitemap: {
      hostname: "https://zhe28.github.io/record/",
    },
  });
