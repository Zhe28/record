## 一、知识梳理

Webpack 插件的作用是扩展和定制 Webpack 在打包过程中的某些步骤。插件可以在一些关键点上被触发，比如在编译过程开始前、结束后或者在某个特定的时刻。通过注册一个或多个插件，我们可以将自己的逻辑融入到 Webpack 的构建流程中，实现一些额外的功能。

```JavaScript
//plugins/MyPlugin.js
module.exports = class MyPlugin {
    constructor(options) {
        console.log("MyPlugin constructor", options);
        this.options = options;
    }
    apply(compiler) {
        console.log('MyPlugin apply...',)

        // 注册编译完成的钩子
        compiler.hooks.done.tap("MyPlugin", (compilation) => {
            console.log("compilation done");
        });

        // 注册异步完成的钩子
        compiler.hooks.run.tapAsync("MyPlugin", (compilation, callback) => {
            setTimeout(() => {
                console.log("compilation run");
                callback()
            }, 1000)
        });

        // 注册Promise钩子
        compiler.hooks.emit.tapPromise("MyPlugin", (compilation) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log("compilation emit");
                    resolve();
                }, 1000)
            });
        });


        compiler.hooks.compilation.tap('HelloCompilationPlugin', (compilation) => {
            console.log('🚄 compilation')
            // Now we can tap into various hooks available through compilation
            compilation.hooks.optimize.tap('HelloCompilationPlugin', () => {
                console.log('🚗 Assets are being optimized.');
            });
        });
    }
}

```

## 二、回答范例 - 列举题找维度

1. 打包优化：
   - 全局
     1. CleanWebpackPlugin：用于在每次构建前清理输出目录中的文件。
     2. CompressionWebpackPlugin：用于对打包后的资源文件进行 gzip 压缩。
   - HTML
     1. HtmlWebpackPlugin：用于生成 HTML 文件，并将打包后的资源文件自动引入。
   - CSS
     1. MiniCssExtractPlugin：用于将 CSS 提取为单独的文件。
   - Javascript
     1. DefinePlugin：用于定义环境变量。
     2. UglifyJsPlugin：用于压缩 JavaScript 代码。
   - 图片静态资源
     1. CopyWebpackPlugin：用于将静态文件直接复制到输出目录中。
2. 调试分析：
   1. webpack-bundle-analyzer：用于分析并可视化打包后的模块大小和依赖关系。
   2. FriendlyErrorsWebpackPlugin：用于友好地展示 Webpack 构建错误信息。
   3. HotModuleReplacementPlugin：用于实现热模块替换功能。

## 三、思路点拨

- 考察点：
  - 确认是否具备 webpack 配置的基本能力
- 表达技巧： 按照一个维度描述内容
  - 空间
  - 时间
