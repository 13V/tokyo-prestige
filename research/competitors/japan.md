# Japanese exporters and specialist dealers: English sites (research for Tokyo Prestige demo)

Date: 11 Nov 2026. Method: Playwright Chromium, desktop 1440x900 and iPhone-style 390x844, my own screenshots (looked at). Screenshots in `/home/user/tokyo-prestige/research/competitors/japan/` (14 kept, named `<site>-<page>-<desktop|phone>.jpg`). Anything marked "(inference)" is mine.

## Coverage and access notes

| Site | Result |
|---|---|
| BE FORWARD (beforward.jp) | Deep |
| SBT Japan (sbtjapan.com) | Deep |
| Goo-net Exchange (goo-net-exchange.com) | Deep |
| TCV / tradecarview (tc-v.com) | Deep |
| Car From Japan (carfromjapan.com) | Deep |
| Power Vehicles (powervehicles.com, Ebisu, drift/GT-R specialist) | Medium: home, GT-R list, one car page, tabs |
| SBI Motor Japan (sbimotor.com) | Light: home and one (sold) car page |
| JapaneseCarTrade (japanesecartrade.com) | Light: home only; the car URL I tried was "Page has been removed" |
| JDMBUYSELL (jdmbuysell.com) | Light: home only. It is a classifieds marketplace (dealers in USA, Canada, Japan), not an exporter |
| FLEX Automotive (flexmotor.com) | Light. It is a San Diego dealer/importer (Land Cruiser "Renoca" builds, "Available for import from Japan"), not a Japan-based exporter. Home loaded in 31.8 s (single run); inventory URL I tried was a 404 |
| JDM Expo (jdmexpo.com) | Blocked: HTTP 403 Cloudflare "Just a moment" |
| Toprank Importers (toprankimporters.com) | Redirected to a "Loading .../lander" stub; nothing evaluable. `toprank-global.com` is an unrelated training company |
| Garage Defend, Japan Partner, Bingo Sports, flexautomotive.jp | Proxy tunnel failed (ERR_TUNNEL_CONNECTION_FAILED) on every host variant tried. Not evaluated |
| Global Auto (globalauto.jp) | Loads, but is a Japanese-language car lease site (title "グローバルオート / スーパー乗るだけセット"), not an exporter |
| Nismo Omori Factory heritage | `nismo.co.jp/en/` loads (24.8 s) but I did not find a heritage stock page; not evaluated |
| Mine's | Not attempted |

Web search also surfaced Yatomi (Aichi), Best R (Saitama) and carsearcher.apped.nz (an exporter directory with its own trust scores). I did not evaluate them.

Important caveat on every measurement: my traffic goes through a proxy from outside Japan and Australia, so load times show relative weight, not what an Adelaide buyer would get. Two runs of the same page often differed by 2x to 3x (BE FORWARD home: 5.9 s then 1.7 s). Bytes are decoded body sizes of all responses seen, including ads and video posters. A third of these sites show pages that were sold or removed when I arrived (see "weak").

## Speed table (load event from the Navigation Timing API; bytes = sum of response bodies)

| Site | Home desktop | Home phone | Car page desktop | Car page phone |
|---|---|---|---|---|
| BE FORWARD | 5.9 s, 1.9 MB (2nd run 1.7 s) | 5.6 s, 2.0 MB (2nd run 1.7 s, 3.0 MB) | 2.2 s, 3.0 MB | 2.9 s, 3.2 MB |
| SBT Japan | 11.0 s, 14.5 MB | 28.0 s, 20.7 MB | 17.2 s, 22.0 MB | 16.9 s, 18.8 MB |
| Goo-net Exchange | 3.4 s, 8.4 MB | 4.4 s, 8.1 MB | 7.1 s, 8.2 MB (certified car: 6.4 s, 8.7 MB) | 3.7 s, 8.2 MB |
| TCV | 2.6 s, 6.0 MB | 2.2 s, 6.0 MB | 3.4 s, 4.6 MB | 1.9 s, 3.7 MB |
| Car From Japan | 3.8 s, 7.5 MB | 6.2 s, 8.3 MB | 5.3 s, 6.8 MB | 3.6 s, 5.9 MB |
| Power Vehicles | 6.2 s, 9.9 MB | not run | 6.6 s, 9.4 MB | not run |
| SBI Motor | 5.5 s, 14.2 MB | not run | 6.1 s, 2.9 MB | not run |
| JDMBUYSELL | 3.8 s, 1.8 MB | not run | n/a | n/a |
| JapaneseCarTrade | 3.8 s, 2.1 MB | not run | n/a | n/a |

Read: SBT is by far the heaviest (14 to 22 MB per page, 11 to 28 s). Nobody here is light except JDMBUYSELL and BE FORWARD's first paint. A dealer-demo site at under about 2 MB would beat every site above on weight.

---

## Deep evaluations

### 1. BE FORWARD, https://www.beforward.jp/

Screens: `beforward-home-desktop.jpg`, `beforward-home-phone.jpg`, `beforward-car-desktop.jpg`.

