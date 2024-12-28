import { DefaultTheme } from "vitepress";

export const webSidebar = (): DefaultTheme.SidebarItem[] => {
  const web = "/web";
  const protocol = web + "/protocol";
  const optimizePerformance = web + "/enhance-performance";
  const javascript = web + "/javascript";
  const javascriptPatterns = web + "/javascript" + "/patterns";
  const javascriptWebpack = web + "/javascript" + "/webpack";
  const javascriptUtils = web + "/javascript" + "/utils";

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
        { text: "Input 事件", link: `${javascript}/input-event` },
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
        { text: "隐藏元素的三种方式", link: `${web}/css/css-visibility` },
      ],
    },
    {
      text: "设计模式",
      collapsed: true,
      items: [
        { text: "单例模式", link: `${javascriptPatterns}/singleton-pattern` },
        { text: "观察者模式", link: `${javascriptPatterns}/observer-pattern` },
        { text: "工厂模式", link: `${javascriptPatterns}/factory-pattern` },
        { text: "装饰器模式", link: `${javascriptPatterns}/decorator-pattern` },
        { text: "模块模式", link: `${javascriptPatterns}/module-pattern` },
      ],
    },
    {
      text: "Web 性能优化",
      collapsed: true,
      items: [
        { text: "Web 缓存", link: `${optimizePerformance}/browse-cache` },
        { text: "减少网页卡顿", link: `${optimizePerformance}/task` },
      ],
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
  ];
};
