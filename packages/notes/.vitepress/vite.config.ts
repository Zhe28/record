import { DefaultTheme, UserConfig } from "vitepress";
import { chineseSearchOptimize, pagefindPlugin } from "vitepress-plugin-pagefind";

const _UserConfig: UserConfig<DefaultTheme.Config> = {
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
};

export const viteConfig = _UserConfig.vite;
