import { cars, dealer, esc, icon, layout, money } from "../lib.mjs";

const nAvail = cars.filter((c) => c.status === "available").length;
const nSoon = cars.filter((c) => c.status === "coming-soon").length;

const img = (name, alt, { sizes = "100vw", w = 2560, h = 1707, lazy = true } = {}) =>
  `<img src="/img/site/${name}-800.avif" srcset="/img/site/${name}-800.avif 800w, /img/site/${name}-1600.avif 1600w" sizes="${sizes}" width="${w}" height="${h}" alt="${esc(alt)}"${lazy ? ' loading="lazy"' : ' fetchpriority="high"'} decoding="async">`;

const pageHead = ({ eyebrow, title, jp, lede }) => `
  <header class="wrap pg__head">
    <p class="eyebrow">${eyebrow}</p>
    <div class="pg__title"><h1 class="display">${title}</h1>${jp ? `<p class="jp" lang="ja">${jp}</p>` : ""}</div>
    ${lede ? `<p class="lede">${lede}</p>` : ""}
  </header>`;

const reviewsPh = `<div class="ph" data-reveal>
      <span class="ph__tag">Placeholder: reviews</span>
      <p>Three Google reviews go here, word for word, with the reviewer's name, the date and a link to the review. None are shown because none could be read for this demo. See research/gaps.md.</p>
    </div>`;

const visit = `
  <section class="sec sec--tight" aria-labelledby="visit-h">
    <div class="wrap cta">
      <div class="cta__txt"><p class="eyebrow">Come and see them</p><h2 class="h2" id="visit-h">${nAvail} cars on the floor, five minutes east of the city.</h2></div>
      <p class="cta__acts"><a class="btn btn--shu" href="/stock">Browse the stock ${icon.arrow}</a><a class="btn btn--ghost" href="tel:${dealer.tel}">${icon.phone} Call ${dealer.phone}</a></p>
    </div>
  </section>`;

const contactFields = (id) => `
        <div class="form__two">
          <div class="field"><label for="${id}-name">Name</label><input class="input" id="${id}-name" name="name" autocomplete="name" required><p class="field__err" hidden>Please add your name.</p></div>
          <div class="field"><label for="${id}-contact">Mobile or email</label><input class="input" id="${id}-contact" name="contact" autocomplete="tel" inputmode="email" required><p class="field__err" hidden>Add a mobile number or an email so the team can reply.</p></div>
        </div>`;
const HOOK = `<!-- HOOK: set data-endpoint to the real lead endpoint. Until then the form validates and shows its thank-you state, and sends nothing. -->`;

