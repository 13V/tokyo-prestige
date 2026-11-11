# Auction-style enthusiast platforms: how they present a single car

Researched 11 Nov 2026 with Playwright Chromium (desktop 1440x900, phone 390x844 iPhone UA, touch) and `curl`.
Screenshots (14, JPEG q60) are in `/home/user/tokyo-prestige/research/competitors/auctions/`. I looked at each one before describing it.
Anything marked "(inference)" is my reading, not something the page states.

## Access and method notes (honest limits)

| Platform | Result |
|---|---|
| Bring a Trailer (BaT) | Loaded fine. Deep dive on 2 live Japanese cars plus 8 more listings for comments. |
| Cars & Bids (C&B) | Loaded for 2 listings. One later desktop request hit a **Cloudflare "Performing security verification" wall** (screenshot discarded). It is intermittent. |
| Collecting Cars (CC) | Loaded. Its own `/search` URL 404s. Australian R34 and R32 GT-R listings found via web search. The two I opened are **sold managed sales**, so no live bid box, and I could not see a live auction's bid UI or comments. A "Don't miss out" email popup covers the lower-left on desktop and half of the phone screen on load. |
| PCARMARKET | Loaded. Only one Japanese car live (1985 Land Cruiser FJ45). Looked at that one in detail. |
| The Market (Bonhams, UK) | Loaded. Email-capture popup, Cookiebot banner and an App Store banner on first load. Looked at 1994 Supra (sold) and 1993 R32 GT-R. |
| Hagerty Marketplace | Loaded. 1991 Acura NSX (a Japanese-built car) is the only JDM-adjacent live car I opened. |
| Shannons (AU) | Did **not** deliver a usable lot page. `shannons.com.au/auctions` shows no lots in the HTML. A 2021 GT-R lot URL redirected to a "Shannons Past Auctions" index (a page of auction events with "Download Results"). I conclude (inference) that Shannons does not keep per-lot pages for old sales. Not assessed further. |
| Car & Classic | **Blocked**: Cloudflare "Just a moment..." (403) on `carandclassic.com/auctions`. Skipped. |
| Grays / Pickles | Not tried (brief said only if useful). |

**Speed numbers are noisy.** All traffic goes through a shared proxy, so load times are slow and variable (the same page varied 2x to 3x between desktop and phone runs). Treat the byte counts as more reliable than the times. Bytes are from the Performance API `transferSize`, which can undercount cross-origin resources.

## Quick comparison

| | Photos | Category labels on photos | Sticky action | Q&A | Load event (desktop / phone) | Transferred |
|---|---|---|---|---|---|---|
| BaT | 247 (R33 GT-R), 137 (FZJ80) | None. Order is conventional, not labelled | Yes, bar slides in on scroll (desktop and phone) | Public comments, seller replies | 14.4 s / 52.7 s (R33); 35.8 s / 21.3 s (FZJ80) | 9.9 MB / 8.8 MB (R33), 4.7 MB (FZJ80) |
| Cars & Bids | 122 and 101 | **Yes: Exterior / Interior / Mechanical / Other tabs** with counts | Not seen on a sold listing | Public comments | 1.6 s / 2.0 s | 1.7 MB |
| Collecting Cars | 120 (R34) | None seen | Sticky bar at bottom (desktop; shows Sold / Sell Yours on ended lots) | Comments (not visible on sold managed sale) | 17.6 s / 12.7 s | 3.5 MB / 2.8 MB |
| PCARMARKET | 74 | None | **Yes, dark bid bar: bottom of phone, below gallery on desktop** | Comments (0 on this car) | 21.4 s / 7.3 s | ~1.0 MB |
| The Market | 289 (Supra) | None | Not seen | None. Enquiry goes through "Contact Seller" | 6.9 s / 7.2 s | 1.3 MB / 1.5 MB |
| Hagerty | 143 (NSX) | None | Phone: top bar has price and Bid button | Public comments | 28.9 s / 12.4 s | 2.9 MB |

---

## 1. Bring a Trailer (the benchmark)

**Listings**
- A: https://bringatrailer.com/listing/1995-nissan-skyline-gt-r-38/ (R33 GT-R, dealer consignment, live)
- B: https://bringatrailer.com/listing/1994-toyota-land-cruiser-fzj80-162/ (RHD FZJ80, private party, no reserve, live)
- Others read for comments: R32 -40, R32 -35, R33 25GT -33, R34 -31, HDJ80 -102, Prado LJ78 -6, Nissan President -6.

**First screen.**
- Desktop (`bat-skyline-r33-desktop.jpg`): black site header and category strip, then a one-line "New to BaT? Learn how it works." strip. Then a big H1 (1995 Nissan Skyline GT-R), a small pill with a flag and "USA" (and a yellow "No Reserve" pill on the FZJ80). Then one line: Current Bid USD $11,733 | Ends in 5 days | 12 Comments, with **How it Works / Watch / Place Bid** right-aligned on that same line. Then one large hero photo, about 940 px wide.
- Phone (`bat-skyline-r33-phone.jpg`): header and search take about a third of the screen before the title. Then the title, flag, price | days | comments, a Watch star and a black Place Bid button, then the hero photo. Chips (Make, Model, Era, Origin, Category) scroll sideways below the photo. The first screen is about 55% chrome and 45% car (inference from the screenshot).

