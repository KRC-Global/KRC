#!/usr/bin/env node
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000;
// Serve the KRC directory (one level up from this script)
const ROOT = path.resolve(__dirname, '..');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.htm': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.map': 'application/json',
  '.txt': 'text/plain; charset=utf-8'
};

function safeResolve(root, reqPath) {
  const decoded = decodeURIComponent(reqPath);
  const filePath = path.join(root, decoded);
  const resolved = path.resolve(filePath);
  if (!resolved.startsWith(root)) {
    return null; // path traversal
  }
  return resolved;
}

function send(res, status, body, headers = {}) {
  res.writeHead(status, { 'Cache-Control': 'no-cache', ...headers });
  if (body && body.pipe) {
    body.pipe(res);
  } else {
    res.end(body);
  }
}

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);
  let target = safeResolve(ROOT, pathname);
  if (!target) {
    return send(res, 400, 'Bad request');
  }

  fs.stat(target, (err, stat) => {
    if (!err && stat.isDirectory()) {
      target = path.join(target, 'index.html');
    }

    fs.stat(target, (statErr, st) => {
      if (statErr || !st.isFile()) {
        // Simple 404
        return send(res, 404, 'Not found');
      }
      const ext = path.extname(target).toLowerCase();
      const type = MIME[ext] || 'application/octet-stream';
      const stream = fs.createReadStream(target);
      send(res, 200, stream, { 'Content-Type': type });
    });
  });
});

server.listen(PORT, '0.0.0.0', () => {
  // eslint-disable-next-line no-console
  console.log(`Serving KRC at http://localhost:${PORT} (Ctrl+C to stop)`);
  // eslint-disable-next-line no-console
  console.log(`Access from another machine: http://<SERVER_IP>:${PORT}/index.html`);
});

