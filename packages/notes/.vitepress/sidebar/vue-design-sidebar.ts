export const vueDesignSidebar = () => {
  const notePackage = "/vue-design";
  const chapter4 = notePackage + "/chapter4";
  const chapter5 = notePackage + "/chapter5";

  return [
    {
      text: "第四章 响应系统",
      collapsed: false,
      items: [
        {
          text: "4.3 一个简单的响应式系统",
          link: `${chapter4}/reactivity-system`,
        },
        {
          text: "4.4 分支切换和cleanup",
          link: `${chapter4}/switch-branch-cleanup`,
        },
        { text: "4.5 嵌套的 effect", link: `${chapter4}/nested-effect` },
        {
          text: "4.6 避免无限递归循环",
          link: `${chapter4}/avoid-infinite-recursion`,
        },
        { text: "4.7 调度执行", link: `${chapter4}/scheduler` },
        { text: "4.8 computed和lazy", link: `${chapter4}/computed-lazy` },
        { text: "4.9 watch 的实现原理", link: `${chapter4}/watch` },
        {
          text: "4.10 立即执行的 watch 函数和回调时机",
          link: `${chapter4}/watch-effect`,
        },
      ],
    },
    {
      text: "第五章 非原始值的相应方案",
      collapsed: false,
      items: [{ text: "5.3 代理 Object", link: `${chapter5}/proxy-object` }],
    },
  ];
};