- **First screen (desktop).** A red "Singapore Stock" banner, a dark top bar showing "Total Cars In Stock: 520,515", "Cars Added Today: 14,287", live Japan time, then currency, language and country pickers. An orange "Search for cars" box (Make, Model, Price, Type, Steering, Year) sits among left and right banner columns, a "Shipping Schedule" PDF card, a "Create account" box, a floating WhatsApp button and a "Not registered yet? It only takes 10 seconds!" pop-up that lands on top of the stock row. A "POTENTIAL SHIPPING DELAYS (updated March 3, 2026)" notice sits above the fold, and a "Beware of fake BE FORWARD" warning too. I count at least a dozen competing banners and promos. No hero image of a car.
- **First screen (phone).** My emulated iPhone received the full desktop layout, not a mobile layout: a giant blue "Go to..." mobile-site button at the top is cropped, the header and the search box overflow the right edge, content is clipped. The search page for a real phone seems to live on `sp.beforward.jp` (a search result shows an `sp.` URL with `sitemode=sp`); I did not get it from my user agent. Treat BE FORWARD's responsive behaviour as unconfirmed, but what I saw was broken.
- **Search and filters.** Make, Model, Model Code (a separate dropdown, which is rare), Fuel, Min/Max Price, Body type, Steering, Min/Max Year, Mileage, Engine cc, Transmission, plus ~20 checkboxes (JDM, Premium Class, Auto Sale, Commercial Stock, Nearly New, Salvage, Kei Truck, Prime Seller...). "Ship from" country chips (Japan, Singapore, UK, UAE, Thailand, Korea, Australia...). Sort and items-per-page. There is no grade or auction-grade filter. Filtering is by URL path, and it is fully shareable and readable, e.g. `/stocklist/make=3/model=455/model_code=BNR34` returns the BNR34 page. Full page loads each time (I did not see an async update).
- **Total price calculator at the top of every list.** Country, port, RORO or container, insurance, inspection, certificate and "BF Warranty" yes/no. The result is applied to every card ("Total Price ... CIF + Cert to Baltimore (RORO)").
- **Stock grid.** Photo, title with year and grade, Ref No., a red "$249,940" price with "21% OFF" and the struck-through original, "Total price $252,527 CIF + Cert to Baltimore (RORO)", "High quality" badge, "JDM" and "3rd party seller" badges, Inquiry and Buy Now buttons, plus a table with mileage, year, engine, transmission, location, model code, engine code, steering, colour, drive, auction grade (mostly "-"). The list I captured showed the table columns misaligned and text running together; it looks broken in my render (it may be a headless-render artefact, I did not verify).
- **Car page** (e.g. `/nissan/skyline-gt-r/ce370114/id/16252906/`). Breadcrumb, a blue disclaimer bar ("Reservations do not guarantee availability. BE FORWARD holds no ownership of this vehicle until completion of purchasing. If unavailable, alternatives or a 100% full refund"). 32 photos in a gallery with thumbnails and a "Download all images" link. Photo order on the one car I opened: front 3/4, interior, rear 3/4, seats, dash/nav screens, side, odometer; I saw no underside or engine bay in the first 14 thumbnails (supplier photos, different per car). Spec table: Ref No., Chassis No. (masked at the end, with a long disclaimer that it can be a "temporary number" and BE FORWARD "has not checked nor verified"), Model Code `GF-BNR34`, Version/Class `V2__` (a raw scrape artefact), Engine Code `-`, Auction Grade `-`, Sub Ref No. Features are a long grid of fixed option names, greyed out when absent; the "Selling points" chips (Non-smoker, One owner) are scraped. No auction sheet, no inspection report, no 360 or video that I saw.
- **Price block.** "Price $249,940, 21% off, You save $68,410, Total Price $252,527 CIF + Cert to Baltimore (RORO)". The total uses the country and port chosen on the earlier page; the page also carries a "Step 1 Shipping destination: final country" selector further down. Also "1 person is inquiring".
- **Enquiry.** "Get a price quote now", orange "Buy Now", a green "Need help? Contact us on WhatsApp" button in the right column beside the photo, a sticky WhatsApp pill bottom right, and a "Purchase Flow" tab on the right edge. On phone I saw no sticky bar at the top of the page.
- **Trust.** "Total Cars in stock", a Reviews menu, BF Points, "Beware of fake BE FORWARD" banner, an "NTT" ship image, a purchase flow side tab with four steps (Order, Payment, Shipment, Delivery), a how-to-buy page with sample proforma invoice and Purchase Agreement and sample T/T slips.
- **Export explanation.** A four-step page. Pay, upload proof, receive shipping schedule, BF prepares original documents (including B/L) and couriers them. A "Shipping Schedule" PDF is on the home page by destination region (e.g. `shipping_schedule_northamerica.pdf`) with a prominent "potential shipping delays" banner.
- **Weak.** Banner noise; no condition proof (auction grade is blank on the cars I opened); disclaimers that disown the data; broken-looking mobile; raw scraped strings ("V2__"); sold cars still ranked in search (the first car I opened was SOLD with a ghosted photo and "Find more from 81 SKYLINE GT-R available now").

