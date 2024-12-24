import Theme from "vitepress/theme";
import "./index.less";
import "./tailwindcss.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { nextTick, onMounted, watch } from "vue";
import mediumZoom from "medium-zoom/dist/medium-zoom";
import { useRouter } from "vitepress";
import mermaid from "mermaid";
import Log from "../../src/web/javascript/patterns/code/Log.vue";

const initZoom = () => {
  // 为所有图片增加缩放功能
  mediumZoom(".main img", { background: "var(--vp-c-bg)" });
};

const initMermaid = async () => {
  // 初始化 mermaid 配置
  mermaid.initialize({
    startOnLoad: false,
    theme: "base",
    securityLevel: "loose",
  });
};

function render() {
  // 查找并渲染所有 mermaid 图表
  const elements = document.querySelectorAll(".mermaid");
  elements.forEach((element, index) => {
    renderMermaid(element, index);
  });
}
/**
 *  渲染 mermaid 图表
 * @param element {HTMLElement} 需要渲染的元素
 * @returns {void}
 */
async function renderMermaid(element: Element, index: number) {
  // 检查是否为 mermaid 代码块，之后再检查里面第一个元素是不是 code 标签
  // code 标签下面是不是文本节点，如果里面是文本节点，就开始渲染，如果不是或者是正在处理的mermaid元素，就跳过
  if (element.getAttribute("data-processed")) return;
  if (!element.classList.contains("mermaid")) return;

  const codeChild = element.firstChild as HTMLElement;
  if (codeChild.tagName !== "CODE") return;

  const mermaidCodeChild = codeChild.firstChild;
  if (!mermaidCodeChild || mermaidCodeChild.nodeType !== Node.TEXT_NODE) return;

  //  检查完成， 开始渲染 mermaid 图表
  try {
    const content = mermaidCodeChild.textContent || "";
    const { svg } = await mermaid.render(`mermaid-${index}`, content);
    element.innerHTML = svg;
  } catch (error) {
    console.error("Mermaid 渲染失败:", error);
    element.innerHTML = `<pre>${element.textContent}</pre>`;
  }
}

export default {
  ...Theme,
  enhanceApp({ app }) {
    app.component("Log", Log);
  },
  async setup() {
    const router = useRouter();

    // 初始化 mermaid
    initMermaid();

    // 挂载之后进行的操作
    onMounted(async () => {
      // 初始化图片缩放
      initZoom();

      // 监听 body 子元素节点的变化， body 变化之后重新初始化 mermaid
      // 解决了 当变更元素文档时， mermaid 图表不重新渲染的问题
      const observer = new MutationObserver(debounce(render, 200));
      observer.observe(document.body, {
        subtree: true,
        childList: true,
      });
    });

    // 监听路由变化
    watch(
      () => router.route.path,
      async () => {
        await nextTick();
        initZoom();
      },
    );
  },
};

/**
 * 防抖函数
 * @param cb {Function} 回调函数
 * @param delay {number} 延迟时间
 * @returns {Function} 返回一个新的函数，这个函数会防抖
 */
function debounce(cb: Function, delay: number) {
  let timer: NodeJS.Timeout | null = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    timer = setTimeout(() => {
      cb();
      timer = null;
    }, delay);
  };
}
