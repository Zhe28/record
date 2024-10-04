import Theme from "vitepress/theme";
import "./index.less";
import { nextTick, onMounted, watch } from "vue";
import mediumZoom from "medium-zoom/dist/medium-zoom";
import { useRouter } from "vitepress";

const initZoom = () => {
  // 为所有图片增加缩放功能
  mediumZoom(".main img", { background: "var(--vp-c-bg)" });
};

export default {
  ...Theme,
  setup() {
    onMounted(() => {
      initZoom();
    });
    const router = useRouter();
    watch(
      () => router.route.path,
      () => nextTick(() => initZoom()).then(() => {}),
    );
  },
};
