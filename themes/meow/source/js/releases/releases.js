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
    container.querySelector("#releases-version").textContent = release.tag_name;
    container.querySelector("#releases-title").textContent = release.name || release.tag_name;
    container.querySelector("#releases-published").textContent =
      "发布于 " + new Date(release.published_at).toLocaleString("zh-CN");

    // 更新说明:纯文本渲染,避免 XSS
    const body = container.querySelector("#releases-body");
    body.textContent = release.body || "作者没有填写更新说明。";
    body.hidden = !release.body;

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