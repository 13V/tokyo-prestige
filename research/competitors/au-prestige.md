# Australian prestige and specialist used-car dealer sites: competitor review

Date of review: 2026-11-11. Tool: Playwright Chromium, desktop 1440x900 and phone 390x844 (isMobile, iPhone UA), through the sandbox proxy.
Screenshots (14, looked at before describing): `/home/user/tokyo-prestige/research/competitors/au-prestige/`.
Anything marked "(inference)" is my reading, not something the site states.

## Sites covered

| # | Site | Where | Result |
|---|------|-------|--------|
| 1 | https://www.lorbek.com.au (Lorbek Luxury Cars) | Port Melbourne + Sydney | Deep review |
| 2 | https://classicthrottleshop.com (Classic Throttle Shop) | North Sydney | Deep review |
| 3 | https://duttongarage.com (Dutton Garage) | Richmond, Melbourne | Deep review |
| 4 | https://stock.scuderiagraziani.com (Scuderia Graziani) | Woolloomooloo, Sydney | Deep review |
| 5 | https://www.motormall.com.au (Motormall, incl. "Prestige and Performance" yard) | Wangara, Perth | Deep review (mass-market used dealer with a supercar yard; included for its filtering and finance patterns) |
| 6 | https://www.mmprestigemotors.com.au | Wingfield, Adelaide | Baseline (deep) |
| 7 | https://richmonds.com.au (Richmonds Classic and Prestige) | Adelaide | Reviewed (stock grid, car page, phone) |
| 8 | https://www.oldtimeraustralia.com (Oldtimer Australia) | Listings say Brisbane/QLD (from search results; I did not find an address on the pages I read) | Reviewed |
| 9 | https://www.barbagallo.com.au (Barbagallo) | Perth | Reviewed (franchised group, mostly new and demo; pre-owned secondary) |
| 10 | https://supercaradvocates.com | NSW | Home only: it is a YouTube-channel brand site ("Do you love supercars?"), not a stock-led dealer site; not scored |

Could not review: https://uniquemotorgarage.com.au returned only "Website Is Offline". https://www.collectingcars.com/for-sale returned a Cloudflare challenge (403), so I did not review it. https://www.youngtimersgarage.com.au returned 403 to the browser. Several guessed domains (oldtimer.com.au, chellingworth.com.au, lorbekluxurycars.com.au, classicthrottleshop.com.au) did not resolve through the proxy; I used the domains the search results gave. Chellingworth was not found by search, so Barbagallo stands in for WA. I did not find an Adelaide "Solitaire" site; Richmonds is the SA comparison.

## Speed (Playwright, measured today)

Method: `load` event from the Navigation Timing API, bytes summed from `content-length` (or body length) of every response during load plus 10 s of settling. The sandbox goes through a proxy and runs a cold cache, so absolute times are inflated and noisy (the same page varied by 2 to 5x between runs, e.g. Dutton home load 20.4 s then 4.1 s, Classic Throttle home 6.6 s then 21.9 s). Treat these as order-of-magnitude, and compare bytes more than times. Graziani's main-site home reported 273 MB, which is almost certainly its background video being counted in full (inference); the stock subdomain is the useful figure.

| Site | Home load event / KB | One car page load event / KB |
|------|---------------------|------------------------------|
| mmprestigemotors (baseline) | 7.6 s then 3.6 s / 6,724 KB desktop (phone 3.1 s / 5,080 KB) | 0.6 s / 883 KB |
| lorbek (/home, past the gate) | 7.0 s / 7,581 KB (gate page itself 8.1 s / 23,453 KB) | 6.1 s / 5,095 KB |
| classicthrottleshop | 6.6 s / 14,462 KB | 4.6 s / 4,998 KB |
| duttongarage | 4.1 to 20.4 s / 3,457 KB | 9.7 s / 3,255 KB |
| scuderiagraziani (main) | 29 s / ~273 MB (video, see above) | stock list 9.2 s / 6,101 KB; car page 10.4 s / 7,561 KB |
| motormall | 3.8 s / 14,179 KB | 3.3 s / 7,460 KB |
| richmonds | 12.5 to 13.6 s / 26 to 30 MB | 9.8 s / 10,654 KB |
| barbagallo | 22.8 s / 5,844 KB (phone 33 s) | 15.2 s / 4,790 KB |
| oldtimeraustralia | 8.0 s / 2,730 KB | 5.6 s / 3,045 KB |

