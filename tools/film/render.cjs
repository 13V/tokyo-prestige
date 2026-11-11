// node render.cjs stills 5,12,20   -> preview frames in out/   |   node render.cjs video [from] [to] -> frames piped to ffmpeg
const { chromium } = require("playwright"); const { spawn } = require("child_process"); const fs = require("fs"); const path = require("path");
const http = require("http");
const D = __dirname, OUT = D + "/out"; fs.mkdirSync(OUT, { recursive: true });
const mime = { ".html": "text/html", ".png": "image/png", ".jpg": "image/jpeg", ".mp4": "video/mp4", ".woff2": "font/woff2" };
const srv = http.createServer((q, r) => { const f = path.join(D, decodeURIComponent(q.url.split("?")[0])); if (!f.startsWith(D) || !fs.existsSync(f)) { r.writeHead(404); return r.end(); } const st = fs.statSync(f); const rg = q.headers.range; if (rg) { const [s, e] = rg.replace("bytes=", "").split("-"); const a = +s, b = e ? +e : st.size - 1; r.writeHead(206, { "Content-Type": mime[path.extname(f)], "Content-Range": `bytes ${a}-${b}/${st.size}`, "Accept-Ranges": "bytes", "Content-Length": b - a + 1 }); fs.createReadStream(f, { start: a, end: b }).pipe(r); } else { r.writeHead(200, { "Content-Type": mime[path.extname(f)] || "application/octet-stream", "Content-Length": st.size, "Accept-Ranges": "bytes" }); fs.createReadStream(f).pipe(r); } });
(async () => {
  await new Promise((r) => srv.listen(4188, r));
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  p.on("pageerror", (e) => console.error("PAGE", e.message));
  await p.goto("http://localhost:4188/film.html", { waitUntil: "networkidle" });
  await p.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map((i) => i.decode().catch(() => {}))); });
  const mode = process.argv[2];
  if (mode === "stills") { for (const t of process.argv[3].split(",").map(Number)) { await p.evaluate((t) => window.seek(t), t); await p.screenshot({ path: `${OUT}/s-${String(t).padStart(5, "0")}.jpg`, type: "jpeg", quality: 80 }); } }
  else if (mode === "cues") { fs.writeFileSync(OUT + "/cues.json", JSON.stringify(await p.evaluate(() => ({ cues: window.CUES, T: window.T })))); }
  else { const { T, FPS } = await p.evaluate(() => ({ T: window.T, FPS: window.FPS })); const from = +(process.argv[3] || 0), to = +(process.argv[4] || T); const out = process.argv[5] || `${OUT}/video.mp4`;
    const ff = spawn("ffmpeg", ["-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "mjpeg", "-i", "-", "-c:v", "libx264", "-preset", "medium", "-crf", "17", "-pix_fmt", "yuv420p", "-r", String(FPS), out], { stdio: ["pipe", "inherit", "inherit"] });
    const n0 = Math.round(from * FPS), n1 = Math.round(to * FPS);
    for (let n = n0; n < n1; n++) { await p.evaluate((t) => window.seek(t), n / FPS); const buf = await p.screenshot({ type: "jpeg", quality: 95 }); if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once("drain", r)); if (n % 300 === 0) console.log("frame", n, "/", n1); }
    ff.stdin.end(); await new Promise((r) => ff.on("close", r)); }
  await b.close(); srv.close();
})().catch((e) => { console.error(e); process.exit(1); });
