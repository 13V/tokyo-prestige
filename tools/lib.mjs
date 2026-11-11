// Shared pieces for the page generator: the dealer's facts, the layout and the car card.
// Every fact here is from tokyoprestige.com.au as read on 11 Nov 2026 (research/client.md).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
export const stock = JSON.parse(fs.readFileSync(path.join(ROOT, "data/stock.json"), "utf8"));
export const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, "img/manifest.json"), "utf8"));
export const cars = stock.cars;

export const dealer = {
  name: "Tokyo Prestige",
  licence: "MVD 287394",
  phone: "08 8336 4674",
  tel: "+61883364674",
  email: "sales@tokyoprestige.com.au",
  street: "216-218 Kensington Road",
  suburb: "Marryatville",
  state: "SA",
  postcode: "5068",
  hours: [
    ["Monday to Friday", "9am to 5pm"],
    ["Saturday", "9am to 3pm"],
    ["Sunday", "Closed"],
  ],
  maps: "https://maps.app.goo.gl/vRRyn1NrmRzM95qD7",
  facebook: "https://www.facebook.com/Tokyoprestige/",
};

// Katakana for the model names, each checked against the maker's Japanese site or Japanese Wikipedia
// (research/evidence/import-rules.md, section 3). A model not listed here gets no caption.
export const KATAKANA = {
  "Skyline GT-R": "スカイライン GT-R",
  Skyline: "スカイライン",
  "Skyline Coupe": "スカイライン クーペ",
  Crown: "クラウン",
  "Crown Hybrid": "クラウン ハイブリッド",
  "Crown Majesta": "クラウン マジェスタ",
  "Crown Estate": "クラウン エステート",
  "Crown Crossover": "クラウン クロスオーバー",
  "Crown Sport": "クラウン スポーツ",
  "Crown Sedan": "クラウン セダン",
  Century: "センチュリー",
  Celsior: "セルシオ",
  "Alphard Hybrid": "アルファード ハイブリッド",
  "Voxy Hybrid": "ヴォクシー ハイブリッド",
  "Land Cruiser 100": "ランドクルーザー 100",
  "Mark X": "マークX",
  "Legacy B4": "レガシィ B4",
  "Legacy Touring Wagon": "レガシィ ツーリングワゴン",
  MR2: "MR2",
  "MR-S": "MR-S",
  "Odyssey Hybrid": "オデッセイ ハイブリッド",
  Serena: "セレナ",
  Carry: "キャリイ",
  "Super Carry": "スーパーキャリイ",
  Ignis: "イグニス",
  "Corolla Touring": "カローラ ツーリング",
};

export const esc = (s) =>
  String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
export const money = (n) => "$" + Number(n).toLocaleString("en-AU");
export const km = (n) => Number(n).toLocaleString("en-AU");
export const carUrl = (c) => `/cars/${c.slug}`;
export const STATUS = {
  available: { label: "Available", cls: "", long: "Available now at Marryatville" },
  "under-contract": { label: "Under contract", cls: " status--contract", long: "Under contract" },
  "coming-soon": { label: "Coming soon", cls: " status--soon", long: "Coming soon, on its way from Japan" },
};

export const icon = {
  arrow: `<svg class="arr" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M3 9h12M10 4l5 5-5 5"/></svg>`,
  phone: `<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3.2 2.5h3l1.3 3.4-1.8 1.3a9 9 0 0 0 5.1 5.1l1.3-1.8 3.4 1.3v3a1 1 0 0 1-1.1 1A13.3 13.3 0 0 1 2.2 3.600a1 1 0 0 1 1-1.100Z"/></svg>`,
  msg: `<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M2.5 3.500h13v9h-7l-3.500 3v-3h-2.500z"/></svg>`,
  key: `<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="5.500" cy="12.500" r="3"/><path d="m7.700 10.300 7.800-7.800M12.500 5.500l2 2M10.500 7.500l1.500 1.500"/></svg>`,
  search: `<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="8" cy="8" r="5"/><path d="m12 12 4 4"/></svg>`,
  expand: `<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3 7V3h4M15 7V3h-4M3 11v4h4M15 11v4h-4"/></svg>`,
  close: `<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m4 4 10 10M14 4 4 14"/></svg>`,
  chev: `<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m7 4 5 5-5 5"/></svg>`,
  video: `<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="2" y="4.500" width="10" height="9" rx="1"/><path d="m12 8 4-2v6l-4-2"/></svg>`,
  check: `<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="m3.500 9.500 3.500 3.500 7.500-8"/></svg>`,
  pin: `<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M9 16s5-4.600 5-8.500a5 5 0 0 0-10 0C4 11.400 9 16 9 16Z"/><circle cx="9" cy="7.500" r="1.800"/></svg>`,
};

