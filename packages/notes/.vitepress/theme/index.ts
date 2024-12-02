import Theme from "vitepress/theme";
import "./index.less";
import { nextTick, onMounted, watch } from "vue";
import mediumZoom from "medium-zoom/dist/medium-zoom";
import { useRouter } from "vitepress";
import mermaid from "mermaid";

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

  // 查找并渲染所有 mermaid 图表
  const elements = document.querySelectorAll(".mermaid");
  elements.forEach(async (element, index) => {
    if (element.getAttribute("data-processed")) return;
    try {
      const content = element.textContent || "";
      const { svg } = await mermaid.render(`mermaid-${index}`, content);
      element.innerHTML = svg;
    } catch (error) {
      console.error("Mermaid 渲染失败:", error);
      element.innerHTML = `<pre>${element.textContent}</pre>`;
    }
  });
};

export default {
  ...Theme,
  setup() {
    onMounted(async () => {
      initZoom();
      initMermaid();
    });

    const router = useRouter();
    watch(
      () => router.route.path,
      async () => {
        await nextTick();
        initZoom();
        initMermaid();
      },
    );
  },
};
