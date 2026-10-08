// Dev tool: serve a static build the way Vercel serves this site.
// /about-us -> 308 /about-us/, /about-us/ -> about-us/index.html, unknown -> 404.html (status 404).
// usage: node tools/serve.mjs <dir> <port>
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, resolve } from 'node:path';
const [dir, port] = [resolve(process.argv[2]), Number(process.argv[3])];
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.woff': 'font/woff', '.mp4': 'video/mp4', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.ico': 'image/x-icon' };
const isFile = (p) => stat(p).then((s) => s.isFile(), () => false);
const isDir = (p) => stat(p).then((s) => s.isDirectory(), () => false);
createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  const path = decodeURIComponent(url.pathname);
  const abs = join(dir, path);
  if (!abs.startsWith(dir)) { res.writeHead(400).end(); return; }
  let file = null;
  if (path.endsWith('/') && (await isFile(join(abs, 'index.html')))) file = join(abs, 'index.html');
  else if (!path.endsWith('/') && (await isFile(abs))) file = abs;
  else if (!path.endsWith('/') && (await isDir(abs)) && (await isFile(join(abs, 'index.html')))) { res.writeHead(308, { Location: path + '/' + url.search }).end(); return; }
  const status = file ? 200 : 404;
  file ??= join(dir, '404.html');
  const body = await readFile(file);
  // Video needs range support for Chrome to play it.
  const range = req.headers.range?.match(/bytes=(\d+)-(\d*)/);
  if (range && status === 200) {
    const start = Number(range[1]), end = range[2] ? Number(range[2]) : body.length - 1;
    res.writeHead(206, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream', 'Content-Range': `bytes ${start}-${end}/${body.length}`, 'Accept-Ranges': 'bytes', 'Content-Length': end - start + 1 });
    res.end(body.subarray(start, end + 1));
    return;
  }
  res.writeHead(status, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream', 'Accept-Ranges': 'bytes' });
  res.end(body);
}).listen(port, () => console.log(`${dir} on http://localhost:${port}`));
