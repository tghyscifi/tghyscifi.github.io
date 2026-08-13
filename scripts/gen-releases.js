// Generate version metadata at build time by fetching the latest APP release
// from the GitHub Releases API. Two artifacts are emitted:
//   - releases/latest.json  → used by /releases page (web rendering)
//   - releases/update.json  → used by the APP for update checks
// Env GITHUB_TOKEN (present in GitHub Actions) lifts the API rate limit.
//
// NOTE: use the releases list endpoint instead of /releases/latest.
// /releases/latest only returns the newest NON-prerelease release and 404s
// when every release is marked prerelease. The listing includes prereleases,
// newest first.

const RELEASES_API = 'https://api.github.com/repos/tghyscifi/tghyscifi.github.io/releases?per_page=10';

let cachePromise = null;

// vX.Y.Z or X.Y.Z -> X*10000 + Y*100 + Z (v1.0.0 -> 10000, v1.10.5 -> 11005)
const parseVersionCode = (tag) => {
  const m = /^v?(\d+)\.(\d+)\.(\d+)/.exec(tag || '');
  if (!m) return 0;
  return parseInt(m[1], 10) * 10000 + parseInt(m[2], 10) * 100 + parseInt(m[3], 10);
};

// Prefer the APK asset; fall back to the largest download when multiple.
const pickDownload = (assets) => {
  if (!assets || !assets.length) return null;
  const ext = (n) => (n.split('.').pop() || '').toLowerCase();
  const priority = (n) => {
    const i = ['apk', 'xapk', 'zip'].indexOf(ext(n));
    return i === -1 ? 99 : i;
  };
  const best = assets
    .slice()
    .sort((a, b) => priority(a.name) - priority(b.name) || (b.size || 0) - (a.size || 0))[0];
  return {
    file_name: best.name,
    url: best.browser_download_url,
    size: best.size,
    download_count: best.download_count,
  };
};

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
      if (!res.ok) throw new Error(`GitHub API ${res.status}`);
      return res.json();
    })
    .then((releases) => {
      if (!Array.isArray(releases) || releases.length === 0) {
        throw new Error('no releases yet');
      }
      // Pick the most recently published non-draft release.
      const release = releases
        .filter((r) => !r.draft)
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];
      if (!release) throw new Error('no releases yet');
      return {
        ok: true,
        updatedAt: new Date().toISOString(),
        release: {
          tag_name: release.tag_name,
          name: release.name,
          prerelease: release.prerelease,
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
      };
    })
    .catch((err) => ({
      ok: false,
      updatedAt: new Date().toISOString(),
      error: err.message || 'unknown error',
    }));
};

const getData = () => {
  if (!cachePromise) cachePromise = fetchLatest();
  return cachePromise;
};

// For the /releases page: keeps the {ok, release} shape (backward compatible).
hexo.extend.generator.register('releases-latest', function () {
  return getData().then((data) => ({
    path: 'releases/latest.json',
    data: JSON.stringify(data),
  }));
});

// For the APP update check: flat, versioning-focused shape.
hexo.extend.generator.register('releases-update', function () {
  return getData().then((data) => {
    const payload = data.ok
      ? {
          code: 0,
          message: 'ok',
          latest: {
            version_name: (data.release.tag_name || '').replace(/^v/i, ''),
            version_code: parseVersionCode(data.release.tag_name),
            prerelease: data.release.prerelease,
            force: false,
            release_date: data.release.published_at,
            changelog: data.release.body || '',
            download: pickDownload(data.release.assets),
          },
        }
      : { code: 1, message: data.error || 'unavailable', latest: null };
    return { path: 'releases/update.json', data: JSON.stringify(payload) };
  });
});