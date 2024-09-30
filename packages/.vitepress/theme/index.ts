import Theme from "vitepress/theme";
import "./index.less";
import { watch } from "vue";
import "@fancyapps/ui/dist/fancybox/fancybox.css"
import { Fancybox } from "@fancyapps/ui";

export default {
  ...Theme,
  enhanceApp({ app, router, siteData }) {
    // 添加图片缩放功能
    Fancybox.bind("img")

    watch(router.route, () => {
      if (router.route.path === "/record/") {
        router.go("/record/notes/src/");
      } else if (router.route.path === "/") {
        router.go("/notes/src/");
      }
    });
  },
};
