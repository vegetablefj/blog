---
title: 照片墙
description: 从摄影文章整理照片，分批加载的照片墙
date: 2026-10-01T02:47:30-04:00
cover: /blog/post/2026/09/30/近日照片/18.jpg
categories:
  - 测试
tags:
  - Hugo
  - 功能测试
---

# 照片墙

*本文完全由以 GPT 为主的 AI 生成；博主提出需求并提供图片。*

[照片墙](/blog/photo-wall/)是一个独立页面，用来集中浏览博客文章中的照片。它保留网站通用的头图和标题，正文区域只放图片，不显示右侧栏。入口是右侧栏的“照片墙”卡片，链接文字为“让我看看”。下面按实现顺序记录页面的构建过程。

## 建立页面和入口

先建立 `content/photo-wall/_index.md`，再用 `layouts/photo-wall/section.html` 定义页面主体。页面使用独立的 CSS 和 JavaScript，不需要修改普通文章的排版。右侧栏入口由 `layouts/partials/widget/photo_wall.html` 提供，配置在 `hugo.yaml` 中。

## 确定照片来源

照片不维护单独的文件名列表。构建时，Hugo 找出带“摄影”标签的文章，按文章日期从新到旧排列，再依次读取每篇文章正文中实际使用的图片。这样，照片墙会随文章更新，同时保留图片在正文中的顺序。处理入口在 `layouts/photo-wall/section.html`：

```go-html-template
{{ $tagPage := site.GetPage "/tags/摄影" }}
{{ range $post := $tagPage.Pages.ByDate.Reverse }}
  {{ range findRE `(?is)<img\b[^>]*>` (string $post.Content) }}
    {{/* 读取图片地址，并核对该文章的 Page Resources */}}
  {{ end }}
{{ end }}
```

模板只收录能对应到文章自身图片资源的链接，并在同一篇文章内去重。外链、只作为封面使用的图片，以及放在文件夹中但没有进入正文的图片都不会出现。对使用 `photo` 短代码的文章，缩略图上的 `data-photo-wall-src` 保留原图地址，供照片墙识别。

## 生成缩略图

照片墙复用《[测试2](/blog/post/2026/10/01/测试2/)》用过的 `layouts/partials/media/thumbnail.html`。`layouts/partials/photo-wall/item.html` 为每张照片生成卡片，并让共用组件把较大的原图处理成宽度不超过 720 像素的 WebP 缩略图。页面先加载缩略图；点击图片时，仍可通过灯箱查看原图。原图文件不需要复制到照片墙目录。

## 安排图片

图片排列使用 [Masonry](https://masonry.desandro.com/)。宽屏显示四列，视口变窄时依次调整为三列、两列或单列。首排设置不同的起始偏移，并增加少量随机偏差；照片本身仍按文章和正文顺序加入，不做随机排序。初始化代码位于 `assets/js/photo-wall.js`：

```js
wall = new Masonry(element, {
  itemSelector: '.photo-wall-item',
  columnWidth: '.photo-wall-sizer',
  gutter: 10,
  horizontalOrder: true,
  percentPosition: true,
  transitionDuration: 0
});
```

图片加载后会重新计算布局，避免图片高度确定前留下空白。如果 Masonry 没有加载，CSS 会改用普通网格显示照片。

## 分批加载

页面首次只输出 32 张照片。Hugo 在构建时把其余卡片按每批 32 张写成静态 HTML 片段，并把片段地址放在页面中。浏览器滚动接近底部时，`IntersectionObserver` 触发下一批请求；收到片段后，JavaScript 将卡片插入页面，再调用 Masonry 的 `appended` 更新排列。主要代码分别在 `layouts/photo-wall/section.html` 和 `assets/js/photo-wall.js`：

```go-html-template
{{ $fragment := resources.FromString (printf "photo-wall/batch-%02d-%s.html" $batchNumber (md5 $chunk)) $chunk }}
{{ $batchURLs = $batchURLs | append $fragment.RelPermalink }}
```

```js
var response = await fetch(batchURLs[nextBatch], { credentials: 'same-origin' });
// 将返回片段中的卡片加入 element
if (wall) wall.appended(added);
```

如果浏览器不支持 `IntersectionObserver`，或者某批请求失败，页面会显示“加载更多照片”按钮。图片本身也设置了浏览器的懒加载。

## 当前结果

目前带“摄影”标签的五篇文章共收录 222 张照片：首批 32 张，其余分成六批。本地生成的缩略图合计约 8.36 MB，首批约 1.65 MB；这些数字会随文章更新。第一次处理所有图片的构建约花了 90 秒，缓存后的再次构建约 2 秒。原图没有复制进照片墙。

样式主要位于 `assets/css/photo-wall.css`。感谢 [David DeSandro](https://github.com/desandro) 开发的开源 Masonry。
