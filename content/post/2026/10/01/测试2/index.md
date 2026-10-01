---
title: 测试2
description: 略缩图实现, 由GPT-6 Sol完成
date: 2026-10-01T00:00:00-04:00
cover: /blog/post/2026/09/30/近日照片/1.jpg
categories:
  - 测试
tags:
  - Hugo
  - 功能测试
---

# 测试2

以下两张照片直接引用《近日照片》中的原图。页面显示经 Hugo 生成的较小 WebP 图片；点击照片可查看原始 JPG。照片仍按普通文章的方式纵向排列。

{{< photo page="/post/2026/09/30/近日照片" src="1.jpg" alt="近日照片中的第一张照片" width="500" >}}

{{< photo page="/post/2026/09/30/近日照片" src="60.jpg" alt="近日照片中的第六十张照片" width="500" >}}

## 本次功能修改

本次修改由 GPT-6 Sol 完成：导航栏新增“随机文章”，每次点击会从已发布文章中随机选取一篇；新增可复用的图片缩略图组件，文章先加载较小的 WebP 图片，点击后打开原始 JPG。将来独立的照片墙也可以调用同一个组件。

代码主要涉及 `config/_default/params.yml`、`i18n/zh-CN.yml`、`content/random.md`、`layouts/_default/random.html`，以及 `layouts/partials/media/thumbnail.html` 和 `layouts/shortcodes/photo.html`。这篇测试文章直接使用《近日照片》的两张原图，没有另存一份。

验证结果：Hugo 为两张 4608×3456 的 JPG 生成了两张 960×720 的 WebP 缩略图，合计约 61 KB；原图合计约 12.8 MB。本文现已公开发布，也会进入随机文章的候选列表。
