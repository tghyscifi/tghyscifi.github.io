/* ============================================================
 * 点歌台 /music/ 页面脚本（纯前端，无后端）
 * 歌/歌单链接 → Meting API(qijieya) → 卡片播放器
 * 网易云个人主页 → Worker(netease-user) → 歌单列表 → 逐张卡片
 * ============================================================ */
(function () {
  'use strict';

  // —— 配置 ——
  var API = 'https://api.qijieya.cn/meting/';
  var NETEASE_USER_PROXY = 'https://netease-user.tghyscifi.workers.dev/';
  var MAX_HOME_PLAYLISTS = 20;   // 主页一次最多解析的歌单数
  var DIRECT_FETCH_MS = 10000;   // qijieya 请求超时
  var HOME_FETCH_MS = 25000;     // Worker 主页请求超时（含冷启动）
  var ACCENT = '#FFB347';        // APlayer 主题色

  var PLATFORM = { netease: '网易云音乐', tencent: 'QQ 音乐' };

  // —— 链接识别：只放行网易云/QQ 的 song/playlist，外加网易云个人主页 ——
  var HOME_RE = /music\.163\.com\/[^\s]*user(?:\/home)?[^\s]*[?&]id=(\d+)/i;
  var LINK_RULES = [
    [/music\.163\.com.*song.*[?&]id=(\d+)/i, 'netease', 'song'],
    [/music\.163\.com.*(?:playlist|toplist).*[?&]id=(\d+)/i, 'netease', 'playlist'],
    [/y\.qq\.com.*(?:songDetail|song)\/(\w+)/i, 'tencent', 'song'],
    [/y\.qq\.com.*(?:playsquare|playlist)\/(\w+)/i, 'tencent', 'playlist']
  ];

  var inputEl, submitEl, statusEl, cardsEl, toastEl;
  var players = [];             // {key, ap, card}
  var seen = Object.create(null); // 去重集合
  var seq = 0;
  var toastTimer = null;

  function $(id) { return document.getElementById(id); }

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.hidden = false;
    requestAnimationFrame(function () { toastEl.classList.add('show'); });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 2400);
  }

  function setStatus(msg) { statusEl.textContent = msg || ''; }

  function fetchJSON(url, timeoutMs) {
    var ctrl = new AbortController();
    var timer = setTimeout(function () { ctrl.abort(); }, timeoutMs);
    return fetch(url, { signal: ctrl.signal })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .finally(function () { clearTimeout(timer); });
  }

  // meting 返回 pic/lrc → APlayer 需要的 cover/lrc
  function mapAudio(list) {
    return list.map(function (s) {
      return {
        name: s.name || '未知歌曲',
        artist: s.artist || '',
        url: s.url,
        cover: s.pic || s.cover || '',
        lrc: s.lrc || s.lyric || ''
      };
    });
  }

  function parseInput(raw) {
    var url = String(raw || '').trim();
    if (!url) return { kind: 'empty' };
    if (!/^https?:\/\//i.test(url)) return { kind: 'invalid' };

    var home = url.match(HOME_RE);
    if (home) return { kind: 'home', uid: home[1] };

    for (var i = 0; i < LINK_RULES.length; i++) {
      var m = url.match(LINK_RULES[i][0]);
      if (m) {
        return { kind: 'direct', server: LINK_RULES[i][1], type: LINK_RULES[i][2], id: m[1] };
      }
    }
    return { kind: 'invalid' };
  }

  function renderCard(meta, audioList) {
    var title = meta.name
      || (meta.type === 'song' ? (audioList[0] && audioList[0].name) : '歌单');
    var pid = 'mp-' + (++seq);

    var card = document.createElement('div');
    card.className = 'music-card';
    card.innerHTML =
      '<div class="music-card-head">' +
        '<span class="music-card-platform">' + escapeHtml(PLATFORM[meta.server] || meta.server) + '</span>' +
        '<span class="music-card-title">' + escapeHtml(title) + '</span>' +
        '<span class="music-card-count">' + audioList.length + ' 首</span>' +
        '<button class="music-card-remove" type="button" aria-label="删除">×</button>' +
      '</div>' +
      '<div class="music-card-player" id="' + pid + '"></div>';
    cardsEl.appendChild(card);

    var ap = new APlayer({
      container: $(pid),
      audio: audioList,
      autoplay: false,
      theme: ACCENT,
      loop: 'all',
      order: 'list',
      listFolded: true,
      lrcType: 3,
      preload: 'none',
      mutex: true
    });

    // 本卡片播放时：暂停全局固定播放器 + 其它卡片
    ap.on('play', function () {
      if (window.__meowAp) { try { window.__meowAp.pause(); } catch (e) {} }
      players.forEach(function (o) {
        if (o.ap !== ap) { try { o.ap.pause(); } catch (e) {} }
      });
    });

    var entry = { key: meta.key, ap: ap, card: card };
    card.querySelector('.music-card-remove').addEventListener('click', function () {
      try { ap.destroy(); } catch (e) {}
      card.remove();
      if (seen[entry.key]) delete seen[entry.key];
      var idx = players.indexOf(entry);
      if (idx >= 0) players.splice(idx, 1);
    });

    players.push(entry);
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  async function handleDirect(server, type, id) {
    var key = server + '|' + type + '|' + id;
    if (seen[key]) { toast('该链接已解析过'); return; }
    setStatus('正在解析…');
    try {
      var songs = await fetchJSON(
        API + '?server=' + server + '&type=' + type + '&id=' + encodeURIComponent(id) + '&r=' + Math.random(),
        DIRECT_FETCH_MS
      );
      if (!Array.isArray(songs) || !songs.length) { toast('未解析到歌曲'); return; }
      renderCard({ server: server, type: type, id: String(id), key: key }, mapAudio(songs));
      seen[key] = true;
    } catch (e) {
      toast('解析失败：' + (e && e.message ? e.message : '网络错误'));
    } finally {
      setStatus('');
    }
  }

  async function handleHome(uid) {
    setStatus('正在获取歌单列表…');
    var data;
    try {
      data = await fetchJSON(NETEASE_USER_PROXY + '?uid=' + encodeURIComponent(uid), HOME_FETCH_MS);
    } catch (e) {
      setStatus('');
      toast('获取歌单列表失败：' + (e && e.message ? e.message : '网络错误'));
      return;
    }

    var lists = (data && data.playlists ? data.playlists : []).slice(0, MAX_HOME_PLAYLISTS);
    if (!lists.length) { setStatus(''); toast('未找到公开歌单'); return; }

    var ok = 0, fail = 0;
    for (var i = 0; i < lists.length; i++) {
      var p = lists[i];
      setStatus('正在解析歌单 ' + (i + 1) + '/' + lists.length + '：' + (p.name || '…'));
      var key = 'netease|playlist|' + p.id;
      if (seen[key]) { toast('「' + p.name + '」已存在'); continue; }
      try {
        var songs = await fetchJSON(
          API + '?server=netease&type=playlist&id=' + encodeURIComponent(p.id) + '&r=' + Math.random(),
          DIRECT_FETCH_MS
        );
        if (!Array.isArray(songs) || !songs.length) { fail++; continue; }
        renderCard({ server: 'netease', type: 'playlist', id: String(p.id), name: p.name, key: key }, mapAudio(songs));
        seen[key] = true;
        ok++;
      } catch (e) {
        fail++;
      }
    }
    setStatus('');
    toast('解析完成：成功 ' + ok + ' 张' + (fail ? '，失败 ' + fail + ' 张' : ''));
  }

  async function onSubmit() {
    var parsed = parseInput(inputEl.value);
    if (parsed.kind === 'empty') { toast('请先粘贴链接'); return; }
    if (parsed.kind === 'invalid') { toast('仅支持网易云/QQ音乐歌曲、歌单链接，或网易云个人主页链接'); return; }
    submitEl.disabled = true;
    try {
      if (parsed.kind === 'home') { await handleHome(parsed.uid); }
      else { await handleDirect(parsed.server, parsed.type, parsed.id); }
    } finally {
      submitEl.disabled = false;
    }
  }

  function init() {
    inputEl = $('music-input');
    submitEl = $('music-submit');
    statusEl = $('music-status');
    cardsEl = $('music-cards');
    toastEl = $('music-toast');

    submitEl.addEventListener('click', onSubmit);
    inputEl.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); onSubmit(); }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();