### 2. SBT Japan, https://www.sbtjapan.com/

Screens: `sbt-list-desktop.jpg`, `sbt-car-desktop.jpg`, `sbt-car-phone.jpg` (plus I viewed home desktop and phone).

- **First screen (desktop).** Pale blue banner "Sign up and get $50 discount coupon", a clean white header (Find Cars, How to Buy, Why Choose SBT, Support), a full-bleed photo of a Kenyan family in a car with "DRIVE WHAT'S NEXT", a white search card ("286,451 cars", Make and model, Body type, Price range, Year range, Mileage). A row of promo banners (USA country page, scam alert, weekly red tag sale, mini trucks). It reads as a mainstream retail site, and it is aimed at African and Pacific used-car buyers, not enthusiasts (inference from the hero and stock).
- **First screen (phone).** Real responsive layout: logo, Log in, Favorites, Menu icons, search bar, hero image. A cookie banner covers half the screen on first view, and a "Live chat" bubble plus a round chat button also sit on top. Layout is good, but the overlays hide the search card.
- **Search and filters.** Make+model combined, body type, price, year, mileage. The list page has a left rail: Brand, Price, Discount %, Body type, Category (Hybrid, Left Hand Drive, Manual, 4WD, EV, Sunroof, Diesel, Kei), Inventory location. Model code appears on cards (BCNR33) but the one search I ran did not offer a model-code or grade filter. Query-string URLs (`/used-cars/search?make_id=3&model[]=Skyline&isModel=1`), shareable. Full page reloads.
- **Card (the best card layout I saw).** Big photo with three thumbnails and "More", "Partner's Stock" and "New Arrival" tags, title "1995/3 NISSAN SKYLINE", an icon grid (mileage 72,013 km, model code BCNR33, MT, Petrol, 4WD, RHD, 2,600cc, 2 doors, 4 seats, engine code), registration, body type, colour, location "Chiba, JAPAN", then a right-hand price column: "VEHICLE PRICE USD 73,580", "Total Price USD 75,605", and two stacked buttons, "Via Email" and "Via WhatsApp".
- **Car page** (`/used-cars/DAT2827`). Dark notice bar: "A reservation / order does not guarantee availability. SBT does not own the vehicle until the purchase is completed. If the vehicle is unavailable, we will offer an alternative or a full refund." Large photo gallery (about 12 thumbnails over two pages plus "View photo list" and "Download photo list"; dealer garage branding in the photos). Price block "USD 74,665 / Sale 1.28% off USD 72,640", then a full "Total Price Calculator" in the sticky right column: destination country, port, shipment (RORO or container), freight prepaid or collect, inspection, and a "Preview total price" button that is sticky at the bottom on phone. Two CTAs: red "Get an estimate", green "Whatsapp". Specs: Vehicle Details (Make, Model `BCNR33`, Body colour, Body type, Doors, Seats) and Specifications (dimension, M3, weights as "—kg"). Car Options is a matrix of 40-plus greyed-out items with hover info icons. There is no auction grade, no inspection report, no condition photos set visible, no history. A "Reviews on Nissan Skyline" block is a store-wide reviews widget (5.0 average from 6 reviews, one from 2020) not about this car.
- **Trust and export explanation.** Support section has a How to Buy page, a Shipping Schedule, a Car Tracking page (login; tracking works only after the bill of lading is issued: export certificates, document review, exact shipment date, consignee, copy of B/L), a Damage Condition Report process (SBT covers damage only when it determines the fault is its own; "Global Protection Program" for the rest), and a Chassis Check tool that decodes a Japanese-maker VIN to manufacture year. A scam-alert banner ("Beware of scammers impersonating SBT Japan") is on the home page.
- **Speed.** 11 to 28 s, 14 to 22 MB. Slowest by far.
- **Weak.** Weight; cookie plus chat overlays on first view; condition is not proven at all; tracking only available after shipping.

### 3. Goo-net Exchange, https://www.goo-net-exchange.com/ (best condition proof)

Screens: `goonet-certcar-desktop.jpg`, `goonet-sheet-desktop.jpg`, `goonet-car-phone.jpg` (plus I viewed home and list on desktop and home on phone).

