<h1 align="center">Welcome to record 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/record" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/record.svg">
  </a>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> 这是我的个人知识库，使用 VitePress 构建。主要记录我在编程和技术学习过程中的笔记、心得和实践经验。

### 🏠 [Homepage](https://github.com/Zhe28) ✨ [Demo](https://zhe28.github.io/record/)

## 项目结构

```
.
├── packages/
│   ├── notes/           # VitePress 文档项目
│   └── server/          # 后端服务
└── public/             # 静态资源
```

## 主要内容

- Web 开发
  - JavaScript 设计模式
  - CSS 技巧和最佳实践
  - 前端框架学习笔记
- Linux 相关
  - 常用命令
  - 系统配置
  - 开发环境搭建
- 后端服务
  - API 设计与实现
  - 数据库管理
  - 身份验证和授权
  - 性能优化和监控
- 其他技术笔记

## 开发指南

### 环境准备

1. Node.js 版本要求：>= 16.0.0
2. 包管理器：推荐使用 pnpm

### 本地开发

1. 克隆仓库：

   ```bash
   git clone git@github.com:Zhe28/record.git
   ```

2. 安装依赖：

   ```bash
   cd record/packages/notes
   pnpm install
   ```

3. 启动开发服务器：
   ```bash
   pnpm dev
   ```

### 文档编写规范

1. 文档组织

   - 按照主题分类组织文档
   - 使用适当的文件夹层级
   - 文件名使用小写字母，单词间用连字符（-）连接

2. Markdown 规范

   - 使用 ATX 风格的标题（# 号）
   - 代码块需指定语言
   - 适当使用 VitePress 的内置组件和 Markdown 扩展功能

3. 示例代码
   - 代码文件放在相应文档同级的 `code` 目录下
   - 使用 TypeScript 编写示例代码
   - 添加必要的注释说明

## 贡献指南

感谢您对本项目感兴趣！这份指南将帮助您了解如何为项目做出贡献。

### 问题反馈

如果您发现任何问题或有改进建议，请：

1. 在 GitHub 上提交 Issue
2. 描述问题或建议
3. 如果是 bug，请提供复现步骤和环境信息

### 许可证

本项目使用 MIT 许可证。提交代码即表示您同意在此许可证下发布您的贡献。

## Author

👤 **haroz**

- Github: [@Zhe28](https://github.com/Zhe28)

---
