---
title: 在线听歌
date: 2026-08-23 14:00:00
comment: true
---

解析网易云/QQ音乐平台链接，支持 VIP 歌曲。

<div class="music-app">
  <div class="music-parse-bar">
    <input id="music-input" class="music-input" type="text" autocomplete="off" spellcheck="false"
           placeholder="粘贴网易云/QQ音乐 歌曲或歌单链接，或网易云个人主页链接">
    <button id="music-submit" class="music-submit" type="button">解析</button>
  </div>
  <p id="music-status" class="music-status"></p>
  <div id="music-cards" class="music-cards"></div>
</div>
<div id="music-toast" class="music-toast" hidden></div>

<link rel="stylesheet" href="app.css">
<script src="app.js"></script>