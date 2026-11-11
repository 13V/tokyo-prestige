# UK and European specialist / JDM dealer sites: evaluation for Tokyo Prestige

Researched 11 Nov 2026 with Playwright (Chromium, desktop 1440x900, phone 390x844 iPhone UA) from a sandbox that goes through a proxy. Screenshots (14, JPEG q60) are in `/home/user/tokyo-prestige/research/competitors/uk-eu/`. Anything marked (inference) is my reading, not something the site states.

## Coverage and what I could not reach

Evaluated (11): Torque GT, Romans International, Tom Hartley, Collecting Cars, Mechatronik, Hexagon Classics, DK Engineering, JM Imports, 4 Star Classics, Speed8 Classics (BE), plus Auto Leitner (PIN gate only).
Deep dive (desktop and phone, own screenshots, looked at): Torque GT, Romans International, Collecting Cars, Mechatronik, Tom Hartley (partial, see caveat), with Hexagon, JM and DK covered at lighter depth.

Blocked or unreachable from this sandbox (not filled from memory):
- torquegt.com, harlowjapautos.*, algys*, japanperformancecars.*, newera-imports/neweraimports.*, rarecarsdirect.*, duke-of-london.*: tunnel/connection failed.
- paulstephens.com, cultclassics.nl, theoctanecollection.co.uk: HTTP 502. www.theoctanecollection.com: 403. octane-collection.com (French "Prochainement disponible" holding page) loaded but is not a stock site.
- Duke of London (dukeoflondon.com): 403 Cloudflare "Just a moment".
- Auto Leitner (auto-leitner.de): shows only a "Bitte PIN eingeben" login box. Stock is not public.
- Tom Hartley: sometimes served an Imperva hCaptcha ("Additional security check is required") on desktop; on other loads it rendered, but with part of its CSS failing in my sandbox (unstyled Previous/Next buttons, overlapping header). I trust its structure and text, not its desktop visuals. Its perf numbers below are void (they measured the challenge page).
- Collecting Cars: first pass worked; later passes hit a Cloudflare challenge, so I could not open its filter panel or re-measure. WebFetch got 403.

Note: Torque GT is `torque-gt.co.uk` (Shopify), not torquegt.com.

## Speed (home and one car page, desktop, sequential run, cold cache)

Chrome load event, LCP and transferred bytes (CDP `encodedDataLength`) from this sandbox. Indicative only: it is a proxied network, so compare sites to each other, not to a real phone on 4G.

| Site | Home load / LCP / KB / reqs | Car page load / LCP / KB / reqs |
|---|---|---|
| Torque GT | 11.7 s / 2.7 s / 5,280 / 302 | 8.9 s / 2.6 s / 4,150 / 262 |
| Romans | 2.8 s / 1.6 s / 3,681 / 64 | 4.3 s / 2.5 s / 6,826 / 151 |
| Mechatronik | 4.1 s / 4.1 s / 2,301 / 39 | 3.8 s / 1.6 s / 10,626 / 82 |
| Hexagon | 3.4 s / 2.9 s / **32,687** / 91 | 4.0 s / 2.5 s / 7,287 / 95 |
| DK Engineering | 3.5 s / 1.8 s / **35,381** / 85 | 4.1 s / 2.6 s / 11,104 / 89 |
| JM Imports | 5.3 s / 3.3 s / 4,822 / 113 | 5.2 s / 3.2 s / 2,601 / 127 |
| 4 Star | 2.9 s / 2.2 s / 3,250 / 52 | 2.7 s / 2.0 s / 6,994 / 51 |
| Speed8 | 3.5 s / 2.0 s / 2,738 / 76 | not measured |
| Collecting Cars | earlier (contended) run: DOM ready ~6 s, ~2.6 MB; not re-measured | not measured |
| Tom Hartley | invalid (challenge page) | invalid |

Reading: Romans is the quickest to a visible hero (LCP 1.6 s) and lightest request count. Torque GT fires 260-300 requests per page (Shopify theme plus apps; load event 9-12 s here), though LCP is fine at ~2.6 s because the hero paints early. Hexagon and DK pull 32-35 MB on the home page (heavy sliders/media, no sensible lazy-loading), which would hurt on mobile data (inference).

