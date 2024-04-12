// import exportToSvg from "@excalidraw/utils";
//
// export function excalidraw(md, options) {
//   const fence = md.renderer.rules.fence;
//   md.renderer.rules.fence = (tokens, idx, options, env, self) => {
//     // 检查是否为 excalidraw 代码块
//     if (tokens[idx].info === "excalidraw") {
//       const content = tokens[idx].content;
//       const svg = exportToSvg(content);
//       svg.then((value: string) => {
//         // 修改代码块的样式
//         tokens[idx].tag = "div";
//         tokens[idx].content = value;
//       });
//     }
//     return fence!(tokens, idx, options, env, self);
//   };
// }
