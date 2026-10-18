# 溯月馆

> 探索科幻文学的边界。

溯月馆是 [瞳观幻域](https://github.com/tghyscifi) 的个人博客，分享原创科幻、技术实践、作品评论与日常思考。本仓库存放网站的内容、主题与构建配置。

[在线阅读](https://tghyscifi.github.io/) · [博文订阅](https://tghyscifi.github.io/atom.xml) · [动态订阅](https://tghyscifi.github.io/essay/atom.xml) · [Android APP](https://tghyscifi.github.io/releases/)

## 访问方式

### 直接访问

在浏览器中打开 **[溯月馆](https://tghyscifi.github.io/)** 即可阅读。

可以通过 [归档](https://tghyscifi.github.io/archives/)、[分类](https://tghyscifi.github.io/categories/) 和 [标签](https://tghyscifi.github.io/tags/) 查找文章，也可以使用站内搜索。

### RSS 订阅

将以下地址添加到支持 Atom 的 RSS 阅读器，即可订阅更新：

| 订阅内容 | 订阅地址 |
| --- | --- |
| 博文：科幻创作、技术文章与评论 | [https://tghyscifi.github.io/atom.xml](https://tghyscifi.github.io/atom.xml) |
| 动态：日常随想与短更新 | [https://tghyscifi.github.io/essay/atom.xml](https://tghyscifi.github.io/essay/atom.xml) |

两个订阅源分别收录博文和动态；希望同时关注两者时，请分别添加。

### 下载溯月馆 APP

**溯月馆 APP 仅支持安卓（Android）。** 可在手机上访问博客、登录评论，并使用收藏与分享功能。

- **[APP 下载页](https://tghyscifi.github.io/releases/)**：查看版本信息与更新日志，下载 APK。
- **[GitHub Releases](https://github.com/tghyscifi/tghyscifi.github.io/releases)**：获取发布版本；下载页未能加载版本信息时，也可从这里下载。

## 网站主要内容

本站主要分享以下内容：

- **技术学习与科研心得**：记录技术学习、工具实践和科研工作中的经验与思考。
- **科学幻想文学创作**：分享原创科幻作品，尝试以唯物史观为基础的现实主义写作，探索科学幻想与严肃文学的表达边界。
- **日常随想**：在 [动态页](https://tghyscifi.github.io/essay/) 记录生活片段、短篇思考与创作近况。

关于网站与作者的更多介绍，见 [关于本站](https://tghyscifi.github.io/posts/about/)。

## 技术栈

| 项目 | 用途 | 官方网站 / 文档 | 公开仓库 |
| --- | --- | --- | --- |
| Hexo | 静态博客框架，生成文章与页面 | [官网](https://hexo.io/zh-cn/) | [hexojs/hexo](https://github.com/hexojs/hexo) |
| Meow | 博客主题与页面布局 | [主题文档](https://meow.jumaoo.top/) | [chanwj/hexo-theme-meow](https://github.com/chanwj/hexo-theme-meow) |
| GitHub Pages / GitHub Actions | 网站托管、自动构建与部署 | [Pages 文档](https://docs.github.com/zh/pages) · [Actions 文档](https://docs.github.com/zh/actions) | [Actions 执行器](https://github.com/actions/runner) |
| Waline | 评论、留言与互动 | [官网](https://waline.js.org/) | [walinejs/waline](https://github.com/walinejs/waline) |
| Render / Neon | 云服务托管与 PostgreSQL 数据库 | [Render](https://render.com/) · [Neon](https://neon.com/) | [Neon 数据库引擎](https://github.com/neondatabase/neon) |
| HexoHub | 本地博客管理，提供配置、预览与 Git 操作界面 | [项目文档](https://github.com/forever218/HexoHub#readme) | [forever218/HexoHub](https://github.com/forever218/HexoHub) |

建站过程中还使用了 Claude Code（[官网](https://claude.com/product/claude-code) · [仓库](https://github.com/anthropics/claude-code)）与 DeepSeek（[官网](https://www.deepseek.com/) · [开源项目](https://github.com/deepseek-ai)）辅助开发。

### 项目结构

```text
.
├── .github/workflows/pages.yml  # GitHub Pages 构建与部署
├── scripts/                    # APP 版本信息、动态订阅等生成脚本
├── source/
│   ├── _posts/                 # 博文与小说正文
│   ├── _data/essay.yml          # 日常动态
│   └── releases/               # APP 下载页
├── themes/meow/                # Meow 主题与定制代码
├── _config.yml                 # Hexo 配置
├── _config.meow.yml            # 主题配置
└── package.json                # 依赖与 npm 命令
```

### 本地预览

先准备 [Node.js](https://nodejs.org/) 和 npm（自动构建工作流使用 Node.js 26.3.1），然后在包含 `package.json` 的博客根目录执行：

```bash
npm ci
npm run build
npm run preview
```

`npm ci` 会按锁文件安装项目依赖，包括 Hexo 和构建工具，无需另行安装 Hexo 或全局安装 `hexo-cli`。

打开 [中文界面](http://localhost:4000/) 或 [英文界面](http://localhost:4000/en/) 预览。`npm run build` 分别构建两种界面并合并到 `public/`；`npm run preview` 提供本地静态预览。修改后重新构建，再刷新页面。

英文版当前翻译标题与控件，博文、小说和动态正文仍为中文；订阅入口继续使用中文 RSS，不生成英文 RSS。中文内容的实时开发预览仍可使用 `npm run server`。

### 英文界面的维护与验证

- 通用控件词典位于 `themes/meow/languages/en.yml` 和 `zh-CN.yml`，沿用 Hexo 的多语言机制。
- 博文标题、分类标签显示名和英文主题配置位于 `locales/en.yml`；原始中文内容保持单份维护。
- 构建后执行 `npm run check:i18n`，验证标题对应、正文保留、语言切换和 RSS 范围。
- 分阶段计划与回退方法见 [英文界面实施计划](docs/english-ui-plan.md)。