**Gallery.**
- Photo count: 247 items in the page's `data-gallery-items` for the R33 (FZJ80: 137). The page labels it "Photo Gallery +188" (so 59 to 60 show inline). The page's own attributes say `data-gallery-limit="60"` desktop and `"30"` mobile.
- Inline grid, 4 per row on desktop, all photos at one size (`bat-gallery-grid-desktop.jpg`). Tapping opens a full-screen viewer (I could not drive it from Playwright, so full-screen and swipe behaviour is **not verified**).
- **No category labels or jump links.** Thumbnails have no captions (each image's title is just the car name).
- I built a contact sheet of all 247 thumbnails and read the order. For the R33 it is:
  1. 1-~56 exterior: front 3/4, sides, rear, then repeated angles around the car in different spots (about 55 frames).
  2. ~57-90 detail close-ups: headlights, indicators, tail lights, badges (GT-R, Nissan), mirrors, door handles, exhaust tips.
  3. ~91-120 more exterior: wheels on, side profile repeats, rear wing.
  4. ~121-128 glass, roof and the four wheels (each wheel, face on).
  5. ~129-156 interior: door-open wide shot, dash, steering wheel and cluster, centre console, gear shifter, switches, carpets.
  6. ~157-163 door card, boot and boot floor.
  7. ~164-176 engine bay: wide, cam covers ("Twin Cam 24V Twin Turbo"), boost controller, bonnet underside.
  8. ~177-216 **underside: about 40 photos** (exhaust, floor pans, suspension arms, diffs).
  9. ~205-216 compliance and information plates, stickers.
  10. ~217-241 **documents photographed**: auction sheet / specification printouts, the CarVX report pages, Japanese paperwork, window stickers.
  11. 242-247 the spare trim pieces included in the sale, laid out on a mat.
  The order boundaries are my visual reading (marked approximate).
- **Video:** a separate "Video Gallery" block above the photos: "1995 Nissan Skyline GT-R cold start / drive" (the FZJ80 has "Cold Start"). There is also a "Road Tests" block (here a period Car and Driver clipping, "Nissan R33 Skyline GTR C&D December 1995").
- **Phone:** in the long description, photos are interleaved with the paragraphs (seen on the FZJ80 full-page screenshot: one paragraph, one photo, next paragraph, next photo). The full gallery grid is lower down.

**Summary/spec block ("BaT Essentials", `Listing Details` list).** Order, from the page text:
Seller (a handle, with a notify bell) -> Location (town, state, ZIP) -> Chassis (VIN) -> km shown (with miles converted) -> engine -> modifications -> transmission -> drivetrain -> paint colour -> upholstery -> wheels -> key features -> **Private Party or Dealer: Dealer** -> "Additional charges from this dealer: $0" -> Lot #, views, watchers, Share, "Contact Seller", shipping eligibility. Above the description there are also chips: Make, Model, Era, Origin (Japanese), Category (Right-Hand Drive), Location.

**Written description.** Prose in short, topic-per-paragraph blocks that always run in the same order: summary paragraph, exterior and equipment, wheels/tyres/brakes, interior, gauges and odometer, engine, transmission and drivetrain, title and history. The R33 also includes a decoded model code ("G - two-door coupe; GJ - 2.6 RB26DETT; P - ATTESA..." etc.), which is a neat Japanese-import trick. Flaws are written inline ("Prior damage on the left side is noted... left door has been repainted"; "Scratches are noted on the wheels"). No separate "flaws" box.

**Condition and history proof.** CarVX report (a Japan-import history report) pictured in the gallery and cited in the text; Pennsylvania title status ("Odometer Status of Not Actual Mileage") explained in text; seller says in a comment that he paint-metered the car; timing-belt label photographed in the engine bay; Japanese auction sheet pages photographed. Phone shows the report image inline, with its "Accident / Repair: Problem found" row visible (`bat-sticky-bar-phone.jpg`).

**Q&A/comments.** Public, chronological, threaded with bids in the same stream. The seller is badged "(The Seller)". 12 comments on the R33, 7 on the FZJ80. See the question list below.

**Action area.**
- Desktop: Place Bid / Watch at the top right of the headline row. After you scroll past the header, a slim **sticky bar** appears with title, flag, current bid, days left, comments, and Watch / Place Bid (`bat-gallery-grid-desktop.jpg`).
- Phone: same sticky bar, in two rows (`bat-sticky-bar-phone.jpg`: title, price | days | comments, star, Place Bid) pinned at the top.
- Lower on the page: a "Bid on This Listing" panel (current bid, time left, ends-on date, bids count, "Register to Bid", views and watchers) and "Contact Seller".

**Trust signals.** "BaT Essentials" with seller handle and a link to their other listings; the seller's likes score under each comment ("This author's likes: 738"); watchers and views counts; "Eligible for Bring a Trailer Shipping" with a ZIP quote box; "Verified Checkout" in the nav; dealer vs private flag with a "$0 additional charges" line; a "BaT History (1)" box.

**Browse/search.** Make pages (`/nissan/`, `/toyota/land-cruiser/`), search (`/search/?s=skyline+gt-r`), "Makes and Models", Categories, Locations, an ORIGIN list in the footer including **Japanese**, "Get Alerts" in the nav, and a Right-Hand Drive category. I did not open a filter UI on the live-auctions page.

**Speed.** R33 listing: load event 14.4 s desktop, 52.7 s phone (proxy-skewed), DOMContentLoaded 2.5 s / 6.3 s, 9.9 MB / 8.8 MB, about 250 requests, 144 images in the DOM. FZJ80: 35.8 s / 21.3 s, 4.7 MB. Heavy for a page, but it renders the title and bid early.

**Weak.** Page is very long. First phone screen is mostly chrome. No category jump for 247 photos. Spec facts sit far below the fold on phone (the Essentials box comes after the hero and chips). Comments mix bids with questions, so the real answers are buried (they are not curated). Heavy page.

---

## 2. Cars & Bids

**Listings** (both ended, so no live bid box; I still saw the full layout):
- A: https://carsandbids.com/auctions/9lbd05E2/1995-nissan-skyline-gt-r (R33 GT-R, sold $44,000, 34 bids, 67 comments, 15,010 views)
- B: https://carsandbids.com/auctions/rkq48ozk/1992-nissan-skyline-gt-r (R32, modified, sold $30,000, 50 bids, 44 comments)

**First screen.**
- Desktop (`cb-skyline-r33-desktop.jpg`): title (1995 Nissan Skyline GT-R) with a **subtitle that is the one-line pitch: "Midnight Purple, 5-Speed Manual, RB26DETT 6-Cylinder, U.S. Title"**. Right: Watch and Share. Then a mosaic: one large photo (about 900 px) and a 2x4 grid of 7 thumbs, with chips **"Exterior (54)"** and **"Interior (54)"** on the first thumb of each group and an **"All Photos (122)"** tile at the end. Below: a dark bar "Sold After for $44,000 | 10/9/26 | # Bids 34 | Comments 67". Then a green strip "This auction has ended, see more Nissan R33 Skyline auctions here."
- Phone (`cb-skyline-r33-phone.jpg`): a dark price bar at the top, the green "ended" strip, a swipeable photo row (next photo peeks in from the right), the title and subtitle, Watch and Share buttons, then the spec table starting immediately.

**Gallery.**
- 122 photos (R33), 101 (R32). Categories counted on the mosaic: R33 Exterior 54, Interior 54 (so 14 left in Mechanical/Other, inference); R32 Exterior 38, Interior 38 (25 left, inference).
- Full-screen viewer on phone (`cb-lightbox-tabs-phone.jpg`): black screen with **tabs: All Photos (122) / Exterior / Interior / Mechanical / Other**, a close X, and a counter "1 of 122". The tab list scrolls sideways. This is the only labelled photo navigation on any platform I tested. (Desktop lightbox did not open in my test because of the Cloudflare wall; not verified.) Swipe not driven.
- Video: a "Video" section after the description ("Start-up"). One commenter says there was "lack of... videos of the vehicle driving". Start-up and driving clips are asked for.
- There is a "Photo Guide" and "Book a Photo Shoot" link in the viewer, i.e. C&B tells sellers what to shoot (inference: that is why the categories are consistent).

**Spec block.** A two-column table, the same on every listing, in this order: Make, Model (with a bell to follow the model), Mileage, **VIN**, Engine, Drivetrain, Transmission, Body Style, Title Status ("Clean (NV)"), Exterior Color, Location, Interior Color, Seller (handle), **Seller Type (Private Party)**. Odometer is in miles; the text converts the km ("about 189,500 kilometers, which represents approximately 117,800 miles").

**Written description (a fixed template, the best of the lot).** In this order: **Highlights** (one-sentence "THIS... is a 1995 Nissan Skyline GT-R, finished in...", import/title status, equipment summary, mods summary, model history, powertrain) -> **Equipment** (bullets) -> **Modifications** (grouped bullets: Mechanical / Exterior / Interior) -> **Known Flaws** (bullets, e.g. "Some chips, scratches, and faded paint around the exterior", "Curb rash on wheels", "Stains on trunk carpet", "Body repairs near passenger-side rocker panel (pictured in the gallery)", "Some rust on passenger-side rear wheel arch and trunk lid", "torn driver's seat bolster") -> **Recent Service History** (dated bullets: "2026: ATTESA E-TS system refurbished", "2025: Front axles rebuilt") -> **Other Items Included in Sale** ("2 keys", "Service records and receipts") -> **Ownership History** ("purchased... October 2024 and has added about 32,000 kilometers since") -> **Seller Notes** (including a standard import warning: "it may not pass emissions testing in some states... buyer's responsibility to perform all due diligence regarding registering") -> Video.

**Condition proof.** Mostly seller-reported ("reportedly"). A Carfax is mentioned on other cars in "Similar Auctions" ("Clean Carfax history report" as a tag). No photographed auction sheet in the text. Compression tests are disclosed in the comments (R32: "#1 150, #2 150, #3 150, #4 120, #5 135, #6 75 psi") and C&B tells bidders it let the auction continue "with the compression results fully disclosed".

**Q&A.** "Comments & Bids" with tabs **Newest / Most Upvoted / Seller Comments / Bid History**. The page defaults to "Most Upvoted" and says "Comments are filtered to Most Upvoted - Remove this filter to add comments". "Bidder" badge on commenters who bid; "Staff" badge for Cars&Bids; seller badge. Replies are threaded ("Re: gotomech").

**Action area.** On live auctions (not seen live) the bid box sits in the right column (inference). On the ended listings, the price/status bar is directly under the gallery on desktop and at the very top on phone. No sticky element seen on the ended pages.

**Trust signals.** Seller Type shown in the spec table; Title Status; staff comments; "Closed Auction Stats" (reserve/no reserve, buyer, seller, bids, views); "Follow [seller] to get notified of their future auctions"; "Similar Auctions" row.

**Browse/search.** `https://carsandbids.com/search?q=skyline` returned 200 and listings. Pages: live-auctions, past-auctions, featured, trending. Footer and listing "See also" links: Manual cars for sale, Nissans for sale, **Nissan R33 Skylines for sale**, Coupes for sale. The model-level page ("see more Nissan R33 Skyline auctions here") appears at the top of an ended listing. I did not test filter UI.

**Speed.** The fastest by far: load event 1.6 s desktop / 2.0 s phone, 1.7 MB, 87 requests, 42 images. Fast even through the proxy.

**Weak.** Cloudflare challenge intermittently. Comments default-filtered to Most Upvoted, which hides chronology. No documents photographed. Seller-reported ("reportedly") facts dominate.

---

## 3. Collecting Cars (incl. Australian listings)

**Listings**
- A: https://collectingcars.com/for-sale/1999-nissan-skyline-r34-gt-r-4 (Preston, VIC; sold managed sale 26/05/2025; 20,316 views, 162 saves)
- B: https://collectingcars.com/for-sale/1993-nissan-skyline-r32-gt-r-12 (Campbelltown, NSW). Loaded, but I did not analyse its text beyond metrics.
- Live-auctions browse (including Australian cars with A$ prices and Sydney, Gold Coast, Northbridge locations): https://collectingcars.com/buy?refinementList[make][0]=Nissan

**First screen** (`cc-skyline-r34-sold-desktop.jpg`). Because the lot is sold, the top of the page is a **"THIS ONE'S SOLD - EXPLORE OTHER OPTIONS" rail** of live Skylines (with countdowns and prices), not the car. The car is below: a "SOLD" tag and a "MANAGED SALE" tag, a big uppercase title "1999 NISSAN SKYLINE (R34) GT-R" (this is the dealer-like pattern: the sold page keeps selling you the next car). A sticky white bar at the bottom shows "Sold" and a blue **SELL YOURS** button. A newsletter popup ("Don't miss out!") covers the lower left on desktop and the bottom half of the phone screen (`cb-...` not kept; phone seen in my screenshots). The phone first screen is Trustpilot strip, logo, search, tab pills, then the sold rail.

**Gallery** (full-page view). A 5-image mosaic on the left (one big, four small) with a "View all photos (120)" button on the last tile; the right column holds the spec block. No category labels seen. Order cannot be reported in detail: I did not open the viewer.

**Spec block (right column).** Tags (SOLD, MANAGED SALE) -> title -> price ("Login to view price" on this sold lot!) and date -> **"Receive alerts on similar listings"** and **"Make an offer"** buttons -> "158,934 Km - RHD - Manual" -> "Preston, VIC, Australia" with views (20,316) and saves (162) -> Save / Share -> "Own a similar Nissan? Sell now" -> SPECIFICATION grid: Make, Model, Mileage, Engine size, Exterior, Interior, Fuel type. **No VIN in the spec grid** (VIN is only mentioned as checked in the legal text).

**Description.** Headed sections: **Key facts** -> **Equipment and features** -> **Condition** -> **Service history** -> **Summary**. Example specifics:
- Key facts: rare colour ("one of just 345 Series 1 cars delivered in this colour"), "originally a Japan-delivered model... auction grade of 4B, where it passed compliance in August 2009", ownership ("two owners from new"; "kept the car for the past 15 years"), odometer, viewing location "Benzina Stables in Melbourne, by appointment".
- Equipment lists mods by brand and ends with what is included: "two keys, the compliance documentation, a 2009 Carfax import history report, dyno charts, invoices from Racepace, Nengun, and JustJap".
- Condition: "Please refer to the photo gallery"; paint believed original; stone chips and swirl marks noted.
- Service: dated, with the workshop named and the oil/filter used.
- Legal footer includes "This vehicle's VIN has been checked against the **Australian Personal Property Securities Register**... checked through the **Austroads NEVDIS** system". That is a direct Australian trust signal (finance and stolen/written-off checks).

**Q&A.** Disclaimer says "Enquiries should be raised in the comments section". No comments were visible on this sold managed sale. Not verified on a live lot.

**Action area.** On this sold page: sticky bottom bar. On live lots (not seen) bid box is in the right column (inference).

**Trust signals.** Trustpilot "Rated Excellent 4.3 / 5" strip across the top of every page; PPSR and NEVDIS check line; "Managed Service" tag; views and saves counts; a document list in the description; a physical viewing location.

**Browse/search** (`cc-pick` run). "LIVE AUCTIONS 241 lots", tabs Live Auctions / Coming Soon / Sold / Cars / Plates / Bikes / Automobilia / Watches; suggested chips with counts (**US & Canada Auctions 2, No Reserve 38, Managed Service 7, Boosted 47**); sort "Ending soonest"; a Filters button. Cards show photo, badges (NO RESERVE, RESERVE LOWERED, BOOSTED), uppercase title, current bid (A$ for local lots), a red countdown pill, a flag with town, state and bid count. Local currency shown to Australians.

**Speed.** 17.6 s / 12.7 s load event (proxy-skewed), 3.5 MB / 2.8 MB, 158 requests, but only 27 images in the DOM (lazy).

**Weak.** The popup covers the page on first load. Price hidden behind login on a sold lot. Sold page leads with other cars rather than the car. No VIN in the spec grid. Gallery depth is unlabelled.

---

## 4. PCARMARKET

**Listing:** https://www.pcarmarket.com/auction/1980-toyota-land-cruiser-fj45 (page title reads "1985 TOYOTA LAND CRUISER FJ45 PICKUP 4X4"; I note the URL says 1980; seller-side inconsistency, not mine). Dealer seller, live. Only Japanese car live; I did not open a second one in depth, but I read the platform's other listings in the "ending soon" rail.

**First screen.**
- Desktop (`pcar-fj45-desktop.jpg`): off-white page, big uppercase title, "Last activity 19 hr ago", **632 VIEWS** (live counter), SHARE, SAVE (16). Then a mosaic (one big 925 px photo and 5 thumbs, the last tile "SEE ALL PHOTOS (74)"). **Directly under the mosaic, a dark green bar holding everything a bidder needs**: Current bid $5,000 | Ends in 5D 13H 54M | Location Miami, FL | Comments 0 | Bids 1 | PLACE BID. All of this is above the fold at 900 px.
- Phone (`pcar-fj45-phone.jpg`): a full-bleed hero photo with a "1 / 74" counter badge, then title, share, save (16), "Last activity", views, a Location | Comments | Bids row, then **CAR DETAILS** table. The **bid bar is pinned to the bottom** of the screen (current bid, ends in, a full-width PLACE BID).

**Gallery.** 74 photos, no categories. The 5 thumbs on desktop are nearly identical front 3/4 angles (weak first impression). Phone: counter "1 / 74" (swipe inferred, not driven).

**Spec block.** "CAR DETAILS" table: Year, Make, Model, Trim, **VIN**, Mileage Shown ("770 mi (TMU)"), Transmission, Title (Clean), Exterior Color, Interior. Then "AUCTION DETAILS": Auction Type (Reserve), **Seller Type (Dealer)**, **Dealer Fee ($0.00)**, Location, Zip, Country, Ending.

**Description.** Four to six paragraphs of editorial prose written by the platform (history of the FJ45, exterior, interior, engine and gearbox, title and inclusions), then a quoted "The seller would like you to know:" paragraph in the seller's voice.

**Proof.** The text mentions "restoration photographs" are included; no document photos checked in the gallery.

**Q&A.** "COMMENTS (0) Join the conversation on this listing" with LOGIN / REGISTER. Bids are listed in a separate history ("BID HISTORY"). Zero engagement on this car, so no questions to collect.

**Trust.** Views and saves counters; "Last activity" timestamp; seller type and fee shown; "Verified Listing Agreement" link in the footer; an "ENDING SOON. Cars going fast" rail.

**Browse.** `/auctions/vehicles`, `/auctions/vehicles/toyota` (this showed a single Toyota), Auctions / Marketplace / Results tabs.

**Speed.** 21.4 s / 7.3 s load event, **only ~1.0 MB**, 87 requests (the lowest weight of any platform).

**Weak.** Near-duplicate thumbs, no photo categories, thin Q&A, no sticky bar on desktop (the bar sits under the gallery, but is not pinned).

---

## 5. The Market (Bonhams; UK)

**Listings**
- A: https://www.themarket.co.uk/listings/toyota/supra-mk-iv-2jz-gte/11b872ab-477f-4843-a6a6-3ebd05f7294e (1994 Supra, RHD UK car, sold GBP 33,250 on 16 Feb 2022 after 20 bids)
- B: https://themarket.co.uk/listings/nissan/skyline-r32-gt-r/c41a4d6c-5ea5-4a0a-9295-7713b76bc358 (1993 R32 GT-R). Loaded; metrics only.
- (Also the Tommy Kaira M20B, `https://www.themarket.co.uk/listings/subaru/tommy-kaira-m20b/856ee5f5-6416-4968-a4b5-1a56e85ae9fb`, seen live with a popup covering it.)

**First screen** (`themarket-supra-desktop.jpg`, `themarket-supra-phone.jpg`). Dark charcoal theme. The gallery is the **first thing**, edge to edge: one big photo and five thumbs with "View full gallery (289)" on the last. Then the title, then a status row: bids, "Winner - 1st choice", "SOLD FOR". On a live car this row holds the countdown and bid box (the live Tommy Kaira phone screenshot showed "Auction starts in 4 hours" with **Follow** and **"Insurance Quote by Footman James"** buttons). Phone: app-store banner, phone number and email strip, then a swipe carousel with **7 dots**, then the title, then the status block. Friction: a "Get the inside track" popup appears on the live car; on the sold Supra, a corner ribbon "Get The Inside Track" overlaps the VIN line on phone.

**Gallery.** 289 photos. No category labels. The seller's blurb says: "We always include plenty of photographs of a car's undersides for your delectation", so underside coverage is part of their shoot standard. Phone shows 7 dots (so a 7-image carousel, then a full gallery, inferred).

**Spec block.** After the gallery, a short list of un-labelled values in the text extraction: VIN (`JT164JA8000016115`), mileage 26000, engine 2997, Auto, colour Grey/Silver Metallic, interior Cream Leather, Right-Hand Drive, "Vehicle location: Bonhams|Cars Online HQ, United Kingdom". (Labels exist on screen; text extraction dropped them.)

**Description (the richest editorial, written by the platform).** Fixed headings: **Background** (the model's history) -> **Overview** (this car's story) -> **Exterior** -> **Interior** -> **Mechanical** -> **History** -> **Summary** with an **estimate** ("we confidently predict it will sell for between GBP 50,000 and GBP 65,000"). Condition is candid and specific: "a small number of stone chips on the bonnet, but nothing else that is worthy of note"; "the bumpers are a slightly different shade of silver... if you do spot a [difference]..."; "a little creasing and wear to the driver's seat"; "After a battery swap... the garage inputted the wrong security code, the unit needs to be reset at a Toyota dealer" (a JDM-import-style gotcha disclosed up front); "Aside from a little road dirt... lightest of surface corrosion" underneath. History evidence: MoT certificates, "DVLA's online history... never had a single advisory", service book with main-dealer stamps, invoices.

**Action area / enquiry.** "Contact Seller" (button at the top of the listing), **Viewing welcome** panel ("Viewing is strongly encouraged, and is strictly by appointment") with phone/email in the header on every page. **No public comments**; questions go privately to The Market. Seller is named: "Private: Tim Ramm".

**Trust.** The platform voice ("Here at The Market we like originality"); a phone number and email in the header; "UK's first online classic & collectible car auction platform, with the highest sale rate" strip; Bonhams location named; insurance link.

**Speed.** 6.9 s / 7.2 s load, 1.3 MB / 1.5 MB, 211 requests, 39 images.

**Weak.** Popups and banners (email, cookie, app store). No public Q&A, so no social proof and no visible answers to other buyers' questions. 289 photos with no categories.

---

## 6. Hagerty Marketplace

**Listing:** https://www.hagerty.com/marketplace/auction/1991-Acura-NSX/f9ec8478-b188-4877-9318-b39891ea60ac (JDM-built NSX, live; 143 photos; 23 bids; 13 comments; 34,420 views). Second listing not analysed in depth.

**First screen.**
- Desktop (`hagerty-nsx-desktop.jpg`): H1 "1991 Acura NSX 5-Speed"; one status line: red **Time left 13:11:23** | High bid $42,500 | Bids 23 | Comments 13 and **Watch / Share / Place bid** (blue) on the same line; a thin **red progress line** over the mosaic; a mosaic of 1 large and 5 thumbs with "All photos (143)".
- Phone (`hagerty-nsx-phone.jpg`): the status row holds only **time left, Bid price, a Watch star and a blue Bid button** (a compact action row above the photos). Then a **mosaic on phone too** (large photo and a 3x2 thumb grid with "All photos (143)") instead of a carousel, so the user does not have to swipe.

**Spec block** ("Ending Wed, Nov 11 at 7:00 PM UTC" headline, then a table): Seller (handle and a **Message** button), Chassis/VIN, Mileage indicated (81,850 Miles), Location (Bremerton, Washington), Engine (3.0L C30A V6), Drivetrain, Transmission, Body style, Exterior colour, Interior colour, then a **View CARFAX report** link, "Insure this 1991 Acura NSX 5-Speed - estimated rate $525/year. Apply now" and "Certified Checkout".

**Description.** Template: intro paragraphs -> **Highlights** (bullets) -> **Factory Equipment** -> **Modifications** -> **Servicing & Documentation** (dated, with miles at each service: "May 2023 (81,249 miles): Engine oil and filter changed, spark plugs replaced..."; "2016 ... Timing belt and water pump service ... (see gallery)") -> **Known Imperfections** ("A dent on the trunk lid", "Creasing and wear on the seat upholstery") -> **Ownership History** (bought by the seller's husband in 2012; registration history across five states) -> **Included Items** ("2016 service invoice", "Service manuals"). A "Video gallery" block exists. A disclaimer says "The Marketplace team and the seller have reviewed all information for accuracy".

**Q&A.** "Comments & bids" with filters **All / Bids / Comments** and a "sounds on" toggle. Seller replies carry a "Seller" badge.

**Trust.** Clean CARFAX link; Hagerty-reviewed listing text; Certified Checkout; seller Message button; insurance quote.

**Speed.** 28.9 s / 12.4 s load, 2.9 MB, 247 requests (many third-party).

**Weak.** Heavy request count, two nav bars, a promo ("Never miss a car") box taking the first space beside the spec table.

---

## Real buyer questions on Japanese-import and JDM-adjacent cars

All quoted from the page. Each URL is the listing where it appears (the page may show the question in a thread).

1. "Do you have any details as far as the Collision damage? So a door was repaired or replaced? An inconsistencies on the title, can that be explained?" (https://bringatrailer.com/listing/1995-nissan-skyline-gt-r-38/)
2. "Will the car pass a California smog? Is it right hand drive?" (https://bringatrailer.com/listing/1994-toyota-land-cruiser-fzj80-162/)
3. "What is the refrigerant in the car? 1995 was around the transition from R-12 to R-134a. Also, what is the warning light in the cold start video, right side of the instrument cluster?" (same FZJ80 listing)
4. "Any restrictions for California buyers ? Can it be titled and registered for Cali use? Smog etc . Thx" (https://bringatrailer.com/listing/2000-nissan-skyline-gt-r-31/)
5. "Any odors inside? How does the clutch feel? Belt Changed?" (https://bringatrailer.com/listing/1995-toyota-land-cruiser-fzj80-102/)
6. "Has a compression test been performed? Has the timing belt been replaced?" (https://bringatrailer.com/listing/1998-nissan-skyline-33/)
7. "Picture #13. Is the hood not closed or is it misaligned?" (same R33 25GT listing; buyers cite photos by number)
8. "with regard to the compressions tests and the 125 psi readings, was that on a cold engine or was the car fully warmed?" (https://bringatrailer.com/listing/1989-nissan-skyline-gt-r-35/)
9. "Nicely built bottom end. Any headwork done?" (https://bringatrailer.com/listing/1992-nissan-skyline-gt-r-40/)
10. "What happened to the floormats? Will they be included?" and "Are all the electronics working for the vehicle? Heated seats retractable curtains, etc. are there any more damaged or missing trim pieces?" (https://bringatrailer.com/listing/1994-nissan-president-6/)
11. "Is this factory midnight purple or repaint? If repaint, do you know when?" (https://carsandbids.com/auctions/9lbd05E2/1995-nissan-skyline-gt-r)
12. "What does 'a lot of maintenance' mean. Please specify." (same C&B R33 listing)
13. "Do you know what that sound is on start up?" and "The lack of answers on the startup and videos of the vehicle driving I will be passing unfortunately... no records makes it a mystery." (same C&B R33 listing)
14. "Will the reserve be removed/or lowered to accomodate the low compression?" and "Any chance you were able to do the compression test over the weekend?" (https://carsandbids.com/auctions/rkq48ozk/1992-nissan-skyline-gt-r)
15. "Could you comment on the exhaust? It looks to be aftermarket" / "Can you give the date codes on the tires, please." / "Do you have the spare tire as well as the factory engine air filter box?" (https://www.hagerty.com/marketplace/auction/1991-Acura-NSX/f9ec8478-b188-4877-9318-b39891ea60ac)

Also seen (not a question, but an import cost fact buyers trade): "I believe it is 12.5%. 10% Tariff plus 2.5% base import duty." (C&B R32 listing, answering a question about duty).

**What these tell a dealer page to answer up front (inference from the 15 above):** compliance/registration status in the buyer's jurisdiction; accident/repair history and whether panels were repainted; original colour vs repaint; real odometer (km, auction-sheet verified); engine health evidence (compression/leak-down, timing belt date); cold-start and driving video; what "maintenance" actually was, with dates and invoices; modifications listed completely (exhaust, headwork); tyre date codes; included items (keys, spare, manuals, floor mats); electrics and A/C working; and import duty and costs.

---

## THREE BEST and ONE WORST

### Best 1: Cars & Bids
https://carsandbids.com/auctions/9lbd05E2/1995-nissan-skyline-gt-r
- **One-line subtitle under the H1**: "Midnight Purple, 5-Speed Manual, RB26DETT 6-Cylinder, U.S. Title". Reads like a dealer headline.
- **Labelled gallery**: mosaic shows "Exterior (54)", "Interior (54)", "All Photos (122)"; the full-screen viewer has tabs All / Exterior / Interior / Mechanical / Other and a "1 of 122" counter.
- Identical **spec table** every time (VIN, mileage, engine, drivetrain, transmission, title status, location, seller type).
- A rigid description template: **Highlights -> Equipment -> Modifications -> Known Flaws -> Recent Service History -> Other Items Included in Sale -> Ownership History -> Seller Notes**. The "Known Flaws" bullet list is the standout.
- Fastest page (1.6 s load event, 1.7 MB).
- Weak spots: Cloudflare wall; default "Most Upvoted" comment filter.

### Best 2: Bring a Trailer
https://bringatrailer.com/listing/1995-nissan-skyline-gt-r-38/
- Deepest proof: 247 photos in a sensible order (exterior, 40 underside shots, plates, then **photographed auction sheet and CarVX report pages**), a cold start / drive video, and a decoded model code.
- **Sticky title + bid + Watch + Place Bid bar** on desktop and phone once you scroll.
- Spec facts: chassis, km, engine, transmission, paint, dealer vs private with "$0 additional charges".
- Public Q&A with the seller answering and a seller badge: it turns doubts (title, collision) into on-page evidence.
- Weak: very long, heavy (9.9 MB), phone first screen is mostly chrome, no photo categories.

### Best 3: PCARMARKET
https://www.pcarmarket.com/auction/1980-toyota-land-cruiser-fj45
- The **action bar is built into the first screen**: on desktop, a dark bar under the gallery with price, countdown, location, comments, bids, and the button, all within 900 px; on phone, a **bar pinned to the bottom** with a full-width button.
- Clear Car Details and Auction Details tables with VIN, "Seller Type: Dealer" and "Dealer Fee $0.00".
- Lightest page (~1.0 MB).
- Weak: no photo categories, duplicate-looking thumbs, no Q&A activity on this car.
- (Hagerty and The Market were close runners-up: Hagerty for the phone action row and the mosaic, The Market for the editorial condition writing and "viewing welcome".)

### Worst: Shannons (Australia)
https://www.shannons.com.au/auctions.html and the lot link https://auctions.shannons.com.au/auctions/2021-shannons-spring-timed-online-auction/DEEC9B44N60L79E7/
- The auctions landing page gave no lots in the page text. The 2021 Skyline lot link I opened landed on **"Shannons Past Auctions"**, a list of whole events with "Download Results", not a car page (`sh-r32` run).
- It carries a chat widget over the content, 6.0 MB transferred and a 15.3 s / 17.4 s load for that index page (proxy-skewed).
- I could not assess its listing presentation at all; ranked worst because a buyer arriving on a dead lot gets no car, no result and no next car. Caveat: this is based on an old lot URL and one index page, not a live lot.
- If a stricter "worst among listings I assessed in depth" is wanted: **Collecting Cars' sold page**, which opens with a "this one's sold" rail and "Login to view price" and puts a popup over the page.

---

## Patterns a DEALER car page should adopt

1. **One-line subtitle under the title** (C&B): colour, gearbox, engine, title/compliance status.
2. **Fixed order for facts**: VIN/chassis, km (with auction-sheet grade if imported), engine, drivetrain, transmission, colour, interior, location, seller type. Same table on every car (C&B, Hagerty, PCAR).
3. **Labelled photo groups with counts** (C&B's Exterior (54) / Interior (54) / Mechanical / Other tabs): add Underside, Engine bay, Flaws and Documents. BaT's 40 underside photos and photographed auction sheet answer the questions people ask.
4. **A fixed description template with a real "Known flaws" list** (C&B, Hagerty "Known Imperfections"): Highlights, Equipment, Modifications, Known flaws, Service history with dates and km, Items included, Ownership history, Import/compliance notes.
5. **Photograph the paper**: auction sheet, CarVX/history report, compliance plate, service book, title/registration. Link the report (Hagerty "View CARFAX report").
6. **Cold-start and drive video, high up**, not at the bottom (BaT: separate block; C&B buyers complained about missing driving videos).
7. **Action bar on first screen and pinned on phone** (PCAR, BaT sticky bar, Hagerty phone row). For a dealer: Enquire / Book a viewing / Call, not Place Bid.
8. **Answer the import questions on the page** (see list above): compliance status, repaint, accident, compression/timing belt, duty and costs, what's included (keys, spare, manuals).
9. **Australian proof** (CC): PPSR and NEVDIS check stated; compliance date; viewing location and by-appointment.
10. **Viewing is welcome** panel with phone and email (The Market).
11. **A candid editor's voice** on condition (The Market): specific, small flaws named, what to watch for.
12. **Seller identity and similar cars**: show who sells, a "similar cars" row (C&B "Similar Auctions"). On a sold car, keep the car's page and price and then offer alternatives (the opposite of CC's login-for-price).
13. **Keep the page light** (C&B 1.7 MB, PCAR ~1.0 MB). BaT's 9.9 MB shows what happens when 247 photos load at once; lazy-load.

## Things nobody here does well

- **No platform lets you filter or jump photos by what you want to check** (underside, flaws, documents) except C&B's coarse four tabs. BaT's best-in-class underside and document photos are unlabelled in a 247-photo wall.
- **Phone first screens are crowded with chrome** (BaT, The Market popups/banners, CC popup). Nobody gives the car and the main action a clean first screen.
- **Condition is seller-reported** nearly everywhere ("reportedly"). Nobody offers an independent inspection summary or a measured paint-thickness table on the page (BaT's seller mentioned paint-metering only in a comment).
- **Import-specific facts are not structured**: grade, auction-sheet date, compliance date, duty and registration steps live in prose or comments. (CC's description mentions the "auction grade of 4B" and compliance date in text only.)
- **Q&A is a flat comment stream**: the useful answers are buried among bids and banter. Nobody pins "most asked questions and the seller's answers" at the top (C&B's default "Most Upvoted" filter is the nearest, and it hides answers).
- **No finance, trade-in, delivery or on-road cost calculator** on the page except BaT shipping quote and Hagerty insurance quote.
- **No walk-around/360 view** as a primary element on any of the six.
- **Australian local proof is thin**: only CC states PPSR/NEVDIS; no platform shows the registration/roadworthy state in the spec block.
