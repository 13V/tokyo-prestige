// Captures the stills the proposal film is built from, off the local preview server (node tools/serve.mjs 4173).
const { chromium } = require("playwright");
const fs = require("fs");
const O = __dirname + "/shots/", B = "http://localhost:4173";
const CAR = "/cars/2001-nissan-skyline-gt-r-bnr34-512";
const meta = {};
const settle = async (p) => { await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } scrollTo(0, 0); }); await p.waitForTimeout(700); };
const rect = (p, sel) => p.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.x, y: r.y + scrollY, w: r.width, h: r.height }; }, sel);
(async () => {
  const b = await chromium.launch();
  const ctx = async (vp, dpr, mobile) => { const c = await b.newContext({ viewport: vp, deviceScaleFactor: dpr, isMobile: !!mobile, hasTouch: !!mobile }); await c.addInitScript(() => { try { sessionStorage.setItem("tp-intro", "1"); } catch (e) {} }); return c; };

  // 1. hero, full bleed 1920x1080
  let c = await ctx({ width: 1920, height: 1080 }, 1), p = await c.newPage();
  await p.goto(B + "/", { waitUntil: "networkidle" }); await p.waitForTimeout(1500);
  await p.addStyleTag({ content: ".hs__alive{display:none!important} .feat__bar i{animation:none!important;transition:none!important}" });
  await p.evaluate(() => { const t = document.querySelector("[data-feat-toggle]"); if (t && !t.hidden) t.click(); });
  await p.waitForTimeout(300);
  await p.screenshot({ path: O + "hero.png" });
  meta.hero = { frame: await rect(p, ".hero__frame"), feat: await rect(p, ".feat__car"), go: await rect(p, ".feat__go"), find: await rect(p, ".find") };
  meta.hero.wake = await p.evaluate(() => { const v = document.querySelector(".intro__wake"); v.style.cssText += ";display:block!important;opacity:1!important;visibility:visible!important"; const r = v.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height, mask: getComputedStyle(v).webkitMaskImage || getComputedStyle(v).maskImage }; });
  await p.evaluate(() => { document.querySelector(".intro__wake").style.display = "none"; });
  await p.addStyleTag({ content: ".hero__in{opacity:0!important}" });
  await p.screenshot({ path: O + "hero-bare.png" });
  await c.close();

  // 2. long pages for the browser frame: 1536 wide, drawn at 1.25 (1920 px)
  c = await ctx({ width: 1536, height: 864 }, 1.25); p = await c.newPage();
  for (const [n, u] of [["home", "/"], ["stock", "/stock"], ["car", CAR]]) {
    await p.goto(B + u, { waitUntil: "networkidle" }); await settle(p);
    await p.addStyleTag({ content: ".hdr{position:absolute!important} .flt{position:static!important} .dock{display:none!important} .hs__alive{display:none!important}" });
    await p.waitForTimeout(300);
    const h = await p.evaluate(() => document.documentElement.scrollHeight);
    meta[n] = { h, secs: await p.evaluate(() => [...document.querySelectorAll("main > section, main > div, .find, .car__side, #quick-side, .gal, .nums")].map((e) => { const r = e.getBoundingClientRect(); return { c: e.className.toString().slice(0, 40), id: e.id || (e.getAttribute("aria-labelledby") || ""), y: Math.round(r.y + scrollY), h: Math.round(r.height), x: Math.round(r.x), w: Math.round(r.width) }; })) };
    await p.screenshot({ path: O + n + "-long.jpg", type: "jpeg", quality: 92, fullPage: true, clip: undefined });
  }
  await c.close();

  // 3. one stock card, large
  c = await ctx({ width: 1440, height: 900 }, 4); p = await c.newPage();
  await p.goto(B + "/stock", { waitUntil: "networkidle" }); await p.waitForTimeout(800);
  const card = p.locator(".card", { hasText: "Soarer" }).first();
  await card.scrollIntoViewIfNeeded(); await p.waitForTimeout(600);
  await card.screenshot({ path: O + "card.png" });
  meta.card = await card.evaluate((el) => { const o = el.getBoundingClientRect(); const q = (s) => { const e = el.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.x - o.x, y: r.y - o.y, w: r.width, h: r.height }; }; return { w: o.width, h: o.height, html: el.innerHTML.replace(/<svg[\s\S]*?<\/svg>/g, "").replace(/\s+/g, " ").slice(0, 1500), parts: { status: q(".card__status, .tag, .card__tags"), title: q(".card__title"), code: q(".card__code, .card__meta"), facts: q(".card__facts, .card__spec"), price: q(".card__price"), ask: q(".card__ask") } }; });
  await c.close();

  // 4. phone car page and the instant form
  c = await ctx({ width: 390, height: 844 }, 3, true); p = await c.newPage();
  await p.goto(B + CAR, { waitUntil: "networkidle" }); await p.waitForTimeout(1000);
  await p.screenshot({ path: O + "ph-car-top.png" });
  await p.evaluate(() => { const e = document.querySelector("#quick"); scrollTo(0, e.getBoundingClientRect().top + scrollY - 150); }); await p.waitForTimeout(900);
  await p.screenshot({ path: O + "ph-form-0.png" });
  meta.phForm = { name: await p.evaluate(() => { const r = document.querySelector("#qi-name").getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; }), contact: await p.evaluate(() => { const r = document.querySelector("#qi-contact").getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; }), btn: await p.evaluate(() => { const r = document.querySelector("#quick button[type=submit]").getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; }) };
  await p.fill("#qi-name", "Sam Taylor"); await p.screenshot({ path: O + "ph-form-1.png" });
  await p.fill("#qi-contact", "0400 000 000"); await p.evaluate(() => document.activeElement.blur()); await p.screenshot({ path: O + "ph-form-2.png" });
  await p.click("#quick button[type=submit]"); await p.waitForTimeout(1200);
  await p.screenshot({ path: O + "ph-form-3.png" });
  // phone stock list
  await p.goto(B + "/stock", { waitUntil: "networkidle" }); await p.waitForTimeout(800); await p.evaluate(() => scrollTo(0, 260)); await p.waitForTimeout(600);
  await p.screenshot({ path: O + "ph-stock.png" });
  await c.close();

  // 5. the stock manager
  c = await ctx({ width: 1536, height: 864 }, 1.25); p = await c.newPage();
  await p.goto(B + CAR, { waitUntil: "networkidle" });
  await p.fill("#qs-name", "Sam Taylor"); await p.fill("#qs-contact", "0400 000 000"); await p.click("#quick-side button[type=submit]"); await p.waitForTimeout(600);
  await p.goto(B + "/portal", { waitUntil: "networkidle" }); await p.waitForTimeout(600);
  await p.screenshot({ path: O + "portal-0.png" });
  meta.portal = { tiles: await rect(p, "[data-tiles]"), an: await rect(p, "[data-an]"), list: await rect(p, "[data-list]"), row: await rect(p, "[data-list] > *"), add: await rect(p, "[data-add]") };
  await p.click("[data-add]"); await p.waitForTimeout(400);
  await p.evaluate(() => { const i = document.querySelector("[data-lk-id]"); i.placeholder = ""; }); await p.waitForTimeout(200);
  await p.screenshot({ path: O + "portal-add-0.png" });
  meta.portal.sheet = await rect(p, "[data-form-sheet]"); meta.portal.lk = await rect(p, "[data-lk-id]"); meta.portal.lkgo = await rect(p, "[data-lk-go]");
  await p.fill("[data-lk-id]", "JZS171-0012345"); await p.evaluate(() => { document.querySelectorAll("[data-form-sheet], [data-form-sheet] *").forEach((e) => { e.scrollTop = 0; }); document.activeElement && document.activeElement.blur(); scrollTo(0, 0); }); await p.waitForTimeout(150); await p.screenshot({ path: O + "portal-add-1.png" }); meta.portal.lk1 = await rect(p, "[data-lk-id]"); meta.portal.lkgo1 = await rect(p, "[data-lk-go]");
  await p.click("[data-lk-go]"); await p.waitForTimeout(500); await p.evaluate(() => { document.querySelectorAll("[data-form-sheet], [data-form-sheet] *").forEach((e) => { e.scrollTop = 0; }); document.activeElement && document.activeElement.blur(); scrollTo(0, 0); }); await p.waitForTimeout(150); await p.screenshot({ path: O + "portal-add-2.png" });
  await p.click("[data-form-sheet] .x"); await p.waitForTimeout(300);
  await p.evaluate(() => { const e = document.querySelector("[data-list]"); scrollTo(0, e.getBoundingClientRect().top + scrollY - 190); }); await p.waitForTimeout(400);
  await p.screenshot({ path: O + "portal-list-0.png" });
  meta.portal.listRow = await p.evaluate(() => { const e = document.querySelector("[data-list] > *"); const r = e.getBoundingClientRect(); const s = e.querySelector("[data-sold]").getBoundingClientRect(), a = e.querySelector("[data-adv], [data-ad]"); const ar = a ? a.getBoundingClientRect() : null; return { row: { x: r.x, y: r.y, w: r.width, h: r.height }, sold: { x: s.x, y: s.y, w: s.width, h: s.height }, adv: ar && { x: ar.x, y: ar.y, w: ar.width, h: ar.height }, btns: [...e.querySelectorAll("button")].map((b) => b.outerHTML.slice(0, 80)) }; });
  const advBtn = p.locator("[data-list] > * button", { hasText: "Advertise" }).first();
  await advBtn.click(); await p.waitForTimeout(400); await p.screenshot({ path: O + "portal-ad-0.png" });
  meta.portal.sw = await p.evaluate(() => [...document.querySelectorAll("[data-chans] .sw")].map((e) => { const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height, on: e.getAttribute("aria-checked") }; }));
  meta.portal.adSheet = await rect(p, "[data-ad-sheet]");
  for (const i of [1, 2]) { await p.locator("[data-chans] .sw").nth(i).click(); await p.waitForTimeout(250); await p.screenshot({ path: O + `portal-ad-${i}.png` }); }
  await p.locator("[data-ad-sheet] [data-close]").last().click(); await p.waitForTimeout(300);
  await p.screenshot({ path: O + "portal-list-1.png" });
  await p.locator("[data-list] > * [data-sold]").first().click(); await p.waitForTimeout(500);
  await p.screenshot({ path: O + "portal-list-2.png" });
  await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(300); await p.screenshot({ path: O + "portal-1.png" });
  await c.close();
  fs.writeFileSync(O + "meta.json", JSON.stringify(meta, null, 1));
  await b.close();
})().catch((e) => { console.error(e); process.exit(1); });
