---
title: {{ replace .Name "-" " " | title }}
description: {{ .Name }}
keywords: {{replace .Name "-" ","}}

date: {{ .Date }}
lastmod: {{ .Date }}

math: true
mermaid: false

cover: /blog/post/{{ dateFormat "2006/01/02" .Date }}/{{ replaceRE "-" " " .Name | title }}/cover.png



categories:
  -
tags:
  -
  -
---
# {{ replace .Name "-" " " | title }}
<!-- write your content here-->
