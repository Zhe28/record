## Webpack 中常见的 loader

webpack 默认仅支持 `js` `json` 资源，其他资源需要进行转换

常见的 loader

- file-loader:把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件
- url-loader:和 fle-loader 类似，但是能在文件很小的情况下以 base64 的方式把文件内容注入到代码中去
- source-map-loader:加载额外的 Source Map 文件，以方便断点调试
- image-loader:加载并且压缩图片文件
- babel-loader:把 ES6 转换成 ES5
- css-loader:加载 CSS，支持模块化、压缩、文件导入等特性
- style-loader:把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS
- eslint-loader:通过 ESLint 检查 JavaScript 代码

Loader 分为三个部分 代码类 、样式类 、静态资源类

JS 相关的 loader

- ES6 : babel-loader
- ts : ts-loader
- eslint : eslint-loader

CSS 相关的 loader

- css : style-loader、css-loader
- sass、less : post-css-loader

静态资源相关的 loader

- 静态文件 : file-loader 、image-loader、url-loader
