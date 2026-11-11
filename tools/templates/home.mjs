import { cars, card, dealer, dealerLd, esc, gear, icon, km, layout, manifest, money, carUrl, photo, STATUS } from "../lib.mjs";

// The four cars in the hero, one for each kind of buyer. Each is introduced by the same four figures.
const FEATURED = ["512", "1412", "1452", "9974441"]; // Skyline GT-R, Century, Crown Hybrid, Alphard Hybrid
const SIZES = "(min-width: 900px) 56vw, 100vw";
const srcset = (c) => manifest[c.id]["1"].sizes.map((w) => `/img/cars/${c.id}/1-${w}.avif ${w}w`).join(", ");
const SHORT = { "512": "Skyline GT-R", "1412": "Century", "1452": "Crown<em> Hybrid</em>", "9974441": "Alphard" };

export function home() {
  const feats = FEATURED.map((id) => cars.find((c) => c.id === id));
  const available = cars.filter((c) => c.status === "available");
  const soon = cars.filter((c) => c.status === "coming-soon");
  const makes = [...new Set(available.map((c) => c.make))].sort();
  const bodies = [...new Set(available.map((c) => c.body))].sort();
  const count = (fn) => available.filter(fn).length;
  const index = available.map((c) => [c.make, c.body, c.price || 0, 1, [c.make, c.model, c.modelCode, c.grade, c.year, c.body].filter(Boolean).join(" ").toLowerCase()]);
  const fresh = [...available.filter((c) => c.badge === "Just Arrived"), ...available.filter((c) => ["9942778", "1453", "1365", "1442", "1448", "1355"].includes(c.id))].slice(0, 8);
  const first = feats[0];
  const sub = (c) => [c.engine, c.drivetrain, c.colour && c.colour.toLowerCase()].filter(Boolean).join(", ");
  const kick = (c) => `Stock no. ${c.id} · ${c.modelCode} · ${STATUS[c.status].label}`;
  const featData = feats.map((c) => ({ url: carUrl(c), kick: kick(c), title: `${c.make} ${c.model}`, sub: sub(c), year: String(c.year), km: km(c.km), gear: gear(c)?.[0] ?? "", gearu: gear(c)?.[1] ?? "", price: money(c.price), n: c.photos.length }));
  const BODY_ORDER = ["Sedan", "SUV & 4WD", "Wagon", "People mover", "Coupe", "Hatch", "Kei truck", "Convertible"];
  const bodyTiles = BODY_ORDER.map((b) => ({ b, list: available.filter((c) => c.body === b) })).filter((x) => x.list.length);
  const soonPick = ["1463", "1482", "1406", "1476", "1493", "1334", "1509", "1497"].map((id) => soon.find((c) => c.id === id)).filter(Boolean);

  const body = `
<section class="hero" data-hero aria-labelledby="hero-h">
  <div class="wrap hero__in">
    <div class="hero__txt">
      <h1 class="hero__h" id="hero-h">Hand-picked Japanese imports, here to drive in Adelaide.</h1>
      <p class="hero__kick" data-f="kick">${esc(kick(first))}</p>
      <p class="hero__name"><a href="${carUrl(first)}" data-feat-link><span data-f="title">${esc(first.make)} ${esc(first.model)}</span></a><small data-f="sub">${esc(sub(first))}</small></p>
      <div class="figs hero__figs">
        <div class="fig"><span class="fig__l">Year</span><b class="num"><span data-f="year">${first.year}</span></b></div>
        <div class="fig"><span class="fig__l">Kilometres</span><b class="num"><span data-f="km">${km(first.km)}</span><small>km</small></b></div>
        <div class="fig"><span class="fig__l">Gearbox</span><b class="num"><span data-f="gear">${esc(gear(first)[0])}</span><small data-f="gearu">${esc(gear(first)[1])}</small></b></div>
        <div class="fig"><span class="fig__l">${esc(first.priceNote)}</span><b class="num"><span data-f="price">${money(first.price)}</span></b></div>
      </div>
      <p class="hero__acts"><a class="btn btn--shu" href="${carUrl(first)}#enquire" data-feat-book>Book a test drive</a><a class="btn btn--ghost" href="${carUrl(first)}" data-feat-link>See this car ${icon.arrow}</a></p>
    </div>

    <div class="stage" data-feat role="group" aria-roledescription="carousel" aria-label="Featured cars">
      <div class="stage__pics shot">
        ${feats.map((c, i) => `<img class="stage__img${i === 0 ? " is-on" : ""}" data-hs ${i === 0 ? `src="/img/cars/${c.id}/1-960.avif" srcset="${srcset(c)}"` : `data-src="/img/cars/${c.id}/1-960.avif" data-srcset="${srcset(c)}"`} sizes="${SIZES}" width="2560" height="1920" alt="${i === 0 ? `${c.year} ${esc(c.make)} ${esc(c.model)} in the Tokyo Prestige showroom` : ""}"${i === 0 ? ' fetchpriority="high"' : ""} decoding="async">`).join("\n        ")}
      </div>
      <span class="stage__n"><span data-f="n">1 of ${first.photos.length} photos</span></span>
      <div class="switch">
        ${feats.map((c, i) => `<button class="switch__b${i === 0 ? " is-on" : ""}" type="button" data-feat-go="${i}" aria-label="Show the ${esc(c.make)} ${esc(c.model)}"${i === 0 ? ' aria-current="true"' : ""}><i></i><span>${SHORT[c.id]}</span></button>`).join("")}
        <button class="switch__p" type="button" data-feat-toggle aria-label="Pause the featured cars" hidden><span></span></button>
      </div>
    </div>
    <script type="application/json" id="feat-data">${JSON.stringify(featData)}</script>

    <form class="find" action="/stock" method="get" role="search" aria-label="Search the stock" data-find>
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
    <div class="sec__head sec__head--row">
      <div class="sec__head-t"><p class="eyebrow" data-reveal>In the showroom now</p>
      <h2 class="h2" id="fresh-h" data-reveal style="--i:1">Just arrived, and worth a look.</h2></div>
      <a class="btn btn--ghost" href="/stock" data-reveal style="--i:2">See all ${available.length} cars ${icon.arrow}</a>
    </div>
    <div class="cards" data-cards>
      ${fresh.map((c, i) => card(c).replace("<article", `<article data-reveal style="--i:${i % 4}"`)).join("\n")}
    </div>
  </div>
</section>

<section class="sec sec--tight" aria-labelledby="body-h">
  <div class="wrap">
    <div class="sec__head"><p class="eyebrow" data-reveal>Start with a shape</p><h2 class="h2" id="body-h" data-reveal style="--i:1">What are you after?</h2></div>
    <ul class="tiles">
      ${bodyTiles
        .map(({ b, list }, i) => {
          const c = list.find((x) => x.price) || list[0];
          const from = Math.min(...list.filter((x) => x.price).map((x) => x.price));
          return `<li data-reveal style="--i:${i % 4}"><a class="tile" href="/stock?body=${encodeURIComponent(b)}"><span class="tile__pic shot">${photo(c, 1, { sizes: "(min-width: 900px) 24vw, 46vw", max: 960, alt: "" })}</span><span class="tile__txt"><b>${esc(b)}</b><span class="num">${list.length} ${list.length === 1 ? "car" : "cars"}${Number.isFinite(from) ? `, from ${money(from)}` : ""}</span></span></a></li>`;
        })
        .join("\n      ")}
    </ul>
  </div>
</section>

<section class="sec" aria-labelledby="why-h">
  <div class="wrap why">
    <div class="why__head">
      <p class="eyebrow" data-reveal>Why buy here</p>
      <h2 class="h2" id="why-h" data-reveal style="--i:1">Skip the import process. The car is already here.</h2>
      <p class="lede" data-reveal style="--i:2">We source, import and comply the cars, then put them on a showroom floor five minutes from the city. You see and drive the car before you buy it.</p>
      <p data-reveal style="--i:3"><a class="btn btn--ghost" href="/importing">How importing works ${icon.arrow}</a></p>
    </div>
    <ol class="why__list">
      <li data-reveal><span class="code">01</span><div><h3>Clear title, every car</h3><p>Guaranteed free from any ownership or finance issues.</p></div></li>
      <li data-reveal style="--i:1"><span class="code">02</span><div><h3>An odometer you can check</h3><p>An original deregistration certificate for vehicles we source, and a guaranteed reading on the ones we import directly.</p></div></li>
      <li data-reveal style="--i:2"><span class="code">03</span><div><h3>Workshop checked</h3><p>Fully serviced by our own qualified mechanics, and complied ready for registration.</p></div></li>
      <li data-reveal style="--i:3"><span class="code">04</span><div><h3>Inspect it your way</h3><p>Third-party inspections are welcome, and video inspections show you every detail from anywhere.</p></div></li>
      <li data-reveal style="--i:4"><span class="code">05</span><div><h3>Warranty, 1 to 5 years</h3><p>Extended warranty options, on top of the statutory warranty where it applies.</p></div></li>
    </ol>
  </div>
</section>

<section class="sec sec--tight" aria-labelledby="soon-h">
  <div class="wrap">
    <div class="sec__head sec__head--row">
      <div class="sec__head-t"><p class="eyebrow" data-reveal>On the way from Japan</p>
      <h2 class="h2" id="soon-h" data-reveal style="--i:1">${soon.length} more cars coming soon.</h2>
      <p class="lede" data-reveal style="--i:2">Spotted one you want? Ask to be told when it lands.</p></div>
      <a class="btn btn--ghost" href="/coming-soon" data-reveal style="--i:3">See what is coming ${icon.arrow}</a>
    </div>
    <div class="cards">
      ${soonPick.map((c, i) => card(c).replace("<article", `<article data-reveal style="--i:${i % 4}"`)).join("\n")}
    </div>
  </div>
</section>

<section class="sec" aria-labelledby="visit-h">
  <div class="wrap visit">
    <figure class="visit__pic shot" data-reveal><img src="/img/site/yard-dusk-800.avif" srcset="/img/site/yard-dusk-800.avif 800w, /img/site/yard-dusk-1600.avif 1600w" sizes="(min-width: 900px) 56vw, 100vw" width="2560" height="1707" alt="The Tokyo Prestige showroom on Kensington Road, Marryatville, at dusk" loading="lazy" decoding="async"></figure>
    <div class="visit__txt">
      <p class="eyebrow" data-reveal>Visit the showroom</p>
      <h2 class="h2" id="visit-h" data-reveal style="--i:1">Five minutes east of the city.</h2>
      <dl class="visit__dl" data-reveal style="--i:2">
        <div><dt>Address</dt><dd>${dealer.street}<br>${dealer.suburb} ${dealer.state} ${dealer.postcode}</dd></div>
        <div><dt>Hours</dt><dd>${dealer.hours.map(([d, h]) => `${d}: ${h}`).join("<br>")}</dd></div>
        <div><dt>Licence</dt><dd>Licensed second-hand vehicle dealer ${dealer.licence}</dd></div>
      </dl>
      <p class="visit__acts" data-reveal style="--i:3"><a class="btn btn--shu" href="tel:${dealer.tel}">${icon.phone} Call ${dealer.phone}</a><a class="btn btn--ghost" href="${dealer.maps}" rel="noopener">${icon.pin} Directions</a></p>
    </div>
  </div>
  <div class="wrap" style="margin-top:32px">
    <div class="ph" data-reveal>
      <span class="ph__tag">Placeholder: reviews</span>
      <p>Three Google reviews go here, word for word, with the reviewer's name, the date and a link to the review. None are shown yet: we need them from you.</p>
    </div>
  </div>
</section>
`;
  return layout({
    title: "Tokyo Prestige: Japanese import cars in Adelaide",
    description: `Japanese import cars, hand-picked and ready to drive in Adelaide. ${available.length} cars available at ${dealer.street}, ${dealer.suburb}. Licensed dealer ${dealer.licence}.`,
    path: "/",
    body,
    css: ["/assets/css/home.css"],
    js: ["/assets/js/home.js"],
    head: `<link rel="preload" as="image" href="/img/cars/${first.id}/1-960.avif" imagesrcset="${srcset(first)}" imagesizes="${SIZES}" fetchpriority="high">\n<script type="application/ld+json">${JSON.stringify(dealerLd())}</script>\n`,
  });
}
