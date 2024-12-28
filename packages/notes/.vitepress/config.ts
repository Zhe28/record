import { name as _base } from "../package.json";
import { webSidebar } from "./sidebar/web";
import { othersSidebar } from "./sidebar/others";
import { vueDesignSidebar } from "./sidebar/vue-design-sidebar";
import { linuxSidebar } from "./sidebar/linux-sidebar";
import { processSidebar } from "./sidebar/process";
import { defineConfig } from "vitepress";
import { accumulationSidebar } from "./sidebar/accumulation";
import { viteConfig } from "./vite.config";
import { markdownItConfig } from "./markdown-it-config";

const base = `/${_base}/`;

// https://vitepress.dev/reference/site-config
export default async () =>
  defineConfig({
    base,
    title: "我的笔记",
    lang: "zh-cn",
    description: "记录自己笔记的地方",
    head: [["link", { rel: "icon", href: base + "learning.svg" }]],
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
      nav: [
        // { text: "笔记", link: "/" },
        { text: "Web 前端", link: "/web/javascript/ES6" },
        { text: "Vue设计与实现", link: "/vue-design/chapter4/reactivity-system" },
        { text: "Linux", link: "/linux/installation-process/gitea-runner" },
        { text: "杂谈", link: "/others/human-system-optimization" },
        { text: "积累", link: "/accumulation/token" },
      ],

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
    markdown: markdownItConfig,
    vite: viteConfig,
    sitemap: {
      hostname: "https://zhe28.github.io/record/",
    },
  });
