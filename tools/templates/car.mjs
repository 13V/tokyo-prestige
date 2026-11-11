import { cars, card, dealer, esc, icon, km, layout, manifest, money, carUrl, photo, KATAKANA, STATUS } from "../lib.mjs";

const cap = (s) => (s ? s[0].toUpperCase() + s.slice(1) : s);

function similar(c) {
  const pool = cars.filter((o) => o.id !== c.id && o.status !== "under-contract");
  const score = (o) =>
    (o.body === c.body ? 0 : 4) +
    (o.make === c.make ? 0 : 1.5) +
    (o.model === c.model ? -2 : 0) +
    (o.status === c.status ? 0 : 1) +
    (c.price && o.price ? Math.min(4, Math.abs(o.price - c.price) / 15000) : 1.5) +
    Math.min(2, Math.abs(o.year - c.year) / 8);
  return pool.sort((a, b) => score(a) - score(b)).slice(0, 4);
}

function jsonLd(c) {
  const img = c.photos.map((_, i) => manifest[c.id]?.[String(i + 1)]).map((m, i) => (m ? `https://www.tokyoprestige.com.au/img/cars/${c.id}/${i + 1}-${m.sizes[m.sizes.length - 1]}.avif` : null)).filter(Boolean);
  const v = {
    "@context": "https://schema.org",
    "@type": "Car",
    name: c.title,
    brand: { "@type": "Brand", name: c.make },
    model: c.model,
    vehicleModelDate: String(c.year),
    itemCondition: "https://schema.org/UsedCondition",
    image: img,
    sku: c.id,
    seller: { "@id": "https://www.tokyoprestige.com.au/#dealer" },
  };
  if (c.grade) v.vehicleConfiguration = c.grade;
  if (c.km != null) v.mileageFromOdometer = { "@type": "QuantitativeValue", value: c.km, unitCode: "KMT" };
  if (c.vin && c.vinType === "VIN") v.vehicleIdentificationNumber = c.vin;
  if (c.colour) v.color = c.colour;
  if (c.interiorColour) v.vehicleInteriorColor = c.interiorColour;
  if (c.transmission) v.vehicleTransmission = c.transmission;
  if (c.drivetrain) v.driveWheelConfiguration = c.drivetrain;
  if (c.engine) v.vehicleEngine = { "@type": "EngineSpecification", name: c.engine };
  if (c.seats) v.seatingCapacity = c.seats;
  if (c.price)
    v.offers = {
      "@type": "Offer",
      price: c.price,
      priceCurrency: "AUD",
      availability: c.status === "available" ? "https://schema.org/InStock" : "https://schema.org/LimitedAvailability",
      description: c.priceNote || undefined,
      seller: { "@id": "https://www.tokyoprestige.com.au/#dealer" },
    };
  const d = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "@id": "https://www.tokyoprestige.com.au/#dealer",
    name: dealer.name,
    telephone: dealer.tel,
    email: dealer.email,
    address: { "@type": "PostalAddress", streetAddress: dealer.street, addressLocality: dealer.suburb, addressRegion: dealer.state, postalCode: dealer.postcode, addressCountry: "AU" },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "17:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "15:00" },
    ],
  };
  return `<script type="application/ld+json">${JSON.stringify([v, d])}</script>\n`;
}

