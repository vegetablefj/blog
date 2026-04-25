---
title: n-循环的Molien级数
description: 不那么有趣地求个和
keywords: molien

date: 2026-04-24T07:44:23+08:00
lastmod: 2026-04-26

math: true
mermaid: false

cover: /blog/post/2026/04/24/molien/cover.png



categories:
  - 数学小品
tags:
  - 代数
---

## Molien公式

Molien公式告诉我们, 对于有限群$G$和其在域$k$上的表示$(V,\rho:G\to \mathrm{GL}(V))$, 使得$\mathrm{char}(k)\nmid  |G|$, 考虑分次环$R=k[V]=\bigoplus_{d=0}^\infty \mathrm{Sym}^d (V^*)$, 则其在$G$的作用下的不变子环的Hilbert级数
$$\sum_{d=0}^\infty \dim(R_d^G) t^d=\frac{1}{|G|} \sum_{g\in G} \frac{1}{\det(1-tg|_{V^*})}. $$

## 单个循环

考虑$C_n=\langle \sigma=(1\; 2\; \cdots\; n)\rangle < S_n $, 通过置换自然作用在$V=\mathbb{C}^n$上. 注意到在$V^*$上(这里无异于在$V$上), $\sigma^k$的特征值恰为所有的$\frac{n}{\gcd(n,k)}$次单位根, 每个出现$\gcd(n,k)$次. 于是
$$\det(1-t\sigma^k|_{V^*})=\left(1-t^{\frac{n}{\gcd(n,k)}}\right)^{\gcd(n,k)}.$$ 

从而
$$\begin{align*}
\sum_{d=0}^\infty \dim(R_d^{C_n}) t^d&=\frac{1}{n} \sum_{k=0}^{n-1} \left(1-t^{\frac{n}{\gcd(n,k)}}\right)^{-\gcd(n,k)}\\
&=\frac{1}{n} \sum_{m|n} \varphi(m)(1-t^m)^{-\frac{n}{m}}\\
&=\frac{1}{n} \sum_{m|n} \varphi(m)\sum_{l=0}^\infty \binom{\frac{n}{m}+l-1}{l} t^{ml},
\end{align*}$$
这等同于
$$ \dim(R_d^{C_n})=\frac{1}{n}\sum_{m|n,m|d}\varphi(m) \binom{\frac{n}{m}+\frac{d}{m}-1}{\frac{d}{m}}.$$

## 另一个不变子环

我们下面考察环
$$\left( \mathbb{C}[x_1,\ldots,x_n]\left/\left(\prod_{i=1}^n x_i -1,x_1^d-1,\ldots,x_n^d-1\right)\right.\right)^{S_n}.$$

它的维数等于集合
$$\left\{(z_1,\ldots,z_n)\in \mathbb{C}^n:\prod_{i=1}^n z_i=z_1^d=\cdots=z_n^d=1\right\}$$
在$S_n$作用下轨道的数量, 进而等于满足$\sum_i a_i=0$的可重集$\{a_1,\ldots,a_n\}\subset \mathbb{Z}/d\mathbb{Z}$的数量.

假设$a_i$中有$n_j$个是$j$, 那么$\sum_j n_j=n,\sum_j j n_j=0$. 令$\zeta=e^\frac{2\pi i}{d}$, 注意到$\mathbf{1}_{\{d|N\}}=\frac{1}{d}\sum_{k=0}^{d-1} \zeta^{Nk}$, 于是所求的维数等于
$$\begin{align*}
\sum_{\sum_j n_j=n} \mathbf{1}_{\{d|\sum_j j n_j\}}&= \frac{1}{d}\sum_{k=0}^{d-1} \sum_{\sum_j n_j=n}  \zeta^{k(\sum_j j n_j)}\\
&=\frac{1}{d}\sum_{k=0}^{d-1} \mathrm{const}_n \left(\prod_{j=0}^{d-1}\frac{1}{1-\zeta^{kj}t}\right)\\
&=\frac{1}{d}\sum_{k=0}^{d-1} \mathrm{const}_n \left(\left(1-t^{\frac{d}{\gcd(d,k)}}\right)^{-\gcd(d,k)}\right),
\end{align*}$$
其中$\mathrm{const}_n(-)$表示提取$t$的$n$次项系数. 经过与前面相同的计算, 我们得到所求的维数即为
$$\frac{1}{d} \sum_{m|n,m|d}\varphi(m) \binom{\frac{n}{m}+\frac{d}{m}-1}{\frac{n}{m}}.$$

这里的记号处理并不太好. 在交换$n$和$d$之后我们能够发现结果是一样的. 

这件事情可以被自然地实现，参见Brkhu先生的评论。

## 后者的由来

后面这个对象有一些神秘的由来。
