import { defineUserConfig } from "vuepress";
import { defaultTheme } from "@vuepress/theme-default";
import { viteBundler } from "@vuepress/bundler-vite";

export default defineUserConfig({
  lang: "zh-CN",
  title: "my site",
  bundler: viteBundler(),
  theme: defaultTheme({
    navbar: [
      {
        text: "Home",
        link: "/",
      },
    ],
  }),
});
