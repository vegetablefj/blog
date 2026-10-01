# vegetablefj's blog

个人博客，使用 [Hugo](https://gohugo.io/) 构建，并采用 [hugo-theme-reimu](https://github.com/D-Sketon/hugo-theme-reimu) 主题。

站点地址：[https://vegetablefj.github.io/blog/](https://vegetablefj.github.io/blog/)

## 本地预览

请安装 Hugo Extended。Reimu 要求 Hugo 0.116.0 或更高版本；本仓库的 GitHub Actions 使用 Hugo Extended 0.128.0。

```bash
hugo server
```

随后访问终端中显示的本地地址即可预览。

## 构建

```bash
hugo --minify
```

生成的网站位于 `public/`。推送到 `main` 分支后，GitHub Actions 会自动构建并部署到 GitHub Pages。

## 目录

- `content/`：文章内容
- `static/`：静态资源
- `config/_default/params.yml`：Reimu 主题配置
- `hugo.yaml`：Hugo 主配置
- `themes/hugo-theme-reimu/`：Reimu 主题文件

## 本项目进行的修改

- 随机文章：用 [`hugo.yaml`](hugo.yaml) 中配置的侧栏模块替换“最新文章”；模块模板为 [`layouts/partials/widget/random_post.html`](layouts/partials/widget/random_post.html)，文字见 [`i18n/zh-CN.yml`](i18n/zh-CN.yml)。点击模块中的“随机读一篇”后，[`content/random.md`](content/random.md) 与 [`layouts/_default/random.html`](layouts/_default/random.html) 会从已发布文章中随机跳转。
- 图片缩略图：[`layouts/partials/media/thumbnail.html`](layouts/partials/media/thumbnail.html) 从文章图片生成较小的 WebP 缩略图，延迟加载，点击后仍可查看原图；[`layouts/shortcodes/photo.html`](layouts/shortcodes/photo.html) 提供文章内调用方式，照片墙也复用这一组件。用法与效果见[《测试2》](content/post/2026/10/01/测试2/index.md)。现有普通图片写法不受影响，只有使用该短代码的图片会生成缩略图。
- 照片墙：[页面](https://vegetablefj.github.io/blog/photo-wall/)从带“摄影”标签的文章正文提取本地图片，保留文章中的顺序；使用 [Masonry](https://masonry.desandro.com/) 排列，首批 32 张，滚动时再加载后续批次。实现位于 `layouts/photo-wall/section.html`、`assets/js/photo-wall.js` 与 `assets/css/photo-wall.css`；构建过程见[《照片墙》](content/post/2026/10/01/照片墙/index.md)。

## 致谢

感谢 [D-Sketon](https://github.com/D-Sketon) 开发并持续维护 Reimu 主题，为这个博客提供了美观而完善的界面与功能。
感谢 [David DeSandro](https://github.com/desandro/masonry) 开发 Masonry，为照片墙提供错落的图片排列；Masonry 使用 MIT 许可证。

- [Hugo](https://gohugo.io/)
- [hugo-theme-reimu](https://github.com/D-Sketon/hugo-theme-reimu)
- [Masonry](https://masonry.desandro.com/)