- **First screen (desktop).** Full-bleed photo (Mt Fuji and a red sports car), a dark search card: Find Used Cars / Body Style tabs, Make, Model, Year range slider, Price slider with USD or JPY radio, and a checkbox "With Condition Sheet" with a "?" help. Visa/Mastercard and PayPal "payment OK" badges. A red warning: "Beware!! There are forged condition sheets in the market." It then has banner tiles by chassis (Chaser X100, Skyline R34...). A cookie panel covers the lower third on load. Header: Home, Used Cars, About Us, Contact Us, Help, language, red "Send Inquiry" button always at top right.
- **First screen (phone).** Real responsive: logo, language, hamburger, "273,833 used cars in stock" then the same search card stacked; the cookie panel hides half of it.
- **Search and filters.** List page for a model has chip links for generations by chassis code (V37, V36, V35, GT-R_R34, R34, GT-R_R33, R33, GT-R_R32, R32, R31, R30, C210, C10): this is chassis-led navigation. Left filter rail: Make, Model, Grade, Year slider, Price slider (USD or JPY), Mileage slider, Displacement slider, Transmission (Any/AT/MT), and more. Sort dropdown, grid or list toggle, currency picker. Clean path URLs (`/usedcars/NISSAN/SKYLINE/GT-R_R34/`), shareable. A **Total Price Calculator** (country, destination port, marine insurance, pre-export inspection) sits above the list. Full page loads.
- **Card.** Photo (with a Play icon when there is a video and a green "Certified" badge when a condition report exists, an orange "Recommended Car!!" ribbon), title in caps with grade ("NISSAN SKYLINE GT-R V SPEC II"), prefecture, price in yen ("¥32,003,000"), then year.month, colour, km, cc, steering, transmission. One "NO PHOTO" card appeared in the list. Prices are FOB in yen by default.
- **Car page.** Gallery with a camera badge (43 photos on the first car, 37 on the certified one), thumbnails, "Certified" badge, a video in some listings. Right column: make, title, year, prefecture, "2026/11/09 Up" listed date, Stock Number, currency, **Interior and Exterior star ratings (4 and 5)**, Engine "Normal", Repaired "No Repair", "What is Certified Vehicles?" link, then a **"Vehicle State Evaluation Report" thumbnail pair**, then "Car Price (FOB) ¥32,003,000", country and port selectors, marine insurance and pre-export inspection tick boxes, "Calculate" ("Completed in 1 minute") and a "Get A Free Quote" button. Under the gallery: Overview (month/year, colour, mileage, **Repaired: "No Repair History"**, steering, transmission, fuel, drive, body, displacement, **Chassis No masked "BNR34-00****"**, **Model code GF-BNR34**), then "Specific Info" tiles: Car Condition (Non-smoking, One Owner, Maintenance Record Available), Standard features, Equipment with the present ones highlighted in red. "43 people viewed" count on the page.
- **Condition proof: the one to copy.** Clicking the evaluation thumbnail (`.../H0406E24126H0406englishNR.jpg`, an English-named image) opens a lightbox with a two-page "U-car Grading Report" from **Goo Kantei** (Proto Corporation, with JAAA logos). Page 1 is a certificate with model, colour, year, chassis, type, then **star ratings for exterior (5 stars, "No or nearly no damage. Repairs and refinishing have been done properly. Only some tiny damage may be found"), interior (4 stars, "Good condition but with some areas showing damage or are worn out excessively"), frame ("No repair history", "No apparent damage was found") and engine ("Good condition", "Nothing irregular was found")**, and the inspection date (2026/8/4), with a disclaimer that the status can change after the inspection. Page 2 is a body diagram with every mark pinned to an area, in English ("Scratch (S) Few", "Stone chip marks Partial", "Right mirror Scratch", tyre tread 9). The FAQ explains the process: a professional appraiser checks panel gaps, bolts, under the engine bay and boot, centre pillar, oil leaks and noise; the scale is described for each star; the engine check is done parked, "without a running check". It also says condition sheet vehicles "are believed to be reliable but not guaranteed". The "With Condition Sheet" filter lets a buyer see only these. This is the best remote-condition presentation of all the sites, because it is a third party's grading, in English, shown as the real document, with a plain-language scale. The warning about forged condition sheets on the home page is also unusual and builds trust.
- **Cars without the report** show only seller data (Repaired: yes/no, and tick boxes) and are far less convincing.
- **Enquiry.** Red "Send Inquiry" top right (persistent), "Get A Free Quote" in the price card. No WhatsApp on pages I saw. On phone, the layout stacks and the button appears further down (I did not capture it).
- **Export explanation.** FAQ and a How to Buy page; I did not read the full flow. Prices are FOB in JPY.
- **Weak.** FOB in yen first (a buyer has to use the calculator to see a delivered price); cookie panel covers a third of the screen on every load; the photos are dealers' own with a mix of quality and watermark banners; no on-page shipping status or tracking; GT-R pages only certified on some cars; a stale dated listing (a 2026/07/28 listing flagged as old by the search tool).

### 4. TCV (formerly Tradecarview), https://www.tc-v.com/

Screens: `tcv-car-desktop.jpg`, `tcv-car-phone.jpg` (plus home desktop and phone and a list view viewed).

