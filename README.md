# Folder Notes 中文版

这是一个基于原项目 [LostPaul/obsidian-folder-notes](https://github.com/LostPaul/obsidian-folder-notes) 的中文发布版 Fork，仓库地址为 [tkhs101/folder-notes-zh](https://github.com/tkhs101/folder-notes-zh)。

它为 Obsidian 提供“文件夹笔记”能力，让你可以像 Notion 一样给文件夹绑定笔记，并直接点击文件夹名称打开对应笔记。

## 当前状态

- 主插件界面已完成中文化，包括设置页、菜单、弹窗和通知
- 已整理为可独立发布的仓库结构，不再依赖 Git 子模块
- 已包含可直接发布的构建产物：`main.js`、`manifest.json`、`styles.css`

## 安装方式

### 方式 1：手动安装

将以下文件复制到你的 Obsidian 插件目录 `Vault/.obsidian/plugins/folder-notes-zh/`：

- `main.js`
- `manifest.json`
- `styles.css`

### 方式 2：通过 BRAT 安装

如果你使用 [BRAT](https://obsidian.md/plugins?id=obsidian42-brat)，可以直接添加这个仓库：

`https://github.com/tkhs101/folder-notes-zh`

## 发布方式

创建一个符合语义化版本的 Git tag，例如：

```bash
git tag 1.8.20
git push origin 1.8.20
```

仓库中的 GitHub Actions 会自动构建并创建 release，上传：

- `main.js`
- `manifest.json`
- `styles.css`

## 致谢

原始项目作者为 [Lost Paul](https://github.com/LostPaul)。本仓库在原项目基础上进行了中文化和发布整理。