// One photo of a car as responsive AVIF. `n` is the photo number (from 1).
export function photo(c, n, { sizes, lazy = true, cls = "", alt, fetchpriority, max = 1600 } = {}) {
  const m = manifest[c.id]?.[String(n)];
  if (!m) return "";
  const ws = m.sizes.filter((w) => w <= max);
  const srcset = ws.map((w) => `/img/cars/${c.id}/${n}-${w}.avif ${w}w`).join(", ");
  const mid = ws.includes(960) ? 960 : ws[ws.length - 1];
  const p = c.photos[n - 1];
  const a = alt ?? `${c.title}${c.colour ? ", " + c.colour.toLowerCase() : ""}${p?.angle ? ": " + p.angle : ""}`;
  return `<img src="/img/cars/${c.id}/${n}-${mid}.avif" srcset="${srcset}" sizes="${sizes || "100vw"}" width="${m.w}" height="${m.h}" alt="${esc(a)}"${lazy ? ' loading="lazy"' : ""} decoding="async"${fetchpriority ? ` fetchpriority="${fetchpriority}"` : ""}${cls ? ` class="${cls}"` : ""}>`;
}

export function facts(c) {
  const f = [];
  if (c.km != null) f.push(`${km(c.km)} km`);
  if (c.transmission) f.push(c.transmission);
  if (c.drivetrain) f.push(c.drivetrain);
  return f;
}

// The stock card. The first photo is in the HTML; the other angles are named in data-angles and
// fetched by tp.js only when the card is hovered or scrolled past.
// "6-speed manual" reads as a large 6 with "speed manual" beside it; anything else as a word and its rest
export function gear(c) {
  const t = c.transmission;
  if (!t) return null;
  const m = /^(\d+)-speed (.+)$/.exec(t);
  if (m) return [m[1], "speed " + m[2]];
  const i = t.indexOf(" ");
  return i < 0 ? [t, ""] : [t.slice(0, i), t.slice(i + 1)];
}
// One figure: the label comes first for a screen reader and sits under the value on screen
export const fig = (label, value, unit = "", attrs = "") => `<div class="fig"><span class="fig__l">${label}</span><b class="num"${attrs}>${value}${unit ? `<small>${unit}</small>` : ""}</b></div>`;

