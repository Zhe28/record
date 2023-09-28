import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "AnyDocs",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      {
        text: "Docs",
        items: [
          {
            text: "css",
            link: "/CSS/selector.html",
          },
          {
            text: "js",
            link: "/JavaScript/ES6",
          },
        ],
      },
    ],

    sidebar: {
      "/CSS/": [
        {
          text: "CSS",
          items: [
            { text: "选择器", link: "/CSS/selector" },
            { text: "块级和内联盒子", link: "/CSS/block-and-inline" },
          ],
        },
      ],
      JavaScript: [
        {
          text: "JavaScript",
          items: [
            {
              text: "ES6增加内容",
              link: "/JavaScript/ES6",
            },
            {
              text: "正则表达式",
              link: `/JavaScript/regular-expressions`,
            },
          ],
        },
      ],
    },

    socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress" }],
  },
});
