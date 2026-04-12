---
title: Schur Multiplier和其它
description: 群(上)同调, Schur乘子, 射影表示和其它

date: 2026-04-12T19:38:07+08:00
lastmod: 2026-04-13

math: true
mermaid: false

cover: /blog/post/2026/04/12/schur/cover.jpg


categories:
  - 笔记
tags:
  - 代数
---
# Schur Multiplier和其它

*封面是荷塘的一只夜师傅和一只苍师傅. 真没想到会有苍师傅*

需要用到一些射影表示的提升相关的问题, 稍微来写一下Schur乘子相关的内容. 可能很基本.

## 设定和定义

假设$G$是一个群, 一般来说我们说它是*torsion*的, 如果每个元素的阶都有限; 我们将所有元素的阶的最小公倍数称为$G$的*exponent*. 一个群$G$是*perfect*的, 如果它等于它的导群$[G,G]$.

### 群(上)同调

简单回顾一下相关的定义. 一个$G$-模无非是一个$\mathbb{Z}[G]$-模. 所有$G$-模连同$G$-等变的态射构成所谓的$G$-模范畴. 对于$G$-模$M$, 考虑余链复形$\{C^n(G,M)\}$, 其中$C^n(G,M)= M^{G^n}\in \mathbf{Ab}$, $d^{n+1}:C^n\to C^{n+1}$, 定义为
$$ 
\begin{align*}
(d^{n+1}\varphi) (g_1, \ldots, g_{n+1}) &= \\
& g_1\varphi(g_2, \dots, g_{n+1}) + \sum_{i=1}^n (-1)^i \varphi \left (g_1,\ldots, g_{i-1}, g_ig_{i+1}, \ldots, g_{n+1} \right ) + (-1)^{n+1}\varphi(g_1,\ldots, g_n). 
\end{align*}
$$
可以验证这的确是一个余链复形, 从而可以定义上同调$H^n(G,M)=\frac{Z^n(G,M)}{B^n(G,M)}=\frac{\mathrm{ker} d^{n+1}}{\mathrm{im} d^n}.$

有自然的同构$H^n(G,M)=\mathrm{Ext}^n_{\mathbb{Z}[G]}(\mathbb{Z},M)$, 其中$\mathbb{Z}$是平凡的$G$-模. 通过取定一个$\mathbb{Z}$的一个自由的$\mathbb{Z}[G]$-消解$F$, 亦可用$\mathrm{Hom}_G(F,M)$的上同调来定义$H^n(G,M)$, 即$H^n(G,M)=H^n(\mathrm{Hom}_G(F,M))$.

群同调可以类似定义. 可以认为$H_n(G,M)=\mathrm{Tor}_n^{\mathbb{Z}[G]}(\mathbb{Z},M)$. 这等同于考虑"取余等变部分"函子(它是右正合的)
$$ 
M \mapsto M/DM, DM:=\{gm-m:g\in G,m\in M\} 
$$
的左导出.

### Tate上同调

不知道会不会用到. 如果$G$是有限的, 定义$N:H_0(G,M)\to H^0(G,M), m\mapsto \sum_{g\in G} gm$. 定义Tate上同调$\widehat{H}^n(G,M)$如下:

$$
\widehat{H}^n(G,M)=\begin{cases}
H^n(G,M), & n\geq 1\\
\mathrm{coker} N, & n=0\\
\mathrm{ker} N, & n=-1\\
H_{-n-1}(G,M). & n\geq -2
\end{cases}
$$

Tate上同调满足传统上我们期待的短正合列给出上同调的长正合列的性质.

### Schur乘子

Schur乘子即同调$H_2(G,\mathbb{Z})$, 通常记作$M(G)$. 下面只考虑$G$有限的情形. 此时$M(G)$是一个有限abel群, 且其指数整除$G$的阶.

## 射影表示和中心扩张

一个群的($n$维)*射影表示*即同态$\rho:G\to \mathrm{PGL}(n,\mathbb{C})$. 对于一个射影表示, 随便取提升得到**映射**$\widetilde{\rho}:G\to \mathrm{GL}(n,\mathbb{C})$. 这不是一个同态, 它会和同态相差一个映射$\alpha:G^2\to \mathbb{C}^\times$, 满足
$$ \widetilde{\rho}(g_1)\widetilde{\rho}(g_2)=\alpha(g_1,g_2)\widetilde{\rho}(g_1 g_2). $$
结合律告诉我们$\alpha(g_1,g_2)\alpha(g_1 g_2,g_3)=\alpha(g_1,g_2 g_3)\alpha(g_2,g_3)$.

