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

## 致谢

感谢 [D-Sketon](https://github.com/D-Sketon) 开发并持续维护 Reimu 主题，为这个博客提供了美观而完善的界面与功能。

- [Hugo](https://gohugo.io/)
- [hugo-theme-reimu](https://github.com/D-Sketon/hugo-theme-reimu)
