// Generate _headers file for GitHub Pages caching control
// GitHub Pages builds from the public/ directory, so this file must be
// generated after each hexo generate run.

hexo.extend.filter.register('after_generate', function () {
  const fs = require('fs');
  const path = require('path');

  const content = `# Cache-Control for GitHub Pages
# HTML files: no cache (always fetch fresh from server)
/*.html
  Cache-Control: no-cache, no-store, must-revalidate
  Pragma: no-cache

# Root page (index.html at root)
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
*.png
  Cache-Control: max-age=604800
*.jpg
  Cache-Control: max-age=604800
*.jpeg
  Cache-Control: max-age=604800
*.gif
  Cache-Control: max-age=604800
*.webp
  Cache-Control: max-age=604800
*.svg
  Cache-Control: max-age=604800
*.ico
  Cache-Control: max-age=604800
`;

  const headersPath = path.join(hexo.public_dir, '_headers');
  fs.writeFileSync(headersPath, content, 'utf-8');
  hexo.log.debug('Generated _headers file at: ' + headersPath);
});