/* ------------------------------------------------------------------ importing */
export function importing() {
  // The five stops. The route runs almost due south: Japan and Adelaide share a longitude.
  const steps = [
    {
      k: "Auction",
      jp: "オークション",
      lat: "Japan, 35° N",
      h: "It starts at auction in Japan",
      p: [
        "Most used cars in Japan change hands at dealer auctions, where thousands of cars are sold each week. Every car is looked over by the auction house's own inspector before it is offered.",
        "Tokyo Prestige says its cars are hand-picked: chosen one at a time for quality, reliability and value, not bought in bulk.",
      ],
    },
    {
      k: "Inspection",
      jp: "評価点",
      lat: "The auction sheet",
      h: "The inspector's report: the auction sheet",
      p: [
        "The inspector's findings go on one page, the auction sheet. It gives the car an overall grade, a grade for the interior, the odometer reading, and a diagram of the body with every mark coded where it was found.",
        "The grades below are the usual scale. Each auction house marks a little differently, and a sheet is one inspector's opinion on one day. It is a guide to condition, not a warranty.",
      ],
      extra: "grades",
    },
    {
      k: "Shipping",
      jp: "輸出",
      lat: "The Pacific, 0°",
      h: "Deregistered, then shipped south",
      p: [
        "Before a car leaves Japan it is deregistered, and the paperwork records its odometer reading. Then it sails about 7,800 km, nearly due south, to Australia.",
        "Tokyo Prestige says an original deregistration certificate is provided for vehicles it sources, and that the odometer reading is guaranteed on vehicles it imports directly. Ask to see the certificate for the car you are looking at.",
      ],
      link: ["/coming-soon", `See the ${nSoon} cars on the way`],
    },
    {
      k: "Compliance",
      jp: "検査",
      lat: "Arrival in Australia",
      h: "Made ready for Australian roads",
      p: [
        "An imported used car has to be approved under Australia's Road Vehicle Standards Act before it can be registered. Cars 25 years or older come in under one pathway; newer cars must be a model on the Specialist and Enthusiast Vehicle register and are checked against an approved report for that model.",
        "Since 2021 an approved car is entered on the Register of Approved Vehicles, which replaced the old compliance plate. Tokyo Prestige sells its cars Australian-compliant and ready for registration.",
      ],
    },
    {
      k: "The showroom",
      jp: "アデレード",
      lat: "Adelaide, 35° S",
      h: "On the floor at Marryatville",
      p: [
        "Each car is fully serviced by the dealership's own mechanics and comprehensively detailed before it goes on the floor. Then it is yours to look over, drive, and have inspected by anyone you choose.",
        "Buying in South Australia, the car is registered here on purchase. Buying from interstate, it can be freighted to your door, and you arrange the roadworthy and registration at home.",
      ],
      link: ["/stock", `See the ${nAvail} cars here now`],
    },
  ];
  const grades = [
    ["S, 6", "As new, usually under a year old with very few kilometres."],
    ["5", "Near new. Very low kilometres, no repair needed."],
    ["4.5", "Excellent. Only the lightest marks."],
    ["4", "Good. A few small scratches or dents for its age."],
    ["3.5", "Fair. Noticeable marks, or higher kilometres."],
    ["3", "Rough. Marks, dents or paint that need work."],
    ["R, RA", "Has had accident repair. RA usually means minor and well repaired; what counts as R varies between auction houses."],
  ];
  const body = `
<div class="pg">
  ${pageHead({ eyebrow: "From Tokyo to Adelaide", title: "How importing works", jp: "輸入の流れ", lede: "Five steps take a car from an auction hall in Japan to a showroom on Kensington Road. Here is what happens at each one, and what you can ask to see." })}

  <div class="wrap route" data-route>
    <aside class="route__map" aria-hidden="true">
      <div class="route__chart">
        <span class="route__tick" style="--y:0%"><i></i>35° N</span>
        <span class="route__tick" style="--y:25%"><i></i>17° N</span>
        <span class="route__tick route__tick--eq" style="--y:50%"><i></i>Equator</span>
        <span class="route__tick" style="--y:75%"><i></i>17° S</span>
        <span class="route__tick" style="--y:100%"><i></i>35° S</span>
        <span class="route__line"></span>
        <span class="route__drawn" data-route-line></span>
        <span class="route__port route__port--a"><b>日本</b>Japan</span>
        <span class="route__port route__port--b"><b>アデレード</b>Adelaide</span>
        <span class="route__ship" data-route-ship></span>
      </div>
      <p class="plate route__cap">139° E · about 7,800 km</p>
    </aside>
    <ol class="route__steps">
      ${steps
        .map(
          (s, i) => `<li class="route__step" data-route-step id="step-${i + 1}">
        <p class="route__k"><span class="code">0${i + 1}</span><span class="plate">${s.lat}</span><span class="jp" lang="ja">${s.jp}</span></p>
        <h2 class="h3" data-reveal>${s.h}</h2>
        ${s.p.map((t, j) => `<p data-reveal style="--i:${j + 1}">${t}</p>`).join("\n        ")}
        ${
          s.extra === "grades"
            ? `<table class="grades" data-reveal style="--i:3"><caption class="vh">Japanese auction grades and what they usually mean</caption><thead><tr><th scope="col">Grade</th><th scope="col">What it usually means</th></tr></thead><tbody>${grades.map(([g, t]) => `<tr><th scope="row" class="num">${g}</th><td>${t}</td></tr>`).join("")}</tbody></table>
        <p class="fine" data-reveal style="--i:4">Interiors are graded A to D, with A the cleanest. On the body diagram, A is a scratch, U a dent and W a repaired or wavy panel, each with a number from 1 (slight) to 3 (obvious). XX marks a panel that has been replaced.</p>
        <div class="note" data-reveal style="--i:5"><p><b>Ask for the sheet.</b> Tokyo Prestige does not show auction sheets on its listings yet. Every car page here has an “ask for it” link for the auction sheet and grade.</p></div>`
            : ""
        }
        ${s.link ? `<p data-reveal style="--i:3"><a class="btn btn--ghost" href="${s.link[0]}">${s.link[1]} ${icon.arrow}</a></p>` : ""}
      </li>`,
        )
        .join("\n      ")}
    </ol>
  </div>

  <section class="sec sec--tight" aria-labelledby="chk-h">
    <div class="wrap">
      <div class="sec__head"><p class="eyebrow" data-reveal>Before you buy any import</p><h2 class="h2" id="chk-h" data-reveal style="--i:1">Six things worth asking for.</h2></div>
      <ol class="asks">
        ${[
          ["The auction sheet and grade", "The inspector's report from the day the car was bought."],
          ["The deregistration certificate", "The Japanese paperwork that records the odometer reading before export."],
          ["The service history", "What came with the car, and what the workshop did before sale."],
          ["A walk-around video", "The underside, the engine bay, a cold start and any marks, on camera."],
          ["An independent inspection", "Send your own inspector. Tokyo Prestige welcomes third-party inspections."],
          ["The drive-away price", "Listings are plus on-road costs. Ask for the full figure for your state."],
        ]
          .map(([h, p], i) => `<li data-reveal style="--i:${i % 3}"><span class="code">0${i + 1}</span><h3>${h}</h3><p>${p}</p></li>`)
          .join("\n        ")}
      </ol>
      <p class="fine" style="margin-top:24px" data-reveal>This page is a plain-English guide, not legal advice. Import rules are set by the Australian Government and can change.</p>
    </div>
  </section>
  ${visit}
</div>`;
  return layout({
    title: "How importing a Japanese car works | Tokyo Prestige",
    description: "From auction in Japan to the showroom in Adelaide: auction sheets and grades, deregistration, shipping, Australian compliance, and what to ask a dealer to show you.",
    path: "/importing",
    body,
    css: ["/assets/css/pages.css"],
    js: ["/assets/js/pages.js"],
  });
}