如果$\alpha_1,\alpha_2$对应相同的射影表示, 等同于说$\widetilde{\rho}_1(g)=\mu(g)\widetilde{\rho}_2(g)$, $\mu:G\to \mathbb{C}^\times$. 那么
$$\alpha_1(g_1,g_2)=\alpha_2(g_1,g_2)\mu(g_1)\mu(g_2)\mu(g_1 g_2)^{-1}.$$
结合以上两件事, 我们知道$H^2(G,\mathbb{C}^\times)$恰好分类了$G$的射影表示.

通过泛系数定理可以证明$H^2(G,\mathbb{C}^\times)=\mathrm{Hom}_\mathbf{Ab}(M(G),\mathbb{C}^\times )\simeq M(G)$. 后面的同构不是典范的.

### Schur覆盖

有限群$G$的*Schur覆盖*是指一个$M(G)$和$G$的中心扩张$1\to M(G)\to\widehat{G}\to G\to 1$, 使得对应的类在泛系数定理给出的同构

$$H^2(G,H^2(G,\mathbb{Z}))\to \mathrm{Hom}(H^2(G,\mathbb{Z}),H^2(G,\mathbb{Z}))$$
下的像是$\mathrm{id}_{H^2(G,\mathbb{Z})}$.~~有点晦涩了~~

Schur覆盖总是一个*stem扩张* (或许可以翻译为*主干扩张*; 对于$1\to G_1\to G_2\to G_3 \to 1$, 意谓$G_2\subset Z(G_2)\cap [G_2,G_2]$). 所有的Schur覆盖可以由$\mathrm{Hom}_\mathbf{Ab}(G^{ab},M(G))$分类. 那么自然当$G$完美时, Schur覆盖是唯一的. 当$G$完美时, $\widehat{G}$也会是完美的. 一般而言, 所有的Schur覆盖群是*isoclinic* (或许可以翻译为*等倾*)的.

如果$G$完美, 有泛性质(当然此时中心等价于stem)
<!-- https://q.uiver.app/#q=WzAsMTAsWzAsMCwiMSJdLFsxLDAsIk0oRykiXSxbMiwwLCJcXHdpZGVoYXR7R30iXSxbMywwLCJHIl0sWzQsMCwiMSJdLFswLDEsIjEiXSxbMSwxLCJBIl0sWzIsMSwiRSJdLFszLDEsIkciXSxbNCwxLCIxIl0sWzAsMV0sWzEsMl0sWzIsM10sWzMsNF0sWzMsOCwiIiwwLHsibGV2ZWwiOjIsInN0eWxlIjp7ImhlYWQiOnsibmFtZSI6Im5vbmUifX19XSxbMiw3LCJcXGV4aXN0cyAhaCIsMix7InN0eWxlIjp7ImJvZHkiOnsibmFtZSI6ImRhc2hlZCJ9fX1dLFs3LDhdLFs2LDddLFs1LDZdLFs4LDldXQ== -->
<iframe class="quiver-embed" src="https://q.uiver.app/#q=WzAsMTAsWzAsMCwiMSJdLFsxLDAsIk0oRykiXSxbMiwwLCJcXHdpZGVoYXR7R30iXSxbMywwLCJHIl0sWzQsMCwiMSJdLFswLDEsIjEiXSxbMSwxLCJBIl0sWzIsMSwiRSJdLFszLDEsIkciXSxbNCwxLCIxIl0sWzAsMV0sWzEsMl0sWzIsM10sWzMsNF0sWzMsOCwiIiwwLHsibGV2ZWwiOjIsInN0eWxlIjp7ImhlYWQiOnsibmFtZSI6Im5vbmUifX19XSxbMiw3LCJcXGV4aXN0cyAhaCIsMix7InN0eWxlIjp7ImJvZHkiOnsibmFtZSI6ImRhc2hlZCJ9fX1dLFs3LDhdLFs2LDddLFs1LDZdLFs4LDldXQ==&embed" width="707" height="304" style="border-radius: 8px; border: none;"></iframe>

如果$G$不是完美群, 事实上没有很好的泛性质.

## 我们关心的情况