---

## Per-site findings

### 1. Torque GT (JDM importer, Devon) https://torque-gt.co.uk  [deep dive]
Shopify store: parts shop first, showroom second.

First screen. Desktop: black utility bar (country/currency), black header with a wide search box, white nav strip (Parts, Clearance, Personal Import Service, Showroom, Workshop, Blog) and the phone number `01626 836590` in the nav. Below it a full-width rotating hero with heavy italic caps ("JAY KAY'S CAPPUCCINO / Now Available in the Showroom", red "MORE DETAILS" button, four timer dots), car photographed in front of a neon Tokyo street backdrop. Phone: header with search bar, hero "TOYOTA LAND CRUISER 70 / Now In The Showroom / FIND OUT MORE", then a parts "Select vehicle" finder and a lime-green "BF26 EARLY ACCESS" promo card that covers the bottom of the first screen. No phone number or enquiry button on phone header.

Search and filtering. Showroom (`/pages/showroom`) has **no filters, no sort, no search of stock**; it is one long page of cards grouped by status. Site search is a global (parts-led) search. Not shareable per filter (there are none).

Stock grid. 3 columns desktop, 2 on phone. Each card: studio photo, uppercase model name, price, outlined "FULL DETAILS" button. Status is handled by **section headings on the same page**: for sale (13 cards in my run), "COMING SOON" (8 cards, "Coming Soon" in place of a price), "RESERVED" (14 cards, "Reserved" in place of a price). "VIEW SOLD VEHICLES" link goes to `/pages/showroom-sold-out`. Cards do not show year, mileage or grade. Unavailable cars stay visible, which makes the stock look deep (inference).

Photography treatment. Every car shot in the same studio against the same neon Tokyo street print, white plate "TORQUE GT". It is the strongest brand device on any JDM site I saw: instantly says Japan, and makes mixed-quality source cars look like one collection.

Car page (Honda NSX, `/pages/showroom/1-honda-nsx`). Order: gallery (large image plus a scrolling thumbnail strip with arrows; I could not reliably count photos) on the left; on the right H1, four spec lines (Year 1991, Mileage 47,450, Engine Size 3.0, Transmission Automatic), a 4-line blurb, then price `£67,990`. Below: a long free-text narrative that carries the proof: "serviced 30 times since new, with stamps and paperwork", mileage at each service era, timing belt at 28,143 miles and again at 41,191 and 47,279, a full list of the August 2026 in-house service items (parts brands named), underside "clear Lanoguard treatment in 2024", respray detail, keys, handbooks, cherished plate. Ends "To register your interest, please use the contact form below." No auction sheet or grade (this one is a UK-supplied car, not a fresh import). No 360 or video. No finance calculator. Price is a single figure; per the showroom FAQ, prices include UK conversions, any IVA test, a 12-month MOT if needed, a valet and a multipoint inspection.

