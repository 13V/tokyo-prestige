# Brands and marketplaces: the standard of a car page and of search

Researched 11 Nov 2026 with Playwright Chromium (desktop 1440x900, phone 390x844 iPhone UA, DPR 2). Screenshots are in
`/home/user/tokyo-prestige/research/competitors/brands-marketplaces/` (14 files, all looked at). "(inference)" marks my own reading.

## Coverage

Loaded and evaluated (10): Porsche AU, Polestar AU, Lucid, Rivian, Genesis AU, BMW AU, Toyota Japan (Crown), Nissan Global Heritage, Autotrader UK, Carwow UK.

Blocked by bot protection in the real browser (403, Cloudflare "Just a moment", captcha, or 429). Not evaluated, nothing filled from memory:
- Lexus AU (403 Cloudflare), Toyota AU (403 Cloudflare), Mercedes-Benz AU (403), Tesla AU (403 "Access Denied").
- Carsales (403), Carsguide (403), mobile.de (403 "Zugriff verweigert"), CarGurus ("Verification Required"), Cars.com (403 Cloudflare).
- Porsche Finder used-car search (`finder.porsche.com`, 429 Vercel Security Checkpoint), Goo-net (502).
- Nissan AU: home loaded but the Z page URL I guessed was 404. Autotrader UK flipped between 200 and 403 on different runs; the search and listing runs that worked are what I report.

Gap that matters: **no Australian marketplace (Carsales, Carsguide) and no Porsche Finder could be inspected.** Do that by hand in a normal browser before locking the search design.

Deep on 6 (desktop + phone, own screenshots, motion and reduced-motion tests): Porsche AU, Polestar AU, Lucid, Rivian, Autotrader UK, Toyota Japan. Lighter: Genesis, BMW, Carwow, Nissan Heritage.

Speed note: the sandbox proxy is slow and noisy, so absolute numbers are inflated; use them only as relative weight. "Bytes" = sum of response bodies seen up to the post-load wait.

| Site | Load event (desktop) | Transferred (desktop) |
|---|---|---|
| Autotrader UK search | 12.3 s | 10.4 MB |
| Porsche AU 911 model overview | 27.5 s (6.3 s on an earlier run) | 8.8 MB |
| Polestar 3 | 10.2 s | 18.2 MB |
| Lucid Gravity | 11.0 s | 32.7 MB |
| Rivian R1S | 4.5 s | 19.8 MB |
| Genesis AU home | 11.8 s | 7.4 MB |
| Toyota JP Crown | 38.9 s | 23.4 MB |
| Carwow GT-R page | 14.0 s | 16.4 MB |
| BMW AU home | 3.9 s | 5.9 MB |
| Nissan Heritage | 4.0 s | 6.5 MB |

Takeaway: the "premium" experiences are all 7 to 33 MB. A dealer site that loads fast on a phone is already ahead of every one of these.

---

## 1. Porsche Australia (deep)

URLs: `https://www.porsche.com/australia/models/911/` (model overview, doubles as variant picker) and `https://www.porsche.com/australia/models/911/carrera-models/911-carrera/` (the single-car page, reached via "Explore in Detail"). Shots: `porsche-detail-desktop.jpg`, `porsche-detail-s900-desktop.jpg`, `porsche-911-phone.jpg`.

**First screen, desktop (single-car page).** White ground, not dark. A giant pale-grey "911" numeral sits behind a side-on studio cut-out of a blue 911, ground shadow under the wheels. Under it a pill segmented control (Coupé / Cabriolet / Targa / GT / Turbo Coupé / GT Cabriolet / Turbo Cabriolet), then "911 Carrera" in a light condensed display face with a small "Petrol" tag. Four buttons in one row: **Change model variant** (black, primary), **Configure**, **Buy new and used vehicles**, **Request a test drive** (grey). Header is just Menu, wordmark, country flag, account.
**First screen, phone (overview page).** "Model overview / Configure your dream Porsche", then a full-width black **Filter** button, grey "Load saved configuration" and "Understand the differences" buttons, then variant cards one per row.

