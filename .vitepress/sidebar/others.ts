export const othersSidebar = () => {
  const notePackage = "/packages/notes/src";

  return [
    { text: "身体系统调优不完全指南", link: `${notePackage}/others/human-system-optimization` },
    { text: "git fetch 和 git pull 区别", link: `${notePackage}/others/git-fetch-Pull` },
  ];
};