Enquiry. Only a "MAKE ENQUIRY" form (name, email, phone, message) **at the bottom of the page**, below the long text; not sticky, not above the fold on desktop or phone. The header phone number is visible on desktop but not on the phone header. Phone/email reservation with card deposit is explained in the FAQ (https://torque-gt.co.uk/pages/faqs-showroom), not on the car page.

Trust. "451 reviews" block on the home and car page (these are product reviews of parts, not of car sales), "importing since 2001 / over 25 years", Torque Rewards loyalty card, in-house workshop, personal-import page with a 5-step process and a dedicated account manager (https://torque-gt.co.uk/pages/personal-import-service).

Distant buyers. FAQ: "we export cars all over the world"; no shipping detail. No finance offered (FAQ says a personal loan is the best option). Part exchange accepted.

Speed. See table; heavy request count.

Weak. Enquiry form buried under a wall of text; no filters or sort; cards omit mileage/year; no sticky CTA; phone header has no call button; promo overlay competes with the hero on phone; long blank gaps on car page until lazy sections load; no auction-grade explanation anywhere on the sales pages.

### 2. Romans International (supercars, Surrey) https://www.romansinternational.com  [deep dive]
Platform: 67 Degrees (image CDN `images.67degreescdn.co.uk`; same family as Hexagon, whose header shows the 67 logo).

First screen. Desktop: full-bleed, night-time photograph of the forecourt with a Ferrari LaFerrari, McLaren Senna, Porsche 918 and others lit up; transparent header, centred white serif-style wordmark "ROMANS INTERNATIONAL", tracked uppercase nav split left and right of the logo (Home, Current Stock, Sell Your Car | Insights, About Us, Contact Us) and a phone icon. Caption bottom-left "EXCEPTIONAL EXAMPLES | THE UK'S FINEST SELECTION". No headline, no button; the photograph is the pitch. Phone: same photo cropped, then "WELCOME TO ROMANS INTERNATIONAL" in thin tracked Montserrat. In my phone run the header logo image failed to load and showed alt text "Romans International" with a broken-image icon (also on stock and car pages).

Search and filtering. A left slide-out panel on desktop ("FILTER STOCK" vertical tab on car pages), "FILTER OUR STOCK" button on phone: manufacturer links (Aston Martin, Audi, Bac, Bentley, BMW, Ferrari, Jaguar, Lamborghini, Land Rover, McLaren, Mercedes-Benz, Porsche, Rolls-Royce) and body style (Coupe, Convertible, SUV, Estate, Sports). Each is a **normal link to a path URL** (`/used/cars/ferrari/`), so full page load, but clean and shareable. Sort dropdown (13 options: price both ways, age, mileage, MPG, tax rate, make A-Z, recently added) and per-page (12 to 60). List/grid toggle on desktop. No price slider, no year or mileage range.

Stock grid. Desktop default is list view with the model name in tracked caps and the price at right ("POA" for the 918 Spyder; one card shows "inc. VAT"). Phone: one large card per car (photo full width, then a label/value table: Year `2015 (15)`, Colour, Mileage, price). Sold cars are separate: "PREVIOUSLY SOLD GALLERY" link. No coming-soon/in-transit state seen.

Car page (718 Spyder, `/used/cars/porsche/718-spyder/--4958`). Desktop: large gallery (arrows plus fullscreen icon) left, thumbnail strip beneath, right column a label/value table (Price, Colour, Interior, Year, Mileage, Engine, Transmission, Body style, Fuel), then two full-width black buttons "ENQUIRE NOW" and "SHARE", all above the fold at 900 px high. Below: KEY INFORMATION bullets that state provenance and extras with cost ("Paint to Sample ... (£6,986)", "Supplied with Romans International Platinum Warranty", "UK Supplied", PPF), OPTIONS list, a dark TECHNICAL DATA / DIMENSIONS spec block, "WHAT THE JOURNALISTS SAY" editorial section. Phone: title, full-bleed gallery with dots and a thumb strip, then the same table; Enquire sits below the table, i.e. below the first screen. There is a fixed "Call now on ... / E" bar (`vehicle__bottom`) in the DOM on both sizes; I did not see it painted in my phone screenshots, so I can't confirm it is visible (inference: it may appear on scroll). No video, 360 or condition report seen; history proof is a sentence, not documents.

Enquiry. "ENQUIRE NOW" opens a modal/slide panel: First name, Last name, Email, Telephone (all required), Message, mailing-list opt-in (Yes/No required), reCAPTCHA. There is also "Request a finance quote" (Elev8 Finance link on home and nav) and an "Enquire Online" and call-now option. Heavy form (4 required fields plus a required marketing choice) is a friction point.

Trust. "Family run ... established in 1994", Platinum Warranty, press quotes ("What the journalists say"), an Insights/editorial section, Elev8 Finance, "Sell your car".

Distant buyers. Nothing visible on delivery or export in the pages I opened (not verified deeper).

Weak. Required marketing opt-in on the enquiry form; phone logo broken in my run; heavy stock-by-manufacturer only (no price/year filters); cookie modal appears over the page and blocks everything until accepted.

### 3. Collecting Cars (auction platform) https://collectingcars.com  [deep dive: listing and one car page]
First screen. Desktop: thin Trustpilot bar ("RATED 'EXCELLENT' ON TRUSTPILOT 4.3 / 5"), logo centre, search left, blue "SELL" and "Sign In" right, text tab bar (Live Auctions, Coming Soon, Sold, Cars, Plates, Bikes, Automobilia, Watches), then "LIVE AUCTIONS 242 lots" and a card grid. A dark "Don't miss out!" newsletter popup (email plus country) appears on desktop within seconds and covers the lower-left cards; on phone it covers roughly the lower half of the first screen. Phone: search bar and pill tabs above the fold.

Search and filtering. Suggested chips with counts ("US & Canada Auctions 2", "No Reserve 38", "Managed Service 7", "Boosted 47"), a "Filters" button and a sort dropdown ("Ending soonest"). The state is **in the URL** (`/buy?refinementList[lotType][0]=car&refinementList[listingStage][0]=live`), so filter views are shareable and bookmarkable (this is Algolia-style instant search; no page reload, inference from the query-string pattern). Make landing pages are crawlable content pages, e.g. `/buy/nissan-for-sale` redirects to `/makes/nissan/9` with an editorial intro on Skyline GT-R generations ("R32, R33, R34 always used", "more than 100 photos of every car").

Stock grid. Card: large photo, badges ("NO RESERVE", "RESERVE LOWERED", "BOOSTED"), heart, title in caps, "CURRENT BID", red countdown pill, flag + location, bid count. Coming Soon and Sold are first-class tabs; sold results stay public (good proof).

Car page (1996 R33 GT-R V-Spec, `/for-sale/1996-nissan-skyline-r33-gt-r-v-spec-6`). Large H1 with year/model/variant, "TBC . RHD . Manual", location with flag, views and saves count, Save / Add to Calendar / Share, bid input with "SET MAX BID" and "PLACE BID". Gallery counter reads "View all photos (227)" (the page promises 100+ per car). Description is in tabs/sections: Key facts, Equipment and features, Condition, Service history, Summary. SPECIFICATION table includes Original market (Japan), VIN, Engine, Exterior/Interior. A "Consignment specialist" card names a person with Contact, "Ask a question" and "WhatsApp us". "BUY WITH CONFIDENCE / PROTECTING YOU AT EVERY TURN" block: Expert support, Strict seller guidelines, Independent checks, Unrivalled listings. "OUR FEES: 6% of final sale price, min A$2,000, max A$11,000". **Sticky bottom bar** (desktop) with title, "Ends in 47h 44m", current bid A$77,500 and "LOGIN TO BID".

Weak for our purpose. Not a dealer; no fixed price; auction mechanics and login wall; newsletter popup hits fast; Cloudflare bot challenge. The page structure is what's worth copying.

### 4. Mechatronik (Mercedes/AMG/Porsche specialist, Germany) https://www.mechatronik.de  [deep dive]
First screen. Desktop: **white** header (red slashed logo, thin Eurostile nav in light grey: New-Tech Series, Verkauf, Ankauf, Werkstatt, Unternehmen, Languages), then an autoplaying full-bleed hero (a `<video>` element is present) of two AMG coupes on a track at golden hour, no text overlay. Phone: logo and boxed hamburger, then a tall photo hero, then image-led "NEW-TECH SERIES" tile.

Search and filtering. `/verkauf/fahrzeugangebote/` has a FILTER panel: Marke (Alfa-Romeo ... Rolls-Royce), Typ (Cabrio, Roadster, Limousine, Coupe, SUV, Van, Andere), Baujahr (up to 1945 ... from 2020), Preiskategorie (under 100k EUR ...). Presented as a bar of facets; I did not test reload vs. in-page. No sort seen. Newsletter modal opens over the grid on desktop.

Stock grid. 3 columns of large photos plus a name only: **no price, mileage or year on cards**. Sold cars are shown first and marked with a diagonal red corner ribbon "VERKAUFT" (Ferrari Daytona SP3, Pagani Zonda). I checked 55 car pages: 29 were not marked sold, so about half the grid is sold stock, used as a showcase (inference: social proof for a high-end seller). Separate "Verkauft / Referenzen" archive and "Ankauf" (we-buy) page.

Car page. Sold example: image strip and "DIESES FAHRZEUG WURDE BEREITS VERKAUFT. JETZT IHREN ANSPRECHPARTNER FÜR DEN FERRARI DAYTONA SP3 KONTAKTIEREN." + Kontakt button (turns a dead listing into a lead). Available example (F12 TDF): full-width hero image, scrolling thumb strip with dots, then large editorial image pairs (interior, seats) at near full width. **No text, price, spec or condition proof in the page body** (text dump of the page returned only navigation, slide numbers and "KONTAKT"); the enquiry route is the Kontakt link. 82 requests and 10.6 MB per car page (photo-heavy).

Trust / distant buyers. Sales news, sponsoring, workshop and "CARE" service pages, long history; German/English toggle (the English path I guessed `/en/sales/vehicle-offers/` 404'd; the language switch is in the header). Nothing on shipping.

Weak. No price or spec makes comparison impossible; gallery-only pages are lovely but convert only the already-committed; German-first.

### 5. Tom Hartley (supercars, Derbyshire and Knightsbridge) https://www.tomhartley.com  [partial, see caveat]
First screen (phone, the one clean render): black header with tagline, serif small-caps headline "Over 65 Luxury, Performance, And Classic Cars In Our Inventory", "VIEW OUR INVENTORY", "SEARCH BY BRAND" dropdown, then the first car card. Desktop render was unreliable here (Imperva challenge or missing CSS).

Search. Manufacturer dropdown with counts (All Makes 75; Ferrari 13; Lamborghini 10; Rolls-Royce 10 ...) and path URLs (`/used/Ferrari`). No other filters.

Grid. One column of very large photo cards with a photo-count badge (45, 48, 50, 33), title, price, "5,000 miles | Petrol | F1". **Status inline**: "UNDER OFFER" shown where the price would be. "Previously Sold" archive exists; "Saved cars" (favourites) with a header counter.

Car page (Bugatti Veyron, `/used-car-details/.../id-11342/`). Text order: Previous/Next gallery, title, price, then four actions: **Play Video, Email Enquiry, "Reserve Online For £210,000" (10 percent of the price), FINANCE QUOTE, plus phone `01283 762762`**; spec table (Colour, Interior Trim, Mileage, Body Style, Transmission, Engine Capacity, Fuel); Save/Remove/Print; Specification list with "+" accordions; "Selling Your Car" part-exchange box (enter your reg). Two phone numbers (Head Office; Knightsbridge). "Over 50 years" ("Est. over 53 years" badge). No condition documents, auction sheets or history beyond the spec list on this page.

Best idea: an online reservation with a stated deposit amount on the car page.

### 6. Hexagon Classics (London) https://www.hexagonclassics.com
Dark (#1c1c1c) site. First screen: black header with phone + email top-left, centred wordmark, socials; grey nav (Our Stock, Service, Bodyshop & Restoration, Facilities & Services, News & Blog, Sell Your Car, About, Contact); full-bleed slider with two 911s against a charcoal fence, arrows, scroll chevron; a round envelope "FIND OUT MORE" button floats bottom-right on all pages. Phone: logo centred, hamburger, smaller slider (dots overlap the scroll chevron), then "Specialising in classic cars since 1963".
Stock is browsed **by make pages** (AC, Aston Martin, BMW, Ferrari, Jaguar, Lancia, Lotus, Mercedes, Porsche, Mini, Left Hand Drive Cars, Previously Sold, Coming Soon); no filters or sort. Card: photo, caps title with year and drive side ("PORSCHE 911 3.2 TARGA COMMEMORATIVE EDITION G50, 1988"), one-line highlights ("ONLY 7,950 miles, G50 transmission ... UNRESTORED AS NEW") and price. Car page: price, body style, year, mileage, colours, **PLAY VIDEO**, Specification and Description tabs, then a "PHONE / EMAIL" block with **two named salesmen and their mobile numbers and emails**, related stock. Footer: "We are a cashless business." Weak: no filters; 32.7 MB on the home page; no condition documents on the page I opened.

### 7. DK Engineering (Ferrari specialists, Hertfordshire) https://www.dkeng.co.uk
Dated: dark green (#07261c) ground, 12px Verdana/Open Sans, red/yellow link colours, Google+ and Twitter icons still in the header, a "Light Mode" toggle, red cookie bar. Home is mostly news text with an image. Stock page "Available Stock (11th November 2026)" (a live date, nice touch): 3-column cards with action photos on track/road, an icon row (odometer, gearbox, steering side), flags for Location and Title/Tax status (useful for export), price in £, € and $ ("€2,399,995 . $2,699,995") or "POA" on many cars, "Enquire" and "Further details". Car page: title, subtitle, price in three currencies, **Enquire**, odometer/transmission/drive side/location/title-tax, then tabs (Model Description, Specifics, Highlights) with long marque history. Strongest asset: the multi-currency price and the Title/Tax flag that tell an overseas buyer where the car legally sits. Weakest: look and weight (35 MB home), POA on most cars.

### 8. JM Imports (JDM and performance import, Newcastle) https://www.jm-imports.co.uk
WordPress/WooCommerce. Home hero "Unrivalled Performance" over a tuned Lamborghini, a logo carousel of tuning brands, ebay link, YouTube badge "36k+". Stock (`/vehicles/for-sale/`): 4-col dark cards, photos taken on a Japanese yard against a concrete wall, title, price, red "DETAILS" button; **pricing mechanic**: "£22,995 Pay 50% Deposit for Reduced price" / "or pay 50% deposit for a reduced price" (a deposit-for-discount incentive). Status text in the price line: "Vehicle Now in UK", "Fresh Import". Separate "Previously Sold Cars", "How to Import at Auctions / at Dealers", "Export Services" pages, "We are a credit broker" FCA footer.
Car page (WRX STi Spec C): big title and **price + "Enquire today" above the fold on desktop and phone**; then categorised bullets (Bodywork, Engine spec, Drive train and suspension, Interior, Wheels and tyres) and Notes: "132,598 KMS (82,392 MILES)", "GRADE 4 AUCTION", "EXTENSIVE HISTORY FILE & RECORDS", "RECENT CAMBELT & WATER PUMP 106,375KMS", "FULLY SERVICED ON UK ARRIVAL". It is the only site where an **auction grade is printed** (as a note, not explained, no sheet shown). No filters. Phone header: icons collide with the H1 (hamburger overlaps the title) and the logo is tiny.

### 9. 4 Star Classics (Hampshire) https://www.4starclassics.com
Plain black/red 2010s layout; newsletter popup on first load covers the home page. Cards: white-studio photo, title, price, one-line summary. Car page: **price and a red ENQUIRE NOW button above the fold at the left**, spec table with MOT expiry, top speed, 0-60, BHP; then EQUIPMENT and description split into headed sections (EXTERIOR, INTERIOR ...) with condition detail. Right sidebar of other stock with prices. Pattern worth noting: structured condition write-up per area.

### 10. Speed8Classics (Belgium) https://speed8classics.com
Warm khaki header with a wave cut, thin condensed caps type, "SPEED8CLASSICS / Unusual & rare cars in exceptional condition" over a darkened facade photo. Stock page: three-column photo cards with one rounded corner and the model name only, no price or spec on the card; nav includes "Bring a trailer" (they take cars to buyers?) and "Sold cars". Distinctive shape language, little decision information. Not deep-dived.

### 11. Auto Leitner (DE) https://www.auto-leitner.de
PIN-gated: a login box over a stock photo of a dealership interior. Public site has nothing to evaluate.

---

## Visual identity and motion on the most premium sites

Romans International. Premium comes from restraint and consistency, not effects.
- Type: Montserrat in uppercase with about 3.1 px letter-spacing at 28 px for page titles and the nav, regular weight 400 (never bold), over Roboto body text in mid grey (#666). Wide tracking plus light weight reads "luxury".
- Layout: pure white page, black rules, a short black underline under each section title, generous vertical space, label/value rows separated by hairlines.
- Photography: every stock car shot in the same white marble showroom with a round turntable plinth and soft overhead light; transparent header over a night hero. The car is the only colour on the page.
- Motion: CSS transitions of 0.3-0.5 s on links and the slide-out filter panel (right 0.3 s), a slider on the hero; no scroll-jacking. About 227 elements carry animation/slider classes (inference: reveal and carousel plugins).
- Buttons: full-width solid black rectangles with tracked white caps ("ENQUIRE NOW", "SHARE").

Mechatronik. Premium through scale and silence.
- White header with a light Eurostile-style extended face in grey (nav at 50 percent black), the red logo the only colour accent.
- Autoplaying full-bleed hero video, no overlay text; car pages are almost nothing but near full-width photographs in two-up editorial pairs; no UI between you and the car.
- Photography is directed and varied (track golden hour, forest, studio, interior details) rather than catalogue shots; sold ribbons are a thin diagonal red corner.
- Motion: `transform 0.3 s ease-in-out`, thumbnail strip with dots.

Hexagon Classics. Dark gallery feel.
- Custom light geometric sans ("DefaultLight") at 80 px with -2 px tracking for page titles on a near-black (#1c1c1c) ground; white thin nav.
- All cars photographed against the same charcoal horizontal-slat fence in daylight: strong series look at low cost.
- Motion: 0.3 s `cubic-bezier(0.19, 1, 0.22, 1)` (an easeOutExpo) on opacity/transform, 0.5 s on "all": quick, soft settle. Floating round envelope button as the persistent CTA.

Torque GT (not "premium" but the best brand device in JDM). Heavy italic Figtree 800 caps over a neon Tokyo print backdrop; black/white/red palette; 0.4-0.6 s colour and background-position transitions on buttons. It looks like a parts retailer once you leave the showroom page.

---

## THREE BEST (for what Tokyo Prestige needs)

1. **Torque GT, https://torque-gt.co.uk/pages/showroom**. The only direct JDM peer that runs a proper stock story. Specifics: Coming Soon / Reserved / for-sale sections and a sold archive on one page, so the lot always looks full; neon Tokyo studio backdrop for every car; car pages whose narrative is real proof (service-by-service history with mileages, named parts, underside protection year, keys/manuals/cherished plate); "prices include conversions, IVA, MOT, valet, multipoint inspection"; a published 5-step personal-import process with a named account manager. It loses points for a bottom-of-page form, no filters and 260-300 requests per page.
2. **Romans International, https://www.romansinternational.com/used/cars/**. Best stock-page and car-page mechanics: sort with 13 options and per-page, clean path-URL filters, a spec table with **Price + ENQUIRE NOW + SHARE all above the fold on desktop**, option costs itemised in key information (e.g. "Paint to Sample ... (£6,986)"), named warranty, finance-quote link, press quotes, and the most disciplined premium typography and photography seen. Fastest LCP (1.6 s home).
3. **Collecting Cars, https://collectingcars.com/for-sale/1996-nissan-skyline-r33-gt-r-v-spec-6**. Not a dealer, but the best template for trust data on a single car: 227 photos with a counter, tabbed Key facts / Equipment / Condition / Service history / Summary, VIN and "Original market: Japan" in the spec table, a named specialist with Contact / Ask a question / WhatsApp, a "Buy with confidence" block (expert support, seller guidelines, independent checks), a transparent fee line, a sticky bottom action bar, shareable facet URLs, and Coming Soon / Sold as first-class tabs. Its newsletter popup is a anti-pattern.

Runners-up: Tom Hartley (online reservation with stated 10 percent deposit, video, finance quote on the car page); Mechatronik (best sold-car handling and the most cinematic imagery).

## ONE WORST

**DK Engineering, https://www.dkeng.co.uk/ferrari-sales.php**. 35 MB transferred on the home page (11 MB on a car page); dark-green layout with 12 px Verdana body text, a Google+ icon and a "Light Mode" toggle still in the header; most cars show "POA"; icon-only spec row with the odometer icon labelled "Enquire" on POA cars; red cookie bar over the grid; no filters beyond a tiny search box. Its one smart idea (price in £/€/$ plus a "Title/Tax status" flag) is buried in the clutter. (Close behind: JM Imports, whose phone header overlaps its H1.)

## Patterns worth adopting

1. Status sections on one page: For sale / Coming soon / In transit / Reserved / Sold, with sold kept visible (Torque GT, Mechatronik ribbon, Collecting Cars tabs). A "sold" car page should become a lead ("Dieses Fahrzeug wurde bereits verkauft ... Ansprechpartner kontaktieren").
2. Price + primary action above the fold on the car page (Romans table + black Enquire button; 4 Star; JM). On phone, add a sticky bottom bar with Call / WhatsApp / Enquire (Collecting Cars sticky bar pattern; Romans has a fixed call bar in its DOM).
3. A shareable, URL-addressable filter and sort (Collecting Cars query string, Romans path URLs, Tom Hartley brand pages with counts).
4. Online reservation with an explicit deposit on the car page ("Reserve Online For £210,000" at Tom Hartley; Torque GT takes card deposits by phone; JM "50% deposit for a reduced price").
5. A people block: named sales contact with mobile and email (Hexagon), or a "consignment specialist" with Contact / Ask / WhatsApp (Collecting Cars).
6. A branded, repeatable photo set: same backdrop for every car (Torque GT neon Tokyo, Romans marble plinth, Hexagon charcoal fence).
7. Condition write-up by area (4 Star: Exterior / Interior headings) and dated, mileage-stamped service history in plain language (Torque GT NSX).
8. "What's included in the price" stated (Torque GT: conversions, IVA, MOT, valet, inspection). Itemise option values (Romans).
9. Print the auction grade and odometer in both km and miles (JM: "132,598 KMS (82,392 MILES)", "GRADE 4 AUCTION").
10. Multi-currency price and Title/Tax/Location flags for overseas buyers (DK).
11. Make landing pages with real editorial copy that doubles as SEO (Collecting Cars `/makes/nissan`).
12. Dated stock header ("Available Stock (11th November 2026)") to prove freshness (DK).
13. Process page for importing to order, with the 5 steps, inspection report, photo album after purchase and a named account manager (Torque GT).

## Things nobody here does well

- **Auction sheets and grades.** Only JM prints a grade ("Grade 4 auction") and nobody shows the sheet, a translation, or explains what the grade means. Torque GT's own page doesn't explain grading either (its blog mentions grade 4.5 and 5). Underside photos are claimed in prose, not shown as a dedicated set.
- **A real mobile experience.** Enquire buttons sit below the fold on phone (Romans, Torque GT bottom form), headers clash (JM), popups cover the first screen (Collecting Cars, Torque GT promo, 4 Star).
- **Enquiry friction.** Romans requires four fields plus a marketing choice; Torque GT's form is at the foot of a long page; no one offers a 10-second "call me back", one-tap WhatsApp with the car pre-filled, or an SMS option.
- **Finance with a calculator.** Only "request a quote" (Romans, Tom Hartley) or none (Torque GT says no finance). No weekly-payment estimate on the page.
- **Landed cost for distant buyers.** Torque GT says it exports worldwide; DK shows title status and currencies; nobody gives a delivery estimate, transport price or timeline by destination, or a "how a remote purchase works" step list on the car page.
- **360 or walk-around video.** Tom Hartley and Hexagon have a "Play video" button; nothing on the JDM sites; no 360 spin anywhere I saw.
- **Fast pages.** Request counts of 260-300 (Torque GT), 32-35 MB homepages (Hexagon, DK).
- **Live status for incoming stock.** "Coming soon" is a label only (Torque GT, Hexagon). Nobody shows in-transit ETA, auction-won date or a "notify me when it lands" for a specific car.
- **Shareable filters on JDM stock.** Torque GT and JM have none, so a buyer cannot narrow by price, year, grade or chassis code.
