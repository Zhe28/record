import MarkdownIt from "markdown-it";
import mermaid from "mermaid"; //
/**
 * 初始化 mermaid 配置
 */
function initMermaid() {
  mermaid.initialize({
    startOnLoad: true,
    theme: "default",
    securityLevel: "loose",
    // 更多配置项...
  });

  return mermaid;
}

/**
 * Markdown-it mermaid 插件, 用来解析 mermaid 语法
 * @param md {MarkdownIt} markdown-it
 */
export function mermaidPlugin(md: MarkdownIt) {
  const fence = md.renderer.rules.fence;
  const text = md.renderer.rules.code_block;

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    // 检查是否为 mermaid 代码块
    if (tokens[idx].info === "mermaid") {
      const content = tokens[idx].content;

      // 为 mermaid 代码块添加 class
      tokens[idx].attrSet("class", "mermaid");
      return text!(tokens, idx, options, env, self);
    }

    return fence!(tokens, idx, options, env, self);
  };
}
