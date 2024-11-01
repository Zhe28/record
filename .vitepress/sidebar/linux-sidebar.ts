export const linuxSidebar = () => {
  const notePackage = "/packages/notes/src/linux";

  return [
    {
      text: "fcitx 输入法安装",
      link: `${notePackage}/fcitx5`,
    },
    {
      text: "linux 下的一些错误",
      collapsed: true,
      items: [{ text: "AppImage 命令行打开错误", link: `${notePackage}/error/appImage` }],
    },
  ];
};
