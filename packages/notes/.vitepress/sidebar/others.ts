import { DefaultTheme } from "vitepress";

export const othersSidebar = (): DefaultTheme.SidebarItem[] => {
  const notePackage = "/others";

  return [
    { text: "身体系统调优不完全指南", link: `${notePackage}/human-system-optimization` },
    { text: "git fetch 和 git pull 区别", link: `${notePackage}/git-fetch-Pull` },
  ];
};