export function card(c, { sizes = "(min-width: 1100px) 320px, (min-width: 700px) 46vw, 92vw", lazy = true, h = 3 } = {}) {
  const st = STATUS[c.status];
  const angles = c.photos.map((_, i) => i + 1).filter((n) => manifest[c.id]?.[String(n)]);
  const price = c.price
    ? `<p class="card__price"><b class="num">${money(c.price)}</b><small>${esc((c.priceNote || "").toLowerCase())}</small></p>`
    : `<p class="card__price"><small>${c.status === "coming-soon" ? "Price on arrival" : "Under contract"}</small></p>`;
  return `<article class="card" data-card data-id="${c.id}" data-make="${esc(c.make)}" data-model="${esc(c.model)}" data-body="${esc(c.body)}" data-year="${c.year}" data-price="${c.price ?? ""}" data-km="${c.km ?? ""}" data-trans="${esc(c.transmissionType ?? "")}" data-status="${c.status}" data-q="${esc([c.make, c.model, c.modelCode, c.grade, c.year, c.body, c.colour, c.titleAsListed].filter(Boolean).join(" ").toLowerCase())}" data-angles="${angles.join(",")}">
  <div class="shot card__shot">${photo(c, 1, { sizes, lazy, max: 960 })}
    <div class="card__top"><span class="status${st.cls}">${st.label}</span>${c.badge ? `<span class="card__tag">${esc(c.badge)}</span>` : c.reserved ? `<span class="card__tag card__tag--quiet">Under contract</span>` : ""}</div>
    <div class="card__ticks" aria-hidden="true">${angles.map((_, i) => `<i${i === 0 ? ' class="is-on"' : ""}></i>`).join("")}</div>
  </div>
  <div class="card__body">
    <p class="code card__code"><span>${esc(c.modelCode || c.body)}</span><span class="num">${c.year}</span></p>
    <h${h} class="card__title"><a href="${carUrl(c)}">${esc(c.make)} ${esc(c.model)}</a></h${h}>
    <p class="card__grade">${c.grade ? esc(c.grade) : "&nbsp;"}</p>
    <p class="card__facts num">${facts(c)
      .map((f) => `<span>${esc(f)}</span>`)
      .join("")}</p>
    ${price}
    <p class="card__sub">${[c.modelCode, c.grade, c.transmission].filter(Boolean).map(esc).join(" · ") || esc(c.body)}</p>
    <div class="figs card__figs">${fig("Year", c.year)}${fig("Kilometres", c.km != null ? km(c.km) : "&ndash;", c.km != null ? "km" : "")}${c.price ? fig(esc(c.priceNote || "Price"), money(c.price)) : `<div class="fig fig--word"><span class="fig__l">Price</span><b>${c.status === "coming-soon" ? "On arrival" : "Under contract"}</b></div>`}</div>
  </div>
  <a class="card__ask" href="${carUrl(c)}#quick" aria-label="${c.status === "coming-soon" ? "Tell me when the" : "Enquire about the"} ${c.year} ${esc(c.make)} ${esc(c.model)}${c.status === "coming-soon" ? " lands" : ""}">${c.status === "coming-soon" ? "Notify me" : "Enquire"}</a>
</article>`;
}

const NAV = [
  ["/stock", "Stock"],
  ["/coming-soon", "Coming soon"],
  ["/importing", "How importing works"],
  ["/finance", "Finance"],
  ["/servicing", "Servicing"],
  ["/about", "About"],
  ["/contact", "Contact"],
];

