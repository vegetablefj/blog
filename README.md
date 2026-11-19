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

- 随机文章：用 [`hugo.yaml`](hugo.yaml) 中配置的侧栏模块替换“最新文章”；模块模板为 [`layouts/partials/widget/random_post.html`](layouts/partials/widget/random_post.html)，文字见 [`i18n/zh-CN.yml`](i18n/zh-CN.yml)。点击模块中的“试试手气”后，[`content/random.md`](content/random.md) 与 [`layouts/_default/random.html`](layouts/_default/random.html) 会从已发布文章中随机跳转。
- 图片缩略图与署名：[`photo`](layouts/shortcodes/photo.html) 调用[缩略图组件](layouts/partials/media/thumbnail.html)生成 WebP 缩略图并延迟加载，点击查看原图，照片墙也复用这一组件。`photo` 和 `image-credit` 可标注作者、来源和许可。示例见[《测试2》](content/post/2026/10/01/测试2/index.md)和[《鸵鸟属》](content/post/2026/07/03/何意味/index.md)。
- 缩略图构建缓存：[部署工作流](.github/workflows/deploy.yaml) 在 GitHub Actions 构建前恢复、构建后保存 `resources/_gen/images`，让未变化的图片复用已生成的缩略图。首次处理大量图片可能超过 Hugo 默认的模板超时，因此在 [`hugo.yaml`](hugo.yaml) 中将超时设为 5 分钟。缓存和超时调整都不压缩原图，也不减小最终部署包。
- 照片墙：[页面](https://vegetablefj.github.io/blog/photo-wall/)从带“摄影”标签的文章正文提取本地图片，保留文章中的顺序；使用 [Masonry](https://masonry.desandro.com/) 排列，首批 32 张，滚动时再加载后续批次。实现位于 `layouts/photo-wall/section.html`、`assets/js/photo-wall.js` 与 `assets/css/photo-wall.css`；构建过程见[《照片墙》](content/post/2026/10/01/照片墙/index.md)。
- 本地站内搜索：[`layouts/index.search.json`](layouts/index.search.json) 在构建时生成已发布文章的纯文字索引；[`assets/js/local_search.js`](assets/js/local_search.js) 和 [`assets/js/local_search_core.js`](assets/js/local_search_core.js) 在首次输入关键词时加载索引并完成匹配与排序。复用 Reimu 的搜索弹窗，不依赖 Algolia；开关及每页结果数见 [`config/_default/params.yml`](config/_default/params.yml)。可搜索标题、简介、标签、分类、正文与公开网址路径，不搜索图片内容；具体规则见[关于页面](content/about.md#站内搜索)。
- 标题链接：[`render-heading.html`](layouts/_default/_markup/render-heading.html) 统一处理标题文字与锚点，可直接使用 `## [前言](/blog/post/2026/02/10/鸟前言/)`。链接沿用同级标题的字体、字号和颜色，悬停或键盘聚焦时突出显示；样式通过[主题配置](config/_default/params.yml)的 `injector.head_end` 注入。
- Live2D 看板娘：首次打开随机选一个角色，之后恢复上次成功加载的角色。看板娘支持随机换人、随机换装和点击互动。静置时按 2∶1 抽取角色专属台词与公共台词，点击角色时只抽取专属台词。模型动作保持静音。离开标签页满 5 分钟后返回，且看板娘仍展开时，会显示返回提示。

在博主提出需求并提供素材的基础上，以 GPT 为主的 AI 参与了本站部分文章、代码与文档的编写。

### 看板娘的维护

角色名单、介绍和稳定 ID 见 [`static/live2d/models.json`](static/live2d/models.json)，三组条目须保持对应。使用不同模型文件或纹理的换装列表在这里或 [`outfits.json`](static/live2d/outfits.json) 中配置，使用模型参数切换的造型则见 [`cubism-candidates.js`](static/live2d/cubism-candidates.js)。新增角色应保留文件名大小写，并使用相对路径或公开地址。

台词、抽取比例和按钮提示集中在 [`dialogue.js`](static/live2d/dialogue.js)，取词逻辑在 [`dialogue-picker.js`](static/live2d/dialogue-picker.js)。Pio 的部分日常台词仍从固定版本的上游模板中选取。裁剪位置见 [`portrait.css`](static/live2d/portrait.css) 与 [`portrait.js`](static/live2d/portrait.js)，模型互动见 [`classic-interactions.js`](static/live2d/classic-interactions.js) 和 [`cubism-candidates.js`](static/live2d/cubism-candidates.js)。

修改挂件行为时维护生成脚本和运行时适配，再运行 `node scripts/update-live2d-widget.mjs` 生成入口。运行 `hugo server` 后可打开 `/blog/live2d/dialogue-inspector.html` 查看台词。[生成脚本](scripts/update-live2d-widget.mjs) · [场景逻辑](scripts/patch-live2d-scenes.mjs) · [模型运行时](static/live2d/model-runtime.js)

## 致谢

感谢 [D-Sketon](https://github.com/D-Sketon) 开发并持续维护 Reimu 主题，为这个博客提供了美观而完善的界面与功能。
感谢 [David DeSandro](https://github.com/desandro/masonry) 开发 Masonry，为照片墙提供错落的图片排列；Masonry 使用 MIT 许可证。

- [Hugo](https://gohugo.io/)
- [hugo-theme-reimu](https://github.com/D-Sketon/hugo-theme-reimu)
- [Masonry](https://masonry.desandro.com/)

### 看板娘模型与组件

感谢 stevenjoezhang 维护本站使用的网页看板娘组件。<a href="https://github.com/stevenjoezhang/live2d-widget" target="_blank" rel="noopener noreferrer">Live2D Widgets</a>

- **Pio** 出自 Sinsiroad 的《Potion Maker》，模型文件来自 FGHRSH 的 Live2D API。<a href="https://www.live2d.com/en/business/interview/potionmaker/" target="_blank" rel="noopener noreferrer">原作访谈</a> · <a href="https://github.com/fghrsh/live2d_api/tree/master/model/Potion-Maker/Pio" target="_blank" rel="noopener noreferrer">模型来源</a>
- **桃濑日和** 是 Live2D Inc. 发布的 Cubism 样例，角色由插画师 Kani Biimu 创作。<a href="https://www.live2d.com/en/learn/sample/momose-hiyori/" target="_blank" rel="noopener noreferrer">官方样例</a> · <a href="https://www.live2d.com/eula/live2d-free-material-license-agreement_en.html" target="_blank" rel="noopener noreferrer">使用许可</a> · <a href="https://www.live2d.com/learn/sample/model-terms/" target="_blank" rel="noopener noreferrer">样例使用条件</a>
- **亚托莉（ATRI）** 出自《ATRI -My Dear Moments-》，本站使用的 Live2D 模型由远梦清思制作并分享。<a href="https://atri-mdm.com/en/" target="_blank" rel="noopener noreferrer">作品官网</a> · <a href="https://www.bilibili.com/video/BV1Rs4y187rJ/" target="_blank" rel="noopener noreferrer">模型发布</a>
- **波奇酱 2.0** 的 Live2D 模型由一只摸摸怪制作并配布。<a href="https://www.bilibili.com/video/BV1L14y1w7EL/" target="_blank" rel="noopener noreferrer">原版与使用说明</a> · <a href="https://www.bilibili.com/video/BV1PY411k7Kj/" target="_blank" rel="noopener noreferrer">2.0 更新</a>
- **MyGO!!!!!** 五位成员使用 panxuc 整理的网页模型。该项目使用了 Bestdori 提供的《梦想协奏曲！少女乐团派对！》游戏数据。<a href="https://github.com/panxuc/live2d-widget-mygo/blob/2ee129159f5e75e376adfa997ae1b7de52d677d6/README.md" target="_blank" rel="noopener noreferrer">模型项目及来源说明</a>
- **若叶睦、丰川祥子** 的模型文件来自暴躁的火龙果上传的 Live2DViewerEX 工坊包。<a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3828726062" target="_blank" rel="noopener noreferrer">若叶睦</a> · <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3828741892" target="_blank" rel="noopener noreferrer">丰川祥子</a>
- **丛雨** 出自柚子社的《千恋＊万花》，本站使用的 Live2D 模型与动作由穿越电线制作并发布。<a href="https://www.yuzu-soft.com/products/senren/chara.html" target="_blank" rel="noopener noreferrer">原作角色页</a> · <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=2674825159" target="_blank" rel="noopener noreferrer">工坊模型</a>

模型、贴图及原作内容的权利归各自权利人，使用条件以来源页面和随附说明为准，不随挂件代码统一授权。桃濑日和使用的是株式会社 Live2D 的样例数据（©Live2D Inc.）；本站内容由博主独立制作，未经 Live2D 官方监修。
