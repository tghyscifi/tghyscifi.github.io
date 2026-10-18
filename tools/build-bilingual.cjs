'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const yaml = require('js-yaml');
const { deepMerge } = require('hexo-util');
const cheerio = require('cheerio');
const merge = (...objects) => objects.reduce((result, value) => deepMerge(result, value), {});

const root = path.resolve(__dirname, '..');
const cache = path.join(root, '.cache', 'bilingual');
const readYaml = file => yaml.load(fs.readFileSync(path.join(root, file), 'utf8'));

// Only reset these generated directories, never source files or Git metadata.
function resetGenerated(directory) {
  const absolute = path.resolve(directory);
  const relative = path.relative(root, absolute);
  if (relative !== 'public' && !relative.startsWith('.cache' + path.sep + 'bilingual' + path.sep)) {
    throw new Error('Refusing to remove a non-build directory: ' + absolute);
  }
  fs.rmSync(absolute, { recursive: true, force: true });
  fs.mkdirSync(absolute, { recursive: true });
}

function buildLocale(locale, base, catalog) {
  const stage = path.join(cache, locale);
  resetGenerated(stage);
  const english = locale === 'en';
  const config = merge(base, english ? catalog.site : {}, {
    language: english ? 'en' : 'zh-CN',
    ui_locale: locale,
    ui_original_url: base.url,
    url: english ? base.url.replace(/\/$/, '') + '/en' : base.url,
    root: english ? '/en/' : '/',
    source_dir: path.join(root, base.source_dir || 'source'),
    public_dir: path.join(stage, 'public')
  });
  if (english) {
    config.theme_config = merge(base.theme_config || {}, catalog.theme || {});
    config.feed = { ...base.feed, enable: false };
  }
  const configPath = path.join(stage, 'config.yml');
  fs.writeFileSync(configPath, yaml.dump(config, { lineWidth: -1, noRefs: true }));
  const result = spawnSync(process.execPath, [
    path.join(root, 'node_modules', 'hexo', 'bin', 'hexo'), 'generate',
    '--config', configPath, '--output', stage
  ], { cwd: root, stdio: 'inherit', windowsHide: true });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(locale + ' build failed (' + result.status + ')');
  const home = path.join(config.public_dir, 'index.html');
  if (!fs.existsSync(home)) throw new Error(locale + ' homepage was not generated.');
  const $ = cheerio.load(fs.readFileSync(home, 'utf8'));
  if ($('html').attr('lang') !== config.language || $('[data-language-switch]').length !== 2) {
    throw new Error(locale + ' interface or language switch failed to render.');
  }
  if (english) {
    for (const [route, title] of Object.entries(catalog.titles)) {
      const page = path.join(config.public_dir, route.replace(/^\//, ''), 'index.html');
      if (!fs.existsSync(page)) throw new Error('Missing English page: ' + route);
      const html = cheerio.load(fs.readFileSync(page, 'utf8'));
      if (route.startsWith('/posts/') && html('h1.post-title').text() !== cheerio.load(title).text()) {
        throw new Error('English title was not applied: ' + route);
      }
    }
  }
  return config.public_dir;
}

const base = readYaml('_config.yml');
if ((base.root || '/') !== '/' || path.resolve(root, base.public_dir || 'public') !== path.join(root, 'public')) {
  throw new Error('Bilingual build currently requires root / and output directory public/.');
}
const catalog = readYaml('locales/en.yml');
const chinese = buildLocale('zh-CN', base, catalog);
const english = buildLocale('en', base, catalog);
if (fs.existsSync(path.join(english, 'atom.xml')) || fs.existsSync(path.join(english, 'essay', 'atom.xml'))) {
  throw new Error('English feeds are outside the current scope.');
}
const output = path.join(root, 'public');
resetGenerated(output);
fs.cpSync(chinese, output, { recursive: true });
fs.cpSync(english, path.join(output, 'en'), { recursive: true });
// Crawlers use the root robots.txt; advertise both independently generated maps.
const robotsPath = path.join(output, 'robots.txt');
if (fs.existsSync(robotsPath)) {
  fs.appendFileSync(robotsPath, '\nSitemap: ' + base.url.replace(/\/$/, '') + '/en/sitemap.xml\n');
}
console.log('Bilingual interface built in public/ and public/en/. Article bodies remain Chinese.');