/* ------------------------------------------------------------------ finance */
export function finance() {
  const prices = cars.filter((c) => c.price).map((c) => c.price).sort((a, b) => a - b);
  const mid = 29888;
  const body = `
<div class="pg">
  ${pageHead({ eyebrow: "Finance", title: "Finance, arranged in house", lede: "Tokyo Prestige arranges finance through Credit One, its finance partner. Talk it through with the sales team, or work out a rough figure here first." })}

  <section class="wrap pg__sec">
    <div class="est est--page" data-est data-price="${mid}">
      <div class="est__head">
        <h2 class="est__h">Repayment estimator</h2>
        <p class="fine">An estimate only, not an offer of finance. Tokyo Prestige does not publish a rate, so you set it.</p>
      </div>
      <noscript><p class="fine">The estimator needs JavaScript. Call ${dealer.phone} and the team will work a figure out with you.</p></noscript>
      <div class="est__grid" data-est-ui hidden>
        <div class="est__ctl">
          <div class="est__row"><label for="est-price">Price of the car</label><output class="num" data-est-price-out>${money(mid)}</output></div>
          <input class="range" id="est-price" type="range" min="${Math.floor(prices[0] / 1000) * 1000}" max="${Math.ceil(prices[prices.length - 1] / 1000) * 1000}" step="1000" value="${mid}" data-est-price>
          <div class="est__row"><label for="est-dep">Deposit or trade-in</label><output class="num" data-est-dep-out>$0</output></div>
          <input class="range" id="est-dep" type="range" min="0" max="${Math.floor((mid * 0.6) / 500) * 500}" step="500" value="0" data-est-dep>
          <fieldset class="est__set"><legend>Term</legend>
            ${[3, 4, 5, 7].map((y) => `<label class="chip"><input type="radio" name="est-term" value="${y}"${y === 5 ? " checked" : ""}><span>${y} years</span></label>`).join("")}
          </fieldset>
          <fieldset class="est__set"><legend>Your interest rate, % a year</legend>
            ${[7, 9, 11, 13].map((r) => `<label class="chip"><input type="radio" name="est-rate" value="${r}"><span>${r}%</span></label>`).join("")}
            <label class="est__own"><span class="vh">Your own rate, % a year</span><input class="input" type="number" inputmode="decimal" min="0" max="40" step="0.1" placeholder="Own rate" data-est-rate></label>
          </fieldset>
        </div>
        <div class="est__out" aria-live="polite">
          <p class="plate">Estimated repayment</p>
          <p class="est__big"><span class="num" data-est-week>Pick a rate</span><small data-est-unit></small></p>
          <p class="est__alt num" data-est-month></p>
          <p class="fine" data-est-sum>Choose a rate to see an estimate.</p>
          <a class="btn btn--quiet" href="#ask">Ask about finance ${icon.arrow}</a>
        </div>
      </div>
      <p class="fine est__legal">The figure is the price less your deposit, repaid in equal instalments at the rate and term you chose. It leaves out on-road costs, fees and charges, and it is not a quote. Finance depends on approval. Ask for a written quote with the comparison rate before you decide.</p>
    </div>
  </section>

  <section class="wrap pg__sec pg__cols">
    <div>
      <p class="eyebrow" data-reveal>The finance partner</p>
      <h2 class="h2" data-reveal style="--i:1">Credit One</h2>
      <p class="lede" data-reveal style="--i:2">Credit One has specialised in business and leisure finance for over 15 years, and has arranged packages for more than 100,000 Australian customers and businesses.</p>
    </div>
    <ul class="ticks ticks--lg">
      ${["Personalised, unbiased service", "Access to over 35 financiers", "Competitive finance and insurance options", "Packages tailored to suit you", "Online quotes and same-day approvals"].map((t, i) => `<li data-reveal style="--i:${i}">${icon.check}<span>${t}</span></li>`).join("")}
    </ul>
  </section>

  <section class="wrap pg__sec pg__cols" id="ask">
    <div>
      <p class="eyebrow">Ask about finance</p>
      <h2 class="h2">Tell us roughly what you are after.</h2>
      <p class="lede">The sales team will come back to you with how it would work on the car you have in mind.</p>
      <p style="margin-top:16px"><a class="link num" href="tel:1300273348">Or call Credit One on 1300 273 348 ${icon.arrow}</a></p>
    </div>
    <form class="form" data-form novalidate action="#ask" method="post" data-endpoint="" data-done="The sales team will be in touch about finance during opening hours.">
      ${HOOK}
      <input type="hidden" name="source" value="finance">
      ${contactFields("fin")}
      <div class="field"><label for="fin-car">Which car? <span class="muted">(optional)</span></label><input class="input" id="fin-car" name="car" placeholder="For example the 2020 Crown, or a budget"></div>
      <fieldset class="form__set"><legend>Tick any that apply <span class="muted">(optional)</span></legend><div class="form__chips">
        <label class="chip"><input type="checkbox" name="opt" value="trade-in"><span>I have a trade-in</span></label>
        <label class="chip"><input type="checkbox" name="opt" value="business"><span>It is for a business</span></label>
        <label class="chip"><input type="checkbox" name="opt" value="interstate"><span>I am interstate</span></label>
      </div></fieldset>
      <button class="btn btn--shu form__go" type="submit">Ask about finance ${icon.arrow}</button>
    </form>
  </section>
  ${visit}
</div>`;
  return layout({
    title: "Car finance in Adelaide | Tokyo Prestige",
    description: "Finance for Japanese import cars at Tokyo Prestige, Adelaide, arranged through Credit One. Work out a rough repayment with your own rate, then ask the team.",
    path: "/finance",
    body,
    css: ["/assets/css/car.css", "/assets/css/pages.css"],
    js: ["/assets/js/est.js", "/assets/js/pages.js"],
  });
}

