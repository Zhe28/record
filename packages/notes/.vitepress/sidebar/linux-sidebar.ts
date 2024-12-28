import { DefaultTheme } from "vitepress";

export const linuxSidebar = (): DefaultTheme.SidebarItem[] => {
  const notePackage = "/linux";

  return [
    {
      text: "软件安装过程",
      collapsed: false,
      items: [
        { text: "gitea runner 安装", link: `${notePackage}/installation-process/gitea-runner` },
        { text: "fcitx5 安装", link: `${notePackage}/installation-process/fcitx5` },
      ],
    },
    {
      text: "linux 下的一些错误",
      collapsed: true,
      items: [{ text: "AppImage 命令行打开错误", link: `${notePackage}/error/appImage` }],
    },
  ];
};
