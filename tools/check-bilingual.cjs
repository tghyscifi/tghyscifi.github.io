'use strict';
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const cheerio = require('cheerio');
const yaml = require('js-yaml');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'public');
const catalog = yaml.load(fs.readFileSync(path.join(root, 'locales/en.yml'), 'utf8'));
const read = route => cheerio.load(fs.readFileSync(path.join(output, route.replace(/^\//, ''), 'index.html'), 'utf8'));
const theme = yaml.load(fs.readFileSync(path.join(root, '_config.meow.yml'), 'utf8'));
const enHome = read('/en/');
const zhHome = read('/');
const topLabels = $ => $('#nav-menu > .menu-item > a > span, #nav-menu > .menu-item > button > span').map((_, el) => $(el).text()).get();
assert.deepEqual(topLabels(enHome), ['Browse', 'Updates', 'About', 'Guestbook', 'More'], 'English navigation has five groups');
const navPaths = ($, selector) => $(selector).map((_, el) => $(el).attr('href').replace(/\/$/, '')).get().sort();
const originalPaths = Object.values(theme.menu).map(value => value.split('||')[0].trim().replace(/\/$/, '')).sort();
assert.deepEqual(navPaths(zhHome, '#nav-menu a'), originalPaths, 'Chinese desktop navigation remains flat and complete');
assert.deepEqual(navPaths(zhHome, '.menu-aside-item a'), originalPaths, 'Chinese mobile navigation remains flat and complete');
assert.equal(zhHome('#nav-menu > .menu-item').length, originalPaths.length, 'Chinese top-level item count unchanged');
for (const selector of ['#nav-menu a', '.menu-aside-item a']) {
  assert.deepEqual(navPaths(enHome, selector), originalPaths.map(route => '/en' + route).sort(), 'English grouped links remain complete: ' + selector);
}
for (const id of ['browse', 'more']) {
  const button = enHome('#nav-menu button[aria-controls="nav-submenu-' + id + '"]');
  assert.equal(button.attr('type'), 'button', 'Group trigger is a button');
  assert.equal(button.attr('aria-expanded'), 'false', 'Group starts collapsed');
  assert(enHome('#nav-submenu-' + id).is('[hidden]'), 'Collapsed links are hidden from keyboard navigation');
}
for (const subtitle of theme.banner.subtitle.text) assert(!enHome('script').text().includes(subtitle), 'English banner must not rotate Chinese subtitles');
let articleCount = 0;
for (const [route, title] of Object.entries(catalog.titles)) {
  const zh = read(route);
  const en = read('/en' + route);
  assert.equal(en('html').attr('lang'), 'en', route);
  assert.equal(zh('html').attr('lang'), 'zh-CN', route);
  assert.equal(en('[data-language-switch]').first().attr('href'), route, route + ' English to Chinese');
  assert.equal(zh('[data-language-switch]').first().attr('href'), '/en' + route, route + ' Chinese to English');
  assert(en('.ui-language-note').text().includes('Chinese'), route + ' content language notice');
  if (route.startsWith('/posts/')) {
    articleCount++;
    assert.equal(en('h1.post-title').text(), cheerio.load(title).text(), route + ' title');
    const paragraphs = $ => $('.post.markdown p').map((_, element) => $(element).text()).get();
    assert.deepEqual(paragraphs(en), paragraphs(zh), route + ' body paragraphs');
  }
}
const zhEssay = read('/essay/');
const enEssay = read('/en/essay/');
const updates = $ => $('.essay-text').map((_, item) => $(item).text()).get();
assert.deepEqual(updates(enEssay), updates(zhEssay), 'Update bodies remain Chinese');
assert.equal(enEssay('a.essay-rss').attr('href'), 'https://tghyscifi.github.io/essay/atom.xml');
for (const feed of ['atom.xml', 'essay/atom.xml']) {
  assert(fs.existsSync(path.join(output, feed)), 'Chinese feed ' + feed);
  assert(!fs.existsSync(path.join(output, 'en', feed)), 'No English feed ' + feed);
}
const search = JSON.parse(fs.readFileSync(path.join(output, 'en/search.json'), 'utf8'));
assert.equal(search.length, articleCount, 'English search covers all posts');
for (const entry of search) assert(entry.url.startsWith('/en/posts/'), entry.url);
const protectedSource = fs.readFileSync(path.join(root, 'source/_posts/test.md'), 'utf8').split(/^---\s*$/m).slice(2).join('---');
const protectedMarkers = protectedSource.match(/[\p{Script=Han}，。！？、]{12,}/gu) || [];
const protectedEntry = search.find(entry => entry.url === '/en/posts/test/');
assert(protectedEntry, 'Protected post stays indexed by title');
const atom = cheerio.load(fs.readFileSync(path.join(output, 'atom.xml'), 'utf8'), { xmlMode: true });
const protectedFeed = atom('entry').filter((_, entry) => atom(entry).find('id').text().includes('/posts/test/')).text();
for (const marker of protectedMarkers) {
  assert(!protectedEntry.content.includes(marker), 'Protected body must not leak into search');
  assert(!protectedFeed.includes(marker), 'Protected body must not leak into RSS');
}
const dictionary = file => new (require('hexo-i18n'))().set('locale', yaml.load(fs.readFileSync(path.join(root, file), 'utf8'))).get('locale');
const zhWords = dictionary('themes/meow/languages/zh-CN.yml');
const enWords = dictionary('themes/meow/languages/en.yml');
for (const key of Object.keys(zhWords)) {
  assert(key in enWords, 'Missing English dictionary key: ' + key);
  const placeholders = value => (String(value).match(/\{\w+\}|%s/g) || []).sort();
  assert.deepEqual(placeholders(enWords[key]), placeholders(zhWords[key]), 'Placeholder mismatch: ' + key);
}
console.log(JSON.stringify({ result: 'passed', titlePairs: Object.keys(catalog.titles).length, articles: articleCount, updates: updates(enEssay).length, chineseFeeds: 2, englishFeeds: 0 }));