/* ------------------------------------------------------------------ servicing */
export function servicing() {
  const groups = [
    ["Servicing", "整備", "OEM or performance consumables, on every kind of passenger car, from Japanese imports to high-end European performance cars.", ["Logbook interval servicing", "Preventative maintenance", "Mechanical and electrical fault finding", "Parts sourced and fitted for your Japanese import", "Tyres", "Air-conditioning, by the specialist next door, done at the same visit"]],
    ["Performance and upgrades", "チューニング", "More power, better response or a new look. The workshop has looked after some of Adelaide's most recognisable street cars, and can supply the parts and fit them.", ["Exhaust and blow-off valve upgrades", "Turbo upgrades", "Intercooler upgrades", "Injection and intake", "Fuel and ECU upgrades", "Tuning arranged through partners, to suit the car and the work"]],
    ["Body, paint and panel", "板金", "From a body kit to a car-park dent.", ["Body kits sourced and installed", "Paintless dent removal", "Scrapes and scuffs repaired"]],
  ];
  const body = `
<div class="pg">
  ${pageHead({ eyebrow: "The workshop", title: "Servicing", jp: "サービス", lede: "Tokyo Prestige does not only source, import and sell cars. Its own qualified mechanic services, rebuilds and upgrades them, with the parts network to keep a Japanese import on the road." })}

  <section class="wrap pg__sec svc">
    ${groups
      .map(
        ([h, jp, p, items], i) => `<article class="svc__grp" data-reveal style="--i:${i}">
      <p class="route__k"><span class="code">0${i + 1}</span><span class="jp" lang="ja">${jp}</span></p>
      <h2 class="h3">${h}</h2>
      <p>${p}</p>
      <ul class="ticks">${items.map((t) => `<li>${icon.check}<span>${t}</span></li>`).join("")}</ul>
    </article>`,
      )
      .join("\n    ")}
  </section>

  <section class="wrap pg__sec pg__cols" id="book">
    <div>
      <p class="eyebrow">Book it in</p>
      <h2 class="h2">Tell us about the car.</h2>
      <p class="lede">Say what it is and what it needs. The workshop will call to arrange a time.</p>
      <p class="fine" style="margin-top:16px">Bought your car elsewhere? That is fine. The workshop services Japanese imports and prestige cars whoever sold them.</p>
    </div>
    <form class="form" data-form novalidate action="#book" method="post" data-endpoint="" data-done="The workshop will call to arrange a time.">
      ${HOOK}
      <input type="hidden" name="source" value="servicing">
      ${contactFields("svc")}
      <div class="field"><label for="svc-car">Your car</label><input class="input" id="svc-car" name="car" placeholder="Year, make and model" required><p class="field__err" hidden>Tell us which car it is.</p></div>
      <fieldset class="form__set"><legend>What does it need? <span class="muted">(optional)</span></legend><div class="form__chips">
        ${["Logbook service", "Fault finding", "Parts", "Tyres", "Air-conditioning", "Performance upgrade", "Body or paint"].map((t) => `<label class="chip"><input type="checkbox" name="need" value="${t}"><span>${t}</span></label>`).join("")}
      </div></fieldset>
      <div class="field"><label for="svc-msg">Anything else <span class="muted">(optional)</span></label><textarea class="input" id="svc-msg" name="message" rows="3"></textarea></div>
      <button class="btn btn--shu form__go" type="submit">Request a booking ${icon.arrow}</button>
    </form>
  </section>
  ${visit}
</div>`;
  return layout({
    title: "Servicing for Japanese imports and prestige cars in Adelaide | Tokyo Prestige",
    description: "Logbook servicing, fault finding, parts, performance upgrades and body work for Japanese imports and prestige cars, by Tokyo Prestige's own workshop in Marryatville.",
    path: "/servicing",
    body,
    css: ["/assets/css/pages.css"],
    js: ["/assets/js/pages.js"],
  });
}