- **First screen.** The root redirects to a country page (`/local/United States`) by geo (inference: IP based). Yellow top bar with live Japan time, a "Hi Your Name" placeholder (I saw this literal text) and a notification bell, big "TCV (formerly tradecarview) United States" with a yellow welcome banner, news items (Nov 2026), and a row of "Import regulations considered" cars with FOB prices. On phone: compact, a 3-up grid of "New Arrivals" with FOB prices, a hamburger menu. Mobile is genuinely mobile.
- **Search and filters.** "Search from Stock" mega menu; list pages are path based and descriptive (`/used_car/nissan/skyline/`, `?fid=2014&jid=2014`, `?ecls=26` for colour). Results show the count ("1,064 results match"), a "Change Search Queries" link, a "Selected C&F, Nearest port LONG BEACH" bar, sort by "Featured", and a list or grid toggle. Shareable.
- **Card.** Big "STOCK" tag, title with year, make and model plus the seller's headline ("GTS25 TYPE M! TURBO! GOOD CONDITION!"), a chassis code with the last digits masked ("ECR33-007***"), the **dealer name with a star rating and country flag**, a table (registration year, manufacture year, engine, mileage, FOB price, estimated total price), pills (RHD, petrol, 2WD, MT, "No Accident"), a bullet line, "N inquiries for this car" counter, "ASK THE BEST PRICE" button, "Add to favorite".
- **Car page.** Title is the seller's marketing headline ("Used Nissan Skyline 2001 V35 250GT (VQ25 DOHC 215PS), ONLY 63,200KM !!"). 31 photos with a thumbnail grid (2 rows of 11 visible); on that car I saw exterior, engine bay, interior, dash, odometer. Right panel: "Car Price (FOB) US$2,520", "Estimated Total Price US$4,599", "The price is not fixed. Let's try to negotiate!", selected C&F, nearest port Long Beach, a red note "Please select below 2001 model of manufacture year for United States" (an import-rule hint), a "Change destination" link, and a 3-step ribbon: "1 Click Send for free inquiry, 2 Negotiate with the seller, 3 Order your car". A **sticky bottom bar on desktop**: "1 inquiries for this car", huge orange "ASK THE BEST PRICE", "Add to Favorite". On phone: sticky title, gallery with counter 1/31, an orange "ASK THE BEST PRICE" button above the fold, then a vehicle information table.
- **Spec and condition.** A full table: VIN masked ("V35-103***", "full VIN shown on Proforma Invoice and Invoice"), model code, registration and manufacture date, mileage, transmission, cc, fuel, body style, steering, colours, drive, doors, seats, dimension and m3, "Condition: Used (No Accident)", ID, free-text "Remarks (Any problems)". The remark was candid for this seller: "very slight small dents on P door and rear-right wheel arch, scratch at side skirt and bumper corners". Options and "Selling points" ticks. No auction sheet, no inspection report, no grading on that listing. Seller's Information and Catalog tabs exist.
- **Enquiry.** One path only: "ASK THE BEST PRICE", via free sign-up. No WhatsApp visible.
- **Trust.** Seller ratings in stars on each card, inquiry counters, a "Need Help?" agent popup (a photo of a support person), "Back Order" feature, Japan time. It is a marketplace; the seller is not TCV, so TCV's own guarantee is not visible on the page.
- **Weak.** Dealer-written titles in capitals and exclamation marks; condition is whatever the seller types; price "not fixed"; heavy ad style; yellow and orange palette; no tracking explained on the page.

### 5. Car From Japan (CFJ), https://carfromjapan.com/ (best price clarity and best use of sheets after Goo-net)

Screens: `cfj-list-desktop.jpg`, `cfj-car-desktop.jpg` (plus home desktop and phone and phone spec view).

- **First screen (desktop).** Blue header with a quick search bar and Make, Model, Year, Price dropdowns plus "More filters", currency picker, "Delivery to: USA - Baltimore, MD" and notifications. A rotating hero ("We are a marketplace in JAPAN, where you can buy a car directly from Japan and get it delivered to your nearest port") over a washed-out photo, and three card banners (How to import used cars, New arrival trucks, Customer reviews). Stat strip: "50+ countries, 10,000+ Japanese cars, 100% cash back guarantee, 97% customer satisfaction". On phone the same hero says "Exporting Japanese used cars to 90+ countries" (so the claim differs between desktop and phone). Phone: hamburger, logo, search icon, 3 select boxes over a hero image, "Car delivery destination: Baltimore" and a Google sign-in prompt covering the bottom.
- **Search and filters.** Make, Model, Year-Month, Car Price (and Total Price) sliders, Mileage, popular-years lists; model chips (Silvia, Skyline, 180SX, Skyline Coupe, Fairlady Z, **Skyline GT-R (41)**), listing counts per model. Sort options. Path URLs (`/cheap-used-nissan-skyline-for-sale`, `...-year2001`, `?maxMileage=...`). Pre-set landing pages for tags (JDM, drift, rally, classic, kei). The destination port is remembered globally.
- **Card.** Photo with a "(40) View all" photo count, discount badge, title "2000 NISSAN SKYLINE GF-ER34", fields: registration year, mileage (in miles for a US buyer), **model code, engine, Grade, transmission**, a price column: Car Price US$26,188, Delivery Baltimore (Port), **Total (C&F) US$30,033**, red "Inquire Now", a "Compare" tick.
- **Car page.** Breadcrumb Nissan > Skyline > 2000 > CFJ ref. 41 photos in a three-row thumbnail grid. **The third thumbnail is the auction sheet image itself**, and the others cover engine bay, interior, dash, seats, boot, wheels, and the underside of panels (I saw the underside photos of the bonnet and boot lid; I did not see a full underbody shot). Then an **"Inspection Result" panel with Grade R, Interior B, Body Inspection (expandable)** and the honest disclaimer "The inspection content is generated by AI, interpreting the auction sheet image. Translations from Japanese to English are provided by Google Translate...". Then a Car Specifications table: Reference No., Model Code `GF-ER34`, Registration Year, **Model Grade "25GT-V genuine 5-speed MT One-O" (truncated)**, Manufacture Year, Transmission, Mileage "32,000 km (Approx. 19,888 miles)", Engine, Fuel, Seats, Doors, Steering, Drive, Dimension, VIN masked, Exterior Colour, Auction Grade R. A sticky card shows Car Price, Delivery To (dropdown of ports), a Marine Insurance tick, **Total Price (C&F)**, the red "Inquire Now (Get a free quotation)" button, a "1 person is inquiring" line and payment logos (PayPal, cards, JCB). On scroll the card collapses to a thin sticky bar (title, price, total, "Specs > Options > Feedback > Next" anchor links); the same bar sits at the top of the phone page. A strip "Overview of Transaction (Flow)" (inquiry, shipment, receive, invoice, bank transfer) and "Your transaction is protected".
- **Trust.** Customer reviews page, "100% cash back guarantee", payment logos, local pages per country, a "Car Talk" blog. Claims in the stat strip are not backed with measurements on the page (and the 50+ vs 90+ discrepancy).
- **Weak.** AI-read sheet means a grade of "R" appears with little explanation of what it means to a layperson (inference: R is a repaired-body grade on JAAI-style scales; the page did not tell me); some sections empty ("-" for steering, drive, seats); weight is 6 to 8 MB; Google sign-in prompt over phone content.

