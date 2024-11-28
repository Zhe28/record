import { tasklist } from "@mdit/plugin-tasklist";
import { chineseSearchOptimize, pagefindPlugin } from "vitepress-plugin-pagefind";
import { withMermaid } from "vitepress-plugin-mermaid";
import { name as _base } from "../package.json";
import { webSidebar } from "./sidebar/web";
import { othersSidebar } from "./sidebar/others";
import { vueDesignSidebar } from "./sidebar/vue-design-sidebar";
import { linuxSidebar } from "./sidebar/linux-sidebar";
import { processSidebar } from "./sidebar/process";
import { defineConfig } from "vitepress";
import { accumulationSidebar } from "./sidebar/accumulation";

const base = `/${_base}/`;

// https://vitepress.dev/reference/site-config
export default async () =>
  withMermaid({
    base,
    title: "我的笔记",
    lang: "zh-cn",
    description: "记录自己笔记的地方",
    head: [["link", { rel: "icon", href: base + "/learning.svg" }]],
    srcDir: "./src",
    // 开启 clearUrls 功能
    cleanUrls: true,
    lastUpdated: true,
    themeConfig: {
      // outline 中要显示的标题级别
      outline: "deep",
      // 显示外部链接
      externalLinkIcon: true,
      // https://vitepress.dev/reference/default-theme-config
      nav: [{ text: "笔记", link: "/" }],

      sidebar: {
        "/web": webSidebar(),
        "/others": othersSidebar(),
        "/vue-design": vueDesignSidebar(),
        "/linux": linuxSidebar(),
        "/process": processSidebar(),
        "/accumulation": accumulationSidebar(),
      },

      socialLinks: [{ icon: "github", link: "https://github.com/Zhe28" }],
    },
    markdown: {
      config: (md) => {
        md.use(tasklist);
      },
      image: {
        lazyLoading: true,
      },
    },
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
        }),
      ],
    },
    sitemap: {
      hostname: "https://zhe28.github.io/record/",
    },
  });
