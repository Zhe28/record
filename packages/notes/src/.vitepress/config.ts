import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "notes",
  description: "记录自己日常的笔记内容",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "然叔", link: "/ranshu/loader" },
      { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: {
      "/ranshu": [
        {
          text: "webpack常见的loader",
          link: "/ranshu/loader",
        },
        {
          text: "webpack常见的plugin",
          link: "/ranshu/plugin",
        },
      ],
    },

    socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress" }],
  },
});
