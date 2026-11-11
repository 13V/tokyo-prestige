import { cars, card, dealer, esc, icon, km, layout, money, carUrl, KATAKANA } from "../lib.mjs";

export function home() {
  const hero = cars.find((c) => c.id === "512"); // 2001 Skyline GT-R BNR34: their photo, their price
  const inYard = cars.filter((c) => c.status !== "coming-soon");
  const available = cars.filter((c) => c.status === "available");
  const soon = cars.filter((c) => c.status === "coming-soon");
  const makes = [...new Set(available.map((c) => c.make))].sort();
  const bodies = [...new Set(available.map((c) => c.body))].sort();
  const count = (fn) => available.filter(fn).length;
  // a small index for the live count in the search: make, body, price, status, searchable text
  const index = available.map((c) => [c.make, c.body, c.price || 0, c.status === "available" ? 1 : 0, [c.make, c.model, c.modelCode, c.grade, c.year, c.body].filter(Boolean).join(" ").toLowerCase()]);
  const fresh = [
    ...available.filter((c) => c.badge === "Just Arrived"),
    ...available.filter((c) => ["9942778", "1412", "1453", "1365", "1452", "1442"].includes(c.id)),
  ].slice(0, 8);

  const body = `
<section class="hero" data-hero aria-labelledby="hero-h">
  <div class="hero__stage" aria-hidden="true">
    <div class="hero__frame">
      <img class="hero__img hero__img--room" src="/img/hero/gtr-1280.avif" srcset="/img/hero/gtr-800.avif 800w, /img/hero/gtr-1280.avif 1280w, /img/hero/gtr-1920.avif 1920w, /img/hero/gtr-2560.avif 2560w" sizes="(min-width: 900px) 133vh, 88vh" width="2560" height="1920" alt="" fetchpriority="high" decoding="async">
      <div class="hero__car">
        <img class="hero__img hero__img--car" src="/img/hero/gtr-1280.avif" srcset="/img/hero/gtr-800.avif 800w, /img/hero/gtr-1280.avif 1280w, /img/hero/gtr-1920.avif 1920w, /img/hero/gtr-2560.avif 2560w" sizes="(min-width: 900px) 133vh, 88vh" width="2560" height="1920" alt="" decoding="async">
        <div class="hero__beam"></div>
      </div>
      <div class="hero__lamp"></div>
    </div>
    <div class="hero__shade"></div>
  </div>

  <div class="wrap hero__in">
    <a class="hero__plate" href="${carUrl(hero)}" data-reveal style="--i:9">
      <span class="jp" lang="ja">${KATAKANA[hero.model]}</span>
      <span class="hero__plate-row"><span class="code">${hero.modelCode}</span><span class="num">${hero.year}</span><span class="num">${km(hero.km)} km</span></span>
      <span class="hero__plate-name">Nissan ${esc(hero.model)}</span>
      <span class="hero__plate-row"><b class="num">${money(hero.price)}</b><small>${esc(hero.priceNote.toLowerCase())}</small></span>
      <span class="hero__plate-go">View this car ${icon.arrow}</span>
    </a>

    <div class="hero__copy">
      <p class="jp hero__jp" lang="ja" data-hero-line style="--i:0">東京からアデレードへ</p>
      <h1 class="display" id="hero-h"><span class="hero__l" data-hero-line style="--i:1"><span>Hand-picked in Japan.</span></span> <span class="hero__l" data-hero-line style="--i:2"><span>Here to drive in Adelaide.</span></span></h1>
      <p class="lede hero__lede" data-hero-line style="--i:3"><span class="num">${available.length}</span> cars to see today at Marryatville, <span class="num">${soon.length}</span> more on the way. Serviced, complied and ready to register.</p>
    </div>

    <form class="find" action="/stock" method="get" role="search" aria-label="Search the stock" data-find data-hero-line style="--i:4">
      <input type="hidden" name="status" value="available">
      <div class="find__q">
        <label class="vh" for="q">Model, grade or model code</label>
        ${icon.search}
        <input class="find__input" id="q" name="q" type="search" placeholder="Model or code: Crown, GT-R, JZS171" autocomplete="off" enterkeyhint="search">
      </div>
      <div class="find__sel">
        <label class="vh" for="make">Make</label>
        <select class="select" id="make" name="make">
          <option value="">Any make</option>
          ${makes.map((m) => `<option value="${esc(m)}">${esc(m)} (${count((c) => c.make === m)})</option>`).join("")}
        </select>
      </div>
      <div class="find__sel">
        <label class="vh" for="body">Body</label>
        <select class="select" id="body" name="body">
          <option value="">Any body</option>
          ${bodies.map((b) => `<option value="${esc(b)}">${esc(b)} (${count((c) => c.body === b)})</option>`).join("")}
        </select>
      </div>
      <div class="find__sel">
        <label class="vh" for="max">Budget</label>
        <select class="select" id="max" name="max">
          <option value="">Any price</option>
          ${[20000, 30000, 40000, 50000, 75000, 100000].map((p) => `<option value="${p}">Under ${money(p)}</option>`).join("")}
        </select>
      </div>
      <button class="btn btn--shu find__go" type="submit"><span>Show <span class="num" data-find-n>${available.length}</span> <span data-find-w>cars</span></span> ${icon.arrow}</button>
    </form>
    <script type="application/json" id="find-index">${JSON.stringify(index)}</script>
  </div>
</section>

<section class="sec" aria-labelledby="fresh-h">
  <div class="wrap">
    <div class="sec__head">
      <p class="eyebrow" data-reveal>In the showroom now</p>
      <h2 class="h2" id="fresh-h" data-reveal style="--i:1">Just arrived, and worth a look.</h2>
    </div>
    <div class="cards" data-cards>
      ${fresh.map((c, i) => card(c).replace("<article", `<article data-reveal style="--i:${i % 4}"`)).join("\n")}
    </div>
    <p style="margin-top:32px" data-reveal><a class="btn btn--ghost" href="/stock">See all ${available.length} cars ${icon.arrow}</a></p>
  </div>
</section>
`;
  return layout({
    title: "Tokyo Prestige: Japanese import cars in Adelaide",
    description: `Japanese import cars, hand-picked and ready to drive in Adelaide. ${available.length} cars available at ${dealer.street}, ${dealer.suburb}. Licensed dealer ${dealer.licence}.`,
    path: "/",
    body,
    solidHeader: false,
    css: ["/assets/css/home.css"],
    js: ["/assets/js/home.js"],
    head: `<link rel="preload" as="image" href="/img/hero/gtr-1280.avif" imagesrcset="/img/hero/gtr-800.avif 800w, /img/hero/gtr-1280.avif 1280w, /img/hero/gtr-1920.avif 1920w, /img/hero/gtr-2560.avif 2560w" imagesizes="(min-width: 900px) 133vh, 88vh" fetchpriority="high">\n`,
  });
}