export function layout({ title, description, path: p, body, css = [], js = [], head = "", solidHeader = true, dock = false, bodyClass = "" }) {
  const nav = NAV.map(([h, l]) => `<a href="${h}"${p === h ? ' aria-current="page"' : ""}>${l}</a>`).join("");
  const counts = { a: cars.filter((c) => c.status === "available").length, s: cars.filter((c) => c.status === "coming-soon").length };
  return `<!doctype html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="theme-color" content="#060607">
<meta name="format-detection" content="telephone=no">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/fonts/archivo-var.woff2" as="font" type="font/woff2" crossorigin>
<script>!function(d){d.classList.add("js");try{var q=new URLSearchParams(location.search).get("look"),l=q||localStorage.getItem("tp-look");if(q)localStorage.setItem("tp-look",q);if(l==="figures")d.dataset.look="figures"}catch(e){}}(document.documentElement)</script>
${head}<link rel="stylesheet" href="/assets/css/tp.css">
${css.map((h) => `<link rel="stylesheet" href="${h}">`).join("\n")}
<script>document.documentElement.dataset.look==="figures"&&document.write('<link rel="stylesheet" href="/assets/css/figures.css" data-figures>')</script>
</head>
<body class="${[dock ? "has-dock" : "", bodyClass].filter(Boolean).join(" ")}">
<a class="skip" href="#main">Skip to content</a>
<header class="hdr${solidHeader ? " hdr--solid" : ""}" data-hdr>
  <div class="wrap hdr__in">
    <a class="brand" href="/" aria-label="Tokyo Prestige, home"><img class="brand__mark" src="/assets/img/tp-mark.png" width="255" height="149" alt=""><span class="brand__name">Tokyo <span>Prestige</span></span></a>
    <nav class="nav" aria-label="Main">${nav}</nav>
    <div class="look" role="group" aria-label="Site design" data-look><button type="button" data-look-set="night" aria-pressed="true">Night</button><button type="button" data-look-set="figures" aria-pressed="false">Figures</button></div>
    <span class="hdr__lic">${dealer.licence}</span>
    <a class="hdr__call" href="tel:${dealer.tel}" aria-label="Call Tokyo Prestige on ${dealer.phone}">${icon.phone}<span class="num">${dealer.phone}</span></a>
    <details class="menu" data-menu>
      <summary aria-label="Menu"><span class="menu__ico" aria-hidden="true"></span></summary>
      <div class="menu__sheet">
        ${NAV.map(([h, l]) => `<a class="menu__link" href="${h}"${p === h ? ' aria-current="page"' : ""}>${l}${h === "/stock" ? `<span class="plate num">${counts.a} available</span>` : h === "/coming-soon" ? `<span class="plate num">${counts.s} on the way</span>` : ""}</a>`).join("\n        ")}
        <a class="menu__link" href="/faq">Questions</a>
        <div class="menu__meta">
          <div class="look look--menu" role="group" aria-label="Site design" data-look><button type="button" data-look-set="night" aria-pressed="true">Night</button><button type="button" data-look-set="figures" aria-pressed="false">Figures</button></div>
          <a class="btn btn--shu" href="tel:${dealer.tel}">${icon.phone} Call ${dealer.phone}</a>
          <p>${dealer.street}, ${dealer.suburb} ${dealer.state} ${dealer.postcode}</p>
          <p class="plate">Licensed dealer ${dealer.licence}</p>
        </div>
      </div>
    </details>
  </div>
</header>
<main id="main">
${body}
</main>
<footer class="ftr">
  <div class="wrap">
    <div class="ftr__grid">
      <div>
        <img class="ftr__logo" src="/assets/img/tp-logo.png" width="255" height="203" alt="Tokyo Prestige" loading="lazy">
        <p class="jp" lang="ja">東京からアデレードへ</p>
        <p class="ftr__big" style="margin-top:12px">${dealer.street}<br>${dealer.suburb} ${dealer.state} ${dealer.postcode}</p>
        <p style="margin-top:12px"><a class="link" href="${dealer.maps}" rel="noopener">Open in Maps ${icon.arrow.replace('class="arr"', 'class="arr" width="16" height="16"')}</a></p>
      </div>
      <div>
        <h2>Cars</h2>
        <ul><li><a href="/stock">Stock</a></li><li><a href="/coming-soon">Coming soon</a></li><li><a href="/importing">How importing works</a></li><li><a href="/finance">Finance</a></li></ul>
      </div>
      <div>
        <h2>Tokyo Prestige</h2>
        <ul><li><a href="/about">About</a></li><li><a href="/servicing">Servicing</a></li><li><a href="/faq">Questions</a></li><li><a href="/contact">Contact</a></li></ul>
      </div>
      <div>
        <h2>Talk to us</h2>
        <ul>
          <li><a class="num" href="tel:${dealer.tel}">${dealer.phone}</a></li>
          <li><a href="mailto:${dealer.email}">${dealer.email}</a></li>
          ${dealer.hours.map(([d, h]) => `<li style="min-height:28px">${d}: ${h}</li>`).join("")}
        </ul>
      </div>
    </div>
    <div class="ftr__legal">
      <span>Licensed second-hand vehicle dealer <b>${dealer.licence}</b></span>
      <span>Prices are as listed by Tokyo Prestige, plus on-road costs unless stated.</span>
      <span>Demonstration site by Lumen adl. Not the live Tokyo Prestige website.</span>
    </div>
  </div>
</footer>
<script src="/assets/js/tp.js" defer></script>
${js.map((s) => `<script src="${s}" defer></script>`).join("\n")}
</body>
</html>
`;
}

// The dealership as structured data, from the facts on their Contact page.
export function dealerLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "@id": "https://www.tokyoprestige.com.au/#dealer",
    name: dealer.name,
    url: "https://www.tokyoprestige.com.au/",
    telephone: dealer.tel,
    email: dealer.email,
    address: { "@type": "PostalAddress", streetAddress: dealer.street, addressLocality: dealer.suburb, addressRegion: dealer.state, postalCode: dealer.postcode, addressCountry: "AU" },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "17:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "15:00" },
    ],
    sameAs: [dealer.facebook],
  };
}

export function write(rel, html) {
  const f = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, html);
}