/* ------------------------------------------------------------------ about */
export function about() {
  const why = [
    ["Knowledgeable staff", "The team loves everything JDM and knows these cars inside and out."],
    ["Clear title", "Every car has a guaranteed clear title, free from ownership or finance issues."],
    ["Guaranteed odometer reading", "For vehicles imported directly by Tokyo Prestige."],
    ["Third-party inspections", "Welcome, so you know what you are buying."],
    ["Workshop checked", "By the dealership's own qualified mechanics."],
    ["Finance in house", "Arranged for you through Credit One."],
    ["Video inspections", "See every detail of a car from anywhere."],
    ["Warranty", "Options from 1 to 5 years."],
  ];
  const body = `
<div class="pg">
  <header class="abt">
    <figure class="abt__pic" data-night>
      ${img("yard-night", "The Tokyo Prestige showroom at night, sign lit, cars lined up along Kensington Road", { lazy: false })}
      <span class="abt__glow"></span>
    </figure>
    <div class="wrap abt__txt">
      <p class="eyebrow">About Tokyo Prestige</p>
      <h1 class="display">Hand-picked Japanese cars, on Kensington Road.</h1>
      <p class="lede">A locally owned family business with over a decade in the trade, on Kensington Road at Marryatville.</p>
    </div>
  </header>

  <section class="wrap pg__sec pg__cols">
    <div>
      <p class="eyebrow" data-reveal>The mission</p>
      <h2 class="h2" data-reveal style="--i:1">Make the car you have wanted easy to buy.</h2>
    </div>
    <div class="prose">
      <p data-reveal>Importing a car yourself takes months and a fair amount of guesswork. Tokyo Prestige does that part first. The cars are hand-picked in Japan, brought here, complied and serviced, so you can see and drive the one you want today.</p>
      <p data-reveal style="--i:1">The aim is affordable, high-quality cars and a straightforward sale: nationwide delivery, video inspections for buyers who cannot visit, and independent inspections welcomed.</p>
      <p data-reveal style="--i:2"><a class="btn btn--ghost" href="/importing">How importing works ${icon.arrow}</a></p>
    </div>
  </section>

  <section class="wrap pg__sec">
    <div class="sec__head"><p class="eyebrow" data-reveal>Why choose us</p><h2 class="h2" data-reveal style="--i:1">Eight things you can hold the dealership to.</h2></div>
    <ol class="asks asks--4">
      ${why.map(([h, p], i) => `<li data-reveal style="--i:${i % 4}"><span class="code">0${i + 1}</span><h3>${h}</h3><p>${p}</p></li>`).join("\n      ")}
    </ol>
  </section>

  <section class="wrap pg__sec">
    <div class="sec__head"><p class="eyebrow" data-reveal>The showroom</p><h2 class="h2" data-reveal style="--i:1">${dealer.street}, ${dealer.suburb}.</h2></div>
    <div class="pics">
      <figure class="shot" data-reveal>${img("yard-dusk", "The Tokyo Prestige showroom at dusk, seen from Kensington Road", { sizes: "(min-width: 900px) 60vw, 100vw" })}</figure>
      <figure class="shot" data-reveal style="--i:1">${img("showroom-floor", "A white Toyota Crown on the showroom floor at Tokyo Prestige", { sizes: "(min-width: 900px) 38vw, 100vw", w: 2048, h: 1536 })}</figure>
      <figure class="shot" data-reveal style="--i:2">${img("yard-sign", "The Tokyo Prestige sign and forecourt with cars on display", { sizes: "(min-width: 900px) 38vw, 100vw" })}</figure>
      <figure class="shot" data-reveal style="--i:3">${img("yard-dusk-wide", "The Tokyo Prestige yard from across Kensington Road, with cars lined up at the front", { sizes: "(min-width: 900px) 60vw, 100vw" })}</figure>
    </div>
  </section>

  <section class="wrap pg__sec">
    <div class="sec__head"><p class="eyebrow" data-reveal>The people</p><h2 class="h2" data-reveal style="--i:1">Who you will deal with.</h2></div>
    <div class="ph" data-reveal>
      <span class="ph__tag">Placeholder: the team</span>
      <p>Names, roles and photos of the people at Tokyo Prestige go here. Their current site has no real team information, so none is shown. See research/gaps.md.</p>
    </div>
    <div style="margin-top:16px">${reviewsPh}</div>
  </section>

  <section class="wrap pg__sec">
    <dl class="facts" data-reveal>
      <div><dt>Licence</dt><dd>Licensed second-hand vehicle dealer ${dealer.licence}</dd></div>
      <div><dt>Address</dt><dd>${dealer.street}, ${dealer.suburb} ${dealer.state} ${dealer.postcode}</dd></div>
      <div><dt>Hours</dt><dd>${dealer.hours.map(([d, h]) => `${d} ${h}`).join(". ")}</dd></div>
      <div><dt>Phone</dt><dd><a class="num" href="tel:${dealer.tel}">${dealer.phone}</a></dd></div>
    </dl>
  </section>
  ${visit}
</div>`;
  return layout({
    title: "About Tokyo Prestige: Japanese import cars, Marryatville, Adelaide",
    description: `Tokyo Prestige is a locally owned family business selling hand-picked Japanese import cars from ${dealer.street}, ${dealer.suburb}. Licensed dealer ${dealer.licence}.`,
    path: "/about",
    body,
    solidHeader: false,
    css: ["/assets/css/pages.css"],
    js: ["/assets/js/pages.js"],
    head: `<link rel="preload" as="image" href="/img/site/yard-night-800.avif" imagesrcset="/img/site/yard-night-800.avif 800w, /img/site/yard-night-1600.avif 1600w" imagesizes="100vw" fetchpriority="high">\n`,
  });
}