我们比较关心的情况大概是在
<!-- https://q.uiver.app/#q=WzAsMTAsWzAsMCwiMSJdLFsxLDAsIkNfbT1cXGxhbmdsZVxcemV0YV9tIElfblxccmFuZ2xlIl0sWzIsMCwiSCJdLFszLDAsIkciXSxbNCwwLCIxIl0sWzAsMSwiMSJdLFsxLDEsIlxcbWF0aGJie0N9XlxcdGltZXMiXSxbMiwxLCJcXG1hdGhybXtHTH0obixcXG1hdGhiYntDfSkiXSxbMywxLCJcXG1hdGhybXtQR0x9KG4sXFxtYXRoYmJ7Q30pIl0sWzQsMSwiMSJdLFswLDFdLFsxLDJdLFsyLDNdLFszLDRdLFs3LDhdLFs2LDddLFs1LDZdLFs4LDldLFszLDgsIiIsMSx7InN0eWxlIjp7InRhaWwiOnsibmFtZSI6Imhvb2siLCJzaWRlIjoidG9wIn19fV0sWzIsNywiIiwxLHsic3R5bGUiOnsidGFpbCI6eyJuYW1lIjoiaG9vayIsInNpZGUiOiJ0b3AifX19XSxbMSw2LCIiLDEseyJzdHlsZSI6eyJ0YWlsIjp7Im5hbWUiOiJob29rIiwic2lkZSI6InRvcCJ9fX1dXQ== -->
<iframe class="quiver-embed" src="https://q.uiver.app/#q=WzAsMTAsWzAsMCwiMSJdLFsxLDAsIkNfbT1cXGxhbmdsZVxcemV0YV9tIElfblxccmFuZ2xlIl0sWzIsMCwiSCJdLFszLDAsIkciXSxbNCwwLCIxIl0sWzAsMSwiMSJdLFsxLDEsIlxcbWF0aGJie0N9XlxcdGltZXMiXSxbMiwxLCJcXG1hdGhybXtHTH0obixcXG1hdGhiYntDfSkiXSxbMywxLCJcXG1hdGhybXtQR0x9KG4sXFxtYXRoYmJ7Q30pIl0sWzQsMSwiMSJdLFswLDFdLFsxLDJdLFsyLDNdLFszLDRdLFs3LDhdLFs2LDddLFs1LDZdLFs4LDldLFszLDgsIiIsMSx7InN0eWxlIjp7InRhaWwiOnsibmFtZSI6Imhvb2siLCJzaWRlIjoidG9wIn19fV0sWzIsNywiIiwxLHsic3R5bGUiOnsidGFpbCI6eyJuYW1lIjoiaG9vayIsInNpZGUiOiJ0b3AifX19XSxbMSw2LCIiLDEseyJzdHlsZSI6eyJ0YWlsIjp7Im5hbWUiOiJob29rIiwic2lkZSI6InRvcCJ9fX1dXQ==&embed" width="939" height="304" style="border-radius: 8px; border: none;"></iframe>
中, 希望通过$G$的群结构来找到可能的$H$, 从而进一步找到所有的这样的交换图. 不同的情况的难度不同. 第一行的中心扩张本身可以被$H^2(G,C_m)$分类, 这里$C_m$是平凡$G$-模.

- 如果$\mathrm{gcd}(|G^{ab}|,m)=1$, 那么由泛系数定理可以得到$H^2(G,C_m)\simeq \mathrm{Hom}_\mathbf{Ab}(M(G),C_m)$. 同时这样的扩张必然是stem的. 如果$\mathrm{gcd}(|M(G)|,m)=1$也成立, 那么正合列分裂, $G$自然可以提升.
- 如果$\mathrm{gcd}(|G^{ab}|,m)>1$, 事情会复杂许多.

### GAP能做的事

在GAP中, 通过HAP包, 可以用`RelativeSchurMultiplier(G,G)`计算有限群的Schur Multiplier.

我们说一个群$G$是*多循环(polycyclic)*的, 如果有次正规列
$$1=G_0\lhd G_1\lhd \cdots \lhd G_n=G$$
使得$G_i/G_{i-1}$都是循环的. 对于有限群, 多循环等同于可解.

对于有限群`G`, 正整数`n`, 素数`p`, 函数`GroupCohomology(G,n(,p))`和`GroupHomology(G,n(,p))`能够通过挠信息给出$\mathbb{Z}$($\mathbb{Z}/p\mathbb{Z}$)作为平凡`G`-模的上同调和同调.

与此同时, 对于群`G`和其模`M`, `TwoCohomology(G,M)`和`Extensions(G,M(,c))`能够计算对应的$H^2$和所有的(通过余圈`c`)的`G`关于`M`的扩张. 这里略有点诡异: GAP文档的<a href="https://docs.gap-system.org/doc/ref/chap46.html#X877AAB887D4507E3" target="_blank">46.8</a>中说这里要求`G`多循环, 并且"The generators of `M` must correspond to the Pcgs (45.2-1) value of `G`". 运行起来并没有这种问题. ~~不对啊, 这是不是说明该写的都写好了, 我也没什么必要写这个笔记啊?~~

不管了, 先睡觉吧. 至少我们明确知道了, 如果$\mathrm{gcd}(|G^{ab}|,m)=\mathrm{gcd}(|M(G)|,m)=1$, 的确可以推断可提升性. 一般情况, 尤其是有循环的直和分量的时候, 还是老老实实算扩张吧. ~~我记得我老早就知道怎么算扩张啊, 为什么要被更低级的办法蒙蔽双眼呢~~
