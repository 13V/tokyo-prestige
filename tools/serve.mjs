#!/usr/bin/env node
// Local preview that serves the way Vercel does with cleanUrls: /stock is stock.html.
//   node tools/serve.mjs 4173
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";
const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const TYPES = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".mjs": "text/javascript", ".json": "application/json", ".svg": "image/svg+xml", ".avif": "image/avif", ".webp": "image/webp", ".jpg": "image/jpeg", ".png": "image/png", ".woff2": "font/woff2", ".mp4": "video/mp4", ".ico": "image/x-icon" };
const port = Number(process.argv[2]) || 4173;
http
  .createServer((req, res) => {
    let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (p.endsWith("/")) p += "index";
    let f = path.join(ROOT, p);
    if (!f.startsWith(ROOT)) return res.writeHead(403).end();
    if (!path.extname(f)) f += ".html";
    fs.readFile(f, (err, buf) => {
      if (err) {
        res.writeHead(404, { "content-type": "text/html; charset=utf-8" });
        return res.end(fs.existsSync(path.join(ROOT, "404.html")) ? fs.readFileSync(path.join(ROOT, "404.html")) : "Not found");
      }
      const ext = path.extname(f);
      const head = { "content-type": TYPES[ext] || "application/octet-stream", "cache-control": ext === ".html" ? "no-cache" : "public, max-age=600" };
      // text is compressed, as Vercel does
      if ([".html", ".css", ".js", ".json", ".svg"].includes(ext) && /gzip/.test(req.headers["accept-encoding"] || "")) {
        head["content-encoding"] = "gzip";
        buf = zlib.gzipSync(buf);
      }
      res.writeHead(200, head);
      res.end(buf);
    });
  })
  .listen(port, () => console.log(`http://localhost:${port}`));
