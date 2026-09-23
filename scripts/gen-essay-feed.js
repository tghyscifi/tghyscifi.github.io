// Generate a standalone Atom feed for the /essay/ (动态) page.
// Source: source/_data/essay.yml — only works while theme.essay.type === 'local'
// (artitalk keeps its data in LeanCloud, unavailable at build time).
//
// Two artifacts:
//   - essay/atom.xml  → the feed itself
//   - <link rel="alternate"> injected into the essay page <head> (autodiscovery)
//
// NOTE on dates: js-yaml parses `2026-09-08 23:50:32` in essay.yml as a UTC
// Date, and essay.pug renders it with moment(...).utc() to preserve the
// author's wall-clock time. The feed follows the same convention — the UTC
// fields are emitted with a +08:00 offset, otherwise readers would show every
// entry 8 hours early.
//
// Entries have no permalink of their own, so <id> uses a tag URI
// (tag:host,date:essay/<timestamp>) and <link> points at /essay/.
// The timestamp — not the array index — keeps ids stable when a new essay is
// inserted in the middle of the file, so readers don't re-push old entries.

const FEED_PATH = 'essay/atom.xml';
const ESSAY_PAGE_PATH = 'essay/';

const pad = (n) => String(n).padStart(2, '0');

const absolute = (siteUrl, p) =>
  String(siteUrl || '').replace(/\/+$/, '') + '/' + String(p || '').replace(/^\/+/, '');

const escapeXml = (s) =>
  String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const cdata = (s) =>
  '<![CDATA[' + String(s == null ? '' : s).replace(/]]>/g, ']]]]><![CDATA[>') + ']]>';

// UTC wall-clock fields re-tagged as Beijing time (see note above).
const toFeedDate = (value) => {
  const d = new Date(value);
  if (isNaN(d.getTime())) return null;
  return (
    `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}` +
    `T${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}+08:00`
  );
};

// Essays carry no title: use the first line, stripped of markdown noise.
const stripMarkdown = (s) =>
  String(s || '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`~]/g, '')
    .trim();

const entryTitle = (essay, dateOnly) => {
  const line = stripMarkdown((essay.content || '').split('\n')[0]);
  if (!line) return `动态 ${dateOnly}`;
  return line.length > 30 ? line.slice(0, 30) + '…' : line;
};

const renderContent = (essay, siteUrl) => {
  let html = essay.content
    ? hexo.render.renderSync({ text: essay.content, engine: 'markdown' })
    : '';
  const images = essay.image || [];
  if (images.length) {
    html += images
      .map((img) => `<img src="${escapeXml(absolute(siteUrl, img))}" alt="">`)
      .join('');
  }
  return html;
};

hexo.extend.generator.register('essay-feed', function (locals) {
  const themeCfg = hexo.theme.config;
  if (!themeCfg.essay || themeCfg.essay.type !== 'local') return;

  const essayData = locals.data && locals.data.essay;
  const list = (essayData && essayData.essay_list) || [];
  if (!list.length) return;

  const { config } = hexo;
  const siteUrl = config.url || '';
  const pageUrl = absolute(siteUrl, ESSAY_PAGE_PATH);
  const feedUrl = absolute(siteUrl, FEED_PATH);
  const host = siteUrl.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  const feedTitle = `${config.title} · 动态`;
  const subtitle = themeCfg.essay.desc || config.subtitle || config.description || '';
  const icon =
    config.feed && config.feed.icon ? absolute(siteUrl, config.feed.icon) : '';

  // Keep the file order (newest first), skip entries with an unusable date.
  const dated = list
    .map((essay) => ({ essay, iso: toFeedDate(essay.date) }))
    .filter((item) => item.iso);
  if (!dated.length) return;

  const entries = dated.map(({ essay, iso }) => {
    const dateOnly = iso.slice(0, 10);
    const stamp = iso.slice(0, 19).replace(/[:T]/g, '-'); // 2026-09-08-23-50-32
    const id = `tag:${host},${dateOnly}:essay/${stamp}`;
    const author = essay.from || config.author || '';

    return [
      '  <entry>',
      `    <title>${escapeXml(entryTitle(essay, dateOnly))}</title>`,
      `    <link rel="alternate" href="${escapeXml(pageUrl)}"/>`,
      `    <id>${escapeXml(id)}</id>`,
      `    <published>${iso}</published>`,
      `    <updated>${iso}</updated>`,
      author ? `    <author><name>${escapeXml(author)}</name></author>` : '',
      `    <content type="html">${cdata(renderContent(essay, siteUrl))}</content>`,
      '  </entry>',
    ]
      .filter(Boolean)
      .join('\n');
  });

  // Feed-level updated = newest entry (all offsets are +08:00, so string sort works).
  const updated = dated.map((item) => item.iso).sort().pop();

  const xml = [
    '<?xml version="1.0" encoding="utf-8"?>',
    '<feed xmlns="http://www.w3.org/2005/Atom">',
    `  <title>${escapeXml(feedTitle)}</title>`,
    subtitle ? `  <subtitle>${escapeXml(subtitle)}</subtitle>` : '',
    `  <link rel="alternate" href="${escapeXml(pageUrl)}"/>`,
    `  <link rel="self" href="${escapeXml(feedUrl)}"/>`,
    `  <id>${escapeXml(pageUrl)}</id>`,
    `  <updated>${updated}</updated>`,
    '  <generator uri="https://hexo.io/">Hexo</generator>',
    config.author ? `  <author><name>${escapeXml(config.author)}</name></author>` : '',
    icon ? `  <icon>${escapeXml(icon)}</icon>` : '',
    ...entries,
    '</feed>',
    '',
  ]
    .filter((line) => line !== '')
    .join('\n');

  return { path: FEED_PATH, data: xml };
});

// Autodiscovery: advertise the essay feed on the essay page only.
// Priority 9 runs before hexo-generator-feed's autodiscovery (default 10), so
// its "page already has an atom link" check makes it skip this page — the
// essay page then advertises the essay feed instead of the post feed.
hexo.extend.filter.register(
  'after_render:html',
  function (str) {
    if (typeof str !== 'string') return;

    const headEnd = str.indexOf('</head>');
    if (headEnd === -1) return;

    if (!str.includes('id="essay-container"')) return; // essay page only
    // Only look at <head>: the page body also links to the feed (the RSS icon),
    // which would otherwise be mistaken for an existing <link rel="alternate">.
    if (str.slice(0, headEnd).includes(FEED_PATH)) return;

    const url = absolute(hexo.config.url || '', FEED_PATH);
    const title = `${hexo.config.title || ''} · 动态`;
    const link =
      `<link rel="alternate" href="${escapeXml(url)}" ` +
      `title="${escapeXml(title)}" type="application/atom+xml">`;

    return str.replace('</head>', link + '</head>');
  },
  9
);