Speed impression: MM's car page is by far the lightest (883 KB, 0.6 s) because it has only 3 photos and no third-party widgets (the home is heavy at 6.7 MB, probably the hero video). Richmonds is the heaviest by a long way (26 to 30 MB home, 10.7 MB car page: unoptimised photos). Barbagallo is slowest to load. Dutton ships 75 photos as webp on a CDN and a SpinCar 360 yet stays near 3.3 MB: the best weight-to-content ratio of the group.

## Per-site findings

### 1. Lorbek Luxury Cars (VIC and NSW), https://www.lorbek.com.au

- **First screen.** The root URL is a split-screen splash with two video halves (a Pininfarina 90th-anniversary clip on the left, a showroom drone clip on the right) and a button "CLICK TO ENTER SITE" in each half; nothing else (screenshot `lorbek` gate seen at 1440 and on phone). A chat bubble ("Welcome to LORBEK Luxury Cars Concierge Team") sits on top of it. Real home is `/home`. Phone first screen: the same gate, with the chat bubble covering the second button. This is a click wall between a searcher and the stock (see weak).
- **Search and filtering.** `/stock`: five dropdown filters (Location, Type, Make/Model, Year/KMs, More Filters) plus a free-text bar and "Clear All Filters". Make list shows counts per make (Alfa Romeo 1, Aston Martin 7, Ferrari 12...). 163 vehicles shown at the time. Sort has 11 options (Just Arrived newest/oldest, Specials, Price both ways, Year both ways, Km both ways, Make-Model A-Z/Z-A). "Saved Vehicles" heart shortlist at `/stock/saved`. Navigation links use a query string (`/stock?condition=Prestige%20Cars`, `Luxury%20SUVs`, `Wholesale`), so at least the Type filter is URL-addressable. I could not get a make tick to change the result count in my automated click, so I cannot confirm whether other filters update the URL or reload.
- **Stock card.** Large photo with next arrow, red "Just Arrived" tag, optional "Watch Video" tag, title, variant, price in red or bold with "Ex Govt Charges*", heart, then chips: category (Prestige Cars / Luxury SUVs), stock number, km, engine. Location line (Melbourne or Sydney). A smart touch: for not-yet-photographed cars the card shows a red-draped car image with "Safety and mechanical inspection being completed... Enquire and secure now before officially advertised" (inference: a pre-advert reservation hook).
- **Car page** (`/stock/details/<id>/<slug>`, McLaren 720S). Order on desktop: back link, view counter ("73 views"), Save, Share, Print; title and price card; photo carousel with thumbnails and a "Watch Video" button; to the right a three-button block: "Get Finance Pre-Approval. Apply Now", "Buy Online with a $1000 deposit", and "Enquire Now" with the form opened right there (first name, last name, mobile, email, message), all above the fold at 1440x900 beside the photo. Below: four key facts (km, engine, transmission, body), a "Get a Free Background Check" link, a vehicle-details table (price, category, km, body, engine, colour, compliance date, drive type, stock no, VIN), a gauge from AutoGrab (an iframe that compares price to the market), dealer comments with option list, warranty line ("valid for our LORBEK PREMIUM and SUPERCAR INTEGRITY WARRANTY PACKAGE"), documented service history in the copy, an "INTERSTATE VEHICLE SALES" block (VIC roadworthy or NSW pink slip supplied, interstate and local transport available by open carrier), Autopay same-day finance block, Google Map. Photo count: could not be counted reliably; no 360.
- **Price statement.** "$369,880 Ex Govt Charges*". Not drive-away. No on-page calculator; finance is a pre-approval link plus the Autopay block.
- **Phone.** A fixed bottom bar with two buttons, "Buy Online" and "Enquire Now" (seen in screenshot), visible without scrolling. Phone number is a strip under the logo ("1800 8 LORBEK"). Key facts shown as an icon grid under the photo.
- **Trust.** Footer carries "LMCT 6422 | MD088679". Pages: Testimonials, Meet the Team, Showroom Tour, Lorbek TV, Concierge, Services (Finance, Insurance, Warranty, Pay with Crypto). A Birdeye profile exists with 4.8 stars from 1,244 reviews (from a search result, not shown on the site's first screens). Footer says "(c) 2022" (stale).
- **Interstate.** Explicit block on each car page. Two locations. Consignment for Sydney only.
- **Look.** Black header, red sub-bar, white cards, red price, Roboto. Functional rather than premium. Heavy: chat widget, "Text us" button and a podium iframe overlay appear on every page.
- **Weak.** The splash gate; the chat bubble covers content; a stale 2022 footer; no drive-away price; a gate screen that is 23 MB.

### 2. Classic Throttle Shop (NSW), https://classicthrottleshop.com

- **First screen.** Full-bleed looping showroom video under a thin white header (logo in a slanted display face, nav: Cars for Sale, Cars Sold, Consign & Sell, Car Storage, About Us, Contact Us, search, saved cars, currency picker AUD). Headline "Australasia's largest classic car showroom" in a light wide grotesque, then a dark-green strip with three value points ("Rare and Exclusive", "Backed by 100 years of history", "Focus on European Excellence") and a "Cars for Sale" pill. Phone: the same video, headline at the bottom, hamburger; no stock, phone number or form on the first screen.
- **Search and filtering.** `/cars-for-sale` has only "Select Your Preferred Brand(s)" and "Sort By". There is also a site-wide search icon and a Saved (bookmark) feature. The results counter read "0 Results" while six cars were showing: a visible bug. Six cars in stock at review time.
- **Stock card.** Large, evenly lit studio photo, year tag chip, make/model with fuel type, price on the right, one-line variant. Very clean three-up grid.
- **Car page** (`/product-detail/Porsche/Cayman/252`). Photo gallery with five thumbnails and an expand icon; at right the model name in thin display type, year chip, variant, colour, then four big spec figures (55,292 kms; 3.4 aspirated; 7 sports automatic dual clutch; Automatic); price at large size "AUD $ 108,990" with a currency switcher; three outline buttons "Follow", "Call", "Enquire". Below the fold: shouty dealer text ("THE PORSCHE CAYMAN S!!... NATIONWIDE DELIVERY SPECIALISTS", "FAST FLEXIBLE FINANCE", "TOP TRADE-IN PRICES PAID"), a long equipment list under "Show more", and a services block (Insurance, Financing, Consign & Sell). Enquire opens a modal or scrolls to a form at the foot (the form sits near the bottom of a ~5,200 px page).
- **Price statement.** "$ 108,990" with no qualifier at all (no "ex govt charges", no "drive-away"). Currency switcher is unusual.
- **Phone.** Gallery shows two thumbnails per row; spec numbers sit under the title. Call/Enquire buttons are about two screens down (y about 1,030 of a ~6,600 px page) and not sticky (see screenshot `classicthrottle-car-phone`).
- **Trust.** Footer: "ACN: 615 833 040 | Dealer Licence No: MD070573". Story copy: heritage building under the Harbour Bridge, established by Rory and Karin Johnston in 2003, now part of Dutton Automotive. No reviews on the pages read. A Consign and Car Storage service is a differentiator.
- **Interstate.** "NATIONWIDE DELIVERY SPECIALISTS" in dealer copy only.
- **Look (the premium one among the group).** Light, airy, thin wide type with generous spacing; cars shot in a white studio; moving video of a real showroom; a single dark-green accent strip with angled corners. Motion: video hero; I did not observe scroll animation.
- **Weak.** "0 Results" bug; spec line is truncated with "..." ("981 S Coupe 2dr PDK 7sp 3..."); enquiry not visible on phone; no price qualifier; filters thin; the dealer copy in capitals clashes with the refined design.

### 3. Dutton Garage (VIC), https://duttongarage.com

- **First screen.** A full-viewport photo slider of cars on location at night and in laneways (a yellow Porsche on a cobbled lane in the shot), with the logo ("Est 1911") and five serif caps nav links (Cars for Sale, Classic, World of Dutton, About, Contact). Strong photography, no copy, no CTA, no search. Phone: logo and hamburger, a slider, then a paragraph "The home of rare, classic and exotic cars for sale" in a serif face over a darkened photo.
- **Search and filtering.** `/prestige-cars` (about 40 cars) and `/classic-cars`. One dropdown: "Filter by Manufacturer" (All, Audi, Bentley, BMW, Jaguar, Land Rover, Mercedes-Benz, Porsche). It filters on the client without reloading and writes a hash (`/prestige-cars#PORSCHE`), so it is shareable. No sort, no price or year filter. Sold cars are in separate lists (`/Sold~31`).
- **Stock card.** Studio photo with the same dark background, then a black caption bar with only the year, make and model. No price, no km on the card.
- **Car page** (`/2017-Porsche-718~327804`). Left: large image plus a thumbnail grid (filenames number up to 75 photos, all webp on a CDN) and a SpinCar/Impel 360 spin iframe. Right: title in the dealer-feed format ("2017 PORSCHE 718 982 BOXSTER S CONVERTIBLE 2DR PDK 7SP 2.5T [MY17]"), "Price $ 117,990.00 AUD", "Call us on +61 3 9419 8080", share icons, and the enquiry form (full name, phone, email, message, reCAPTCHA tick-box, "ENQUIRE NOW", a pre-ticked "Keep me in the loop") all inside the first 900 px on desktop. Specs are thin: VIN, odometer, body style, fuel type, stock no. Description is shouty capitals ("MINT CONDITION", "FULL PORSCHE SERVICE HISTORY FROM NEW!!", a bullet list of factory options, "LOG-BOOKS, 2 KEYS"), ending with "AUSTRALIA'S PREMIUM BUYER & RETAILER... SINCE 1911", "TOP TRADE-IN PRICES PAID", "PROMPT TAILORED FINANCE OPTIONS", "COMPREHENSIVE WARRANTY OPTIONS", "GLOBAL & NATIONAL DELIVERY SPECIALISTS", and "CAN'T MAKE IT IN? WE WILL SEND YOU A DETAILED 'HIGH DEFINITION' VIRTUAL TOUR OF THE CAR".
- **Price statement.** "$ 117,990.00 AUD": no qualifier, no drive-away wording, no calculator.
- **Phone.** Gallery is a single image in a white box, then title, price and phone number in plain text; the Enquire button is at about y 1,290 (not sticky; the only sticky element is the header).
- **Trust.** "LMCT 11675" in the footer; Est. 1911 on the logo; Our Team and Ownership sections on About; the Richmond cafe and showroom mentioned in copy. No review widget seen.
- **Interstate.** In copy only ("global & national delivery specialists").
- **Look.** The photography is premium (night-location sets, consistent studio backdrop). The UI around it is dated: default serif type, grey boxes, a reCAPTCHA tick-box on the form. Motion: photo slider only.
- **Weak.** No price on cards; one filter; default-serif styling; a captcha in the main enquiry form; a pre-ticked marketing checkbox; no sticky CTA on phone; all-caps feed copy.

### 4. Scuderia Graziani (NSW), https://www.scuderiagraziani.com and https://stock.scuderiagraziani.com

- **First screen.** Black header with red double rule (the livery colours of an Italian racing team), five nav items plus a phone number, then a full-bleed aerial video of the Woolloomooloo building. Stock is a subdomain, which breaks the visual flow. Phone: aerial video, then "Benvenuto a Scuderia Graziani, Sydney's Luxury & Exotic Car Dealership" in red and white on black.
- **Search and filtering.** Same CMS family as Lorbek (the same markup and sort list): Make/Model, Price, Year/KMs, More Filters, free-text, "Clear All Filters", 11 sort options, a saved heart. 41 vehicles at the time.
- **Stock card.** Large photo with arrow, "New Arrival" tag, a "Watch Video" tag, title, variant, price "Ex Gov't Charges*", chips for km, transmission, body and colour. Placeholder for not-yet-shot cars: a covered car with "NEW ARRIVAL, Images Coming Soon".
- **Car page** (Lamborghini Urus). Back link, Save, Share, Print; title and price header; photo carousel (36 distinct photos found) with thumbnails and "Watch Video"; right column Vehicle Details table (price, km, fuel consumption, body, engine, colour, build date, compliance date, drive type); below it "Enquire Now" form (first/last name, mobile, email, message). Further down: a Crypto Calculator iframe, Autopay finance ("same-day finance"), and a Google Map. Dealer text: "full books, up-to-date Lamborghini service history, spare key, Manufacturer's New Car Warranty through December 2026", "AUSTRALIA-WIDE DELIVERY", "NSW Roadworthy supplied". Form sits around y 730 to 1,190 on desktop (below the fold at 900 px).
- **Price statement.** "$408,880 Ex Gov't Charges*". No drive-away.
- **Phone.** Fixed bottom "Enquire Now" bar on the car page (seen in screenshot `graziani-car-phone`), key facts in an icon grid, "Watch Video" bar. Header on the car page showed no visible logo in my capture (inference: logo image failed to load or is white-on-white).
- **Trust.** "T/As Scuderia Graziani Cars & Lifestyle, MD097919". Clientele, Newsroom, Galleria, Watches and Venue Hire pages build a lifestyle brand. No review count seen.
- **Weak.** 273 MB home (video), stock on a different subdomain, form below the fold, a long crypto calculator that few buyers need, 20 `<video>` elements on one car page.

### 5. Motormall (WA), https://www.motormall.com.au

(Mass-market dealer; it carries a supercar yard called "Motormall Prestige and Performance".)

- **First screen.** Top strip: Google logo, five stars, "4.9 RATING OUT OF 2,210 REVIEWS", address, phone. Header with "Sell Your Car" (tagged "Instant Price") and "Finance" ("Apply Now") buttons. Hero is a looping video behind a search card: Body Type, Make, Model, Colour, Price dropdowns and a green "Show Me 778 Cars" button, plus a "GET FINANCE: Complete our 5 Minute Form" bar. An AI chat bubble ("Maya") pops up. Phone: the same stack of dropdowns and two green buttons, one-column.
- **Search and filtering.** `/search/new-used-and-demo-cars`: left filter column (Search, Location, Make, Model, Colour, Body, Odometer, Price...), live count "777 Cars found in Wangara, WA in 96ms", sort pills (Most Relevant, Latest, Highest Price, Lowest Price). Filters do not reload the page and rewrite a clean path (clicking Ferrari gave `/search/ferrari`), so results are shareable and indexable.
- **Stock card.** Photo with a diagonal green ribbon ("CAMMED", "HUGE MOD LIST"), location bar, title, variant, chips (Used, body, km, transmission, stock no), price with "Excl. Govt. Charges", then two full-width green buttons: "Get Finance" and "View Details" on every card.
- **Car page** (Lamborghini Aventador S). Large gallery (spin photos on a turntable), title, price "$789,990 Excl. Govt. Charges", a live "5,417 views" counter, Print, location line, then a masked phone number ("08 62** **** Click to reveal number, mention stock 6492 when you call"), and three green buttons: Enquire Now, Get Finance, Book a Test Drive, all above the fold on desktop. Further down: key information table (km, compliance year, build year, engine, fuel, transmission, seats, registration, rego expiry, stock no, VIN), dealer comments with "more...", car summary, and an enquiry form in a sticky panel. On scroll a sticky bar slides in with the car name and a Get Finance button.
- **Price statement.** "Excl. Govt. Charges". No on-page repayment calculator seen; finance is a 5-minute form.
- **Phone.** The phone number is a large "Tap to call now" card under the price; no fixed bottom bar (the only floating items are the chat bubble and chat button, which cover content in the screenshot).
- **Trust.** The strongest review presence of the group: 4.9 from 2,210 Google reviews in the top bar of every page. Warranty page, service centre, motorsport arm.
- **Weak for a prestige look.** Bright green, mass-market styling, a chat bubble that covers the price block on phone, a masked phone number that costs a tap, 14 MB home.

### 6. Baseline: MM Prestige Motors, https://www.mmprestigemotors.com.au (built by the studio)

Important caveat: the site labels itself a design preview ("Website preview · Sample listing details", "This listing is a design preview. Vehicle details and pricing are sample data"). Five sample cars (HSV x4, a Ferrari 360), and only 3 photos per car (photographed in the real Wingfield showroom).

What is good (seen in screenshots):
- **First screen.** Desktop: rounded dark hero holding a photo of the real showroom, a big condensed headline "HSV & HOLDEN SPECIALISTS", a four-field search bar (In stock, Any makes, Any models, All pricing, red Search), a map card ("Unit 4/405A Grand Junction Road, View on the map"), a pause button, then a scrolling marquee of model names. The nav has the phone number and a white "Sell your car" pill. Phone: the same hero, a four-field search in a 2x2 grid with a full-width red Search button, address and map link, header with phone icon and "Sell your car". This is the best first-screen combination of the set: search is on the first screen on both devices, which only Motormall and Lorbek's stock page do (and they do it less elegantly).
- **Stock page.** Hero search (keyword and sort), available/sold/all tabs with counts, a "Saved" heart, filter panel with Make chips, Body style radios, Transmission, Maximum price, a Reset and a "Show 5 cars" button. Cards show title, variant, badge (THE ICON, ENTHUSIAST PICK, JUST ARRIVED, PRESTIGE), price and "Excl. government charges", "On the clock" km, transmission, fuel, "View vehicle".
- **Car page.** Breadcrumb, Save and Share, large condensed title, subtitle, location and stock number, carousel with counter and fullscreen, on the right an "Asking price" card ($94,990, "Excludes government charges") with a live repayment estimate ("$416 / week. 5-year term, 9.9% p.a., $10,000 deposit... This is a calculator, not a finance offer") and a red "Apply for finance" button, then a spec list. Further down: a "Call us" block and "Send a message". Phone: a fixed bottom bar with the price, "Excl. government charges", a message icon and a red "Call Us" button (seen in screenshot). The only dealer in the set apart from Lorbek and Graziani with a sticky phone CTA, and the only one with a price echoed in it.
- **Type and motion.** Condensed uppercase display face (looks like Bebas/Anton style), Inter-style body, dark ground, a single red accent, rounded cards, a marquee, a hero with pause control, 01/05 slide counters. It feels more current than every dealer reviewed except Classic Throttle Shop.
- **Speed.** Car page 0.6 s and 883 KB.

What is weak:
- Only 3 photos per car; Lorbek and Graziani have dozens, Dutton has 75. Photo count and order are the first thing a buyer of a $90k to $150k car will check.
- No service history, condition report, inspection, VIN, "key and book" lines, warranty, roadworthy or dealer licence number anywhere (I found none in the page text). This is the trust gap against Lorbek (LMCT and MD numbers, warranty package, AutoGrab gauge), Graziani (MD number), Classic Throttle Shop (dealer licence), Dutton (LMCT).
- No 360 or video; no "Watch video" link.
- No interstate delivery or transport information.
- Enquiry is "Call Us" and a message link at the foot; no inline form beside the photo (Lorbek, Dutton and Motormall have one on the first screen). The price "Excludes government charges" is stated, but drive-away is not.
- Finance calculator is an estimate with fixed inputs (deposit, rate and term not adjustable in what I saw).
- On the first desktop capture I took, the home "About us" block showed a headline ("TAKE A LOOK AROUND") whose letters were clipped at the bottom by the line-height; I could not reproduce it on a second capture (inference: a timing or scroll-state issue); worth a check.
- Home is heavy (6.7 MB desktop).
- The photo carousel on the phone home shows an empty grey panel before the image loads.
- Reviews: a 5.0 Google score is on the home but not on the car page.

### 7. Richmonds Classic and Prestige (SA), https://richmonds.com.au

- **First screen.** Red top strip with phone number and Facebook/Instagram, black header with a round logo and nine nav items, then a full-bleed looping video of a car's wheel arch with a mute toggle. No headline, no CTA, no search on the first screen. Phone: a very tall header (logo and "Menu" fill the first 420 px) then the title; the chat bubble covers the carousel.
- **Search and filtering.** `/cars-for-sale`: only a single keyword box ("Search by make, model or keyword"). About 80+ cars (cars, motorcycles and classics mixed), "UNDER OFFER" tags on some. No filters, no sort, no price on cards.
- **Stock card.** A photo (all cars shot in the same brick-and-steel showroom, a good consistent look) and a title only.
- **Car page** (`/portfolio/<slug>/`). A heading, 24 numbered slides, a long narrative ("Presenting in Stratus Grey... Delivered new by Concord Jaguar Land Rover... evidence of the service history interstate... most recent attention by UK Auto Spares... on the 5th of August 2026 at 50,537kms"), a very long equipment list, then at the very bottom a small table (make, model, engine size, transmission, **Price: $109,900**) and a Contact Form 7 form (name, email, phone, message, Cloudflare Turnstile). The price and the form are the last things on a ~6,300 px page (form at y about 5,670).
- **Price statement.** "$109,900", no qualifier.
- **Phone.** The enquiry is at the bottom; only a floating "Text us" chat bubble is persistent.
- **Trust.** The best written provenance of the Adelaide set (first delivery dealer, service dates and kilometres), plus a Porsche Specialists page, Sold list, Vlog (video content), Car Storage. I did not find a licence number or a review score on the pages I read.
- **Weak.** Price at the foot of the page; no filters; 26 to 30 MB home; huge phone header; no CTA above the fold; chat widget that overlaps content.

### 8. Oldtimer Australia, https://www.oldtimeraustralia.com

- **First screen.** White WordPress (Divi-style) header with a red logo and nine nav items, a 4-slide hero of side-on cars (a blue Ferrari Daytona), then "Featured Cars" and a Facebook feed box. No search or CTA.
- **Stock.** Only six cars at review; no filters; cards are three-up, show title, tag ("New Arrival", "New Price"), **price in plain sight** and "More Information". The photos carry a large watermark across the lower third.
- **Car page.** The richest history copy of the group: a long dated ownership narrative (Heritage certificate, first owner, registrations, restorations), "View all photos" (3 gallery images found in the DOM), price "$399,950" twice. The enquiry link "Enquire about this car" is at about y 1,920 of a 7,260 px page. No licence number found, no 360 or video.
- **Weak.** Watermarked photos, tiny stock, generic WordPress theme, no filters, a disclaimer paragraph at the foot.
- **Strong.** The provenance storytelling and showing the price on the card.

### 9. Barbagallo (WA), https://www.barbagallo.com.au

- Franchised multi-brand group (Rolls-Royce, Lamborghini, Maserati, Aston Martin, Ferrari, Land Rover, Alfa Romeo and others). Home: white header with a large wordmark and a hamburger, then a full-bleed hero that, when I loaded it, showed "Video unavailable" from YouTube; the hero depends on an embedded YouTube video (a single point of failure, and the load event was 22 to 33 s). `/browse-vehicles/` is a hero (a Maserati studio shot), then a dual search (New/Demo and Pre-Owned) with Brand, Model, Min year, Max odometer, Min and Max price selects, then cards with an "Enquire" button each. Car page: Pre-Owned label, key features (km, fuel, gearbox, gears, drive), long description ("Only JLR Franchise in WA... Fixed price"), a "Make an Enquiry" button about 750 px down. A yellow floating call button on every page.
- Brand-led, new-car oriented; the used-stock experience is secondary. Not scored deeply.

## What makes the premium ones feel premium

(From the screenshots; type names are my inference from how they look.)
- **Classic Throttle Shop:** light-weight wide grotesque display type at large sizes, large margins, a restrained palette (white, ink, one dark green), uniformly lit white-studio photography with the same camera angle on every card, a slanted wordmark, and a moving showroom video hero. The car page puts four huge figures (km, litres, gears, transmission) beside a very large price: reads like a watch brand.
- **Dutton Garage:** the photography alone (cars shot on location at night, same studio backdrop for stock, 75 photos per car). Typography is a default serif so the premium feeling comes entirely from images.
- **Scuderia Graziani:** a livery (black and red double stripe), the Italian-language welcome, the lifestyle sections (watches, venue hire, galleria) and the heritage-showroom aerial video.
- **Lorbek:** premium through scale (163 cars, two sites, concierge, Lorbek TV) rather than design; the interface is functional.
- Motion across all of them is limited to video heroes and photo carousels; none use scroll-linked animation, page transitions or hover treatment worth copying. MM's marquee, pause control and counters are, in practice, ahead of the group on motion.

## Phone first-screen and CTA summary

| Site | First phone screen | Sticky phone CTA | Enquiry position on car page (phone) |
|------|--------------------|------------------|-------------------------------------|
| MM Prestige | hero, 4-field search, address | Yes: price + message + Call Us | call bar always; form near the foot |
| Lorbek | splash gate (click to enter) | Yes: Buy Online + Enquire Now | bar always visible |
| Graziani | aerial video, welcome | Yes: Enquire Now | bar always visible |
| Classic Throttle | video, headline | No | about 2 screens down |
| Dutton | slider, intro | No | about 1.5 screens down; reCAPTCHA form |
| Motormall | search dropdowns + Get Finance | No (chat bubble only) | phone card right under price |
| Richmonds | oversized header | No (Text us bubble) | at the very foot |
| Oldtimer | not captured on phone | No | about 1,900 px down |

## THREE BEST sites

1. **Lorbek Luxury Cars: https://www.lorbek.com.au** (best conversion mechanics, in spite of the splash gate)
   - Car page puts price, "Get Finance Pre-Approval", "Buy Online with a $1000 deposit" and a live enquiry form beside the photo on the first screen; on phone a fixed bottom bar with Buy Online and Enquire Now.
   - Shows trust on the car page itself: LMCT 6422 and MD088679, a named warranty package, an AutoGrab market-price gauge and "Get a Free Background Check", an interstate-sales block (roadworthy or pink slip, open-carrier transport), a view counter.
   - Strong browsing: counts per make, 11 sort options, saved vehicles, a "just arrived, enquire before advertised" placeholder card.
2. **Classic Throttle Shop: https://classicthrottleshop.com** (best look and feel)
   - Light, spacious type, uniform studio photography, a video hero of the real showroom, big spec figures and a large price; clean three-up grid with price on every card.
   - Licence number in the footer, a clear story (2003, heritage building) and consignment and storage services.
   - But: phone CTA below the fold, a "0 Results" bug, no filters beyond brand.
3. **Dutton Garage: https://duttongarage.com** (best content depth on a car page)
   - 75 photos plus a SpinCar 360 on one car; inline enquiry form in the first 900 px on desktop; shareable hash filter without reload; LMCT in the footer; offers a "high definition virtual tour" for interstate buyers; photography is the best in the set.
   - But: no prices on cards, one filter, default serif UI, captcha in the form.
   - Honourable mention: Scuderia Graziani for the same CMS plus Autopay and a sticky phone bar; and Richmonds' provenance writing.

## ONE WORST

**Richmonds: https://richmonds.com.au** (as a sales tool; the cars and the showroom photography are good)
- The price and the enquiry form are the last things on a ~6,300 px car page (price line at the foot, form at y about 5,670).
- No price on any card; no filters or sort (a single keyword box over 80+ cars); no CTA, headline or search on the first screen (a muted looping wheel video).
- 26 to 30 MB home and 10.7 MB car page, a phone header that fills the first 420 px, and a chat bubble that covers the gallery.
- (Oldtimer Australia and Barbagallo are close: watermarked photos and a six-car list with no filters; a hero that relied on a YouTube embed that showed "Video unavailable".)

## Patterns worth adopting

1. Search on the first screen on both devices (MM already does; Motormall does it with the most fields).
2. Enquiry form, price, finance and a call button above the fold beside the photo on desktop (Lorbek, Dutton, Motormall).
3. A fixed bottom bar on phone with the price and the main action (MM, Lorbek, Graziani). Add a call and a message option together and keep it clear of any chat widget.
4. Counts next to every make in the filter, a sort with newest first, a saved shortlist (Lorbek, Graziani, MM, Classic Throttle).
5. Shareable, no-reload filters with a clean path (Motormall's `/search/ferrari`, Dutton's hash).
6. A "just arrived" placeholder card for cars not yet photographed ("enquire before it's advertised") (Lorbek, Graziani).
7. Trust on the car page: dealer licence number, named warranty, a market-price gauge or background check link, documented service history, a roadworthy statement (Lorbek, Graziani).
8. An interstate block on every car page: roadworthy or pink slip, transport options (Lorbek, Graziani). A virtual HD tour for people who cannot visit (Dutton).
9. Big spec figures beside a big price (Classic Throttle Shop), a view counter (Lorbek, Motormall), a "Watch Video" button on the card and the page (Lorbek, Graziani).
10. Provenance writing with dates and kilometres (Richmonds, Oldtimer).
11. Visible review score on every page (Motormall's 4.9 from 2,210 Google reviews in the header strip).
12. Uniform studio lighting and one camera angle for the grid image (Classic Throttle Shop, Dutton).

## Things nobody here does well

- **A true drive-away or "everything included" price.** Lorbek, Graziani, MM and Motormall say "Ex Govt Charges" or "Excludes government charges"; Dutton, Classic Throttle and Richmonds state no qualifier at all. Nobody shows stamp duty, registration, or a total with a transfer fee, or a "price includes" list.
- **A condition and history proof panel.** Nobody gives a structured block (service history with dates, number of owners, PPSR or finance-owing check, roadworthy, inspection report, tyre and brake condition, paint-depth readings). It is in free-text dealer comments, in capitals.
- **An adjustable finance calculator.** Only MM shows an estimate ($/week with fixed terms) and the others send you to a form or to a third-party iframe (Autopay).
- **A phone-first car page.** Even the best (Lorbek, Graziani) show a long, desktop-style page with a bar; the gallery, key facts, price and CTA are not designed as one phone screen, and chat widgets cover content on Lorbek, Richmonds and Motormall.
- **Fast pages.** Richmonds, Graziani, Classic Throttle and Barbagallo are heavy; only MM's car page is light.
- **Visible people.** Faces and names of the sales staff on the car page (who will answer), their direct number or WhatsApp. Lorbek has a Meet the Team page and Dutton an Our Team section, but not on the listing.
- **A booking tool.** Nobody lets you pick a viewing time slot; "Book a Test Drive" is only a form (Motormall).
- **Purposeful motion.** No scroll-driven reveals, no smooth gallery transitions, no 3D or walk-around that works on a phone; the 360 on Dutton is a third-party iframe.
- **Consistent filters on prestige stock** (price, year, body, colour, with a URL you can send to a partner); the best prestige sites (Dutton, Classic Throttle) have a single filter.
