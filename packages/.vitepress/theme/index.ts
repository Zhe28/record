import Theme from "vitepress/theme";
import "./index.less";
import { watch } from "vue";

export default {
  ...Theme,
  enhanceApp({ app, router, siteData }) {
    watch(router.route, () => {
      if (router.route.path === "/record/") {
        router.go("/record/notes/src/");
      }
    });
  },
};
