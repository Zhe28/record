import { DefaultTheme } from "vitepress";

export const accumulationSidebar = (): DefaultTheme.SidebarItem[] => {
  const notePackage = "/packages/notes/src/accumulation/";

  return [
    {
      text: "登录Token",
      link: `${notePackage}/token`,
    },
    {
      text: "权限控制",
      link: `${notePackage}/view-permission`,
    },
    {
      text: "阿里云OSS",
      link: `${notePackage}/ali-oss`,
    },
  ];
};
