# USA and Canada competitor review (JDM dealers and online-first retailers)

Date of review: 2026-11-11. Method: Playwright Chromium, desktop 1440x900 and phone 390x844 (iPhone UA). I looked at every screenshot I cite. Screenshots are in `/home/user/tokyo-prestige/research/competitors/usa-canada/` (14 kept, named `<site>-<page>-<desktop|phone>.jpg`; the rest were deleted per the brief).

## Access report (what was blocked)

| Site | Result |
|---|---|
| Carvana (carvana.com) | Blocked. 403 and a "Just a moment... Performing security verification" bot wall, also on /cars. Not evaluated. |
| CarMax (carmax.com) | Blocked. 403 "Access Denied" (Akamai). Not evaluated. |
| Tesla used inventory | Blocked. 403 "Access Denied" (Akamai). Not evaluated. |
| Japanese Classics (VA) | Blocked. 403 nginx on both www and bare domain. Not evaluated. |
| Clutch (clutch.ca) | Partly blocked. A "Let's confirm you are human" image captcha covered the home page (see `clutch-home-desktop.jpg`). Home copy was readable underneath. The inventory at /cars returned "Oh no, there was an error when trying to get all of the vehicles". No car page seen. Home copy only. |
| Vroom | Dead. vroom.com now says it halted all used vehicle purchases and sales on 22 Jan 2024. Shift: shift.com is now an unrelated browser product. |
| Toprank Importers | Domain toprankimporters.com is a GoDaddy parked page. Not evaluated. |
| Montu Motors, B-Pro (www.bproauto.ca) | 502 "upstream request failed". B-Pro works at b-pro.ca, evaluated there. |
| Right Drive, JDM Expo USA | Proxy tunnel failure (ERR_TUNNEL_CONNECTION_FAILED), unreachable from here. |
| Driver Motorsports | Page navigated away during load, no usable content captured. Not evaluated. |
| Autotrader, CarGurus | Bot verification or "page unavailable". Not tried further. |

Evaluated (9): Driveway (online-first, USA), Duncan Imports and Classics (VA), The Import Guys (WA), JDM Sport Classics (MI), Velocity Cars (Burnaby BC), B-Pro Auto (Alberta), Canada Drives, Clutch (home page only), and a look at the Vroom shutdown page. Deep on five: Driveway, Velocity Cars, B-Pro, Duncan, The Import Guys. JDM Sport Classics and Canada Drives got lighter passes.

Honest limit: no true "Carvana-style" retailer was reachable, so "how online-first retailers let someone commit without visiting" is evidenced by Driveway, Clutch's own claims, and Velocity/B-Pro deposits. Anything I say about Carvana/CarMax/Tesla would be from memory, so I say nothing.

## Speed (Playwright, desktop, sandbox network via proxy: use as relative only)

Load event time, LCP and transferred bytes (CDP encodedDataLength), one run each:

| Page | Load event | LCP | Transferred | Requests |
|---|---|---|---|---|
| Driveway home | 5.8 s | 4.8 s | 6.7 MB | 164 |
| Driveway car page | 5.7 s | 7.7 s | 7.2 MB | 223 |
| Duncan home | 13.3 s | 2.2 s | 4.9 MB | 182 |
| Duncan car page | 5.3 s | 2.3 s | 3.6 MB | 166 |
| Import Guys home | 5.6 s | 1.3 s | 1.7 MB | 153 |
| Import Guys car page | 4.2 s | 0.9 s | 1.9 MB | 158 |
| Velocity home | 9.9 s | 4.7 s | 4.0 MB | 115 |
| Velocity car page | 11.1 s | 7.8 s | 6.0 MB | 168 |
| B-Pro home | 4.3 s | 3.2 s | 5.2 MB | 162 |
| B-Pro car page | 4.2 s | 1.9 s | 3.7 MB | 125 |
| JDM Sport Classics home | 1.5 s | 1.1 s | 0.3 MB | 29 |
| JDM Sport Classics car page | 1.0 s | 0.7 s | 0.3 MB | 24 |
| Canada Drives home | 6.6 s | 2.1 s | 4.3 MB | 208 |

