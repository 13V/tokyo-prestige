# Australian JDM importers: competitor website evaluation

Researched 11 Nov 2026 with Playwright/Chromium (desktop 1440x900, phone 390x844 iPhone UA, isMobile+hasTouch). Screenshots are my own and were looked at. Folder: `/home/user/tokyo-prestige/research/competitors/au-jdm/` (14 JPEGs, named `<site>-<page>-<desktop|phone>.jpg`). Everything below was seen on the live site that day unless marked "(inference)" or "(from search, not verified)". tokyoprestige.com.au was not evaluated.

## Coverage and honesty notes

- Evaluated in full (home, stock list, one car page, desktop and phone): Motorman Imports (QLD), AutoProject (VIC, stock also in NSW), Fukasawa Car Imports (VIC), J-Spec Imports (VIC), Garage Apex (VIC), Edward Lees Imports (NSW), Fabcar (WA), Iron Chef Imports (SA broker), Raw Performance Imports (VIC). Prestige Motorsport was checked as an agent (home, mileage page), since it holds no stock.
- Probed only (home page, links): Top Secret Imports (a compliance workshop with no stock: nav is Compliance / About / Contact), Import Monster (a Japanese parts shop with a "Car Importing" page, no stock grid), Muteki Imports (parts, Yahoo Auctions proxy, no car stock). I did not count these as dealers.
- Not found / not reachable: JDM Connection, Sugoi Imports, All Things JDM, Garage R / V-Spec Performance, GT Garage. Guessed domains did not resolve or returned nothing, and web search returned no site for them. Zen Autoworks (`zenautoworks.com.au`) loaded an empty page (no title, no content). I make no claim that these businesses do not exist.
- Adelaide/SA: only Iron Chef Imports turned up (a broker, Adelaide, est. 2016 per a JDMBuySell profile, from search). Search found no "Northside Enterprises". Search also surfaced JK Cars (hybrids, Adelaide/Melbourne, a Google Sites page) and a Japanese Vehicle Imports broker on pages.dev; I did not evaluate them. Tokyo Prestige's own cars also appear on JDMBuySell.com, an aggregator that lists most of these dealers (from search).
- Speed numbers: "load" event and transferred bytes (content-length, else body size) from one run each, through a shared proxy. Load times swung 2s to 28s for the same site across my own runs (AutoProject home 2.0s on desktop, its car page 22.5s), so treat times as noisy and the byte counts as the firmer figure. Playwright could not see a real mobile network.

## Quick comparison

| Site | Base | Stock (seen) | Filters | Price shown | Home load / KB (desktop) | Car page load / KB |
|---|---|---|---|---|---|---|
| AutoProject | Clayton VIC | 151 | Make, Year, Price, Fuel, Body, Transmission, Category, Wheelchair toggle + text search + sort | Ex-gov. charges + estimated drive-away | 2.0s / 4,359 | 22.5s / 6,635 |
| Fukasawa | VIC (Mentone/Docklands) | 10 on list | None | "Landed and complied" | 27.7s / 6,940 | 14.0s / 6,975 |
| J-Spec | Melbourne | featured list + Japan auctions | Browse by make/model, search page | Full landed-and-complied breakdown | 8.6s / 1,632 | 6.1s / 2,028 |
| Garage Apex | Epping VIC | 68 | Search, make/model, body, transmission, fuel, price slider, "On sale", sort | "Excl. Govt. Charges" (one car "Drive Away") | 12.4s / 2,160 | 6.4s / 3,591 |
| Motorman | Slacks Creek QLD | 108 | Make, price, body, year, transmission, keyword, sort | Ex-gov. charges, strikethrough was-price | 8.0s / 3,428 | 8.8s / 5,183 |
| Edward Lees | West Ryde NSW | 82 | Same engine as Motorman (EasyCars) | Single price, strikethrough was-price | 4.4s / 2,394 | 9.9s / 9,729 (stock list 17,402 KB) |
| Fabcar | Perth WA | few (5 in "Japanese Imports") | Shopify collections | Plain price | 14.3s / 2,594 | 6.7s / 6,657 |
| Iron Chef | Adelaide/Sydney (broker) | 4 cars | None | "Est. price" landed and complied | 3.6s / 1,396 | 4.7s / 1,847 |
| Raw Performance | Dandenong VIC | none visible | By make, all "(0)" | n/a | 13.5s / 5,151 | 3.7s / 701 |

