import { tasklist } from "@mdit/plugin-tasklist";
import { DefaultTheme, UserConfig } from "vitepress";
import { mermaidPlugin } from "./plugin/markdown-it/mermaid-loader";

const _UserConfig: UserConfig<DefaultTheme.Config> = {
  markdown: {
    config: (md) => {
      // markdown-it tasklist插件
      md.use(tasklist);
      md.use(mermaidPlugin);
    },
    image: {
      lazyLoading: true,
    },
  },
};
export const markdownItConfig = _UserConfig.markdown;
