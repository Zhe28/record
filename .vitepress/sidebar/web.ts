export const webSidebar = () => {
  const notePackage = "/packages/notes/src/web";
  const optimizePerformance = notePackage + "/optimize-performance";
  const javascript = notePackage + "/javascript";
  const javascriptPatterns = notePackage + "/javascript" + "/patterns";
  const javascriptWebpack = notePackage + "/javascript" + "/webpack";
  const javascriptUtils = notePackage + "/javascript" + "/utils";
  const javascriptProtocol = notePackage + "/javascript" + "/protocol";

  return [
    {
      text: "javascript",
      collapsed: false,
      items: [
        {
          text: "ES6",
          link: `${javascript}/ES6`,
        },
        { text: "并发模型和事件循环", link: `${javascript}/event-loop` },

        { text: "JS隐形类型转换", link: `${javascript}/implicit-type-conversion` },
        {
          text: "提升前端构建工具的性能",
          link: `${optimizePerformance}/performance-improvements`,
        },
        { text: "浏览器缓存", link: `${optimizePerformance}/browse-cache` },
        { text: "减少网页卡顿", link: `${optimizePerformance}/task` },
      ],
    },
    {
      text: "CSS",
      collapsed: true,
      items: [
        { text: "Flexbox 布局", link: `${notePackage}/css/flexbox` },
        { text: "CSS 中的 BFC", link: `${notePackage}/css/bfc` },
        { text: "内联布局和块状布局", link: `${notePackage}/css/block-inline` },
        { text: "选择器", link: `${notePackage}/css/selector` },
      ],
    },
    {
      text: "设计模式",
      collapsed: true,
      items: [{ text: "单例模式", link: `${javascriptPatterns}/singleton-pattern` }],
    },
    {
      text: "Webpack",
      collapsed: true,
      items: [
        { text: "webpack常见的loader", link: `${javascriptWebpack}/loader` },
        { text: "webpack常见的plugin", link: `${javascriptWebpack}/plugin` },
      ],
    },
    {
      text: "utils",
      collapsed: true,
      items: [
        { text: "常用工具库", link: `${javascriptUtils}/utils` },
        {
          text: "防抖和节流",
          link: `${javascriptUtils}/debounce-throttle`,
        },
      ],
    },
    {
      text: "网络协议",
      collapsed: true,
      items: [{ text: "websocket", link: `${javascriptProtocol}/websocket` }],
    },
  ];
};