export function carPage(c) {
  const st = STATUS[c.status];
  const soon = c.status === "coming-soon";
  const contract = c.status === "under-contract";
  const n = c.photos.length;
  const jp = KATAKANA[c.model];
  const sub = [c.colour, c.transmission, c.engine, c.drivetrain].filter(Boolean).map((s, i) => (i ? s : cap(s))).join(", ");
  const name = `${c.year} ${c.make} ${c.model}`;
  const lead = manifest[c.id]?.["1"];

  // ---- gallery
  const sizesLead = "(min-width: 1000px) 62vw, 100vw";
  const sizesRest = "(min-width: 1000px) 30vw, 100vw";
  const gallery = `
<section class="gal gal--n${Math.min(n, 5)}" data-gal aria-label="Photos of this ${esc(c.make)} ${esc(c.model)}">
  <ul class="gal__track" data-gal-track tabindex="0" aria-label="${n} photos. Swipe or use the arrow keys.">
    ${c.photos
      .map((p, i) => {
        const m = manifest[c.id]?.[String(i + 1)];
        if (!m) return "";
        const big = m.sizes[m.sizes.length - 1];
        return `<li class="gal__cell"><a class="gal__item shot" href="/img/cars/${c.id}/${i + 1}-${big}.avif" data-full data-i="${i}" data-w="${m.w}" data-h="${m.h}" data-label="${esc(cap(p.angle || "Photo " + (i + 1)))}" aria-label="Open photo ${i + 1} of ${n} full screen${p.angle ? ": " + esc(p.angle) : ""}">${photo(c, i + 1, { sizes: i === 0 ? sizesLead : sizesRest, lazy: i > 0, fetchpriority: i === 0 ? "high" : undefined, cls: i === 0 ? "gal__lead" : "" })}</a></li>`;
      })
      .join("\n    ")}
  </ul>
  <div class="gal__hud">
    <span class="gal__label code" data-gal-label>${esc(cap(c.photos[0]?.angle || "Photo 1"))}</span>
    <span class="gal__count code num"><span data-gal-n>1</span> / ${n}</span>
  </div>
  <button class="gal__all btn btn--quiet" type="button" data-gal-open hidden>${icon.expand} All ${n} photos</button>
</section>`;

  // ---- what is on record: only what the dealer publishes, with its source
  const serviceHistory = c.published?.serviceHistory;
  const rec = [];
  rec.push({
    k: "Kilometres",
    v: c.km != null ? `${km(c.km)} km, as listed` : "Not stated in the listing",
    s: soon
      ? "Tokyo Prestige says: for vehicles it sources, an original deregistration certificate is provided, and the odometer reading is guaranteed for vehicles it imports directly. Ask for this car's certificate."
      : "Tokyo Prestige says: for vehicles it sources, an original deregistration certificate is provided, and the odometer reading is guaranteed for vehicles it imports directly. Ask whether that applies to this car.",
    ok: c.km != null,
    src: "Listing; About and FAQ",
  });
  rec.push({ k: "Auction grade and sheet", v: "Not published for this car", s: "Ask for the auction sheet and grade. A dealer that imported the car will have them.", ok: false, src: "Not on the listing", ask: "auction sheet" });
  rec.push({ k: "Service history", v: serviceHistory ? cap(serviceHistory.toLowerCase()) : "Not stated in the listing", s: serviceHistory ? "Stated in the listing. Ask to see the records." : "Ask what records come with the car.", ok: !!serviceHistory, src: serviceHistory ? "Listing" : "Not on the listing", ask: serviceHistory ? null : "service records" });
  if (c.published?.australianDelivered) rec.push({ k: "Origin", v: "Australian delivered", s: "Sold new in Australia, not an import.", ok: true, src: "Listing" });
  rec.push({
    k: "Compliance",
    v: soon ? "Completed after arrival" : "Australian-compliant and ready for registration",
    s: soon ? "Tokyo Prestige says every vehicle in its range is Australian-compliant and ready for registration before sale." : "Stated by Tokyo Prestige for every vehicle in its range. Cars are registered in South Australia on purchase.",
    ok: !soon,
    src: "Listing; FAQ",
  });
  rec.push({ k: "Title", v: "Guaranteed clear title", s: "Free from any ownership or finance issues, as Tokyo Prestige states for every car.", ok: true, src: "About" });
  rec.push({ k: "Workshop", v: "Fully serviced before sale", s: "Workshop checked by Tokyo Prestige's own mechanics, and comprehensively detailed.", ok: true, src: "Listing; About" });
  rec.push({ k: "Independent inspection", v: "Welcome", s: "Send your own inspector. Tokyo Prestige encourages buyers to do their own checks before any purchase.", ok: true, src: "About; FAQ" });

  // ---- spec plate
  const spec = [
    ["Year", "年式", c.year],
    ["Model code", "型式", c.modelCode],
    ["Grade", "グレード", c.grade || (c.gradeNeedsConfirming ? "__GAP__" : null)],
    ["Kilometres", "走行距離", c.km != null ? `${km(c.km)} km` : null],
    ["Engine", null, c.engine],
    ["Transmission", "ミッション", c.transmission],
    ["Drive", "駆動方式", c.drivetrain],
    ["Seats", null, c.seats],
    ["Colour", "車体色", c.colour],
    ["Interior", null, c.interiorColour],
    [c.vinType === "Japanese frame number" ? "Frame number" : "VIN", c.vinType === "Japanese frame number" ? "車台番号" : null, c.vin],
    ["Engine number", null, c.engineNumber],
    ["Stock number", null, c.id],
    ["Location", null, soon ? "In transit to Marryatville" : c.location],
  ].filter(([, , v]) => v != null && v !== "");

  const intents = soon
    ? [
        ["notify", "Tell me when it lands", true],
        ["question", "Ask a question"],
        ["hold", "Hold it for me"],
        ["video", "Send me a video"],
      ]
    : [
        ["question", "Ask a question", true],
        ["testdrive", "Book a test drive"],
        ["hold", "Hold this car"],
        ["video", "Walk-around video"],
        ...(c.price ? [["driveaway", "Drive-away price"]] : []),
      ];

  const priceBlock = c.price
    ? `<p class="deal__price"><b class="num" data-count="${c.price}" data-pre="$">${money(c.price)}</b></p>
       <p class="deal__note">${esc(c.priceNote)}. <a href="#price">What that means</a></p>`
    : `<p class="deal__price deal__price--none">${soon ? "Price on arrival" : "Under contract"}</p>
       <p class="deal__note">${soon ? "Tokyo Prestige has not priced this car yet. Ask to be told when it lands." : "A buyer has this car under contract. Ask to be told if it comes back, or about similar cars."}</p>`;

  const actions = soon
    ? `<a class="btn btn--shu" href="#enquire" data-intent="notify">Tell me when it lands ${icon.arrow}</a>
       <a class="btn btn--ghost" href="tel:${dealer.tel}">${icon.phone} Call ${dealer.phone}</a>`
    : `<a class="btn btn--shu" href="#enquire" data-intent="${contract ? "question" : "testdrive"}">${contract ? "Ask about this car" : "Book a test drive"} ${icon.arrow}</a>
       <a class="btn btn--ghost" href="tel:${dealer.tel}">${icon.phone} Call ${dealer.phone}</a>`;

  const body = `
<div class="car" data-car data-id="${c.id}" data-title="${esc(name)}" data-price="${c.price ?? ""}">
  <nav class="wrap crumbs" aria-label="Breadcrumb">
    <a href="${soon ? "/coming-soon" : "/stock"}">${soon ? "Coming soon" : "Stock"}</a><span aria-hidden="true">/</span><a href="${soon ? "/coming-soon" : "/stock"}?make=${encodeURIComponent(c.make)}">${esc(c.make)}</a><span aria-hidden="true">/</span><span aria-current="page">${esc(c.model)}</span>
  </nav>
  <div class="wrap">${gallery}</div>

  <div class="wrap car__grid">
    <div class="car__main">
      <div class="car__lead">
      <header class="car__head">
        <p class="car__kicker">${jp ? `<span class="jp" lang="ja">${jp}</span>` : ""}<span class="status${st.cls}">${st.long}</span>${c.badge ? `<span class="card__tag">${esc(c.badge)}</span>` : ""}</p>
        <h1 class="car__title"><span class="num">${c.year}</span> ${esc(c.make)} ${esc(c.model)}</h1>
        <p class="car__codes">${c.modelCode ? `<span class="code car__code">${esc(c.modelCode)}</span>` : ""}${c.grade ? `<span class="car__grade">${esc(c.grade)}</span>` : c.gradeNeedsConfirming ? `<span class="car__grade muted">Grade to be confirmed</span>` : ""}</p>
        <p class="car__sub">${esc(sub)}</p>
      </header>

      <div class="deal deal--inline">
        ${priceBlock}
        <div class="deal__acts">${actions}</div>
      </div>
      </div>

      <dl class="nums" aria-label="Key facts">
        <div><dt>Year</dt><dd class="num" data-count="${c.year}" data-plain>${c.year}</dd></div>
        ${c.km != null ? `<div><dt>Kilometres</dt><dd class="num" data-count="${c.km}">${km(c.km)}</dd></div>` : ""}
        <div><dt>Stock number</dt><dd class="num">${c.id}</dd></div>
      </dl>

      ${
        c.highlights?.length
          ? `<section class="blk" aria-labelledby="hl-h">
        <h2 class="blk__h" id="hl-h">From the listing</h2>
        <ul class="tags">${c.highlights.map((h) => `<li>${esc(cap(h.toLowerCase()).replace(/\bkms\b/, "km"))}</li>`).join("")}</ul>
      </section>`
          : ""
      }

      <section class="blk" aria-labelledby="spec-h">
        <div class="blk__top"><h2 class="blk__h" id="spec-h">Specification</h2><span class="jp" lang="ja">諸元</span></div>
        <dl class="plate-tbl" data-plate>
          ${spec
            .map(
              ([k, j, v], i) =>
                `<div class="plate-tbl__row" data-reveal="line" style="--i:${i}"><dt>${k}${j ? ` <span class="jp" lang="ja">${j}</span>` : ""}</dt><dd class="num">${v === "__GAP__" ? `<span class="gap">To be confirmed with Tokyo Prestige</span>` : esc(v)}</dd></div>`,
            )
            .join("\n          ")}
        </dl>
        ${c.titleAsListed ? `<p class="fine">Listed by Tokyo Prestige as “${esc(c.titleAsListed)}”.</p>` : ""}
      </section>

      <section class="blk" aria-labelledby="rec-h" id="record">
        <div class="blk__top"><h2 class="blk__h" id="rec-h">Condition and history: what is on record</h2></div>
        <p class="blk__lede">Only what Tokyo Prestige has published. Where something is not published, we say so and you can ask for it.</p>
        <ul class="rec">
          ${rec
            .map(
              (r, i) => `<li class="rec__row${r.ok ? "" : " rec__row--ask"}" data-reveal style="--i:${i % 6}">
            <span class="rec__mark" aria-hidden="true">${r.ok ? icon.check : "?"}</span>
            <div><p class="rec__k">${r.k}</p><p class="rec__v">${esc(r.v)}</p><p class="rec__s">${esc(r.s)}</p></div>
            <div class="rec__side"><span class="plate">${r.src}</span>${r.ask ? `<a class="rec__ask" href="#enquire" data-intent="question" data-msg="Could you send me the ${r.ask} for this car?">Ask for it</a>` : ""}</div>
          </li>`,
            )
            .join("\n          ")}
        </ul>
      </section>

      <section class="blk seen" aria-labelledby="seen-h">
        <div>
          <h2 class="blk__h" id="seen-h">${n} photos here. See the rest on video.</h2>
          <p class="blk__lede">${soon ? "These photos were taken in Japan. " : ""}Want the underside, the engine bay, a cold start or a close look at a mark? Tokyo Prestige offers video inspections, so you can check the car from anywhere.</p>
        </div>
        <a class="btn btn--ghost" href="#enquire" data-intent="video">${icon.video} Request a walk-around video</a>
      </section>

      ${
        c.price
          ? `<section class="blk" aria-labelledby="price-h" id="price">
        <div class="blk__top"><h2 class="blk__h" id="price-h">The price, and what it covers</h2></div>
        <div class="cover">
          <div>
            <p class="cover__big num">${money(c.price)}</p>
            <p class="cover__note">${esc(c.priceNote)}</p>
            <p class="fine">Tokyo Prestige lists its cars plus on-road costs. Ask for the drive-away figure for your state before you compare it with another car.</p>
            <p style="margin-top:16px"><a class="btn btn--quiet" href="#enquire" data-intent="driveaway">Get the drive-away price ${icon.arrow}</a></p>
          </div>
          <ul class="ticks">
            <li>${icon.check}<span>Fully serviced</span></li>
            <li>${icon.check}<span>Comprehensively detailed</span></li>
            <li>${icon.check}<span>Australian-compliant and ready for registration</span></li>
            <li>${icon.check}<span>Guaranteed clear title</span></li>
            <li>${icon.check}<span>Statutory warranty where it applies. <a href="/faq#warranty">See the rules</a></span></li>
            <li>${icon.check}<span>Extended warranty available, 1 to 5 years</span></li>
            <li>${icon.check}<span>Trade-ins welcome</span></li>
          </ul>
        </div>

        <div class="est" data-est data-price="${c.price}">
          <div class="est__head">
            <h3 class="est__h">Repayment estimator</h3>
            <p class="fine">An estimate only, not an offer of finance. Tokyo Prestige does not publish a rate, so you set it.</p>
          </div>
          <noscript><p class="fine">The estimator needs JavaScript. Call ${dealer.phone} and the team will work a figure out with you.</p></noscript>
          <div class="est__grid" data-est-ui hidden>
            <div class="est__ctl">
              <div class="est__row"><label for="est-dep">Deposit or trade-in</label><output class="num" data-est-dep-out>$0</output></div>
              <input class="range" id="est-dep" type="range" min="0" max="${Math.floor((c.price * 0.6) / 500) * 500}" step="500" value="0" data-est-dep>
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
              <p class="fine" data-est-sum>Choose a rate to see an estimate on ${money(c.price)}.</p>
              <a class="btn btn--quiet" href="#enquire" data-intent="question" data-opt="finance">Ask about finance ${icon.arrow}</a>
            </div>
          </div>
          <p class="fine est__legal">The figure is the car's listed price less your deposit, repaid in equal instalments at the rate and term you chose. It leaves out on-road costs, fees and charges, and it is not a quote. Finance is arranged through Credit One, Tokyo Prestige's finance partner, and depends on approval. Ask for a written quote with the comparison rate before you decide.</p>
        </div>
      </section>`
          : ""
      }

      <section class="blk" aria-labelledby="enq-h" id="enquire">
        <div class="blk__top"><h2 class="blk__h" id="enq-h">${soon ? "Be first to know when it lands" : "Ask about this car"}</h2></div>
        <form class="enq" data-enq novalidate action="#enquire" method="post" data-endpoint="">
          <!-- HOOK: set data-endpoint to the real lead endpoint (for example /api/lead). Until then the form validates and shows its thank-you state, and sends nothing. -->
          <input type="hidden" name="car" value="${esc(name)}${c.modelCode ? " " + esc(c.modelCode) : ""}, stock ${c.id}">
          <input type="hidden" name="stock" value="${c.id}">
          <p class="enq__car"><span class="enq__thumb shot">${photo(c, 1, { sizes: "72px", max: 480, alt: "" })}</span><span><b>${esc(name)}</b><br><span class="plate">${c.modelCode ? esc(c.modelCode) + " · " : ""}Stock ${c.id}</span></span></p>
          <fieldset class="enq__set"><legend>What would you like?</legend>
            <div class="enq__chips">${intents.map(([v, l, on]) => `<label class="chip"><input type="radio" name="intent" value="${v}"${on ? " checked" : ""}><span>${l}</span></label>`).join("")}</div>
          </fieldset>
          <div class="enq__when" data-when hidden>
            <div class="field"><label for="enq-day">Preferred day</label><select class="select" id="enq-day" name="day"><option value="">Any day</option><option>Monday</option><option>Tuesday</option><option>Wednesday</option><option>Thursday</option><option>Friday</option><option>Saturday</option></select></div>
            <div class="field"><label for="enq-time">Time of day</label><select class="select" id="enq-time" name="time"><option value="">Any time</option><option>Morning</option><option>Around midday</option><option>Afternoon</option></select></div>
          </div>
          <div class="enq__two">
            <div class="field"><label for="enq-name">Name</label><input class="input" id="enq-name" name="name" autocomplete="name" required><p class="field__err" hidden>Please add your name.</p></div>
            <div class="field"><label for="enq-contact">Mobile or email</label><input class="input" id="enq-contact" name="contact" autocomplete="tel" inputmode="email" required><p class="field__err" hidden>Add a mobile number or an email so the team can reply.</p></div>
          </div>
          <div class="field"><label for="enq-msg">Message <span class="muted">(optional)</span></label><textarea class="input" id="enq-msg" name="message" rows="3" placeholder="${soon ? "Anything you would like to know before it arrives" : "Anything you would like to know"}"></textarea></div>
          <fieldset class="enq__set"><legend>Tick any that apply <span class="muted">(optional)</span></legend>
            <div class="enq__chips">
              <label class="chip"><input type="checkbox" name="opt" value="trade-in"><span>I have a trade-in</span></label>
              <label class="chip"><input type="checkbox" name="opt" value="finance"><span>I would like finance</span></label>
              <label class="chip"><input type="checkbox" name="opt" value="interstate"><span>I am interstate</span></label>
            </div>
          </fieldset>
          <button class="btn btn--shu enq__go" type="submit"><span data-enq-label>Send</span> ${icon.arrow}</button>
          <p class="fine">Goes to the sales team at Marryatville. Or call <a class="num" href="tel:${dealer.tel}">${dealer.phone}</a>, ${dealer.hours[0][0].toLowerCase()} ${dealer.hours[0][1]}, Saturday ${dealer.hours[1][1]}.</p>
        </form>
        <div class="enq__done" data-enq-done hidden tabindex="-1">
          <span class="enq__seal" aria-hidden="true">${icon.check}</span>
          <h3 class="h3">Thanks, <span data-enq-who>that is with the team</span>.</h3>
          <p class="blk__lede" data-enq-next></p>
          <p class="ph__tag" style="margin-top:16px">Demo: nothing was sent</p>
        </div>
      </section>

      <section class="blk" aria-labelledby="del-h" id="delivery">
        <div class="blk__top"><h2 class="blk__h" id="del-h">Buying from interstate</h2><span class="jp" lang="ja">全国配送</span></div>
        <ol class="steps">
          <li><span class="code">01</span><div><h3>See it without visiting</h3><p>Ask for a walk-around video of this car, and send your own inspector if you would like a second opinion. Third-party inspections are welcome.</p></div></li>
          <li><span class="code">02</span><div><h3>Delivered Australia-wide</h3><p>Tokyo Prestige uses several freight companies and the car is insured in transit. To your door, or to a depot if you would rather save a little.</p></div></li>
          <li><span class="code">03</span><div><h3>Registering it at home</h3><p>Cars are registered in South Australia on purchase. If the car is leaving the state, you organise the roadworthy and registration where you live.</p></div></li>
        </ol>
        <p style="margin-top:20px"><a class="btn btn--quiet" href="#enquire" data-intent="question" data-opt="interstate" data-msg="Could you quote delivery to my postcode: ">Ask for a delivery quote ${icon.arrow}</a></p>
      </section>

      <section class="blk" aria-labelledby="who-h">
        <div class="blk__top"><h2 class="blk__h" id="who-h">Who you are buying from</h2></div>
        <div class="who">
          <figure class="who__pic shot"><img src="/img/site/yard-dusk-800.avif" srcset="/img/site/yard-dusk-800.avif 800w, /img/site/yard-dusk-1600.avif 1600w" sizes="(min-width: 1000px) 420px, 100vw" width="2560" height="1707" alt="The Tokyo Prestige showroom on Kensington Road, Marryatville, at dusk" loading="lazy" decoding="async"></figure>
          <div class="who__txt">
            <p class="who__lede">A locally owned family business, with over a decade in Japanese imports and its own workshop.</p>
            <dl class="who__dl">
              <div><dt>Showroom</dt><dd>${dealer.street}, ${dealer.suburb} ${dealer.state} ${dealer.postcode}. <a href="${dealer.maps}" rel="noopener">Map</a></dd></div>
              <div><dt>Hours</dt><dd>${dealer.hours.map(([d, h]) => `${d} ${h}`).join(". ")}</dd></div>
              <div><dt>Licence</dt><dd>Licensed second-hand vehicle dealer ${dealer.licence}</dd></div>
            </dl>
          </div>
        </div>
        <div class="ph" style="margin-top:16px">
          <span class="ph__tag">Placeholder: reviews</span>
          <p>Three Google reviews go here, word for word, with the reviewer's name, the date and a link to the review. None are shown because none could be read for this demo. See research/gaps.md.</p>
        </div>
      </section>
    </div>

    <aside class="car__side" aria-label="Price and enquiry">
      <div class="deal deal--side">
        <p class="deal__top"><span class="status${st.cls}">${st.label}</span><span class="plate">Stock ${c.id}</span></p>
        <p class="deal__name">${esc(name)}</p>
        ${priceBlock}
        <div class="deal__acts">
          ${actions}
          <a class="btn btn--quiet" href="#enquire" data-intent="question">${icon.msg} Send a message</a>
        </div>
        <ul class="deal__mini">
          <li><a href="#enquire" data-intent="${soon ? "hold" : "hold"}">${icon.key}<span>${soon ? "Hold it for me" : "Hold this car"}</span></a></li>
          <li><a href="#enquire" data-intent="video">${icon.video}<span>Walk-around video</span></a></li>
          <li><a href="#delivery">${icon.pin}<span>Delivery Australia-wide</span></a></li>
        </ul>
        <p class="deal__lic plate">${dealer.name} · ${dealer.licence}</p>
      </div>
    </aside>
  </div>

  <section class="sec sec--tight" aria-labelledby="sim-h">
    <div class="wrap">
      <div class="sec__head"><p class="eyebrow">Keep looking</p><h2 class="h2" id="sim-h">Similar cars</h2></div>
      <div class="cards">${similar(c).map((o) => card(o)).join("\n")}</div>
    </div>
  </section>
</div>

<div class="dock" data-dock aria-label="Contact about this car">
  <a class="dock__btn" href="tel:${dealer.tel}">${icon.phone}<span>Call</span></a>
  <a class="dock__btn" href="#enquire" data-intent="question">${icon.msg}<span>Message</span></a>
  <a class="dock__btn dock__btn--main" href="#enquire" data-intent="${soon ? "notify" : contract ? "question" : "testdrive"}">${soon ? "Tell me when it lands" : contract ? "Ask about it" : "Book a test drive"}</a>
</div>

<dialog class="lb" data-lb aria-label="Photos, full screen">
  <div class="lb__bar"><span class="code" data-lb-label></span><span class="code num" data-lb-count></span><button class="lb__x" type="button" data-lb-close aria-label="Close photos">${icon.close}</button></div>
  <ul class="lb__track" data-lb-track tabindex="0"></ul>
  <button class="lb__nav lb__nav--prev" type="button" data-lb-prev aria-label="Previous photo">${icon.chev}</button>
  <button class="lb__nav lb__nav--next" type="button" data-lb-next aria-label="Next photo">${icon.chev}</button>
</dialog>
`;

  const desc = `${name}${c.modelCode ? " (" + c.modelCode + ")" : ""}${c.grade ? " " + c.grade : ""}${c.km != null ? ", " + km(c.km) + " km" : ""}${c.price ? ", " + money(c.price) + " " + c.priceNote.toLowerCase() : ""}. ${st.long} with Tokyo Prestige, ${dealer.suburb}. Licensed dealer ${dealer.licence}.`;
  return layout({
    title: `${name}${c.modelCode ? " " + c.modelCode : ""}${c.grade ? " " + c.grade : ""} | Tokyo Prestige`,
    description: desc,
    path: carUrl(c),
    body,
    dock: true,
    css: ["/assets/css/car.css"],
    js: c.price ? ["/assets/js/est.js", "/assets/js/car.js"] : ["/assets/js/car.js"],
    head: (lead ? `<link rel="preload" as="image" href="/img/cars/${c.id}/1-960.avif" imagesrcset="${lead.sizes.map((w) => `/img/cars/${c.id}/1-${w}.avif ${w}w`).join(", ")}" imagesizes="${sizesLead}" fetchpriority="high">\n` : "") + jsonLd(c),
  });
}
