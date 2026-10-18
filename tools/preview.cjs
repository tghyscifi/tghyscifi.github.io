'use strict';
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const root = path.resolve(__dirname, '..', 'public');
const port = Number(process.env.PORT || 4000);
if (!fs.existsSync(path.join(root, 'en', 'index.html'))) throw new Error('Run npm run build before npm run preview.');
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.xml': 'application/xml', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff2': 'font/woff2' };
http.createServer((request, response) => {
  let file;
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    file = path.resolve(root, '.' + pathname);
    if (file !== root && !file.startsWith(root + path.sep)) throw new Error('Invalid path');
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
      if (!pathname.endsWith('/')) { response.writeHead(301, { Location: pathname + '/' }); response.end(); return; }
      file = path.join(file, 'index.html');
    }
  } catch (_) { response.writeHead(400); response.end('Bad request'); return; }
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) { response.writeHead(404); response.end('Not found'); return; }
  response.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
  fs.createReadStream(file).pipe(response);
}).listen(port, '127.0.0.1', () => console.log('Bilingual preview: http://127.0.0.1:' + port + '/ (English: /en/)'));
