---
title: 关于
description: 关于

date: 2025-10-24
lastmod: 2026-11-19



---

# 关于

## 本站的建设

- 2025年2-3月，vegetable_fj兴致勃勃地考虑部署一个个人博客。那时vegetable_fj连git都没用过，在自己头铁试了一些方案但是都跑不通后，伟大的**日奈**先生出现了
- vegetable_fj在Hugo页面上苦苦寻找，相中了Reimu主题
- 2025年3月5日（应该？左右？），经过日奈的努力，他成功地帮助vegetable_fj初步部署了博客，并发布了[博客启动](/blog/post/2025/03/05/博客启动/) 
- 但是由于vegetable_fj的极度愚蠢和懒惰，很长一段时间，他都没有学习如何上传文章，也几乎没有更新友链之外的任何内容
- 2026年4月9日深夜，vegetable_fj兴致大发，借助Deepwiki学会了如何上传文章。当天他更新了大量内容
- 2026年10月，本站新增[照片墙](/blog/photo-wall/)：汇集带“摄影”标签的文章图片，用 [Masonry](https://masonry.desandro.com/) 排列，往下翻时再分批加载
- 2026年10月，既有摄影文章改用缩略图显示，点击仍可看原图；构建流程加入图片缓存，并延长首次大量处理图片时的模板超时
- 2026年10月，增加不依赖第三方服务的站内搜索，沿用 Reimu 的搜索弹窗
- 2026年11月，整合了看板娘的随机换人、换装、点击互动与台词配置，并统一了不同模型的显示位置
- 以 GPT 为主的 AI 参与了本站部分文章、代码与文档的编写
- 未完待续……

## 站内搜索

点击页面右上角的放大镜，可以搜索本站已发布的文章。搜索范围包括标题、简介、标签、分类、正文和文章网址路径，不包括图片本身的内容。它按文字片段匹配，不区分英文字母大小写；用空格分开的几个词必须都出现在同一篇文章里，但不必相邻，也可以分散在不同位置。

结果优先排列标题命中的文章，连续出现完整搜索词组也会加分；同分时较新的文章靠前。搜索不会自动纠正错别字或联想同义词。

## 看板娘

桌面页面侧边的 Live2D 看板娘首次打开会随机选择一个角色，之后恢复上次成功加载的角色。可以随机换人、换装，也可以点击角色互动。各角色支持的动作和造型取决于模型。

静置时，角色专属台词与公共台词按 2∶1 抽取；点击角色时只从专属台词中抽取。首次加载和收起后召回也有相应的文字提示。离开标签页至少 5 分钟后回来、且看板娘仍展开时，才显示返回提示，短暂切换不会打招呼。后台暂停闲聊，模型语音保持关闭。

台词由本站整理，角色与模型的来源见下方致谢。



## 在这里你能看到
- （真能看到吗？）
- vegetable_fj整理的贫瘠的充满错误的讲义、笔记
- vegetable_fj的神秘文学创作
- vegetable_fj推荐的实用工具和神奇妙妙网站
- vegetable_fj的不知道什么时候更新的碎碎念
- vegetable_fj的动画片/漫画/Galgame/小说/音乐/本子/插画/书籍e.t.c.推荐
- vegetable_fj的旅行/阅读/观看/游玩笔记
- vegatable_fj和AI对话的神秘记录
- e.t.c.

## 在这里你不能看到
- vegetable_fj发表的四大文章（说不定呢www）
- Riemann猜想/Hodge猜想/Jacobian猜想的正确证明
- vegetable_fj交npy了的消息（呃……）
- e.t.c.

## 关于vegetable_fj

- 我觉得你和not_a_goalkeeper是咱们班上最帅的两个。——行人

- 神球频出啊！——刘国正，于观看vegetable_fj打乒乓球时

- 你是变态、变态萝莉，我要头槌你  ——Yuni

- 饱饱，你是一只可爱的哈基米 ——天尘

- 区 ——七日不下楼先生

- 可爱香草 ——香丁


## 特别鸣谢
- 感谢日奈老师对本站最初建设的无私帮助，和对vegetable_fj光滑的大脑的无条件的包容
- 感谢Brkhu先生对本站持续建设的无私帮助
- 感谢 Hugo 项目提供建站工具，也感谢 D-Sketon 开发并持续维护 Reimu 主题。<a href="https://gohugo.io/" target="_blank" rel="noopener noreferrer">Hugo</a> · <a href="https://github.com/D-Sketon/hugo-theme-reimu" target="_blank" rel="noopener noreferrer">Reimu</a>
- 感谢 David DeSandro 开发 Masonry，为本站照片墙提供错落的图片排列。<a href="https://masonry.desandro.com/" target="_blank" rel="noopener noreferrer">Masonry</a>
- 参见[vegetable_fj的本科论文致谢](/blog/post/2025/05/22/acknow/)  

### 看板娘模型与组件

感谢 stevenjoezhang 维护本站使用的网页看板娘组件。 <a href="https://github.com/stevenjoezhang/live2d-widget" target="_blank" rel="noopener noreferrer">Live2D Widgets</a>

- **Pio** 出自 Sinsiroad 的《Potion Maker》，模型文件来自 FGHRSH 的 Live2D API。<a href="https://www.live2d.com/en/business/interview/potionmaker/" target="_blank" rel="noopener noreferrer">原作访谈</a> · <a href="https://github.com/fghrsh/live2d_api/tree/master/model/Potion-Maker/Pio" target="_blank" rel="noopener noreferrer">模型来源</a>
- **桃濑日和** 是 Live2D Inc. 发布的 Cubism 样例，角色由插画师 Kani Biimu 创作。<a href="https://www.live2d.com/en/learn/sample/momose-hiyori/" target="_blank" rel="noopener noreferrer">官方样例</a> · <a href="https://www.live2d.com/eula/live2d-free-material-license-agreement_en.html" target="_blank" rel="noopener noreferrer">使用许可</a> · <a href="https://www.live2d.com/learn/sample/model-terms/" target="_blank" rel="noopener noreferrer">样例使用条件</a>
- **亚托莉（ATRI）** 出自《ATRI -My Dear Moments-》，本站使用的 Live2D 模型由远梦清思制作并分享。<a href="https://atri-mdm.com/en/" target="_blank" rel="noopener noreferrer">作品官网</a> · <a href="https://www.bilibili.com/video/BV1Rs4y187rJ/" target="_blank" rel="noopener noreferrer">模型发布</a>
- **波奇酱 2.0** 的 Live2D 模型由一只摸摸怪制作并配布。<a href="https://www.bilibili.com/video/BV1L14y1w7EL/" target="_blank" rel="noopener noreferrer">原版与使用说明</a> · <a href="https://www.bilibili.com/video/BV1PY411k7Kj/" target="_blank" rel="noopener noreferrer">2.0 更新</a>
- **MyGO!!!!!** 五位成员使用 panxuc 整理的网页模型。该项目使用了 Bestdori 提供的《梦想协奏曲！少女乐团派对！》游戏数据。<a href="https://github.com/panxuc/live2d-widget-mygo/blob/2ee129159f5e75e376adfa997ae1b7de52d677d6/README.md" target="_blank" rel="noopener noreferrer">模型项目及来源说明</a>
- **若叶睦、丰川祥子** 的模型文件来自暴躁的火龙果上传的 Live2DViewerEX 工坊包。<a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3828726062" target="_blank" rel="noopener noreferrer">若叶睦</a> · <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=3828741892" target="_blank" rel="noopener noreferrer">丰川祥子</a>
- **丛雨** 出自柚子社的《千恋＊万花》，本站使用的 Live2D 模型与动作由穿越电线制作并发布。<a href="https://www.yuzu-soft.com/products/senren/chara.html" target="_blank" rel="noopener noreferrer">原作角色页</a> · <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=2674825159" target="_blank" rel="noopener noreferrer">工坊模型</a>
- **朋友的酒** 使用两份来自 B 站的动图。「邦友的酒」的原作者暂不可考，本站做了手动抠图。<a href="https://www.bilibili.com/opus/1254283338426875906" target="_blank" rel="noopener noreferrer">邦友的酒（动态）</a> · <a href="https://www.bilibili.com/video/BV12hHr6UEqc/" target="_blank" rel="noopener noreferrer">舟友的酒（视频）</a>
- **遥、夜鹭** 的动图由博主提供，原始出处待补。

模型与原作内容的权利归各自权利人，使用条件以来源页面和随附说明为准。桃濑日和使用的是株式会社 Live2D 的样例数据（©Live2D Inc.）；本站内容由博主独立制作，未经 Live2D 官方监修。