**How the car is revealed.** Studio cut-out stills, not video, on the model page. The editorial section below switches to lifestyle photography with rounded corners (a person in front of a dark grey 911 in dappled light, rounded-rectangle crops overlapping each other). I found no video elements on this page (`document.querySelectorAll('video')` = 0).
Motion, measured in the page's CSS: four elements (the editorial text block and three media tiles in the "Mosaic" editorial) use a **CSS scroll-driven animation** (`animation-timeline: view()`), keyframes `transform: var(--_parallax-transform)` to `scale(1)`, range `cover 0px` to `cover 70%` (or `exit-crossing 50%`), easing `cubic-bezier(0.4, 0, 0.5, 1)`. In plain terms: tiles start offset/scaled and settle to rest as they scroll into view, tied to scroll position (no time duration; reverses on scroll up). Subtle, a few tens of px. With `reducedMotion: 'reduce'` the animations still exist (4 animations counted) so it does not fully switch the parallax off (inference: they may rely on `@supports`/media query not observed).
On scroll a **sticky 61 px white bar** appears: model name on the left ("911 Carrera"), "Change model variant", and at right "Configure", "Buy new and used vehicles", "Compare". A black underline marks the current anchor.

**Specs.** The best number typography I saw. Three big figures stacked left, a front-on car image right (`porsche-detail-s900-desktop.jpg`): **4.1 s**, **290 kW / 394 PS**, **294 km/h**. Numerals are large (about 70 px), light weight, units (s, kW, PS, km/h) set in a much smaller size on the same baseline, caption underneath in small grey ("Acceleration 0 - 100 km/h", "Power (kW) / Power (PS)", "Top speed"). Then a grey "View all technical details" button. On the overview cards the same three facts are medium-size, same pattern, with pill tags above (`2027`, `Petrol`, `Rear-wheel drive`, `PDK (Automatic)`). Compare = a checkbox on every card; a Compare link in the sticky bar. Body-type counts in a checkbox filter: Coupé (6), Cabriolet (7), Targa (2), GT (2) and so on.

**Price and finance.** **No price anywhere** on the AU model overview or model page (scanned the page text for `$` and "drive"). All pricing sits behind Configure / "Buy new and used vehicles". Weak for conversion, but it is the convention at this tier.

**Primary actions.** Four equal-ish buttons under the hero on desktop; sticky bar actions after scroll. Phone: a single black Filter button on the overview. A grey "Feedback" tab is fixed to the right edge (it covers content on the card shots).

