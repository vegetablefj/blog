---
title: 测试2
description: 缩略图与随机文章功能测试，由GPT-6 Sol完成
date: 2026-10-01T00:00:00-04:00
cover: /blog/post/2026/09/30/近日照片/1.jpg
categories:
  - 测试
tags:
  - Hugo
  - 功能测试
---

# 测试2

*本文完全由以 GPT 为主的 AI 生成；博主提出需求并提供图片。*

以下两张照片直接引用《近日照片》中的原图。页面显示经 Hugo 生成的较小 WebP 图片；点击照片可查看原始 JPG。照片仍按普通文章的方式纵向排列。

{{< photo page="/post/2026/09/30/近日照片" src="1.jpg" alt="近日照片中的第一张照片" width="500" >}}

{{< photo page="/post/2026/09/30/近日照片" src="60.jpg" alt="近日照片中的第六十张照片" width="500" >}}

## 本次功能修改

本次修改由 GPT-6 Sol 完成：最初在导航栏新增“随机文章”，每次点击会从已发布文章中随机选取一篇；新增可复用的图片缩略图组件，文章先加载较小的 WebP 图片，点击后打开原始 JPG。后来的独立照片墙也复用了同一个组件。

代码主要涉及 `config/_default/params.yml`、`i18n/zh-CN.yml`、`content/random.md`、`layouts/_default/random.html`，以及 `layouts/partials/media/thumbnail.html` 和 `layouts/shortcodes/photo.html`。这篇测试文章直接使用《近日照片》的两张原图，没有另存一份。

验证结果：Hugo 为两张 4608×3456 的 JPG 生成了两张 960×720 的 WebP 缩略图，合计约 61 KB；原图合计约 12.8 MB。本文现已公开发布，也会进入随机文章的候选列表。

### 随机文章入口调整

发布后发现“随机文章”同时出现在顶部导航和右侧菜单，显得重复。这次把它从导航菜单中移除，用一个与原“最新文章”相同结构的右侧栏模块替换“最新文章”。模块中的“试试手气”仍通往原来的随机跳转页；随机选取文章的逻辑没有改变。

相关修改位于 `config/_default/params.yml`、`hugo.yaml`、`i18n/zh-CN.yml` 和 `layouts/partials/widget/random_post.html`。原有的 `content/random.md` 与 `layouts/_default/random.html` 继续负责随机跳转。

### 摄影文章与构建缓存

后来，五篇带“摄影”标签的旧文章共 222 处图片引用也改用了 `photo`：文章先显示缩略图，点击仍可查看原始照片；原有的 300px、500px 显示宽度不变。照片墙原本就能收录这些图片，这次改动主要让文章本身不必直接加载大图。

部署流程现在会在每次构建前恢复 Hugo 已生成的图片缓存，并在构建后保存，供下次复用。首次生成或新增图片仍需处理；首次批量处理时曾触发 Hugo 的 30 秒模板超时，因此在 `hugo.yaml` 中将超时提高到 5 分钟。缓存不会压缩原图、缩小部署包，也不能修复模板错误。相关配置在 `.github/workflows/deploy.yaml` 和 `hugo.yaml`。