/* ------------------------------------------------------------------ FAQ */
export function faq() {
  const qa = [
    ["finance", "Do you offer finance?", ["Yes. Finance is arranged in house through Credit One, Tokyo Prestige's finance partner. Call the sales team to talk it through."], ["/finance", "Finance and the repayment estimator"]],
    [
      "warranty",
      "Do the cars come with a warranty?",
      [
        "An aftermarket warranty is available, from 1 to 5 years.",
        "Statutory warranty applies from the date of purchase, in this way:",
        "<ul><li>For a vehicle that costs between $3,001 and $6,000: the first 3,000 km or two months, whichever comes first.</li><li>For a vehicle that costs over $6,000: the first 5,000 km or three months, whichever comes first.</li></ul>",
        "The statutory warranty does not apply to a vehicle that:",
        "<ul><li>travelled more than 200,000 km before sale</li><li>was registered more than fifteen years ago</li><li>was sold for $3,000 or less</li><li>had defects that were reasonably apparent at the time of sale</li><li>has damage caused by the purchaser.</li></ul>",
        "If your car needs repairs under the statutory warranty, contact the dealer within the warranty period and before having the repairs done. Apart from excluded accessories, repairs should be completed free of charge with new or second-hand parts. Your warranty is extended by the time the dealer keeps your vehicle for repairs.",
      ],
    ],
    ["odometer", "How do I know the odometer is correct?", ["There are several ways to check an odometer reading, from services in Japan to local services in Australia. For vehicles Tokyo Prestige sources, an original deregistration certificate is provided. Buyers are encouraged to do their own checks before any purchase."], ["/importing#step-3", "How a car's kilometres are recorded before export"]],
    ["delivery", "Can you deliver to my state?", ["Yes. Tokyo Prestige uses several freight companies around Australia, and the car is insured while it is in transit. It can go to your door, or to a depot if you would rather save a little."]],
    ["registration", "Are the cars ready to be registered?", ["Cars are registered in South Australia on purchase. If a car is sold out of the state, the buyer organises the roadworthy certificate and any local registration requirements."]],
    ["servicing", "Do you service Japanese imports and prestige cars?", ["Yes. Tokyo Prestige has its own qualified mechanic and can source parts for Japanese imports and prestige cars. The workshop handles servicing, major work and modifications."], ["/servicing", "The workshop"]],
  ];
  const strip = (h) => h.replace(/<li>/g, " ").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  const ld = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: qa.map(([, q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a.map(strip).join(" ") } })) };
  const body = `
<div class="pg">
  ${pageHead({ eyebrow: "Questions", title: "Questions, answered", jp: "よくある質問", lede: "The questions buyers ask most, answered in the dealership's own terms." })}
  <section class="wrap pg__sec faq">
    ${qa
      .map(
        ([id, q, a, link], i) => `<details class="faq__q" id="${id}" name="faq"${i === 1 ? "" : ""}>
      <summary><span class="code">0${i + 1}</span><h2>${q}</h2><span class="faq__ico" aria-hidden="true"></span></summary>
      <div class="faq__a">${a.map((t) => (t.startsWith("<ul") ? t : `<p>${t}</p>`)).join("")}${link ? `<p><a class="link" href="${link[0]}">${link[1]} ${icon.arrow}</a></p>` : ""}</div>
    </details>`,
      )
      .join("\n    ")}
  </section>
  <section class="wrap pg__sec pg__cols" id="ask">
    <div><p class="eyebrow">Something else?</p><h2 class="h2">Ask the team.</h2><p class="lede">Insurance, parts, a particular car, anything. You will get a straight answer.</p></div>
    <form class="form" data-form novalidate action="#ask" method="post" data-endpoint="" data-done="The team will reply during opening hours.">
      ${HOOK}
      <input type="hidden" name="source" value="faq">
      ${contactFields("fq")}
      <div class="field"><label for="fq-msg">Your question</label><textarea class="input" id="fq-msg" name="message" rows="3" required></textarea><p class="field__err" hidden>Please type your question.</p></div>
      <button class="btn btn--shu form__go" type="submit">Send my question ${icon.arrow}</button>
    </form>
  </section>
</div>`;
  return layout({
    title: "Questions about buying a Japanese import | Tokyo Prestige",
    description: "Finance, warranty, odometer checks, interstate delivery, registration and servicing: the questions buyers ask Tokyo Prestige, answered.",
    path: "/faq",
    body,
    css: ["/assets/css/pages.css"],
    js: ["/assets/js/pages.js"],
    head: `<script type="application/ld+json">${JSON.stringify(ld)}</script>\n`,
  });
}

