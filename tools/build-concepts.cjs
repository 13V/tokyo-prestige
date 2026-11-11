// Renders the design directions to handover/design-directions.pdf (A to E) and design-directions-2.pdf (J to L).
// Needs the local preview running: node tools/serve.mjs 4173
const { chromium } = require("playwright");
const path = require("path");
const ROOT = path.dirname(__dirname);
const B = "http://localhost:4173";
(async () => {
  const br = await chromium.launch();
  const shot = async (url, file, phone, wait = 900, before) => {
    const ctx = await br.newContext(phone ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true } : { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.5 });
    const p = await ctx.newPage();
    await p.goto(B + url, { waitUntil: "networkidle" });
    await p.waitForTimeout(wait);
    if (before) await before(p);
    await p.screenshot({ path: path.join(ROOT, "concepts/shots", file), type: "jpeg", quality: 82 });
    await ctx.close();
  };
  // A (the showroom at night) was the first build; its shots are kept as they were (git tag direction-a-showroom-at-night).
  // J (the figures) is the live site now, so its shots come from the site itself.
  await shot("/", "j-desktop.jpg", false, 2500, async (p) => { await p.setViewportSize({ width: 1440, height: 1200 }); await p.addStyleTag({ content: "[data-reveal],[data-reveal]>*{opacity:1!important;transform:none!important;clip-path:none!important}" }); await p.waitForTimeout(900); });
  await shot("/", "j-phone-home.jpg", true, 2500);
  await shot("/cars/2001-nissan-skyline-gt-r-bnr34-512", "j-phone-car.jpg", true, 2500);
  for (const k of ["c", "d"]) {
    await shot(`/concepts/${k}`, `${k}-desktop.jpg`, false);
    await shot(`/concepts/${k}?s=home`, `${k}-phone-home.jpg`, true);
    await shot(`/concepts/${k}?s=car`, `${k}-phone-car.jpg`, true);
  }
  await shot("/concepts/e", "e-desktop.jpg", false);
  await shot("/concepts/e?mode=dark", "e-desktop-dark.jpg", false);
  await shot("/concepts/e?s=home", "e-phone-home.jpg", true);
  await shot("/concepts/e?s=car&mode=dark", "e-phone-car.jpg", true);
  for (const k of ["k", "l"]) {
    await shot(`/concepts/${k}`, `${k}-desktop.jpg`, false, 900, (p) => p.setViewportSize({ width: 1440, height: 1200 }));
    await shot(`/concepts/${k}?s=home`, `${k}-phone-home.jpg`, true);
    await shot(`/concepts/${k}?s=car`, `${k}-phone-car.jpg`, true);
  }
  const p2 = await br.newPage();
  await p2.goto(B + "/concepts/board2", { waitUntil: "networkidle" });
  await p2.waitForTimeout(800);
  await p2.pdf({ path: path.join(ROOT, "handover/design-directions-2.pdf"), format: "A4", landscape: true, printBackground: true, preferCSSPageSize: true });
  const p = await br.newPage();
  await p.goto(B + "/concepts/board", { waitUntil: "networkidle" });
  await p.waitForTimeout(800);
  await p.pdf({ path: path.join(ROOT, "handover/design-directions.pdf"), format: "A4", landscape: true, printBackground: true, preferCSSPageSize: true });
  await br.close();
  console.log("wrote handover/design-directions.pdf");
})();
