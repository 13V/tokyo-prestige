import { cars, card, dealer, esc, icon, layout, money } from "../lib.mjs";

const BODY_ORDER = ["Sedan", "SUV & 4WD", "Wagon", "People mover", "Coupe", "Hatch", "Kei truck", "Convertible"];
const opt = (v, label, n) => `<option value="${esc(v)}">${esc(label)}${n != null ? ` (${n})` : ""}</option>`;

// One template for both lists. `soon` is the Coming soon page.
export function listPage({ soon = false } = {}) {
  const list = cars.filter((c) => (soon ? c.status === "coming-soon" : c.status !== "coming-soon"));
  const nAvail = cars.filter((c) => c.status === "available").length;
  const nContract = cars.filter((c) => c.status === "under-contract").length;
  const nSoon = cars.filter((c) => c.status === "coming-soon").length;
  const makes = [...new Set(list.map((c) => c.make))].sort();
  const bodies = BODY_ORDER.filter((b) => list.some((c) => c.body === b));
  const models = [...new Map(list.map((c) => [`${c.make}|${c.model}`, c])).values()].sort((a, b) => (a.make + a.model).localeCompare(b.make + b.model));
  const years = [...new Set(list.map((c) => c.year))].sort((a, b) => b - a);
  // counts beside the options are of cars for sale now, the same numbers the homepage search shows
  const count = (fn) => list.filter((c) => (soon ? true : c.status === "available")).filter(fn).length;
  // default order: just arrived first, then newest
  const rank = (c) => (c.status === "available" ? 0 : c.status === "under-contract" ? 2 : 0) + (c.badge === "Just Arrived" ? -1 : 0);
  const sorted = [...list].sort((a, b) => rank(a) - rank(b) || b.year - a.year || (b.price || 0) - (a.price || 0));
  // Coming soon has no prices or arrival dates to order by, so it opens on a mix: one of each body in turn
  if (soon) {
    const groups = BODY_ORDER.map((b) => sorted.filter((c) => c.body === b && c.status === "coming-soon"));
    const held = sorted.filter((c) => c.status !== "coming-soon");
    sorted.length = 0;
    for (let i = 0; groups.some((g) => g[i]); i++) groups.forEach((g) => g[i] && sorted.push(g[i]));
    sorted.push(...held);
  }

  const sel = (id, name, label, any, opts) => `<div class="field"><label for="${id}">${label}</label><select class="select" id="${id}" name="${name}"><option value="">${any}</option>${opts}</select></div>`;
  const fMake = sel("f-make", "make", "Make", "Any make", makes.map((m) => opt(m, m, count((c) => c.make === m))).join(""));
  const fModel = sel("f-model", "model", "Model", "Any model", models.map((c) => `<option value="${esc(c.model)}" data-make="${esc(c.make)}">${esc(c.make)} ${esc(c.model)}</option>`).join(""));
  const fBody = sel("f-body", "body", "Body", "Any body", bodies.map((b) => opt(b, b, count((c) => c.body === b))).join(""));
  const fYear = sel("f-year", "year", "Year, from", "Any year", years.map((y) => opt(y, `${y} or newer`)).join(""));
  const fMax = soon ? "" : sel("f-max", "max", "Price, up to", "Any price", [20000, 30000, 40000, 50000, 75000, 100000].map((p) => opt(p, `Under ${money(p)}`)).join(""));
  const fKm = sel("f-km", "km", "Kilometres, up to", "Any kilometres", [20000, 50000, 80000, 100000, 150000].map((k) => opt(k, `Under ${k.toLocaleString("en-AU")} km`)).join(""));
  const fTrans = sel("f-trans", "trans", "Gearbox", "Any gearbox", opt("Automatic", "Automatic", count((c) => c.transmissionType === "Automatic")) + opt("Manual", "Manual", count((c) => c.transmissionType === "Manual")));
  const fStatus = soon ? "" : sel("f-status", "status", "Status", `Available (${nAvail})`, opt("all", "Available and under contract", nAvail + nContract) + opt("under-contract", "Under contract", nContract));
  // the first row is what most people use; the rest sits behind "More filters" on a desk
  const filters = `
      <div class="flt__field flt__field--q">
        <label class="vh" for="f-q">Model, grade or model code</label>
        ${icon.search}
        <input class="input" id="f-q" name="q" type="search" placeholder="Model or code: Crown, GT-R, JZS171" autocomplete="off" enterkeyhint="search">
      </div>
      <div class="flt__grid flt__grid--main">${fMake}${fBody}${soon ? fYear : fMax}</div>
      <button class="flt__more-btn" type="button" data-flt-more aria-expanded="false" aria-controls="flt-more">More filters <span class="flt__n num" data-flt-more-n hidden></span></button>
      <div class="flt__grid flt__grid--more" id="flt-more" data-flt-more-box>${fModel}${soon ? "" : fYear}${fKm}${fTrans}${fStatus}</div>`;

  const body = `
<div class="lst" data-list data-mode="${soon ? "soon" : "stock"}">
  <header class="wrap lst__head">
    <div class="lst__title">
      <h1 class="display">${soon ? "Coming soon" : "Stock"}</h1>
      <p class="jp" lang="ja">${soon ? "入荷予定" : "在庫車"}</p>
    </div>
    <p class="lede">${
      soon
        ? `<span class="num">${nSoon}</span> cars bought in Japan and on their way to Adelaide. They are not priced yet. Find one you like and ask to be told when it lands.`
        : `<span class="num">${nAvail}</span> cars you can see and drive today. Prices are plus on-road costs.`
    }</p>
    <nav class="lst__tabs" aria-label="Stock lists">
      <a href="/stock"${soon ? "" : ' aria-current="page"'}>In stock <span class="num">${nAvail}</span></a>
      <a href="/coming-soon"${soon ? ' aria-current="page"' : ""}>Coming soon <span class="num">${nSoon}</span></a>
    </nav>
  </header>

  <div class="flt" data-flt>
    <div class="wrap flt__bar">
      <button class="btn btn--quiet flt__open" type="button" data-flt-open aria-haspopup="dialog">${icon.search} Search and filter <span class="flt__n num" data-flt-n hidden></span></button>
      <p class="flt__count" aria-live="polite"><b class="num" data-tally>${soon ? list.length : nAvail}</b> <span data-tally-w>cars</span></p>
      <div class="field flt__sort"><label class="vh" for="f-sort">Sort by</label><select class="select" id="f-sort" name="sort" form="flt-form">
        <option value="">Sort: newest arrivals</option>${soon ? "" : `<option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option>`}<option value="km-asc">Kilometres: low to high</option><option value="year-desc">Year: newest first</option><option value="year-asc">Year: oldest first</option>
      </select></div>
    </div>
    <div class="wrap flt__inline" data-flt-inline>
      <form id="flt-form" class="flt__form" data-flt-form action="${soon ? "/coming-soon" : "/stock"}" method="get" role="search" aria-label="Search and filter the cars">
        <div class="flt__sheet-head"><h2 class="h3">Search and filter</h2><button class="flt__x" type="button" data-flt-close aria-label="Close filters">${icon.close}</button></div>
        <div class="flt__body">${filters}</div>
        <div class="flt__foot">
          <button class="btn btn--ghost" type="reset" data-flt-reset>Clear all</button>
          <button class="btn btn--shu" type="submit" data-flt-apply><span>Show <span class="num" data-tally>${soon ? list.length : nAvail}</span> <span data-tally-w>cars</span></span></button>
        </div>
      </form>
    </div>
    <dialog class="flt__sheet" data-flt-sheet aria-label="Search and filter"></dialog>
    <div class="wrap flt__chips" data-chips hidden></div>
  </div>
  <noscript><p class="wrap fine" style="margin-top:12px">Every car is listed below. Searching and filtering need JavaScript.</p></noscript>

  <div class="wrap">
    <div class="cards cards--list" data-grid>
      ${sorted.map((c, i) => card(c, { lazy: i > 1, h: 2 })).join("\n")}
    </div>
    <p class="lst__more-row" data-more hidden><button class="btn btn--ghost" type="button" data-more-btn>Show more cars ${icon.arrow}</button><span class="plate num" data-more-n></span></p>
    <div class="lst__empty" data-empty hidden>
      <h2 class="h3">No cars match that.</h2>
      <p class="lede">Try a wider search${soon ? "" : ", or look at what is coming soon"}. If you are after something in particular, tell the team and they will look for it.</p>
      <p class="lst__empty-acts"><button class="btn btn--ghost" type="button" data-flt-reset>Clear all filters</button>${soon ? "" : `<a class="btn btn--quiet" href="/coming-soon">See ${nSoon} cars coming soon</a>`}<a class="btn btn--quiet" href="/contact">Tell us what you want</a></p>
    </div>
  </div>

  ${
    soon
      ? `<section class="sec sec--tight" aria-labelledby="alert-h" id="alert">
    <div class="wrap alert">
      <div class="alert__txt">
        <p class="eyebrow">Stock alert</p>
        <h2 class="h2" id="alert-h">Tell me when one lands.</h2>
        <p class="lede">Name the make and model you are waiting for. The team will contact you when one arrives in Adelaide, whether it is on this list or not.</p>
        <p class="fine">Arrival dates are not listed here. Ask about a particular car and the team will tell you where it is up to.</p>
      </div>
      <form class="form" data-form novalidate action="#alert" method="post" data-endpoint="" data-done="You are on the list. The team will be in touch when one lands.">
        <!-- HOOK: set data-endpoint to the real lead endpoint. Until then the form validates and shows its thank-you state, and sends nothing. -->
        <input type="hidden" name="source" value="stock-alert">
        <div class="form__two">
          <div class="field"><label for="al-make">Make</label><select class="select" id="al-make" name="make"><option value="">Any make</option>${[...new Set(cars.map((c) => c.make))].sort().map((m) => opt(m, m)).join("")}</select></div>
          <div class="field"><label for="al-model">Model, grade or code</label><input class="input" id="al-model" name="model" placeholder="For example Crown Athlete, JZS171"></div>
        </div>
        <div class="form__two">
          <div class="field"><label for="al-name">Name</label><input class="input" id="al-name" name="name" autocomplete="name" required><p class="field__err" hidden>Please add your name.</p></div>
          <div class="field"><label for="al-contact">Mobile or email</label><input class="input" id="al-contact" name="contact" autocomplete="tel" inputmode="email" required><p class="field__err" hidden>Add a mobile number or an email so the team can reach you.</p></div>
        </div>
        <button class="btn btn--shu form__go" type="submit">Tell me when it lands ${icon.arrow}</button>
      </form>
    </div>
  </section>`
      : `<section class="sec sec--tight">
    <div class="wrap lst__more">
      <div><p class="eyebrow">Not here yet?</p><h2 class="h2">${nSoon} more cars are on the way.</h2></div>
      <a class="btn btn--ghost" href="/coming-soon">See what is coming ${icon.arrow}</a>
    </div>
  </section>`
  }
</div>
`;
  const ld = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: soon ? "Cars coming soon to Tokyo Prestige" : "Cars in stock at Tokyo Prestige",
    numberOfItems: list.length,
    itemListElement: sorted.slice(0, 30).map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.title, url: `https://www.tokyoprestige.com.au/cars/${c.slug}` })),
  };
  return layout({
    title: soon ? "Coming soon: Japanese imports on their way to Adelaide | Tokyo Prestige" : "Stock: Japanese import cars for sale in Adelaide | Tokyo Prestige",
    description: soon
      ? `${nSoon} Japanese import cars on their way to Tokyo Prestige in ${dealer.suburb}, Adelaide. Ask to be told when one lands.`
      : `${nAvail} Japanese import and prestige cars available now at Tokyo Prestige, ${dealer.street}, ${dealer.suburb}. Search by make, model code, body, price and kilometres.`,
    path: soon ? "/coming-soon" : "/stock",
    body,
    css: ["/assets/css/stock.css"],
    js: ["/assets/js/stock.js"],
    head: `<script type="application/ld+json">${JSON.stringify(ld)}</script>\n`,
  });
}