Impression: almost everyone is heavy (3 to 7 MB). The only fast one is JDM Sport Classics, and it is fast because it shows almost nothing (a gallery area rendered blank in my capture, see below). Driveway's car page has the slowest LCP of the serious sites because it loads a 360 and 30 photos. Opportunity: a car page with a quick hero photo, lazy gallery, under about 2 MB.

---

## 1. Driveway (driveway.com) USA, online-first. DEEP.

Closest thing to a Carvana-style flow I could actually open. Sells used and new cars nationwide, ships to the buyer.

**First screen.** Desktop (`driveway-home-desktop.jpg`): white header (Shop, Sell/Trade, Finance, Ownership, Learn, a heart for saved cars, account, "Make a Payment" pill), then a beige band with a free-text search box "Describe the car you're looking for" plus five chips (Cars under $25k, Low mileage, Family-friendly, Road trip ready, Winter-ready), then a big royal-blue hero "Welcome to Auto Done Easy / We make car buying and selling a breeze." with Shop Cars, Sell or Trade, "or Get Pre-Qualified". Search is above the hero, i.e. the first thing. Phone: header with hamburger, logo, heart, account; same search; hero follows. Phone chips differ (Low monthly payment, Free shipping, Commuter car).

**Search and filtering.** Left rail on desktop; on phone a bar of Filter / Sort / ZIP (94117). Filters seen: Used/New toggle, price min/max, a Price vs Finance (monthly budget) tab, Free Shipping to [ZIP] toggle, Certified Pre-Owned toggle, Price Drop, Low Mileage, Make/Model/Trim, Body Style and Colour, Year and Mileage, Fuel Type and MPG, Drive Type and Engine, Features. Natural-language search box. Filtering is in-page (no hard reload that I could see). The shareable URL is a `?filters=` param holding base64 JSON (includes ZIP and state), so a filtered list can be shared. Sort control labelled "Recommended". Pagination 1 to 100 numbered pages. 29,919 used cars. Saved cars via heart (requires account). I did not test saved-search alerts.

**Card** (`driveway-list-desktop.jpg`): one hero photo with a 360 icon bottom right, heart, optional blue tag "Low Mileage" or "Certified Pre-Owned", a "Battery Electric" strip; year (small), make/model (large), trim and miles; price; then "$1,569/Month Est." and "$1,000 Cash Down"; a footer strip "FREE Est. Shipping" with an "Adjust Terms" link that opens the payment settings inline. No on-hold or arriving badges in what I saw.

