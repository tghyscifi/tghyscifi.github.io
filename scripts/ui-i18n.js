'use strict';

const fs = require('node:fs');
const path = require('node:path');
const yaml = require('js-yaml');
const cheerio = require('cheerio');

const english = () => /^en(?:-|$)/i.test(String(hexo.config.language));
const catalog = yaml.load(fs.readFileSync(path.join(hexo.base_dir, 'locales', 'en.yml'), 'utf8'));
const messages = () => Object.fromEntries(Object.entries(hexo.theme.i18n.get(english() ? 'en' : 'zh-CN'))
  .filter(([key]) => key.startsWith('ui.')).map(([key, value]) => [key.slice(3), value]));
const format = (text, vars = {}) => String(text).replace(/\{(\w+)\}/g, (match, key) => vars[key] == null ? match : vars[key]);
const route = value => '/' + String(value || '').replace(/^\/+/, '').replace(/index\.html$/, '');

function localizeTitle(data) {
  if (!english()) return data;
  const title = catalog.titles[route(data.path || data.permalink)];
  if (title) data.title = title;
  data.lang = 'en';
  return data;
}
hexo.extend.filter.register('before_post_render', localizeTitle, 5);
hexo.extend.filter.register('before_generate', function () {
  if (!english()) return;
  for (const kind of ['posts', 'pages']) hexo.locals.get(kind).forEach(localizeTitle);
  // Replace keyed link lists instead of merging English labels into Chinese labels.
  if (catalog.theme?.sidebar?.links?.list) hexo.theme.config.sidebar.links.list = catalog.theme.sidebar.links.list;
});

hexo.extend.helper.register('isEnglishUi', english);
hexo.extend.helper.register('uiText', (key, fallback, vars) => format(messages()[key] ?? fallback ?? key, vars));
hexo.extend.helper.register('uiName', name => english() ? catalog.categories[name] || catalog.tags[name] || name : name);
hexo.extend.helper.register('uiScriptData', () => JSON.stringify({
  locale: english() ? 'en' : 'zh-CN', messages: messages()
}).replace(/</g, '\\u003c'));
hexo.extend.helper.register('languageSwitchUrl', function () {
  return (english() ? '' : '/en') + route(this.page.path);
});
hexo.extend.helper.register('uiAlternateUrl', function (locale) {
  return (hexo.config.ui_original_url || hexo.config.url).replace(/\/$/, '') + (locale === 'en' ? '/en' : '') + route(this.page.path);
});
hexo.extend.helper.register('chineseUrl', value => (hexo.config.ui_original_url || hexo.config.url).replace(/\/$/, '') + route(value));
hexo.extend.helper.register('uiLink', function (value) {
  if (!english()) return this.url_for(value);
  try {
    const original = new URL(hexo.config.ui_original_url || hexo.config.url);
    const target = new URL(value, original);
    if (target.origin === original.origin && !/\.xml$/.test(target.pathname)) {
      return this.url_for(target.pathname) + target.search + target.hash;
    }
  } catch (_) { /* Preserve links that are not normal HTTP URLs. */ }
  return this.url_for(value);
});

// Translate taxonomy labels without changing their stable paths or source metadata.
hexo.extend.filter.register('after_render:html', function (html) {
  if (!english() || typeof html !== 'string' || !html.includes('<html')) return html;
  const $ = cheerio.load(html, { decodeEntities: false });
  $('a[href]').each((_, element) => {
    const link = $(element);
    if (link.is('[data-language-switch]') || link.closest('.post.markdown, .essay-text, .page-body.markdown').length) return;
    const href = link.attr('href') || '';
    if (href && !href.startsWith('#')) {
      try {
        const target = new URL(href, hexo.config.ui_original_url || hexo.config.url);
        const original = new URL(hexo.config.ui_original_url || hexo.config.url);
        if (target.origin === original.origin && (target.pathname === '/' || /^\/(posts|essay|friends|music|archives|categories|tags|releases|comments|about|page)(\/|$)/.test(target.pathname)) && !/\.xml$/.test(target.pathname)) {
          link.attr('href', '/en' + target.pathname + target.search + target.hash);
        }
      } catch (_) { /* Keep non-HTTP links unchanged. */ }
    }
    if (!/^\/en\/(categories|tags)\//.test(link.attr('href') || '')) return;
    link.contents().each((_, node) => {
      if (node.type !== 'text') return;
      const label = node.data.trim();
      const translated = catalog.categories[label] || catalog.tags[label];
      if (translated) node.data = node.data.replace(label, translated);
    });
  });
  return $.html();
}, 8);

// Explicit post permalinks may start with /; the search plugin concatenates
// config.root directly, producing //posts/ or /en//posts/. Keep them local.
hexo.extend.filter.register('after_generate', async function () {
  const file = hexo.config.search?.path;
  if (!file || !file.endsWith('.json') || !hexo.route.get(file)) return;
  const chunks = [];
  for await (const chunk of hexo.route.get(file)) chunks.push(Buffer.from(chunk));
  const records = JSON.parse(Buffer.concat(chunks).toString('utf8'));
  for (const entry of records) {
    if (entry.url?.startsWith('/')) entry.url = entry.url.replace(/\/{2,}/g, '/');
    if (english()) {
      if (entry.categories) entry.categories = entry.categories.map(name => catalog.categories[name] || name);
      if (entry.tags) entry.tags = entry.tags.map(name => catalog.tags[name] || name);
    }
  }
  hexo.route.set(file, JSON.stringify(records));
});
