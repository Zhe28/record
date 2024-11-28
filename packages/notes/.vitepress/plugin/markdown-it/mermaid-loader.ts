// import MarkdownIt, { type StateCore } from "markdown-it";
// import mermaid from "mermaid";
//
// let fence
// export function markdownItMermaid(markdownIt: MarkdownIt) {
//   mermaid.initialize({ startOnLoad: false });
//   fence = markdownIt.renderer.rules.fence;
//   markdownIt.core.ruler.push("mermaid", mermaidRuler);
//   // markdownIt.renderer.rules.fence = _mermaidRuler
// }
//
// async function mermaidRuler(state: StateCore) {
//   for (const token of state.tokens) {
//     console.log(token);
//     const index = state.tokens.indexOf(token);
//     if (token.type === "fence" && token.info === "mermaid") {
//
//       console.log(token);
//       token.tag = "pre";
//       token.type = "html_inline";
//       token.attrSet("class", "mermaid");
//       console.log(token);
//     }
//   }
// }
//
// const _mermaidRuler = (tokens, idx, options, env, self) => {
//   const token = tokens[idx];
//   console.log(token);
//   if (tokens[idx].info === "mermaid") {
//     token.tag = "pre";
//     token.type = "text";
//     token.attrSet("class", "mermaid");
//   }
//
//   return fence(tokens, idx, options, env, self);
// };
//
// // const resolveMermaidFence = (token, idx, options, env, renderer) => {
// //   if (token[idx].info === "mermaid") {
// //     console.log(token[idx]);
// //   }
// //   return token[idx];
// // };