(Motorman's stock-list page transferred 11,953 KB on desktop, the heaviest page I measured after Edward Lees.)

---

## 1. AutoProject (autoproject.com.au) - Clayton VIC, "ESTD 2002"

**First screen.** Desktop: a red top bar ("Australia-Wide Delivery Available / Finance Pre-Approval in Minutes / Quality Inspected Vehicles" + phone), a clean white header with a red "View Stock" button, then a full-width hero "Find Your Perfect Japanese Vehicle" with a white search card holding Make and Model dropdowns, a live count ("151 vehicles available to view") and a red "View 151 Vehicles" button. The hero art is isometric illustrations of cars, not photos. Phone: logo and burger, the same headline and search card fill the screen, then a red "Free Japanese Car Import Guide" lead form begins below. A round red phone button floats bottom-right.

**Search and filtering.** Left filter rail on desktop (Make with counts, Year, Price, Fuel Type, Body Type, Transmission, Category, Wheelchair Accessible toggle), a text search ("make, model, colour, features, stock ID"), grid/list toggle, and a sort (Price low-high, high-low, Odometer low-high, Year new-old). On phone the rail collapses to a "Filters" button. Picking a make updated the grid instantly with no page reload ("4 vehicles available" for Nissan), but the URL stayed `/stock`, so a filtered view cannot be shared or bookmarked. The sort dropdown shows an empty label before you open it. Make counts show the stock is mainly mainstream: Toyota 96, Honda 22, Lexus 12, Nissan 4, Subaru 4, Mitsubishi 3, Mazda 1.

**Stock card.** Large photo, stock number badge, body-type badge, green "IN STOCK" pill, tag chips, transmission, km, fuel, location ("Melbourne, VIC" / "Sydney, NSW"), price, "Excl. gov. charges", "Drive Away ~$24,002" and two buttons (View Details, Enquire). A raw tag key leaks into the UI: the chip reads "new_arrival". No grade or year on the card beyond the title.

**Car page (2022 Toyota Aqua X, /stock/STK-1638).** Big gallery with arrows and a thumbnail strip (about 9 thumbs visible, scrolls further). A right-hand price card sits beside the gallery: name, IN STOCK pill, $22,990, "Excl. gov. charges (stamp duty, transfer fee)", "Drive Away ~$24,002", then three buttons: green Reserve Now, Book Inspection, Enquire. Tabs below: Overview (year, odometer, transmission, fuel, engine, colour, location, stock ID), Specs Sheet, Description. An on-page Finance Calculator (deposit, interest rate 9.9% p.a. preset, loan term 1-7 years, estimated weekly repayment "$112/wk", loan amount, est. interest, total repayable, with an "estimate only" note), then tiles for Finance Available, Trade-In, Warranty Options. Then "Why Choose Us": no accident history (PPSR check and auction reports), genuine verified mileage (Japanese auction sheets and export certificates), 150-point inspection, Australia-wide delivery. Then similar vehicles. No 360, no video, and no auction sheet or underbody photos on this car (I did not check others).

**Phone behaviour.** The price card stacks under the gallery; Reserve/Book/Enquire are about 1.3 screens down. A sticky bottom bar with Call and Enquire stays on screen while scrolling, plus the floating phone button. The floating button overlaps the right-hand button on the stock cards and the sticky bar, which is a flaw.

**Price statement.** Ex-gov-charges price plus an estimated drive-away figure computed per state (on the In Transit page it itemises "Stamp Duty (VIC) $798, Transfer Fee $46.20, Est. Drive Away $19,834"). Stated clearly, which none of the others do as well. It is an estimate (the tilde), VIC rules only.

**Trust.** Licence in footer ("Licensed Motor Car Trader LMCT 11285", ABN, ACN, company name Japtralia Vehicle Import Pty Ltd T/A Autoproject), address, hours (Mon-Sat 8:30-5:30, Sun 10-4:30), WhatsApp, social links (YouTube, TikTok, Facebook, Instagram), "Pioneers" claim and the four-promise block. I saw no customer reviews or people/team on the home or car page.

**Interstate, in transit, sourcing.** Strongest here. "Australia-Wide Delivery" is in the top bar and a promise card. A dedicated **In Transit** page ("LIVE FEED", "12 vehicles currently in transit, updated 5:53:09 AM", "Reserve yours before arrival") lists cars still in Japan/at sea with Japanese auction grade chips (e.g. "Grade 4/B"), price and the drive-away breakdown. Also a "Sell Your Car" page and a free import-guide lead magnet. I did not find a sourcing-to-order form (the guide is the lead capture).

**Speed.** Home 2.0s / 4.3 MB desktop; 3.8s / 8.5 MB phone. Car page 22.5s / 6.6 MB desktop (noisy). Heavy images; the page showed a dimming spinner overlay on the phone screenshot while loading.

**Weak.** Filters not in the URL; leaked "new_arrival" tag; floating button covers controls; no proof documents on the car page I checked; stock is mostly hybrids, kei vans and people movers, not performance JDM (inference: it is a volume dealer).

Screenshots: `autoproject-home-phone`, `autoproject-stock-desktop`, `autoproject-car-desktop`, `autoproject-car-phone`, `autoproject-transit-desktop`.

---

## 2. Fukasawa Car Imports (fukasawaimports.com.au) - VIC

**First screen.** Desktop: a full-bleed video of a tachometer with a huge headline "START YOUR CAR IMPORT JOURNEY WITH $250", two buttons (Begin Import, Ask a Question), a Get In Touch button, phone and social icons, WhatsApp bubble and a TrustedSite badge. Navigation text sits on the video and is hard to read. Phone: headline "Begin your IMPORT with $250" over a blue-car video, two stacked buttons, then three big tiles (Import, Finance, Stock). This is an import-to-order service first and a stock dealer second.

**Search and filtering.** None. The "In Stock" page is 10 tiles with title and price overlaid on the photo (the overlay text is low contrast over bright photos, e.g. the yellow S15 and the Prado). "Sold" cars stay in the grid with "Sold" in place of a price. A separate "Catalog" page serves the order-from-Japan side (I did not open it).

**Car page (1999 Nissan Silvia S15 Spec R, /stock/...).** Gallery of at least 12 thumbs. The gallery order is exterior shots, an interior and cluster shot, an **underbody/engine bay shot** and a **photographed Japanese auction sheet** within the first rows, a real condition-proof habit. Spec list down the right: mileage ("72,000* KM"), transmission, fuel, body, interior colour, "Excellent" condition, "Clean title: Yes". Price: "$56,000 *Landed and Complied", the description saying "Import to order from Japan. 8-12 weeks to order. Price is landed and complied in Melbourne", with badges "Finance Available / Compliance Included". Enquiry: a blue phone button and a blue Enquire button sit in the right column, visible around the fold on desktop (the Enquire button is cut off at 900px). Below: "more from dealer stock", and "Fill in our import request on AirTable". No 360, no video, no finance calculator.

**Phone.** Gallery then a heading and price; the call and enquire buttons are further down the page (not above the fold). A green WhatsApp bubble floats bottom-right and a TrustedSite badge covers the bottom-right corner.

**Trust.** Footer shows "Autosan Pty Ltd trading as Fukasawa Car Imports, LMCT 11556", a "Recently delivered" strip (e.g. "Mazda RX7 FD, Delivered to Sydney", "Nissan Skyline, Landed to Melbourne"), a "Why Fukasawa?" block (access to "over 40 auctions", independent condition reports, genuine mileage verification), FAQ accordion, TrustedSite badge, Car Club and Blog pages. No named people or review quotes on the pages I opened. The address changes between pages: Docklands (Suite 408/100 Harbour Esplanade) on the stock page, Mentone (66a Warrigal Rd) on the car page.

**Interstate, in transit, sourcing.** "Delivery at your door, Australia-wide", "Delivered to Sydney" entries. The core offer is sourcing to order: "$250" starts a tailored daily auction search ("fresh daily listings, condition reports") and "Begin Import" funnels to an AirTable request form. A "Finance for imported cars" page exists. No coming-soon list on the stock page.

**Speed.** Home 27.7s / 6.9 MB (autoplaying hero video); car page 14.0s / 7.0 MB (desktop, noisy); phone home 13,977 KB.

**Weak.** No filters or sort; low-contrast overlay text on the grid; the hero video plus heavy page; inconsistent addresses; stock is a handful of cars; phone enquiry is not above the fold. The "$250" hook is a strong, specific offer though.

Screenshots: `fukasawa-home-phone`, `fukasawa-car-desktop`, `fukasawa-car-phone`.

---

## 3. J-Spec Imports (j-spec.com.au) - Melbourne

**First screen.** Desktop: dark brown header, a red "Browse vehicles from: Featured Cars / Upcoming Auctions / Typical Sale Prices" bar, then a statement "J-SPEC IMPORTS HAS FOR 27 YEARS BEEN HELPING CUSTOMERS SOURCE AND IMPORT QUALITY CARS" beside a grey RX-7. It looks like a mid-2000s site. Phone: **not responsive**; I saw the desktop layout scaled down into 390px, with tiny text (the car page's three columns are shrunk side by side).

**Search and filtering.** Browse by make, then by model (`/lineup`, `/featured/<make>`), a Search page that leads to Featured cars, Auction cars (cars coming up at Japanese auction, including ones with auction sheets) and a "Typical sale prices" tool by year, colour and condition. Reloading page per click, clean readable URLs. I did not find price/km sliders.

**Car page (2011 Toyota Crown Hybrid G Package, featured car).** Gallery with six thumbnails and "click for larger photo". Right-hand panel "SUBMIT ENQUIRY" with the price **$15,400 AUD LANDED AND COMPLIED** and an itemised **PRICE BREAKDOWN**: 835,000 JPY FOB at the stated yen rate = AUD $7,650; $3,500 shipping (ocean freight and customs costs); $0 import duty (0%); $1,000 GST; $0 aircon degas; $2,000 compliance; $1,200 J-Spec service fee. An explainer states the yen rate used and that figures are estimates. Spec block (engine, transmission, mileage 104,000 KM with an info tooltip, colour), a tick-list of features, then plain-language sections: "This car is listed in the Featured section" (a source-dependent explanation), "How to buy this vehicle", "Is this car eligible for import?" (SEVS), and "Is the mileage genuine?" (the **J-Spec Mileage Promise** using the Japanese export certificate/dereg papers). Left column: customer feedback quotes with photos, a mileage-tampering explainer, an auction video link. Enquire sits top right ("Submit Enquiry", a red header) and phone/email in the left column; nothing is sticky.

**Trust.** Phone and email, a testimonials page, customer quote blocks with name and suburb, "27 years" (home page says since 1999). No licence number seen on the pages I read.

**Interstate / sourcing.** "Ships to any state" (from search, not seen on page); the whole model is sourcing from Japanese auctions and dealers with a service fee. Every car is either an auction car or a featured car (a Japan-side listing), so "coming soon" is the default state. The Infobase explains the import process.

**Speed.** Home 8.6s / 1.6 MB; car 6.1s / 2.0 MB. Light.

**Weak.** Dated look, no mobile layout, cars are mostly everyday (Crown Hybrid, RX hybrid, Suzuki Carry in the featured list), enquiry form is a separate click, price estimate depends on a yen rate.

Screenshots: `jspec-car-desktop`, `jspec-car-phone`.

---

## 4. Garage Apex (garageapex.com.au) - Epping VIC

**First screen.** Desktop: white header with a red "Contact Us" button, a second black bar (Cars For Sale / Live Japanese Car Auctions / Recently Sold), then a split hero: a showroom photo and "Used Car Dealership & Import Cars From Japan. Find Your Dream Car Today" with four tick lines ("Family operated over 20 years", servicing, VicRoads licensed vehicle tester, roadworthy). One "Contact Us" button; the stock is below the fold. Phone: burger, logo and a green phone icon in the header.

**Search and filtering.** Left filter panel on the stock page: text search, Make & Model, Body Type, Transmission, Fuel Type, a price range with two inputs (shown as 7888 to 81888), "On Sale" tick, and a Sort (Price low/high, kms low/high). "We Have 68 Cars For Sale". Cars also appear as "Recently Sold". I did not confirm whether filters reload or change the URL (my search attempt left the URL at `/cars-for-sale/`).

**Stock card.** Stock number, photo, title, price and "Excl. Govt. Charges" (one hybrid read "Drive Away"), with View and Enquire buttons. Several cards show a placeholder: a "JUST ARRIVED, enquire now to secure this vehicle" graphic or a bare logo, rather than a car photo.

**Car page (2020 Toyota Pixis Van, a "coming soon" car).** Right-hand card: title, $27,888 "Excl. Govt. Charges", Print PDF, Share, dealer address, then "HOW CAN WE HELP?" with four large options: **Place a Deposit** ("Reserve this car today"), **Book a Test Drive**, Discuss Finance, Ask a Question, and the line "We reply within the hour during business hours". A Finance Calculator (deposit slider) sits below. The description is a long "COMING SOON, register your interest" text: "purchased in Japan, expected arrival in approximately one month", an **"Interstate buyers welcome"** block (Australia-wide transport, electronic documentation and contracts, online finance and payment, remote trade-in appraisals) and "Why choose us" ("family-owned, over 30 years"). The gallery for this car is a placeholder graphic. The enquiry card sits beside the gallery on desktop (top of page, above the fold); on phone it is about 1.5 screens down (after a 470px-tall image and the price block), with the green call icon in the header always visible. Not sticky on phone.

**Trust.** "VicRoads Approved Licensed Vehicle Tester", two sites with phone numbers, a service centre, "family operated over 20 years" (home) vs "over 30 years" (car page), a Recently Sold page. I saw no licence number on the pages read and no reviews.

**Interstate, in transit, sourcing.** A real "Interstate buyers welcome" block; "coming soon / register interest" handled per car; a "Live Japanese Car Auctions" section with an auction login (auction.garageapex.com.au sign-in/sign-up), "List of cars we can import" and "Import process explained" pages.

**Speed.** Home 12.4s / 2.2 MB; car page 6.4s / 3.6 MB.

**Weak.** Placeholder images stand in for real photos on pre-arrival cars; mixed age claims; stock is mostly kei vans, people movers and a few late-model cars rather than classic JDM. The "four ways to enquire" card is the best enquiry panel in this set though.

Screenshots: `garageapex-car-phone`.

---

## 5. Motorman Imports (motorman.com.au) - Slacks Creek QLD

**First screen.** Desktop: a black header with the big "motorman" wordmark, a **Quick Search** (category, make, model dropdowns) top right, an orange-edged nav (Home / Stock Search / Import To Order / Wheelchair Vehicles / Finance & Warranties / Contact Us), then a large hero of a white R32 GT-R with six orange tiles (All Vehicles, Performance, Exotic, Wheelchair, People Movers, Latest Arrivals). Phone: logo, a burger, a yard aerial photo and the six tiles stacked as large buttons, then a "Welcome to Motorman" story (family-owned, est. 2002, owner a dealer since 1967).

**Search and filtering.** Left rail on the stock page: Make (with counts), Price, Body Type, Year, Transmission, Keywords; Sort by (Latest, Oldest, Price both ways, Make A-Z/Z-A, Year both ways); pagination "Page 1 of 6, displaying 1-18 from a total of 108". Each filter is a link to a path-style URL (`/stock-search/nissan-make/`, `/stock-search/coupe-body/`, `/stock-search/sortby-make-asc/pagenum-2`), so a page reloads but every view is **shareable and crawlable**. Make counts: Nissan 36, Toyota 15, Mitsubishi 11, Jaguar 9, BMW 6, Morgan 4 (so a mix of Japanese and European classics).

**Stock card.** Title, strikethrough old price and new price (a visible price drop), photo carousel with dots, colour, transmission, km, then orange View Details and Watch List buttons. Year is in the title only. No grade.

**Car page (1999 Nissan Silvia, $85,000 struck through, $80,000).** Desktop: breadcrumb, Email to a Friend / Print / Email Brochure / Share, title with price on one bar, a black-letterboxed photo gallery with a small thumbnail strip (the page counts 4 photos, the phone carousel has 5 dots), and on the right a Watch List box and a full **Vehicle Enquiry form (name, email, phone, message, reCAPTCHA)** above the fold, then Yard Location and contact number. Phone: price block, gallery and thumbnails; the form is about 4 screens down after the spec table (km 4,242, colour, transmission, cylinders, capacity, VIN, seats, doors, stock no.). Not sticky; the only persistent control is a scroll-to-top button. Dealer comments list a few bullet points ("Ultra low km's, rare factory condition, full log book history"). No auction sheet, grade, odometer certificate or underbody photos.

**Price statement.** Contradictory: "advertised price does not include government charges" and, a line later, "the advertised price includes Queensland registration, statutory warranty (if applicable), PPSR certificate and roadworthy certificate". Finance link to Dealer Finance Group (external). There is a Finance & Warranties page but no on-page calculator.

**Trust.** Dealer licence MD3309907 in the footer, address, phone, story page, a Facebook link. No reviews or staff photos on the pages seen.

**Interstate, in transit, sourcing.** Home page: "We supply vehicles throughout Australia... fully insured freight, email or call". **Import To Order** page: 6-10 weeks from purchase, same buying agent in Japan since 1995, research on recent auction sales, agent inspection with photos emailed, link to the RAWS approved list. No "coming soon" list.

**Speed.** Home 8.0s / 3.4 MB; stock list 22.7s / 12.0 MB; car page 8.8s / 5.2 MB.

**Weak.** 2010-era look and layout; the form is buried on phone; contradictory price terms; heavy stock page.

Screenshots: `motorman-stock-desktop`, `motorman-car-desktop`.

---

## 6. Edward Lees Imports (edwardlees.com.au) - West Ryde NSW (trading as Sun Rise Cars), "Established 1971"

Same EasyCars platform and layout as Motorman, in black and orange. Home: Quick Search (make/model) in the middle of a hero showing a black Elgrand, three buttons (View Our Stock / How To Import Cars / Our Customers), phone numbers in the header (also after hours), and an orange chat bubble. Stock: 82 cars (Toyota 65), same left filters and sort, **but the list cards carry the full dealer description** (very long text per card), so the page is 17.4 MB. Car page (1997 Subaru Impreza WRX STi Type RA, $45,888): an orange title/price bar, a **YouTube walkaround video as the main media**, a green "Click here for a FREE car history report" button, a photo gallery (6 numbered) and the same Vehicle Enquiry form on the right (above the fold on desktop). Description says "Imported from Japan with Dereg papers confirming genuine low kms" and lists "no rust, no repairs". Footer: "Established 1971", testimonials grouped by make, a Model Reviews section covering R32/R33 and other JDM models, finance page, service centre, "We deliver Australia wide, call for an interstate transport quote" in listings. No licence number on the page I read. Weak: the same dated EasyCars UI; the enquiry form is far down on phone; huge list pages; the nav is long.

---

## 7. Fabcar (fabcar.com.au) - Perth WA, dealer licence MD30423

Shopify store. Home: a dark nav (Wheelchair Accessible, EV & Hybrid, Classics & Performance, Japanese Imports, Arriving Soon, Sold), a sunset-Perth hero with a Leaf, a Supra, a Skyline and a wheelchair van, "Hand-selected vehicles sourced from Japan. Arriving soon or available now in Australia." and a View Inventory button. Collections have **"Arriving Soon" and "Sold" tabs**, which is a good idea. Car page (1999 Toyota Soarer JZZ30, $44,888): a two-column photo grid of the car in the Fabcar showroom (10 images, dots on phone) and a long, well-written description (Grade 4.5, 79,000 km, 1JZ-GTE, 5-speed manual). But: the product title is "...Just Arrived. Enquire Now", the price is "$44,888.00", the cart-style "Add to cart" exists, the enquiry is a Podium form link far from the page, no spec table, no auction sheet, and an Instagram pop-up chip floats over the text on phone. An "Arriving Soon" Honda S660 shows **$0.00** in its listing. A footer disclaimer states "Vehicle descriptions are generated using AI assisted tools". Weak: a shop template for a car; no filters beyond collections; no history proof.

---

## 8. Iron Chef Imports (ironchefimports.com) - Adelaide/Sydney, a broker

The only SA competitor I found. A modern-ish WordPress site (white header, green/purple chef logo). **A "JOIN OUR MAILING LIST AND BE ONE OF THE COOL KIDS" modal opened about 3.2s (desktop) / 3.9s (phone) after load on both the home page and a car page; it covers the hero on arrival** (I measured this on the car page; the first full-page screenshots were blocked by it). A small "PSST...JOIN OUR MAILING LIST!" tab stays at the bottom-left afterwards. Cars Available lists 4 cars as cards: auction grade, odometer, colour, location (Adelaide, Sydney, Brisbane) and "Est. Price (AUD)" ($22,000 to $395,000). The car page (1998 Toyota Supra RZ-S, $125,000 "Landed & Complied") has a long photo gallery of 3-wide thumbnails (exterior, engine bay, bare-shell paint-booth shots), a long spec-and-modifications list, a right-hand card (Auction Grade, Odometer, Colour, Location, Stock ID, purple "Enquire Now"), and **"A note about pricing"**: FOB meaning, landed-and-complied estimates from the listing-date exchange rate, inclusive of fee, shipping, taxes and compliance, **excluding tyres and registration**, customs inspection fee risk and exchange-rate risk. Honest and detailed. Enquiry button is top right on desktop; on phone it is far down. Trust: phone and email, long-running blog, finance page, an "import process" page. No licence number seen; the Supra's auction grade is blank, so the "grade" field is only sometimes filled. Weak: the modal, four cars only, no filters, stale-looking content.

---

## 9. Raw Performance Imports (rawperformanceimports.com.au) - Dandenong VIC

Dated Joomla site (footer "© 2018", "Solution by TD Interactives"). Home hero: a Supra, "RAW PERFORMANCE IMPORTS. Australian safety standards, guaranteed", "Call Now" and a vertical "Make an Enquiry" tab on the left edge. Vehicle Stock is a menu of makes and models and **every Nissan sub-category showed "(0)", and the model page said "There are no advertisements in this category"** (I checked Nissan only). The phone links in the page are malformed (`tel::0414 752 447` and `/0414 752 447`). Footer shows LMCT 0012317 and a compliance (RAWS) credential. This is a compliance workshop with a stock menu, not a live dealer site, as far as I could see.

---

## 10. Prestige Motorsport (prestigemotorsport.com.au) - an agent, no stock

Search results describe it as Perth-based, selling to buyers in every state (from search, not verified). Home: blue "1 AUD = 109.38 JPY" bar, hero "JAPAN AUCTION GLOBAL IMPORT EXPERTISE" with a free 30-day auction alerts offer and a Toyota Alphard; nav Japanese Car Auctions / How It Works / What We Do / Helpful Information. Content depth is the strength: cost calculators, "How to read a Japanese auction sheet", "inspection examples", "past auction sales", "Japan car history and odometer check". A **Genuine Mileage Promise** page says it has provided the original Japanese export certificate for every sourced vehicle "since Japan implemented the Export Certificate system in 2004", explaining the certificate shows kms at the last two inspections. Home loads 9.8s / 5.2 MB. Not a stock site, so no car page to evaluate.

---

# Verdict

## Three best

1. **AutoProject, https://autoproject.com.au**. Best mechanics of any site here. A hero that is a search with a live count; filters with counts, search and sort that update instantly; a stock card that shows price, km, location, status and an estimated drive-away figure; a car page with a price card carrying Reserve Now / Book Inspection / Enquire together, a finance calculator with weekly repayments, trade-in and warranty tiles; a four-promise block (PPSR, auction sheets and export certificates, 150-point check, delivery); an **In Transit page with Japanese auction grades and per-state stamp duty/transfer fee**; a sticky Call/Enquire bar on phones and a floating call button. Drawbacks: filters not in the URL, a raw "new_arrival" tag, mostly non-performance stock.
2. **Fukasawa Car Imports, https://fukasawaimports.com.au**. The best JDM-enthusiast presentation. A "$250 to start" sourcing offer with a clear first action; "landed and complied" prices; car galleries that include the **auction sheet photo and an underbody shot**; "recently delivered" proof (model + destination city); WhatsApp and phone on the page; LMCT number on every page. Drawbacks: no filters, slow, low-contrast tiles, thin stock.
3. **J-Spec Imports, https://j-spec.com.au**. The best price honesty and history story in the set: a full line-by-line landed price (yen FOB, rate, shipping, duty, GST, compliance, fee), plain "Is this car eligible?" and "Is the mileage genuine?" sections tied to the Mileage Promise, customer quotes with names. Held back by a dated look and **no phone layout** (it shrinks the desktop page), so it is a content model, not a design model. (Garage Apex's four-option enquiry card and "Interstate buyers welcome" block come a close fourth.)

## One worst

**Raw Performance Imports, https://rawperformanceimports.com.au**. The stock menu shows every Nissan model at "(0)" and the model page reads "There are no advertisements in this category"; the footer is dated 2018; the phone links are broken (`tel::`); the car-buying path ends at "Call Now" or a side tab. (Iron Chef's immediate full-screen mailing-list modal on every page, with only 4 cars, is a close second.)

## Patterns worth adopting

- A hero that is the search (make/model plus a live "N vehicles available" count) and leads to the grid (AutoProject).
- Filters with counts, instant updates on desktop and a "Filters" sheet on phone (AutoProject); put the state in the URL as well, which AutoProject lacks and Motorman has (`/stock-search/nissan-make/`).
- Price card at the top of a car page holding: price, what it excludes, an estimated drive-away figure with the stamp duty and transfer fee lines, and Reserve / Book inspection / Enquire together (AutoProject, Garage Apex "Place a deposit / Book a test drive / Discuss finance / Ask a question").
- A line-by-line landed price for import-to-order cars, with the yen rate and what is excluded, plus a "tyres and registration not included" note (J-Spec, Iron Chef).
- Condition proof inside the gallery: the auction sheet photo, underbody and engine-bay shots (Fukasawa, Iron Chef), with the auction grade on the card (Iron Chef, AutoProject In Transit).
- A mileage promise tied to the Japanese export certificate/dereg papers (J-Spec, Prestige Motorsport, Edward Lees' "Dereg papers" line).
- A dedicated In Transit / Arriving Soon status with auction grade and drive-away price, and Reserve before arrival (AutoProject, Fabcar's "Arriving Soon" and "Sold" tabs, Garage Apex's "Register your interest").
- An "Interstate buyers welcome" block spelling out transport, e-contracts, online finance and remote trade-in appraisal (Garage Apex).
- Walkaround video as the main media on a car page (Edward Lees) and the owner's own voice.
- "Recently delivered" with the model and the city (Fukasawa), "Sold" cars kept visible (Fukasawa, Fabcar).
- A low-cost sourcing hook with a price (Fukasawa "$250").
- Sticky phone bar (Call + Enquire) and WhatsApp, plus a licence number in the footer (AutoProject LMCT 11285, Fukasawa LMCT 11556, Motorman MD3309907, Fabcar MD30423).

## Things nobody here does well

- **No site shows a real photo set with a consistent shot order on every car** (front three-quarter, rear, interior, odometer, engine bay, underbody, auction sheet). Fukasawa and Iron Chef come close on one car each; others have 4-6 images or a placeholder.
- **No 360 spin and no per-car condition report** (a graded diagram of marks/scratches) on any car I opened; the auction sheet is a photo, never translated line by line.
- **No odometer-proof visual** (a scan of the export certificate on the car page itself); the claims are text only.
- **Price clarity is poor almost everywhere**: ex-gov-charges, "estimated" or contradictory; only AutoProject gives a drive-away estimate (VIC only) and nobody gives a true on-road price for SA (rego, stamp duty, CTP).
- **Finance** is a calculator at best (AutoProject, Garage Apex) and a link to a third party at worst (Motorman); no pre-approval inside the page.
- **No reviews with names on the car page**; reviews are absent or on separate testimonial pages (J-Spec, Edward Lees).
- **Phone enquiry is rarely above the fold or sticky** (only AutoProject has a sticky bar; Garage Apex has a header icon).
- **No real "reserve with a deposit" flow outside AutoProject and Garage Apex**; no booking of an inspection with a calendar.
- **Shareable filtered URLs**: only the EasyCars sites (Motorman, Edward Lees) have them, on the oldest UIs.
- **Mobile**: J-Spec has no phone layout; Raw Performance is dated; Iron Chef opens with a modal.
- **Adelaide/SA presence**: I found no SA stock dealer with a modern site; Iron Chef (a broker) is the only SA name, with 4 cars. The local-search and "visit the yard" story is open.
- **Speed**: every site I measured was heavy (3-17 MB), driven by uncompressed photos and video; nobody uses a light-weight first load.
