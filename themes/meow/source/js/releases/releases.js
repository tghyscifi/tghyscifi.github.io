/*
 * hexo theme meow
 * releases page scripts - render latest APP release info from static
 * releases/latest.json generated at build time (see scripts/gen-releases.js)
 */

const RELEASES_URL = "https://github.com/tghyscifi/tghyscifi.github.io/releases";

const formatBytes = (bytes) => {
  if (bytes == null) return "";
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.min(Math.floor(Math.log2(bytes) / 10), units.length - 1);
  return (bytes / Math.pow(1024, i)).toFixed(1) + " " + units[i];
};

// 极小基础 markdown 渲染:先转义 HTML 再转换语法,天然防空 XSS。
const renderMarkdown = (md) => {
  const esc = (s) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const inline = (s) =>
    esc(s)
      .replace(/`([^`]+)`/g, (m, code) => `<code>${code}</code>`)
      .replace(/\*\*([^*\n]+)\*\*/g, (m, t) => `<strong>${t}</strong>`)
      .replace(/\*([^*\n]+)\*/g, (m, t) => `<em>${t}</em>`)
      .replace(
        /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,
        (m, t, url) => `<a href="${url}" target="_blank" rel="noopener">${t}</a>`
      );

  const isTableRow = (l) => /^\s*\|/.test(l) && /\|\s*$/.test(l);
  const isDelimiter = (l) => /^[\s:|-]*$/.test(l);
  const cells = (r) => r.trim().split("|").slice(1, -1).map((c) => inline(c.trim()));

  const lines = md.replace(/\r\n?/g, "\n").split("\n");
  const out = [];
  let listType = null;
  const closeList = () => {
    if (listType) {
      out.push(listType === "ul" ? "</ul>" : "</ol>");
      listType = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") {
      closeList();
      continue;
    }
    // 表格:连续的行,跳过分隔行
    if (isTableRow(line)) {
      closeList();
      const rows = [];
      let j = i;
      while (j < lines.length && isTableRow(lines[j].trim())) {
        if (!isDelimiter(lines[j].trim())) rows.push(lines[j].trim());
        j++;
      }
      if (rows.length > 1) {
        const head = cells(rows.shift());
        out.push(
          "<table><thead><tr>" +
            head.map((c) => `<th>${c}</th>`).join("") +
            "</tr></thead><tbody>" +
            rows
              .map((r) => "<tr>" + cells(r).map((c) => `<td>${c}</td>`).join("") + "</tr>")
              .join("") +
            "</tbody></table>"
        );
      }
      i = j - 1;
      continue;
    }
    if (/^-{3,}$/.test(line)) {
      closeList();
      out.push("<hr>");
      continue;
    }
    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      closeList();
      const lv = Math.min(2 + heading[1].length, 5); // # ~ ###### → h3 ~ h5
      out.push(`<h${lv}>${inline(heading[2])}</h${lv}>`);
      continue;
    }
    const quote = line.match(/^>\s?(.*)$/);
    if (quote) {
      closeList();
      out.push(`<blockquote>${inline(quote[1])}</blockquote>`);
      continue;
    }
    const ul = line.match(/^[-*+]\s+(.*)$/);
    if (ul) {
      if (listType !== "ul") {
        closeList();
        out.push("<ul>");
        listType = "ul";
      }
      out.push(`<li>${inline(ul[1])}</li>`);
      continue;
    }
    const ol = line.match(/^\d+\.\s+(.*)$/);
    if (ol) {
      if (listType !== "ol") {
        closeList();
        out.push("<ol>");
        listType = "ol";
      }
      out.push(`<li>${inline(ol[1])}</li>`);
      continue;
    }
    closeList();
    out.push(`<p>${inline(line)}</p>`);
  }
  closeList();
  return out.join("\n");
};

const initReleases = () => {
  const container = document.querySelector("#releases-info");
  if (!container) return;

  const loading = container.querySelector(".releases-loading");
  const errorBox = container.querySelector(".releases-error");
  const card = container.querySelector(".releases-card");

  const showError = () => {
    loading.hidden = true;
    errorBox.hidden = false;
  };

  const showNoReleases = () => {
    loading.textContent = "还没有发布过任何版本，去 GitHub 看看吧 →";
    const link = document.createElement("a");
    link.className = "releases-btn";
    link.href = RELEASES_URL;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = "前往 GitHub Releases";
    loading.appendChild(link);
  };

  const renderRelease = (release) => {
    container.querySelector("#releases-badge").textContent = release.prerelease ? "最新预览版" : "最新版本";
    container.querySelector("#releases-version").textContent = release.tag_name;
    container.querySelector("#releases-title").textContent = release.name || release.tag_name;
    container.querySelector("#releases-published").textContent =
      "发布于 " + new Date(release.published_at).toLocaleString("zh-CN");

    // 更新说明:基础 markdown 渲染(已转义,防 XSS)
    const body = container.querySelector("#releases-body");
    if (release.body) {
      body.innerHTML = renderMarkdown(release.body);
      body.hidden = false;
    } else {
      body.textContent = "作者没有填写更新说明。";
    }

    // 下载资源列表
    const assetsWrap = container.querySelector("#releases-assets");
    const assets = release.assets || [];
    if (assets.length) {
      assets.forEach((asset) => {
        const el = document.createElement("a");
        el.className = "releases-asset";
        el.href = asset.browser_download_url;
        el.target = "_blank";
        el.rel = "noopener";
        el.innerHTML =
          '<span class="releases-asset-name"></span><span class="releases-asset-meta"></span>';
        el.querySelector(".releases-asset-name").textContent = asset.name;
        el.querySelector(".releases-asset-meta").textContent =
          formatBytes(asset.size) +
          (asset.download_count != null ? " · " + asset.download_count + " 次下载" : "");
        assetsWrap.appendChild(el);
      });
    } else {
      assetsWrap.hidden = true;
    }

    container.querySelector("#releases-html-link").href = release.html_url || RELEASES_URL;
    card.hidden = false;
  };

  const jsonUrl = (GLOBALCONFIG.root || "/") + "releases/latest.json";

  fetch(jsonUrl)
    .then((res) => {
      if (!res.ok) throw new Error(res.status);
      return res.json();
    })
    .then((data) => {
      if (!data.ok) {
        if (data.error === "no releases yet") showNoReleases();
        else showError();
        return;
      }
      loading.hidden = true;
      renderRelease(data.release);
    })
    .catch(showError);
};

initReleases();