---

## Medium and light evaluations

### Power Vehicles (powervehicles.com), the only genuine specialist I could reach

- Home: a white WordPress (Divi) site, a slider with drift cars, "Exporting Drift, Race, and Sports cars from Japan around the world", sections "What's on offer" (sourcing, building and tuning, Drift in Japan), "Watch the video", "Drift Heaven Weeks", "Drift Car Showroom". The menu is Showroom (GTRs, Supras, drift cars, circuit cars, tuned street cars, USA stock), Drift in Ebisu, Meet the Team, Sold Gallery, Services, Contact. "Our cars are actually in stock, on site here at our HQ in Ebisu."
- Stock list: a long vertical list, each car with a big photo with a "Watch video" strip, a title ("1997.3 Nissan Skyline GTR"), a bullet list of mods, a "Full information" button and a "Contact us" button, and **a red "¥SOLD" marker in the price slot** for sold cars. No filters, no search, no prices visible on the sold ones. A "Sold Gallery" page exists (a social-proof idea).
- Car page (`/r33-skyline-gtr-t78/`): a YouTube walk-around video as the main block; a spec block (year, kms 92,663, colour White QM1, chassis BCNR33, **tyres: "F: Worn, R: Worn"**); then **a "Detailed Specs" tabbed panel: ENGINE / UNDERSIDE / BODY / INTERIOR / OBSERVATIONS**. The OBSERVATIONS tab was frank: "Some chips on Windscreen", "Some push up dents on sills (can be fixed using an alignment bench at extra cost)", "No Crash History", "Tyres can be changed on request", "Some small scratches and paint chips, see pics", "Please study all pics for more info (full size copies can be seen in the Gallery)". Then "What we do: Export, Drive, Tune", and a contact form. 13 large images on the page.
- Weak: one of the two GT-R pages linked from the GT-R list (`/2001-1-skyline-gtr-bayside`) returned a **404**; no price shown on the sold example I opened (I did not see an available car's price); no shipping or cost explanation; no auction grade; photos are not structured by area; 6 to 10 MB; no filters.
- Speed: 6.2 to 6.6 s, 9.4 to 9.9 MB.

### SBI Motor Japan (sbimotor.com/en)

Home: "Total Cars in Stock 84,805", a bare grey interface with the Japan time printed as a raw JS date string ("Wed Nov 11 2026 06:08:11 GMT+0000 (Coordinated Universal Time)"), stock-by-make counts, menu About / Stock list / Local info / Auction / Shipping Schedule / Favorites. 14 MB home. Car page (sold example): a clear spec table with **Model Code `LE72WAB`, Grade `130X-DYNAMIC SE D350`, Chassis masked "SALEA8A****"**, "Click for original size" photo, "This unit is sold out." Its Defender listings say it exports "As is" unless requested otherwise (from a search snippet, not verified on the page).

### JapaneseCarTrade (japanesecartrade.com)

Home shows "233,805 stock | Today's arrival 4,675", a caution about non-members ("If you are getting any offer from 'Non-JCT Members'... make sure you are buying from a trusted dealer"), stock list, auction, dealers, how to buy, FAQ, inquiry, testimonials. A listing URL I tried gave "PAGE HAS GONE. Stock you are looking is already Sold or Gone", with a redirect to a `410.php` page (a polite handling of dead pages: shows similar stock).

### JDMBUYSELL (jdmbuysell.com)

A clean, modern marketplace with a **"Trending chassis" row of codes with active-listing counts (R34 201, S15 246, FD3S 263, NA1 116, R32 94, HA4 223, KV3 197, X100 192)**, a live ticker ("Buyer in IL inquired", "6 buyers messaged"), a "Wanted" section and a "verified dealers" link and an "import cost calculator" link. 1.8 MB, 3.8 s, the lightest. It sells dealers' cars from many countries (inference: not a Japan exporter). One listing URL from a search result was a 404.

### FLEX Automotive (flexmotor.com)

San Diego importer. Home "Retrofit Land Cruisers and Tacomas", "Veterans Day sale", Renoca custom builds from $39,995; imported-cruiser listings say "Request estimate" on some and one a "150 check points" claim (from search snippets, not verified on page). The home page took 31.8 s to load in my single run and an inventory URL 404'd. Out of scope as a Japan-based exporter.

---

## Comparison: how condition is proven to a remote buyer

| Site | Auction sheet or report | Translated grade | Photo set | Video / 360 | Verdict |
|---|---|---|---|---|---|
| Goo-net Exchange | Third-party "U-car Grading Report" (Goo Kantei / JAAA) in English, opened as a lightbox | Exterior and interior 1-5 stars, frame and engine words, each with a plain definition (FAQ) | 37 to 43 photos | Video on some | Best |
| Car From Japan | The auction sheet image is photo no. 3 | "Grade R, Interior B, Body inspection" extracted by AI, disclaimer shown | 24 to 41 photos incl. engine, interior, wheels | none seen | Good, honest about the AI limits |
| Power Vehicles | None | Self-written "Observations" tab | 13 large images, YouTube walk-around | video | Honest by hand, not scalable |
| TCV | None on the listing I opened | Seller text only | 31 photos | none | Seller-dependent |
| BE FORWARD | Field "Auction Grade" shows "-" | none | 32 photos | none | Weak |
| SBT | None | none | about 12 plus "photo list" | none | Weak |

None of them showed a standard, labelled photo set (underside, engine bay, flaws close up) as a fixed sequence.

---

## THREE BEST

1. **Goo-net Exchange.** `https://www.goo-net-exchange.com/usedcars/NISSAN/SKYLINE/700080265230260724001/` (2001 R34 GT-R V-Spec II, Oita, ¥32,003,000 FOB). Why: the translated third-party evaluation report opens as the real document; star ratings for interior and exterior sit next to the price; "With Condition Sheet" is a search filter on the home page; chassis-led navigation (R32/R33/R34 chips); a total price calculator on every list; a warning about forged condition sheets; a FAQ that defines every star.
2. **Car From Japan.** `https://carfromjapan.com/cheap-used-nissan-skyline-2000-for-sale-6aec2fc1580653945f188356` (CFJ3642106). Why: a delivered total (C&F) next to the car price on every card and on the page, tied to a destination port the buyer picked once; the auction sheet image is a gallery photo; grade, interior and body grade extracted and translated with an honest AI disclaimer; model code and model grade in the spec table; sticky price and enquiry bar; Compare ticks; mileage shown in the buyer's units (miles).
3. **BE FORWARD** (ahead of SBT and TCV only because of its mechanics, not its design). `https://www.beforward.jp/stocklist/make=3/model=455/model_code=BNR34` and car `https://www.beforward.jp/nissan/skyline-gt-r/ce370114/id/16252906/`. Why: the only one with a **model-code filter** and fully readable shareable URLs; a total price calculator at the top of every list with RORO or container, insurance, inspection and certificate toggles; a "reservation does not guarantee availability / full refund" statement on every car page; "Download all images"; a four-step purchase flow tab. Its design is poor, so what is worth borrowing is the model, not the look. (TCV's mobile page and sticky "Ask the best price" bar, and SBT's responsive layout and card, are close runners-up.)

## ONE WORST

**SBT Japan.** `https://www.sbtjapan.com/` and `https://www.sbtjapan.com/used-cars/DAT2827`. Why: 14 to 22 MB per page and 11 to 28 s to load event in my runs (28 s on the phone home page); a cookie banner, a chat bubble and a chat button cover the first mobile screen; the car page holds a 40-item options matrix but no condition evidence at all (no grade, no sheet, no inspection, no history) for a $73,580 car; tracking only works after shipping; the reviews widget is store-wide, one review from 2020 appears on a car page. BE FORWARD is more cluttered, but it loads faster and gives more mechanics; SBT is the worst for a high-value buyer.

---

## Patterns worth adopting

1. **Put the proof document on the page, in English, as the real thing.** Open the actual evaluation sheet in a lightbox from a thumbnail beside the price (Goo-net), and make the sheet the third gallery photo (CFJ). Add a plain-language scale for every grade (stars and words) and the inspection date with "status may change after inspection".
2. **A "has condition report" filter and badge** ("With Condition Sheet", "Certified") so a buyer can narrow to proven cars.
3. **Interior / exterior ratings and "No repair history" next to the price**, not three scrolls down.
4. **Chassis-code navigation.** Chips for R32 / R33 / R34 / FD3S / JZA80 (Goo-net, JDMBUYSELL, BE FORWARD's model-code filter) with counts. A model-code filter that returns a clean URL (`/stock/model-code=BNR34`).
5. **Total price to the buyer's door, shown on the card**, with one location setting remembered everywhere (CFJ, BE FORWARD, SBT, TCV). For Tokyo Prestige the destination would be an Australian state and a delivered or compliance-ready price (inference: replace FOB, CIF).
6. **Availability honesty line on every car page** ("A reservation does not guarantee availability... if unavailable we will offer an alternative or a full refund") (BE FORWARD, SBT).
7. **Masked chassis number with the rule that the full number is shown on the invoice** (BE FORWARD, TCV, SBI). For a local dealer: show the full VIN, which is a stronger proof (inference).
8. **A tabbed "Detailed specs: Engine / Underside / Body / Interior / Observations"** with a frank "Observations" list (Power Vehicles), made structured for every car.
9. **Candid defect text beside the price** (Power Vehicles: windscreen chips, sill dents with the cost to fix; TCV remark: dents and scratches listed).
10. **Sticky enquiry elements on phone** (CFJ's thin sticky price bar with anchors; SBT's sticky "Preview total price"; TCV's big orange button above the fold). Add a WhatsApp option beside email (BE FORWARD, SBT).
11. **"Download all photos / photo list"** (BE FORWARD, SBT, CFJ): buyers want to inspect at full size and send to a mechanic or an importer.
12. **Social proof that is specific**: "1 person is inquiring about this car" (BE FORWARD, CFJ), inquiry count per car (TCV), a Sold Gallery (Power Vehicles). Keep them real (inference: fake counters would break the brand's trust).
13. **Scam warning banners** (SBT, BE FORWARD, Goo-net's forged-sheet warning): remote buyers fear fraud and these sites acknowledge it. Pair with verifiable identity (address, licence number).
14. **Polite dead-page handling** (JapaneseCarTrade: "Stock already sold or gone" plus similar stock) instead of a 404.

## Things nobody here does well

- **A standard inspection photo protocol.** No site shows a fixed, labelled sequence: underside (jacked or on a hoist), engine bay, boot floor and spare well, wheel arches and sills, panel gaps, each flaw close up with a pointer on a diagram. Photos are whatever the dealer shot, in no stable order, and there is no "photos of every flaw" promise.
- **Auction sheet reading help.** At most the grade is translated. Nobody explains what the sheet's diagram marks (A1, U1, W1, S1...) mean for this car, or says what an experienced inspector thinks.
- **Independent verification of odometer and history.** I saw no odometer-check statement or evidence on any car page (mileage "-" on BE FORWARD's cars; Goo-net's masked "*****" on the report's metered mileage). Nobody links an export deregistration or maintenance record.
- **Live shipping status in the buyer's view before shipping.** Only SBT has a tracking page, and it works after the bill of lading exists. Nobody shows a stage timeline per purchase (bought, inspected, in yard, loaded, at sea, arrived, compliance, delivered) with dates and photos at each stage.
- **Total landed cost to the buyer's door.** They stop at port (CIF, C&F). Nothing for import duty, GST, compliance and registration by state, or road delivery; nothing aimed at Australia.
- **360 view.** None had one (Goo-net and Power Vehicles have video on some cars).
- **A face and a place.** Marketplaces are anonymous; even Power Vehicles' "Meet the team" page is the only human presence. Nobody offers a live video walk-around on request, a named person for each car, or a visible address.
- **Mobile quality.** Only Goo-net, SBT, TCV and CFJ were truly responsive; BE FORWARD served the desktop layout to my emulated iPhone, and every site had overlays (cookie, chat, sign-in) on the first mobile screen.
- **Speed.** Median first-load around 5 s and 6 to 9 MB; SBT 11 to 28 s.
- **Price clarity on one price.** Several show strike-through "discounts" (BE FORWARD 21% off, SBT 1.28% off, CFJ -6%) with no reference-price evidence, and TCV says "price is not fixed, let's negotiate". For a premium retail brand, one honest price is a differentiator.

## Screenshots kept (14)

`beforward-home-desktop.jpg`, `beforward-home-phone.jpg`, `beforward-car-desktop.jpg`, `sbt-list-desktop.jpg`, `sbt-car-desktop.jpg`, `sbt-car-phone.jpg` (spec section on phone), `goonet-certcar-desktop.jpg`, `goonet-sheet-desktop.jpg` (the lightbox), `goonet-car-phone.jpg`, `tcv-car-desktop.jpg`, `tcv-car-phone.jpg`, `cfj-list-desktop.jpg`, `cfj-car-desktop.jpg` (scrolled to the inspection and specs panel), `pv-list-desktop.jpg`.
Screenshots I looked at but did not keep (deleted from the folder to meet the cap of 14; originals remain only in my scratchpad): Goo-net home desktop and phone and list, SBT home desktop and phone, TCV home desktop and phone and list, CFJ home desktop and phone and phone spec view, Power Vehicles home and tab view, JDMBUYSELL home, BE FORWARD list and phone car page.
