// Generate releases/latest.json at build time by fetching the latest
// APP release from GitHub Releases API. The page loads this JSON from origin
// (no cross-origin / rate-limit issues for visitors). On fetch failure a
// placeholder {ok:false} is emitted so the page can fall back gracefully
// instead of breaking the build.

const RELEASES_API = 'https://api.github.com/repos/tghyscifi/tghyscifi.github.io/releases/latest';

let cachePromise = null;

const fetchLatest = () => {
  if (typeof fetch !== 'function') {
    // Node <18 without native fetch: cannot reach the API during build.
    return Promise.resolve({ ok: false, error: 'build-time fetch unavailable' });
  }
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'hexo-site',
  };
  // GitHub Actions automatically provides GITHUB_TOKEN, lifting the rate limit.
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  return fetch(RELEASES_API, { headers })
    .then((res) => {
      if (res.status === 404) throw new Error('no releases yet');
      if (!res.ok) throw new Error(`GitHub API ${res.status}`);
      return res.json();
    })
    .then((release) => ({
      ok: true,
      updatedAt: new Date().toISOString(),
      release: {
        tag_name: release.tag_name,
        name: release.name,
        published_at: release.published_at,
        body: release.body,
        html_url: release.html_url,
        assets: (release.assets || []).map((a) => ({
          name: a.name,
          size: a.size,
          download_count: a.download_count,
          browser_download_url: a.browser_download_url,
        })),
      },
    }))
    .catch((err) => ({
      ok: false,
      updatedAt: new Date().toISOString(),
      error: err.message || 'unknown error',
    }));
};

hexo.extend.generator.register('releases-latest', function () {
  if (!cachePromise) {
    cachePromise = fetchLatest().then((data) => ({
      path: 'releases/latest.json',
      data: JSON.stringify(data),
    }));
  }
  return cachePromise;
});