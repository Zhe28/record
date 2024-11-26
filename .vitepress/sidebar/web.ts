export const webSidebar = () => {
  const web = "/packages/notes/src/web";
  const protocol = web + "/protocol";
  const optimizePerformance = web + "/optimize-performance";
  const javascript = web + "/javascript";
  const javascriptPatterns = web + "/javascript" + "/patterns";
  const javascriptWebpack = web + "/javascript" + "/webpack";
  const javascriptUtils = web + "/javascript" + "/utils";
  const javascriptAccumulation = web + "/javascript" + "/accumulation";

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
        { text: "事件代理/事件委托", link: `${javascript}/event-delegation` },
      ],
    },
    {
      text: "CSS",
      collapsed: true,
      items: [
        { text: "Flexbox 布局", link: `${web}/css/flexbox` },
        { text: "CSS 中的 BFC", link: `${web}/css/bfc` },
        { text: "内联布局和块状布局", link: `${web}/css/block-inline` },
        { text: "选择器", link: `${web}/css/selector` },
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
      items: [{ text: "websocket", link: `${protocol}/websocket` }],
    },
    {
      text: "用户登录",
      collapsed: true,
      items: [
        {
          text: "Token 认证",
          link: `${javascriptAccumulation}/token`,
        },
      ],
    },
    {
      text: "按钮级权限控制",
      collapsed: true,
      items: [
        {
          text: "Vue 组件按钮级权限控制",
          link: `${javascriptAccumulation}/view-permission`,
        },
      ],
    },
  ];
};