**Accessibility.** Black on white, high contrast; the grey captions under numbers are lighter (about #6b6e70, inference from the screenshot; not measured). Checkbox filter is real checkboxes with labels and counts.

**Speed.** 8.8 MB on desktop, 10 MB on phone; load 6 to 27 s through the proxy (noisy).

**Weak.** No price, no video or 360 on the page I reached, the model page is more a menu of variants than a "car for sale" page; the overview is long (13+ cards of near-identical side views).

---

## 2. Polestar Australia (deep)

URL: `https://www.polestar.com/au/polestar-3/`. Shots: `polestar3-desktop.jpg`, `polestar3-phone.jpg`.

**First screen, desktop.** Full-bleed muted video (2880x1620, 11 s loop) of the car driving away through a misty forest road. Cool, desaturated grade, low light, dark vignette at the bottom. Over it, bottom-left, a hairline rule above "Polestar 3" in white and a three-row stat block: **Range up to 647 km¹ / 0-100 km/h 3.9 sec² / Power up to 500 kW²** (labels grey, values white, footnote superscripts). A circular pause/play button bottom-right. Two header rows: global nav, then a sub-nav (Polestar 3, Performance, Interior, Technology, Safety, Tech specs) with an underline on the current item, and at far right **Test drive** (outlined) and **Buy** (black, with a chevron).
**First screen, phone.** A different, portrait-cropped video (a white car head-on in a stone arcade). Header is the wordmark and burger; a second row "Polestar 3" + black **Buy** button; a third row of horizontally scrolling anchors (Performance, Interior, Technology, Safety). Same name + three stats pinned bottom-left over the video, large type (about 26 px values), pause button bottom-right. The first screen on a phone is almost entirely video.

**How the car is revealed.** Video first, then still renders with light and shadow doing the work: the rear of the car on mid-grey seamless ground, then an overhead top-down render with a thin white leader line to a short caption ("The front aero wing attaches the air to the bonnet…"). Sections alternate full-bleed black and grey blocks. I counted five video elements; only the one in view plays (the rest `paused: true`), so it loads videos lazily.
Motion: the sub-nav sticks (white, 56 px) when you scroll past the hero. I found no scroll-tied transforms or scroll-timeline animations in my wheel sampling (0 changes); the motion is the autoplay loops and section-to-section cuts, not parallax.
**Reduced motion:** with `reducedMotion: 'reduce'` all five videos are paused and `loop` is false. Best handling of the sites I tested.

**Specs.** Hero trio as above; later a "800 V / Battery architecture", "350 kW / Max DC charging" pair as large numbers with a small label. A separate "Tech specs" tab. Footnotes carry the small print (superscripts 1 to 6).

**Price and finance.** No price on the page. A promotional line on a black band: "Receive a drivetrain upgrade contribution worth $14,400.⁶" with an outlined "Available cars →" button. The **Buy** dropdown has exactly two entries: "Available cars" and "Configure" (`polestar3-buymenu` not kept). Financing is a top-nav item ("Financing options", "How to buy", "Offers", "Available cars").

**Primary actions.** Desktop: Test drive and Buy sit top right in the sticky sub-nav the whole time. Phone: Buy stays in the second header row; no bottom bar. Secondary CTA repeats inside content bands ("Test drive →").

**Accessibility.** White text over video with a dark bottom gradient; the pause control exists (good for WCAG 2.2.2). Footnote superscripts are tiny. Grey-on-grey section captions on the mid-grey band are lower contrast (visible in `polestar3-s2000`, not kept).

**Speed.** 18 MB desktop, 11 MB phone. Heavy: 2880x1620 video.

**Weak.** Very heavy; no price; the "Buy" button opens a two-item menu rather than a form.

---

## 3. Lucid Motors, Gravity (deep)

URL: `https://www.lucidmotors.com/gravity`. Shots: `lucid-desktop.jpg`, `lucid-s2000-desktop.jpg`, phone seen but not kept.

**First screen, desktop.** An announcement strip across the top in sand/gold: "Lucid Gravity Touring: Lease from $749/mo for 36 months* + $1K Demo Drive Credit** + $3.5K Discount for 1st-Time EV Buyers***. View Offers" (underlined link). Header over a hero photograph: widely spaced wordmark, centred nav (Lucid Air, Lucid Gravity, Lucid Sapphire, Pre-Owned, Discover), a gold **DEMO DRIVE** button. Hero is a family-and-SUV lifestyle photo at a clifftop house, caption in a large high-contrast **serif display** ("Lucid Gravity Named 2026 World Luxury Car of the Year"). A white **VIEW INVENTORY** button bottom-left. A cookie panel covers the bottom third on both desktop and phone (large, 390 px wide on phone: it takes about 45% of the phone first screen, which is bad).
**First screen, phone.** The offer strip wraps to three lines, header with wordmark + DEMO DRIVE + burger, hero photo cropped to the car, title cut off by the cookie panel.

**How the car is revealed.** Lifestyle photography and video; the lower sections are near-black (#0d0d0d) with gold small-caps labels ("OVERVIEW", "EPA EST. RANGE") and serif headlines mixing roman and italic ("Go further than ever, *faster than expected.*"). A strong, restrained, dark look that is close to the target aesthetic.
Motion: six `video` elements (muted, loop, autoplay). The sticky section nav (Overview, Elite Performance Trim, Space, Range & Charging, Performance, User Experience, Safety & Driver Assistance, Sustainability, Specs, Compare) sits on a black bar at the top after scrolling. At the bottom a **sticky action bar** appears with two buttons side by side: white **VIEW INVENTORY** and outlined **DESIGN YOURS**. Wheel sampling found no scroll-tied transforms. **Reduced motion:** videos kept autoplaying (`paused: false`), so not respected (and 61 opacity changes occurred under reduce, so fades still ran).

**Specs.** Three-column strip between hairlines: tiny gold tracked caps label, value in a regular-weight sans ("Up to 450 mi²", "Up to 120 cubic feet", "Up to 7 adults") and a grey qualifier ("varies by configuration"). Footnote superscripts. Understated; numerals are not oversized.

**Price and finance.** Price as copy: "Available to order now from $79,900¹." Lease headline in the top strip with `*`, `**`, `***` footnotes. (Text read from the page; the footnote bodies were not captured.)

**Primary actions.** Desktop: gold Demo Drive top right; sticky bottom pair View Inventory / Design Yours. **Pre-Owned** is a top-level nav item (not opened).

**Speed.** 32.7 MB desktop, 26.6 MB phone. The heaviest site tested. Videos did not report dimensions in my headless run (not decoded), so the video look is from stills only.

**Weak.** Cookie panel dominates the phone; weight; reduced motion ignored.

---

## 4. Rivian R1S (deep)

URL: `https://rivian.com/r1s`. Shots: `rivian-phone.jpg` (desktop seen, not kept).

**First screen, desktop.** Floating rounded white header bar (inset about 12 px from the edges): wordmark, Vehicles / Charging / Technology / Discover / Gear Shop, a **yellow "Demo drive"** pill, chat and account icons. Under it a full-bleed video of the dark green SUV moving through a city street, motion-blurred background, an enormous white **R1S** at left, bottom-left **"Leasing from $1,209/mo\*"** with an underlined "* Disclosures" link, bottom-right two pills: black **Design yours**, yellow **Book a drive**. Everything sits inside the first 720 px, then white.
**First screen, phone.** The same composition stacked: huge centred "R1S", price line "Leasing from $1,209/mo*", **two full-width pills side by side (black Design yours, yellow Book a drive)**, "* Disclosures" below, a floating yellow chat button bottom-right. Very good: price and both actions on the first screen, thumb height.

**How revealed.** 1920x1080 hero loop (10 s, muted, autoplay, loop) plus a separate 1080x1920 portrait loop for phone; the portrait one is paused until needed. Rest of the page is not dark: white with large bold sans headlines ("Explore the R1S, an all-electric, 7-seat SUV built for making memories.").
**Reduced motion:** the hero video is paused (good).

**Specs and price.** Not examined deeper. Price is the lease monthly figure with a disclosures link, not a purchase price.

**Speed.** 19.8 MB desktop, 28 MB phone.

**Weak.** Yellow/black playful brand is off-tone for a prestige dealer; heavy; the 3-in-1 bright pills are loud.

---

## 5. Toyota Japan, Crown (deep, domestic JP format)

URL: `https://toyota.jp/crown/`. Shot: `toyotajp-crown2-desktop.jpg`.

**First screen.** A Cookiebot panel covers the top of the page until "必須のCookieのみ許可" (essentials only) is chosen; on phone it covers nearly the whole screen. Behind it: a wide dark studio photo of the silver Crown, side-on, CROWN wordmark top-left, a "2024 JNCAP five-star" award badge top-right, a floating round chat "相談する" button. Above the photo: logo, login/search/menu, a text sub-nav and a **model-level tab bar** (価格・グレード price and grade, デザイン design, 室内空間 interior, 走行性能 performance, 安全性能 safety, コネクティッド, カスタマイズカー, アップグレード, アクセサリー, 減税・補助金 tax relief and subsidies). No video found (0 `video` elements). Page is slow: 23 MB and a load event of about 39 s in the sandbox.

**Price and specs (this is the JDM-relevant one).** Prices are shown as **plain integers in yen, tax-included, per grade**, each with the powertrain and fuel economy in a fixed small block, for example: "Z（燃料電池車）**8,530,500円（税込）** / パワーユニット トヨタFCスタック（燃料電池）+モーター / WLTCモード 148km/kg / 一充填走行距離 約820km（参考値）" and "Z（ハイブリッド車）7,530,600円（税込） … 18.0km/L" and "G（ハイブリッド車）6,499,900円（税込） … 18.3km/L". The word 税込 (tax included) sits right after the number, and the range figure is flagged "(参考値)" (reference value). A "カラー＆360ビュー" (colour and 360 view) block is on the page, plus PDF e-catalogue and spec-sheet downloads. Prices change with the selected colour on that block (the text shows the grade price again under each colour name).

**Why it matters (inference).** The Japanese buyer expects: price per grade with tax stated, fuel economy on the WLTC mode, grade comparison, 360 colour viewer, downloadable spec sheet. JDM buyers in Australia will expect the same facts in the same order.

**Weak.** Cookie wall, 39 s load in the sandbox, extremely dense navigation.

---

## 6. Autotrader UK (deep; best marketplace I could reach)

URLs: `https://www.autotrader.co.uk/car-search?postcode=SW1A1AA&make=Nissan&model=GT-R` and a listing `https://www.autotrader.co.uk/car-details/202609256401159`. Shots: `autotrader-search-desktop.jpg`, `autotrader-search-phone.jpg`, `autotrader-filtersheet-phone.jpg`, `autotrader-listing-desktop.jpg`, `autotrader-listing-phone.jpg`.

### Search / filter UI
- **Desktop:** a single row of blue pill dropdowns under the header: Make (set: "Nissan"), I'm looking for, Model, Price, Year, Mileage, Gearbox, Body type, Fuel type, Engine size, Distance, with an arrow button to scroll the row, and a solid blue **Filter and sort** button with a red count badge at the end. Active filters turn solid blue with the value inside. Below: "**64 results**" with an (i) tooltip and **Save search** (bookmark icon) at right.
- **Phone:** the row becomes a horizontally scrollable chip strip led by a round blue filter-icon button with a red number badge (the number of active filters), then "Nissan ⌄", "GT-R ⌄", "I'm looking for ⌄". Tapping the filter icon opens a **full-screen sheet** titled "Filter and sort" with a blue X: a "Try AI search" outlined button, "Sign in to see saved searches", then accordion rows each with an icon (Sort: Relevance; Distance from you: SW1A 1AA, National; I'm looking for; Make and model; "Reserve with Autotrader" checkbox: "Reserve online with the option to finance or part exchange"; Price: Pay in full ...). **Sticky footer:** "Clear all" (underlined link) and a solid blue **"Search 64 cars"** pill, so the result count updates live and the button states the count.
- Pattern: sheet filters apply on the button; the desktop dropdowns are applied per dropdown (inference; I did not change a value). Shareable state is in the URL query (`postcode`, `make`, `model`, `sort`, `page`, `searchId`), and the listing link carries `backLinkQueryParams` so "Back to results" restores the search.
- **Saved search and alerts:** "Save search" is on every results page; signed-out text says "Save vehicles, searches and create alerts for price drops and new listings by signing in". There is also **Try AI search**.
- **Sort:** relevance default, in the filter sheet.

### Result card (desktop 4-up grid, phone 1-up)
Order: photo (4:3) with a white tag top-left (**Reserve online** or **Private seller**), a heart (save) top-right, photo count bottom-right ("1/22"), dot indicator for swipe; then **title** (make + model, bold), **spec line** ("3.8 V6 Prestige Auto 4WD Euro 6 2dr"), a **dealer headline** in caps ("LITCHFIELD STAGE 2/FI EXHAUST"), two **pill chips** ("35,000 miles", "2017 (17 reg)"), **price** (bold, largest), then **location + distance** ("Watford (15 miles)") on the left and a **dealer rating** (book icon + "4.8 ★") on the right. Green "**Good price**" label appears on some cards, inline with the chips. Price is the strongest text on the card; the order is photo, name, trim, hook, facts, price, where.

### Listing page
- **Desktop:** "Back to results" (blue, top-left), heart/share/calculator icons top-right; a **mosaic gallery**: one large image left, a 2x2 (and more, with a next arrow) of thumbnails right, with a "Gallery" button and "22" count. Below, left card: "Available to reserve" tag, **2017 Nissan GT-R**, trim line, dealer name in a black logo block, "Watford · 15 miles away", rating, "More seller information". Right card, **"Your next steps"**, a radio group: **Reserve now** ("Reserve the car for a refundable £99. We'll keep your money safe and always return it!") and **Build a deal**. Further down: Pricing, Overview, Description, Insurance, Meet the seller, Before you buy, Expert reviews (a sticky section nav).
- **Price block:** "**Pay in full £84,995**" then "**Get it on finance £2,041.95 per month (HP)**" with "Use the finance calculator". Monthly figure is labelled HP so the type of finance is clear.
- **Overview grid:** two columns, icon + label + value for Mileage (35,000 miles), Registration (2017 (17 reg)), Fuel type, Body type, Engine, Gearbox, Doors, Seats, Body colour, Emission class; a "Lower mileage" highlight chip; "View all spec and features". Dealer's free-text description in full below, plus an AI-written summary paragraph.
- **Phone:** photo carousel at top (1/22 and 10 dots) with back arrow, heart, share, calculator buttons overlaid; a "Gallery" button; cards for dealer and price. **Sticky bottom bar: "Call" (outlined) and "Next steps →" (solid blue)**, always visible, about 100 px tall. Anchor tabs on scroll (…formation / Pricing / Overview) in a sticky header, current tab as a dark pill with a fade at the edge.

**Accessibility.** Clear focus is not something I tested by keyboard. Controls are large (44 px plus), strong blue on white, icons paired with labels on listing. Cards use real photos at inconsistent aspect (dealer images with banners).
**Speed.** 10.4 MB desktop, 11.7 MB phone for 12 cards; images lazy-load ("Loading…" placeholders in the DOM text).
**Weak.** Dealer-written ALL-CAPS hooks make cards noisy ("1300BHP GTR SKYLINE-9.4S 0-160"); dealer photos vary wildly; chip row is dense; the cookie/consent layer and ads ("Ad" cards interleave).

---

## Lighter reviews

**Genesis AU** (`https://www.genesis.com/au/en`). Black header, full-bleed hero carousel on the home (GV60 all-electric in a pool of light; GV90 beside a pool, door open to a tan interior). Slide indicators and a pause button at bottom centre, two text links "Discover More >" and "Build & Price >". The disclaimer is baked into the image area at low contrast: "Overseas model shown. Australian specifications and features may differ." (it overlaps the slide dots). Phone: header is logo + MODELS / LOCATIONS / CONTACT + burger, carousel is tall and photographic, one link "Secure your place >". No price on home. 7.4 MB. Carousel is image-based; no `video` found. Gentle and cinematic, but the legal line colliding with the dots is a defect.

**BMW AU** (`https://www.bmw.com.au`, `/en/all-models.html`). Home hero is a dark close-up of tail-lights with a blue "View Offer" button ("The BMW DEMO Sale Event."). A full-width white cookie panel ("Cookie Usage.", **Customise/reject** vs a **Continue** primary) covers the bottom 30%. The all-models page is a filter-first catalogue: Categories as 2-column icon tiles (SUV, Touring, Sedan, Coupé, Hatch, Convertible), Series list (X, 1, 2, 3, 4, 5, 7, Z), Drivetrain (100% Electric, Plug-in Hybrid, Petrol, Diesel, BMW M), Exclusive offers "On Offer", and cards grouped by drivetrain with counts ("100% Electric (12)", "Petrol (40)"), badges "New" and "Coming Soon", and a compare icon on each card. Cards show a cut-out car and little else. No price on cards in the text I captured.

**Carwow UK** (`https://www.carwow.co.uk/nissan/gt-r`). Editorial-first: heavy black condensed all-caps headline "NISSAN GT-R REVIEW & PRICES", social-follower counts, tabs Review / Specs / Colours, a thumbnail-rail gallery with a video-review lead image, and a right card "**There are currently no deals for this model on Carwow**… View alternatives" with Trustpilot "Excellent 86,271 reviews". A cyan bar fixed to the bottom ("Diesel near £2 a litre? Compare electric deals"). Honest empty state, but the page sells the review, not a car. `/used` returned 404 (so I did not see its search). 16 MB.

**Nissan Heritage** (`https://www.nissan-global.com/EN/HERITAGE/`). A period studio photograph of a blue Fairlady Z (S30) under a "Nissan Heritage" title in thin, wide-tracked white type over a soft grey gradient. Archive tone: this is the most relevant example of a heritage car shown as an object (1970s car, studio light, no UI chrome on the image). The page below is a plain news list. 6.5 MB.

---

## Cross-site patterns (what I saw)

- **Price:** premium brands hide or soften price (Porsche AU: none; Polestar: none on the page, an offer instead; Lucid: "from $79,900" in body copy and a lease headline up top; Rivian: lease monthly on the hero). Marketplaces lead with price and finance (Autotrader: cash price then "£2,041.95 per month (HP)"). Toyota JP: price per grade, tax-included, with fuel economy.
- **Disclaimer style:** footnote superscripts in the hero stats (Polestar), `*` with an underlined "Disclosures" link right under the price (Rivian), tracked low-contrast one-liner on imagery (Genesis), `*`/`**`/`***` in the offer strip (Lucid). The only plain-English one short enough to quote word for word: Genesis, "Overseas model shown. Australian specifications and features may differ." and Autotrader, "Reserve the car for a refundable £99. We'll keep your money safe and always return it!".
- **Sticky actions:** desktop: sub-nav with CTAs at top right (Polestar, Porsche), bottom pair bar (Lucid). Phone: Autotrader's Call + Next steps bottom bar; Rivian's two pills in the hero; Polestar's Buy in the header.
- **Reduced motion:** Polestar and Rivian pause video; Lucid does not; Porsche's scroll parallax is CSS-driven and still defined.
- **Weight:** all brand sites 6 to 33 MB.

---

## THREE BEST

1. **Autotrader UK search and listing**, `https://www.autotrader.co.uk/car-search?postcode=SW1A1AA&make=Nissan&model=GT-R` and `.../car-details/<id>`. The clearest search and card hierarchy: live count in the sticky "Search 64 cars" button, "Clear all", filter-count badge on the filter icon, URL-shareable state, Save search, the card order photo, name, trim, hook, two fact chips, price, place and rating. On the listing, the phone **sticky Call + Next steps bar**, cash price and monthly price stacked, and a plain icon grid of ten facts. Take the structure, not the look.
2. **Porsche AU 911 model page**, `https://www.porsche.com/australia/models/911/carrera-models/911-carrera/`. Best number typography (large light numerals, tiny units, grey caption), the car shown as a cut-out object on a calm ground, a quiet sticky bar with model name and actions, and a measured scroll-driven parallax (`view()` timeline, `cubic-bezier(0.4,0,0.5,1)`, settles to scale 1 by 70% of the entry). Weak on price, but the best treatment of "specs as design".
3. **Polestar 3**, `https://www.polestar.com/au/polestar-3/`. A pure example of a restrained cinematic first screen: video, one name, three facts with footnotes, two buttons (Test drive outlined, Buy solid) in a sticky sub-nav, a pause button, lazy video that pauses under reduced motion, and a phone layout that swaps to a portrait crop. Heavy at 18 MB, so use a poster and a short, small loop.

(Honourable mention: Rivian's phone hero for putting price and both actions on the first screen; Lucid's dark serif-and-gold section look.)

## ONE WORST

**Toyota Japan Crown page**, `https://toyota.jp/crown/`, as an experience: a consent panel that covers the hero (and nearly the whole screen on a phone), 23 MB transferred and a roughly 39 s load event in my run, ten tab-level navigation items before the car. Its content is useful (tax-included per-grade prices, WLTC economy, 360 colour viewer, PDF spec sheet) but the delivery buries it. (Runner-up: Lucid's phone consent panel covering about 45% of the first screen.)

---

## The standard a single car page should meet (checklist)

1. **Name, year, grade and price in the first 600 px on a phone**, no scrolling. Price is a real number with its basis stated (see 3).
2. **One hero image** of the actual car, large, with the lighting and angle chosen; a photo count and "1/24" indicator; swipe works; a Gallery button opens a full-screen viewer with thumbnails and keyboard arrows.
3. **Price block:** cash/drive-away price, the finance estimate beside it with the finance type labelled ("per month (HP)"), a "use the calculator" link, and a one-line disclaimer within sight of the number (Autotrader and Rivian do this; Porsche and Polestar do not).
4. **Fact grid of 8 to 12 items**, two columns on phone: mileage, year/build date, engine, transmission, drivetrain, colour, seats, fuel. Icon plus label plus value (Autotrader). Add JDM-specific lines: auction grade, chassis code, import date and compliance status (inference).
5. **Headline numbers in display type:** the three performance figures large and light, units small on the same baseline, caption below (Porsche).
6. **Sticky actions:** on phone a bottom bar with Call and one primary (Autotrader: "Call" and "Next steps"); on desktop a top bar that appears after the hero with name and actions (Porsche, Polestar, Lucid).
7. **Two or more enquiry routes:** call, message, book a viewing, reserve with a refundable deposit stated in plain words ("refundable £99").
8. **Seller identity and trust at the point of decision:** dealer name, location, distance, rating (Autotrader).
9. **Full description in the dealer's words, not truncated**, plus a "Read full description" control.
10. **Section anchors** that stick on scroll (Pricing, Overview, Description…) so a long page is navigable.
11. **Save, share and compare** controls (heart, share, a compare checkbox).
12. **Back to results restores the filters and the scroll position** (Autotrader carries `backLinkQueryParams`).
13. **Honest empty and sold states** (Carwow's "no deals for this model… View alternatives").
14. **Performance:** hero image under about 200 KB at phone width, gallery lazy-loaded, any video under a few MB with a poster and paused off-screen (Polestar) and paused under `prefers-reduced-motion` (Polestar, Rivian pass; Lucid fails).
15. **Consent/legal layers must not cover the hero or the price** on a phone.
16. **Accessible basics:** visible focus ring on the gallery, buttons and chips, 4.5:1 contrast for captions, controls of 44 px, pause control on any moving media, alt text that names the car.

## Motion ideas worth adapting for a dark, cinematic, restrained dealer site

(Describe only; do not copy any site's design, copy or imagery.)

1. **Scroll-settled parallax with a native CSS view timeline.** Each photo or text block enters offset by about 24 to 48 px and scaled about 1.04, and settles to rest by the time it is 70% into view, following scroll position (reverses on scroll up), easing a gentle `cubic-bezier(0.4, 0, 0.5, 1)`. Costs no JavaScript and no frame budget. (Seen at Porsche; the technique, not the look.)
2. **A dark "pool of light" reveal.** On load, the car sits in near-black and a soft light wedge widens across the body over roughly 1.2 to 1.6 s with an ease-out, ending on a still. Done with a CSS gradient mask over a single image, not video, so it costs a few hundred KB.
3. **Number settle, not count-up.** The three headline figures (power, 0 to 100, mileage) fade up 8 px over 400 ms, staggered by 80 ms, once, when they enter the view; units arrive with the number. No counting animation. (Inference from the Porsche type treatment, restrained.)
4. **A hairline that draws.** A 1 px rule above the car name draws left to right over about 600 ms when the hero is ready (the Polestar bottom-left hairline plus stats pattern, animated). Cheap, and signals polish.
5. **Quiet sticky bar that slides in after the hero.** 56 px bar, 250 ms translate and fade, carrying car name, price and the primary action; leaves the viewport again at the footer. On phone it becomes the Call + Enquire bar.
6. **Gallery as a crossfade, not a slide.** Next image fades over 350 ms with a 1.02 to 1.0 scale settle; thumbnail rail below; keyboard arrows; a "1/24" counter. Prefetch the next image on hover or on swipe start.
7. **Hero video only as an option.** A short silent loop of 6 to 10 s, under 3 MB, poster first, plays only when on screen, with a visible pause button, and replaced by the poster under `prefers-reduced-motion` and Save-Data (Polestar and Rivian behaviours; Lucid is the cautionary example).
8. **Gold or warm accent only for the single primary action** on a near-black ground (Lucid's sand-gold button on dark), a 150 ms colour shift on hover, a visible 2 px focus ring in the accent.
9. **Reduced-motion rule for everything above:** all transforms and fades collapse to instant, parallax is off, video is a still.
