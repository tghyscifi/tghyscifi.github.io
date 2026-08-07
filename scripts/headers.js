// Generate _headers file for GitHub Pages caching control
// Uses after_generate filter — public/ directory may not exist yet,
// so we create it if needed.

const fs = require('fs');
const path = require('path');

const HEADERS_CONTENT = `# Cache-Control for GitHub Pages
# HTML files: no cache (always fetch fresh from server)
/*.html
  Cache-Control: no-cache, no-store, must-revalidate
  Pragma: no-cache

# Root page
/
  Cache-Control: no-cache, no-store, must-revalidate
  Pragma: no-cache

# Assets with content hashes in filename: cache for 1 year
/assets/*
  Cache-Control: max-age=31536000
  immutable

# CSS/JS files (non-hashed)
*.css
  Cache-Control: max-age=86400
*.js
  Cache-Control: max-age=86400

# Images
*.{png,jpg,jpeg,gif,webp,svg,ico}
  Cache-Control: max-age=604800
`;

hexo.extend.filter.register('after_generate', function () {
  const headersPath = path.join(hexo.public_dir, '_headers');
  // Ensure the public directory exists (it may not yet at this stage)
  fs.mkdirSync(hexo.public_dir, { recursive: true });
  fs.writeFileSync(headersPath, HEADERS_CONTENT, 'utf-8');
  hexo.log.debug('Generated _headers file at: ' + headersPath);
});