/* ------------------------------------------------------------------ contact */
export function contact() {
  const body = `
<div class="pg">
  ${pageHead({ eyebrow: "Contact", title: "Talk to Tokyo Prestige", lede: "Call, message, or come in. The showroom is five minutes east of the city." })}
  <section class="wrap pg__sec pg__cols pg__cols--top">
    <div class="con">
      <a class="con__big num" href="tel:${dealer.tel}">${dealer.phone}</a>
      <p class="con__acts"><a class="btn btn--shu" href="tel:${dealer.tel}">${icon.phone} Call now</a><a class="btn btn--ghost" href="mailto:${dealer.email}">${icon.msg} Email</a></p>
      <dl class="facts facts--stack">
        <div><dt>Showroom</dt><dd>${dealer.street}<br>${dealer.suburb} ${dealer.state} ${dealer.postcode}</dd></div>
        <div><dt>Email</dt><dd><a href="mailto:${dealer.email}">${dealer.email}</a></dd></div>
        <div><dt>Hours</dt><dd>${dealer.hours.map(([d, h]) => `${d}: ${h}`).join("<br>")}</dd></div>
        <div><dt>Licence</dt><dd>Licensed second-hand vehicle dealer ${dealer.licence}</dd></div>
      </dl>
    </div>
    <form class="form" data-form novalidate action="#" method="post" data-endpoint="" data-done="The team will reply during opening hours.">
      ${HOOK}
      <input type="hidden" name="source" value="contact">
      <fieldset class="form__set"><legend>What is it about?</legend><div class="form__chips">
        ${[["car", "A car in stock", true], ["find", "Finding a particular car"], ["trade", "A trade-in"], ["service", "Servicing"], ["other", "Something else"]].map(([v, l, on]) => `<label class="chip"><input type="radio" name="topic" value="${v}"${on ? " checked" : ""}><span>${l}</span></label>`).join("")}
      </div></fieldset>
      ${contactFields("con")}
      <div class="field"><label for="con-msg">Message</label><textarea class="input" id="con-msg" name="message" rows="4" required></textarea><p class="field__err" hidden>Please add a short message.</p></div>
      <button class="btn btn--shu form__go" type="submit">Send message ${icon.arrow}</button>
    </form>
  </section>
  <section class="wrap pg__sec">
    <div class="map">
      <iframe title="Map showing Tokyo Prestige at ${dealer.street}, ${dealer.suburb}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=${encodeURIComponent(`Tokyo Prestige, ${dealer.street}, ${dealer.suburb} ${dealer.state} ${dealer.postcode}`)}&z=15&output=embed"></iframe>
      <div class="map__bar"><p><b>${dealer.street}</b>, ${dealer.suburb} ${dealer.state} ${dealer.postcode}</p><a class="btn btn--quiet" href="${dealer.maps}" rel="noopener">${icon.pin} Open in Maps</a></div>
    </div>
  </section>
</div>`;
  return layout({
    title: "Contact Tokyo Prestige, Marryatville, Adelaide",
    description: `Call ${dealer.phone} or visit Tokyo Prestige at ${dealer.street}, ${dealer.suburb} ${dealer.state} ${dealer.postcode}. Open Monday to Friday 9 to 5, Saturday 9 to 3.`,
    path: "/contact",
    body,
    css: ["/assets/css/pages.css"],
    js: ["/assets/js/pages.js"],
  });
}

/* ------------------------------------------------------------------ 404 */
export function notFound() {
  const body = `
<div class="pg pg--404">
  <div class="wrap pg__head">
    <p class="eyebrow">Page not found</p>
    <h1 class="display">That one has left the yard.</h1>
    <p class="lede">The page you were after is not here. The car may have sold, or the link may be old.</p>
    <p class="cta__acts" style="margin-top:8px"><a class="btn btn--shu" href="/stock">Browse the stock ${icon.arrow}</a><a class="btn btn--ghost" href="/coming-soon">Coming soon</a><a class="btn btn--ghost" href="/">Home</a></p>
  </div>
</div>`;
  return layout({ title: "Page not found | Tokyo Prestige", description: "This page is not here. Browse the stock at Tokyo Prestige.", path: "/404", body, css: ["/assets/css/pages.css"] });
}
