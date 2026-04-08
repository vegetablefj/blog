---
title: 测试1
description: 测试1，试试基础功能。什么时候会有测试2呢
keywords: 测试1

date: 2026-04-09T04:29:03+08:00
lastmod: 2026-04-09T04:29:03+08:00

math: true
mermaid: false

cover: /blog/post/2026/04/09/测试/cover.png



categories:
  - 测试
tags:
  - Hugo
  - 功能测试
  - Markdown
---
# 测试1

哇，终于出东西了，普天同庆

测试的内容基本上都是Deepwiki帮我整的。一开始急头白脸地没有搞明白本队哪个是最新的，鼓捣了半天。其实现在也不知道为什么一开始编译不出来测试内容，通过`hugo new`才搞出来。

## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题

都是#有点诡异，不过够用。这Xcode里代码怎么还会跟着markdown语法改变大小……

---  
  
## 文本格式测试  
  
**粗体文本** ，*斜体文本* ， ***粗斜体*** ， ~~删除线~~ ，<u>下划线</u> ， `行内代码`

这Xcode有点太刻晴了

---  

## 列表  
  
- 项目 1  
- 项目 2  
  - 子项目 2.1  
  - 子项目 2.2  
    - hajimi
- 项目 3  
  
这种东西是通过缩进控制的吗？还真是哦，神秘Markdown

---  

## 引用测试  
  
> 这是一段引用文本  
>   
> 可以有多行  

---

## 链接测试  
  
放链接比较方便啊
  
### 内部链接  
  
[关于页面](/blog/about/)  
[归档页面](/blog/archives/)  
[友链页面](/blog/friend/)  
  
### 外部链接  

Deepwiki说没有`render-link.html`来定义外链行为。结果来看有这些外链：
  
#### 直接跳转

<a href="https:gohugo.io/" >Hugo官网</a>

使用了`<a href="https:gohugo.io/" >Hugo官网</a>`

#### 外部打开

<a href="https://github.com/vegetablefj/blog" target="_blank">GitHub</a>

使用了`<a href="https://github.com/vegetablefj/blog" target="_blank">GitHub</a>`。

#### 卡片

这个自动是外部打开，就是体积有点大，要是有选择就好了。或许以后整一个。

{{< externalLinkCard title="GitHub" link="https://github.com/vegetablefj/blog" cover="auto" >}}
  
---  

## 图片测试  
   
  
![GitHub Logo](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png)  

我勒个豆怎么这么大。Markdown语法下好像不让调大小。不过有Hugo指令可以搓

{{< figure src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="描述"  width="300px" height=200px link="https://github.com" target="_blank">}}

这里面可以放：

`src`=图片路径/URL

`alt`=替代文字

`title`=图片下方标题

`caption`=图片说明（支持 Markdown）

`width`=宽度

`height`=高度

`link`=点击图片跳转的链接

`target`=链接打开方式，如 `_blank`

不过自由度没有那么高，实在不行就html硬搓吧

---

## 代码块测试  
  
### 行内代码  
  
在 Hugo 中使用 `hugo server` 命令启动本地服务器。  
  

### 代码块


  
```python  
def fibonacci(n):  
    if n <= 1:  
        return n  
    return fibonacci(n - 1) + fibonacci(n - 2)  
```  
  
---  
  
## 公式测试（KaTeX）  
  
### 行内公式  
  
$E = mc^2$
  
### 行间公式  
  
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}  
$$
  

  
---  
  
## 表格测试  
  
| 对齐方式 | 左对齐 | 居中对齐 | 右对齐 |  
|:---|:---|:---:|---:|  
| 内容 | 文本 | 文本 | 文本 |  
| 长度 | 较短 | 中等中等中等 | 很长很长很长很长很长很长很长很长 |  
  
---  
  
## HTML 标签测试  
  
<span style="color: red;">红色文本</span>   <mark>高亮文本</mark>  
  
---  
  
## 特殊字符测试  
  
&copy; &trade; &amp; &lt; &gt;

终于弄好了，下班