**Car page** (`driveway-car-desktop.jpg`, `driveway-car-phone.jpg`). 30 photos (counter "1/30"), 360 spin as the second thumbnail, interior as the third, then side and rear exterior. A thumbnail strip under the main image (6 visible). Right column on desktop: year/make/model, trim and miles, price with a "Price Breakdown" link, finance line "Finance for $1,569/month est. $1,000 down" with "Customize" and "How financing works", three facts (One Previous Owner, FREE Est. Shipping to 94117, Limited Warranty), a three-step "Getting Started" (Create an account, Choose your payment, Submit when you're ready), a big blue "Get Started" button, then a "7-Day Money-Back Guarantee, Available on eligible purchases." box. The button and price are above the fold on desktop at 1440x900. On scroll, a sticky header strip appears with thumbnail, name, price and "Get Started" (`driveway-pricing-desktop.jpg`). On phone a sticky bottom bar holds "Finance for $1,569/month est." and "Get Started" plus a "?" help button.
Below: specs as icon tiles (transmission, drive type, body, MPG, VIN), tabs Overview/Features, cards for "See the Window Sticker", "Free History Report" (CARFAX, linked), "Instant Recall Check" (NHTSA), "Money-Back Guarantee". No flaw hotspots and no imperfection list: a text search of the page for damage, scratch, dent, wear, rust returned nothing. Condition is only implied by "One Previous Owner" and the CARFAX link.

**Price and payment.** Price breakdown (copied from the page): Vehicle Price $72,991, Dealer Documentation Fee +$85, Additional Fees +$96, Subtotal $73,172, Delivery to ZIP, Estimated Shipping FREE, Estimated Taxes & Fees "Calculate", Add a Trade-In, Total $73,172, then "How You're Paying": Down $1,000, Monthly $1,569/month, APR 10.99%, Amount Financed $72,172. The calculator (`driveway-pricing-desktop.jpg`) has Monthly Payment and Cash Down fields (with a stated allowed range, "Choose a value between $319 and $1,591"), Loan Length chips 36/48/60/66/72, Credit Score dropdown ("681 - 780: Good"), and a result "1,569 Est. Monthly Payment". Disclaimer wording: "The Estimated Monthly Payment is only an estimate and should not be relied upon; this estimated amount may be different than other estimates or terms found throughout the site." and "Tax, title, and tags vary by state. All costs and incentives will be finalized at the time of signing. All financing on approved credit."
Inconsistency I saw: on two loads of the same car page the monthly figure read $1,234 in one and $1,569 in the other, with no explanation on screen. A buyer who sees both would distrust it.

**Commit without visiting.** "Get Started" starts an account flow (create account, choose finance or cash, submit). 7-day money-back on eligible purchases ("Return windows and mileage limits vary"). Free estimated shipping to your ZIP, with the shipping origin dealer named ("Shipping from BMW Mini of San Francisco"). Live chat button bottom right. I did not go past the account wall.

**Trust.** CARFAX per car, window sticker, recall check, limited warranty, money-back guarantee. Reviews: footer link "Driveway Reviews", nothing on the car page.

**Weak.** Heavy (7 MB, LCP 7.7 s on the car page). Imperfections not shown at all. Hard "Get Started" is account-first, no way to ask a question on the car page except chat. The default $1,000 down and 10.99% APR are shown on the card, which flatters nothing but is quite visible; the wording "should not be relied upon" is blunt.

## 2. Velocity Cars (velocitycars.ca) Canada, JDM wholesale to public, Burnaby BC. DEEP.

**First screen** (`velocity-car-desktop.jpg` is the car page; home seen in my own capture): looks like a 2010-era dealer site: blue and yellow bands, a photo of the lot with a red box "Welcome to Velocity Cars", an Advanced Search block (Make, Model, Year range, Mileage, Fuel, Price, Body type, Stock #) below the fold on desktop. Phone: logo, phone numbers, lot photo, then a "Find a Vehicle" search box and body-type icons (Hatchbacks, Sedans, Wagons, SUVs, Vans). The full Google Translate language picker (about 130 languages) sits in the header. A "Just Arrived" section follows.

**Search and filtering.** Left rail: keyword, make, model, body style, fuel, price min/max, transmission, year, mileage (km), plus Gallery/List view and a sort ("Latest Listings"). The home form posts back (ASP.NET `__doPostBack`, so a full reload). A `/vehicles?VehicleType=Hatchback` style URL exists, so some filters are linkable. Separate pages for Current, Just Arrived and USA. No alerts seen.

**Grid** (`velocity-list-desktop.jpg`): 25 cars shown, 3 per row, a red "SALE" corner ribbon, stock number overlaid bottom left of the photo, title (year, model, trim, kilometres in the title, e.g. "2005 Toyota Altezza AS200 AT 69K"), price (was/now struck through), one spec line (km, transmission, fuel, cc). No on-hold or sold badge seen.

**Car page.** 18 photos ("2 of 18", arrows), all lot-style photos of the car with Velocity's own plate; no 360, no video, no flaw hotspots. Title, "was $13,290 now $11,990", then three stacked outlined buttons: "Pay Deposit (Fully-refundable)" with card logos, "Ask us a Question", "Book a Test Drive" (all above the fold on desktop, right column). A map of the lot follows. The long description gives: "6 MONTH LTD POWERTRAIN WARRANTY INCLUDED", car condition lines ("Auction grade 4: clean title, no accidents, good condition", "Landed in Vancouver and BC-registered", "BC-government safety inspected"), "Shipping Anywhere in Canada", "Documentation Fee $495 and applicable taxes are extra", and the dealer licence number. Below it, an SEO keyword dump ("subaru legacy rsk b4 mitsubishi evolution...") is printed in visible body text: poor. Specs are a dark table (stock, engine, body, mileage, colours, interior, transmission, engine type) next to a blue "Feature Highlights" box with a note "Please confirm features with dealership". Footer line: "Any pricing on this website is indicative only and subject to change... without notice."
On phone (`btns` check, no screenshot kept) the three buttons are not near the price: they sit roughly 2,850 px down the page, after the gallery, specs and description. No sticky bar.

**Deposit flow** (`velocity-deposit-desktop.jpg`, URL /buynow/19417). The page says: "To secure this vehicle please complete the form below including payment of a $500 FULLY REFUNDABLE deposit via credit card. The deposit is subject to independent inspection at your own expense or test-drive. If you do not like the vehicle you placed deposit, we will refund it." Form: first and last name, email, phone, driver's licence number, comments, and you must type the word ACCEPT before "PROCEED TO PAYMENT". This is the clearest "commit without visiting" mechanic I found in the JDM set, and the wording (refundable, subject to your inspection) is exactly the reassurance a distant buyer wants. Asking for a driver's licence number up front is a friction point (inference).

**Out-of-town.** A dedicated "Out of Town?" nav item and "Shipping Anywhere in Canada" and a nationwide third-party warranty network ("covers... in any of 3,000 repair centers across the country").

**Speed.** Load 11 s, LCP 7.8 s, 6 MB on the car page (proxy-affected, still the slowest JDM site).

**Weak.** Dated visual design, keyword stuffing, no photos of flaws, phone CTAs buried, indicative-price disclaimer, doc fee only mentioned deep in the text.

## 3. B-Pro Auto (b-pro.ca) Canada, JDM import broker and wholesaler. DEEP.

**First screen** (`bpro-home-desktop.jpg` not kept; seen in my own capture): a cream header with orange B-PRO logo, a full-bleed photo of a white Land Cruiser in front of the Canadian Rockies with the headline "IMPORT ANY VEHICLE FROM JAPAN DELIVERED ACROSS CANADA" (the last two words in grey italic), and three cards on dark: Wholesale Inventory ("Hundreds of curated JDM cars, vans, and kei trucks"), Dealer Inventory ("30,000+ Japanese vehicles available"), JDM Car Auctions ("Browse thousands of live JDM auction listings for FREE!"), each with an orange button. Phone: same, stacked, the photo first. It is the most modern and brand-confident of the JDM sites. Dark-mode toggle, search icon in header.

**Search and filtering.** (My own capture, not kept.) Free text "Search by make, model, trim or chassis", make dropdown with counts (Toyota 233, Honda 83, Nissan 32...), model, vehicle type, range sliders for year, price ($4,000 to $200,000), mileage, engine cc, toggles for AT/MT/CVT, 2WD/4WD, Gas/Diesel/Hybrid, RHD/LHD. A RESET button, an ALERTS button (saved search alerts), a share button, sort (year, price, mileage, date added). Shows "1-48 of 464 wholesale vehicles". Filters update the list in place, no obvious reload.

**Card:** photo with dots (swipeable gallery), title in condensed caps, a three-cell row (km, 2WD/4WD, AT/MT), price with "CAD Cleared Customs Price" caption, an arrow. Price wording is notable: "Cleared Customs Price" tells you the landed price, not the Japan price.

**Car page** (`bpro-car-desktop.jpg`, `bpro-car-phone.jpg`). Photos are the Japanese auction photos (6 for the Raum I opened, with a Carousel/Grid toggle), so interior and exterior are shown but also the auction yard; no spin, no video, no flaw hotspots. Right column: back link, title, breadcrumbs (year > make > model), "$8,799 CAD" and "Cleared Customs Price / * Price Beat Guarantee", then two buttons side by side: grey "IMPORT PROCESS" and orange "PLACE DEPOSIT"; below it an orange "INQUIRE" and five icon buttons (call, text, WhatsApp, email, share). Spec list: mileage, transmission, fuel, chassis number, model year, colour, steering RHD, engine. Everything is above the fold on desktop and on the phone (price, both buttons and the contact row are visible within the first screen and a half on the phone). Not sticky.
Page copy: "Ready to buy? It only takes a $1,000 retainer to get started. Tell us what unit you want, we reserve then purchase it, and your vehicle arrives in about 9 weeks." and a Price Beat Guarantee: "We are willing to beat the price of any competitor in terms of our import brokerage fee." Related blocks on the page: similar wholesale vehicles, similar in stock (dealer), similar at auction. Supporting pages: "decoding JDM auction sheets", "how to import a JDM vehicle", payment methods, shipping, FAQ.

**Weak.** Thin photo sets (auction photos), no condition grade shown on the page I opened (the auction sheet is taught on a separate page, not attached to the car), no imperfection callouts, 5 MB home page.

## 4. Duncan Imports and Classics (duncanimports.com) USA, Christiansburg VA. DEEP.

Dealer.com platform. ~504 vehicles, with JDM, mini-truck, classic and European segments.

**First screen** (`duncan-home-desktop.jpg` not kept; own capture): a black strip with phone and address, a big logo, a menu (Inventory, Bargain Barn, Buying Info, 3rd Party Inspections, Parts Providers, Media, About Us), a rotating hero ("Rural Route Mail Carrier Vehicles: ... Right-Hand Drive vehicles in stock. Clean titles, and ready to deliver.") and four big tiles: Shop JDM, Classic, European, Mini-Truck Inventory. A cookie bar covers the bottom of the screen on both desktop and phone and stays until accepted.

**Search and filtering.** Free-text search, three pre-counted chips (year "2026 or older 53", body "SUV 1", price "$25,000 and below 40"), applied filters shown as removable chips ("Nissan x", "Clear Filters"), left rail with Year slider, Make list with counts, Body Style, Price. Sort: year, bodystyle, colour, mileage, price both ways. Filters reload without a new page address, but the query `?make=Nissan` in the URL does apply, so filtered views are linkable. Phone: a single "Filter / Sort" button with a count badge. A "Compare" checkbox per card.

**Card** (`duncan-list-desktop.jpg`): photo with a red banner "6 Month/6,000 Miles Limited Warranty" and a blue banner "NO PROCESSING FEE!!" burned over every photo; "Play Video" button where a clip exists; below: year make model, Used, miles, then Original Price / Discount / Today's Price (e.g. $19,722, -$1,000, $18,722), Compare, Details. 17 vehicles carry "No Price Available".

**Car page** (`duncan-car-desktop.jpg`). Photo carousel with 52 photos ("1 of 52 Photos"), the first three in a showroom turntable studio; the banners stay burned into the photo. "Play Video" button under the title, "113 views in the past 30 days" (a social-proof counter). Price box: Original Price, Discount, Today's Price. "Show Me the CARFAX 1 Owner" badge. Specs in a grid (colour, odometer, fuel economy, transmission, drivetrain, engine, VIN, stock number) and collapsible Detailed Specifications groups. Dealer Notes are generic spec text copied from a reference ("115 horsepower @ 6,000 RPM ... 0-60 roughly 9.8 seconds") followed by one line of car-specific claim: "This one owner 200SX has just 23,000 actual miles." No condition report and no flaws listed on that page.
Where is the enquiry? With the cookie bar dismissed I could find no contact form, deposit or reserve button near the price on desktop. A scan for contact-type buttons found only "Financing Available" mid-page and the footer "CONTACT" (about y=3,190). On phone a bottom nav of four icons (menu, search, map pin, phone) is persistent at the top, and "Contact Us" is near the bottom. So the enquiry route is call, or scroll to the footer (inference: I may have missed a contact widget loaded after interaction).

**Honest-risk page (best content here).** `/buying-sight-unseen.htm`: "buying sight-unseen has become the preferred choice for many of our buyers... backed by a 96% customer satisfaction rate." "vehicle condition is highly subjective-what one person considers excellent, another might view as average." "Every vehicle undergoes a standard visual inspection and test drive both when it arrives and before it leaves our lot... we do not disassemble the vehicles to inspect all 34,000+ individual components, nor can we guarantee the exact workmanship of restorations done by previous owners." Also a 7-step "Buying Your Dream Car" page (choose, contact, verify state titling/registration with your DMV "in writing", arrange an independent pre-purchase inspection...), a "3rd Party Inspections" page listing inspection shops and what a report covers, a "walk-around video" offered on request, and a "Transport Your Purchase" page that recommends one shipper ("We show the last 5 shipping prices on your route"; Duncan states it has sold "thousands of vehicles to customers across the United States, Canada, and around the world"). The trust is in the prose, not on the car page.

**Speed.** Home load 13.3 s (LCP 2.2 s), 4.9 MB; car page 5.3 s, 3.6 MB.

**Weak.** Banners burned into photos, cookie bar blocks the viewport, no visible on-page enquiry or reserve action, boilerplate dealer notes, imperfections not itemised.

## 5. The Import Guys (theimportguys.com) USA, Ferndale WA. DEEP (small site).

Wix site. **First screen** (own capture): red contact bar (email and 1-833-JDM-4YOU), logo, nav (Home, Inventory, Japanese Auctions, Financing, Contact Us, Auction FAQ), a hero photo of five R34 Skylines with "YOUR PREMIER JDM IMPORTER / One of the largest inventories of JDM cars in the USA", and a row of six featured cars with red tag labels ("SR20VET! AWD!", "Manual!", "Rare!", "Available Now!"). The logo area on the home page shows no nav on desktop at first load (nav is only in the list view, see screenshot of my own capture).

**Search/filter.** Left "Filter By" panel with Price slider ($5,995 to $39,995), Vehicle Type, Vehicle Make, and "Sort by". Wix store, so filter reload is in place. Grid of cards with a red tag on the photo (miles or a selling point, truncated with an ellipsis, e.g. "63,084 Miles, A...", "AWD! 74,942 ..."), title, price. No payment line.

**Car page** (`importguys-car-phone.jpg`). 15 photos in a carousel (dots on phone, thumbnail strip on desktop). Order: front three-quarter, side, rear, interior, engine bay, wheel, etc. No 360, no video, no flaws. Copy: "Available Now", "SR20DET / RWD / Manual / 106,693 miles", "Zero Down Financing & Nationwide Shipping Available", then "To purchase this car or get more photos, please call 833.JDM.4YOU or email sales@theimportguys.com", "SHIPPING DIRECT TO YOUR DOOR / HASSLE FREE SHIPPING TO ALL 50 STATES". No buy button. Phone sticky bottom bar with three icons: call, email, Facebook. Price $39,995.00 sits in small grey type under a big title. "READ OUR REVIEWS" link at the bottom.

**Speed.** Fastest of the mid-weight sites: LCP 0.9 s on the car page, 1.9 MB.

**Weak.** The only action is calling or emailing, 15 photos with no condition detail, truncated badges, no deposit option, "send me more photos" is the route to see more (a sign the page does not carry enough proof).

## 6. JDM Sport Classics (jdmsportclassics.com) USA, Three Rivers MI. Light pass.

Smallest, fastest site (0.3 MB, load 1.0 to 1.5 s).
- Status pages are the interesting part: nav items INVENTORY, EN ROUTE, SOLD. A URL filter `?condition[0]=available` / `on-route` / `sold` separates them. In the available list a card can carry a "RESERVED" label (seen on a 1992 Hilux listing). So it does show on-hold (Reserved), arriving (En Route) and sold as separate lists. Sold stock is kept as proof. I did not open the sold list contents.
- List view (`jdmsc-list-desktop.jpg`, own capture): large photo left, title, three spec cells (mileage, fuel, engine), stock number, "Share this", red price banner at right. Filters: Condition, Make, Mileage, Year, Price, Transmission (collapsed accordions). Sort. Gallery/list toggle. The list URL carries the filter query, so linkable.
- Car page: title, stock number, tabs "Vehicle overview / Technical / Contact", red price block, a spec table (body, mileage, fuel, engine, transmission, drive, colours). The gallery and description areas rendered empty in my capture after 6 s (a dark empty bar under the tabs). Either lazy loading did not fire in headless or the page is genuinely thin; I would call it unproven. An "Available" and "Contact" button are present about 390 and 630 px down.
- FAQ headings (answers collapsed, I did not open them): licensed and bonded dealer, landed in the USA, shipping, extra fees on top of the listed price, viewing and test drive, warranty, finance, how to register a JDM car, registering from California, trade-ins, maintenance before sale, what can be imported, "how much does it cost to reserve a car?", sourcing a specific vehicle. The questions are the right ones.

**Weak.** Blank-looking car page, no payment info, copyright line reads 2024.

## 7. Canada Drives (canadadrives.ca) Canada, financing lead generator. Light pass.

Not a stock site. `/inventory` is a page of make/model lists ("an example of the types of vehicles that may be available") that point back to "Get Pre-Approved". Home (`canadadrives-home-desktop.jpg`): blue hero "The Easiest Way to Buy or Sell a Car", two buttons (Get Pre-Approved, Sell My Car), three white cars. Flow: apply for financing, "We'll match you with a local dealership who will show you vehicle options you are pre-approved for", "Typically we can have you in a new car in as little as 48 hours", and instant offer to sell your car, valid 7 days. Loan calculator at /car-loan-calculator: loan amount, duration 12 to 96 months, credit rating (Poor/Average/Good/Excellent), outputs Monthly, Weekly, Bi-weekly (e.g. $188 / $43 / $87 as shown on load) and the wording "The calculation is based on the information you provide and is for illustrative and general information purposes only. This should not be relied upon as specific financial or other advice." Footer lists dealer registrations by province (BC, ON, AB). 4.3 MB home page, 208 requests. Payment estimator is fine, but there is no car page at all, so nothing to learn about commitment on a specific car.

## 8. Clutch (clutch.ca) Canada, online-first retailer. HOME COPY ONLY.

I could not get past the human-verification captcha or load inventory, so no car page, no filter, no grid. What the home page says (read from the page text): hero "Buy or sell your car online / We buy, recondition, and sell cars. Certified for quality, no middlemen." with a Google 4.9 star badge; "Inspected across 210 points by 8 Clutch mechanics. ... Backed by a 10-day love-it-or-return-it guarantee."; "All our cars come with a 10-day money back guarantee. Love it or return it"; "Comprehensive inspection report available online"; "Save up to $3,500 when you buy from Clutch"; weekly deals "up to 20% on select used cars"; finance "Get pre-qualified in minutes ... No impact on your credit"; "4.9 stars, 15,000+ reviews"; a customer quote about delivery to the door "a couple days later". A comparison block sets Clutch against "Dealerships" and "Private sellers" with tick lists. These are Clutch's own claims, not verified by me. The screenshot (`clutch-home-desktop.jpg`) shows the captcha, which is itself a finding: bot protection blocks automated review, and (inference) a human on a slow connection could be stopped too.

## 9. Vroom (vroom.com)
Now a notice: "We announced on January 22, 2024 that Vroom has halted all purchases and sales of used vehicles." Nothing to evaluate.

---

## THREE BEST

1. **Velocity Cars, car page and /buynow** (https://www.velocitycars.ca/vehicle/2005-Toyota-Altezza/19417?s=1 and /buynow/19417). Not pretty, but it is the only small JDM dealer that lets a distant buyer commit: a $500 fully-refundable card deposit, conditional on the buyer's own inspection or test drive ("If you do not like the vehicle you placed deposit, we will refund it"), plus "Ask us a Question" and "Book a Test Drive" stacked beside the price above the fold on desktop, a 6-month powertrain warranty, an itemised "car condition" list (auction grade 4, no accidents, safety inspected, landed and registered), and shipping anywhere in Canada. Its failings (dated design, phone CTAs far down, 11 s load) are all fixable.
2. **Driveway, car page and calculator** (https://www.driveway.com/shop/vehicle/88333648). Best pattern for desktop and phone presentation: price, finance line and one primary button above the fold; sticky strip with name, price and button on scroll; sticky bottom bar on phone with the monthly figure; 30 photos with a 360; itemised price breakdown with named fees and free shipping to your ZIP; 7-day money-back; linked CARFAX, window sticker, recall check. Loses points for no imperfection shown, a payment figure that changed between loads, and a 7.7 s LCP.
3. **B-Pro Auto** (https://b-pro.ca/jdm-cars-available/cf412339/2000-toyota-raum/). Cleanest modern design in the JDM set, "Cleared Customs Price" wording (landed cost, not the Japan price), a Place Deposit button next to an Import Process button, an inquire row with call, text, WhatsApp and email, saved-search ALERTS and share on the list, linkable filters, and honest process copy ("$1,000 retainer ... arrives in about 9 weeks"). Loses points for auction-grade photos only and no condition detail on the car page. (Honourable mention: Duncan's sight-unseen page for tone.)

## ONE WORST

**Canada Drives** (https://www.canadadrives.ca/inventory): for our purposes, it has no cars. The "inventory" page is a list of generic models that sends you to a financing application; nothing can be bought, held or inspected, and there is no car page. (Close runner-up for a *car page* worst: Duncan, which has 52 photos but no visible on-page enquiry or reserve action.)

## Patterns worth adopting

- A **refundable deposit with its condition spelled out**, as a button on the car page ("Pay Deposit (Fully-refundable)", $500 at Velocity; "Place Deposit" with a $1,000 retainer at B-Pro). Say what it is subject to (the buyer's inspection or test drive).
- **Primary action plus price above the fold, a sticky strip on scroll, and a sticky bottom bar on phone** with the one number that matters (Driveway).
- **Landed or total price wording**: "Cleared Customs Price" (B-Pro); itemised breakdown with doc fee, extra fees, shipping and taxes "Calculate" (Driveway). Put the doc fee where the price is (Velocity hides $495 in the description).
- **Contact choice** on the car page: call, text, WhatsApp, email icons in one row (B-Pro), a "Book a Test Drive" and "Ask us a Question" pair (Velocity).
- **Linkable filters** (`?make=Nissan`, base64 `?filters=`), removable applied-filter chips with counts (Duncan), pre-counted quick chips, saved-search ALERTS (B-Pro).
- **Status as first-class lists**: Available / En Route / Sold, and a "Reserved" tag on the card (JDM Sport Classics). Sold stock as proof.
- **Plain buyer's-guide pages in the dealer's own voice**: sight-unseen risk, independent inspection, DMV check, shipping (Duncan); auction-sheet explainers (B-Pro).
- **Delivery stated per car**: "FREE Est. Shipping to [ZIP]" with the origin named (Driveway), "Shipping Anywhere in Canada" and a province-wide warranty network (Velocity), "all 50 states" (Import Guys).
- **Carfax 1-owner badge and a views counter** ("113 views in the past 30 days", Duncan) as light social proof.
- A **payment estimator that shows its inputs** (down payment, term chips, credit band, APR, amount financed) and an allowed range; disclaimers that say the figure is an estimate and that tax is extra.

## Things nobody here does well

- **Showing imperfections honestly on the car page.** None of the five sites I opened has flaw photos, hotspots, a condition grade or a dated inspection on the car page. Velocity's "auction grade 4, no accidents" line and Duncan's disclaimer pages are the closest. Clutch claims an inspection report (210 points) but I could not open one.
- **Video and 360 for enthusiast cars.** Only Driveway has a 360 (on a mainstream BMW). Duncan has a "Play Video" button on some cars. The JDM dealers rely on still photos, and several use auction yard photos.
- **A real hold/reserve state visible on the grid** (only JDM Sport Classics tags "Reserved", and Duncan/others do not show it).
- **Phone experience.** Velocity's actions are about 2,850 px down on phone; Duncan's cookie bar eats a third of the phone screen and the enquiry is a footer link; Import Guys' price is tiny grey type.
- **Payment figures that stay stable** (Driveway showed two values for one car) and that explain the default assumptions on the card instead of only in the small print.
- **Speed.** 3 to 7 MB car pages are the norm. Nobody pairs rich media with a fast first photo.
- **Proof in the listing**: auction sheet or inspection report attached to the specific car, translated, with plain-language reading of grades. B-Pro teaches this on a separate page; no one attaches it to the car.
- **Reviews on the car page.** Trust is a footer link everywhere I looked.
