---
title: test
date: 2026-08-05 11:45:14
tags:
  - test
excerpt: "用于测试博客功能"
---

<!--
Fiction 作品信息卡
-->
{% fmeta %}
type: 测试post
fandom: 
relationship: 
character: 
rating: -1
warning: 仅用于测试
status: Y
{% endfmeta %}

<!--
Music Player 音乐播放器
-->
{% music [playerId] [type] %}
server: netease
type: playlist
id: "8197566341"
{% endmusic %}

<!--
Note信息框
style: pink/yellow/blue/green/purple/light（默认）
-->
{% note green %}
这是一篇测试博文。
{% endnote %}

<!--
Fold 折叠块
title必填
style: pink/yellow/blue/green/purple/light（默认）
status: 默认折叠，open自动展开
-->
{% fold '折叠块 功能测试' blue [status] %}
这是一条测试信息。
{% endfold %}

<!--
Button 按钮
-->
{% button %}
- name: 测试按钮
  url: https://tghyscifi.github.io/2026/08/05/test/
  desc: 指向测试博文的链接
  icon: /assets/images/favicon.ico
- name: Hexo
  url: https://hexo.io/zh-cn/
  desc: Hexo 官方网站
  icon: https://hexo.io/icon/favicon-196x196.png
- name: Meow 标签插件
  url: https://meow.jumaoo.top/posts/4c886562/
  desc: 主题模板官方文档
  icon: https://meow.jumaoo.top/assets/images/favicon.ico
{% endbutton %}

<!--
Title 标题
-->
{% title '测试标题' %}

<!--
Chatbox 对话框
-->
{% chat 测试神秘小功能 %}
author:
  Tghy: /assets/images/author.png
  Kiwiizzz: https://whoiskiwiizzz.github.io/imgs/me.jpg
chat:
  - time: 20:26
  - from: Tghy
    content: 叮咚鸡叮咚鸡
    image:
    right: Y
  - time: 20:35
  - from: Kiwiizzz
    content: 大狗大狗叫叫叫
    image: 
    right: 
{% endchat %}

<!--
Mask Text 遮罩文本
type: 0（默认）/1/2
style: pink/yellow/blue/green/purple/theme (主题颜色)/default (默认，灰色)
-->
这是一段{% mask '测试文本' 0 default %}。

<!--
Inline Text 行内文本
-->
这是{% text '一' pink %}{% text '段' yellow 2 %}{% text '测' blue 3 %}{% text '试' green 4 %}{% text '文' purple 5 %}{% text '本' theme 6 %}。