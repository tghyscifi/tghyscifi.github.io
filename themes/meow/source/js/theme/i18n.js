(function () {
  'use strict';
  const config = window.SITE_I18N || { locale: 'zh-CN', messages: {} };
  const t = (key, fallback, vars = {}) => String(config.messages[key] ?? fallback ?? key)
    .replace(/\{(\w+)\}/g, (match, name) => vars[name] == null ? match : vars[name]);
  window.siteI18n = { locale: config.locale, t };
  const apply = () => {
    for (const attribute of ['data-i18n', 'data-i18n-placeholder', 'data-i18n-aria-label']) {
      document.querySelectorAll('[' + attribute + ']').forEach(element => {
        const target = attribute.slice('data-i18n-'.length);
        if (attribute === 'data-i18n') element.textContent = t(element.getAttribute(attribute), element.textContent);
        else element.setAttribute(target, t(element.getAttribute(attribute), element.getAttribute(target)));
      });
    }
    document.querySelectorAll('[data-language-switch]').forEach(link => {
      const url = new URL(link.href, location.href);
      url.search = location.search;
      url.hash = location.hash;
      link.href = url.href;
      link.addEventListener('click', () => {
        try { localStorage.setItem('ui-language', link.hreflang); } catch (_) { /* Storage may be disabled. */ }
      });
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();
})();
