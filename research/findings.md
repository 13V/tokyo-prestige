# Findings: what the best car sites do, what nobody does, and what to build

Written 11 November 2026 from seven regional reports in `competitors/` (each by a research agent using a
real browser at 1440 and 390 wide, with its own screenshots), the client audit (`client.md`), the buyer
evidence (`buyers.md`) and the Mobbin references (`mobbin.md`). About 65 sites were opened; about 40 were
assessed in depth.

## What was and was not seen

| Report | Assessed in depth | Blocked or unreachable (not filled from memory) |
|---|---|---|
| `au-jdm.md` | Motorman, AutoProject, Fukasawa, J-Spec, Garage Apex, Edward Lee's, Fabcar, Iron Chef, Raw Performance | JDM Connection, Sugoi, Garage R and others not found |
| `au-prestige.md` | Lorbek, Classic Throttle Shop, Dutton Garage, Graziani, Motormall, MM Prestige Motors | Collecting Cars AU, Young Timers Garage |
| `japan.md` | BE FORWARD, SBT Japan, Goo-net Exchange, TCV, Car From Japan | JDM Expo, Garage Defend, Bingo Sports, Flex |
| `uk-eu.md` | Torque GT, Romans International, Collecting Cars, Tom Hartley Jnr, DK Engineering and six more | Harlow Jap Autos, Newera, Duke of London and others |
| `usa-canada.md` | Driveway, Velocity Cars, B-Pro, Duncan Imports, The Import Guys | **Carvana, CarMax, Tesla, Clutch, Japanese Classics** |
| `auctions.md` | Bring a Trailer, Cars & Bids, Collecting Cars, PCARMARKET, The Market, Hagerty | Car & Classic; Shannons gave no live lot |
| `brands-marketplaces.md` | Porsche AU, Polestar AU, Lucid, Rivian, Toyota Japan, Autotrader UK | **Carsales, Carsguide, Lexus AU, Toyota AU, Mercedes AU, Tesla, mobile.de, CarGurus** |

Two gaps matter: no Carvana-style online retailer could be opened, and neither could Carsales or
Carsguide, where Tokyo Prestige's buyers also shop. Load times in every report were measured through a
proxy and varied two to five times between runs, so page weight is the reliable speed figure.

## Patterns the best sites share

1. **Search on the first screen, with a live count.** AutoProject's hero is a make and model search over
   "151 vehicles"; Autotrader UK's button reads "Search 64 cars" and updates as you choose; MM Prestige
   Motors puts the search over its hero on both devices.
2. **Filters that never reload and can be shared.** Autotrader, Romans International, Motorman, BE
   FORWARD and Dutton keep the filter state in the address. BE FORWARD alone lets you filter by model
   code (`model_code=BNR34`).
3. **Price and the main action above the fold, and a bar pinned to the bottom of a phone.** Lorbek
   (Buy Online, Enquire Now), Autotrader (Call, Next steps), PCARMARKET, Bring a Trailer, AutoProject
   (Call, Enquire), Driveway.
4. **A fixed order of facts, the same on every car.** Cars & Bids: one line under the title ("Midnight
   Purple, 5-Speed Manual, RB26DETT 6-Cylinder, U.S. Title"), then the same spec table every time.
5. **Proof inside the gallery.** Bring a Trailer: 247 photos, about 40 of the underside, then the
   photographed auction sheet. Car From Japan: the auction sheet is photo 3. Fukasawa: auction sheet and
   underbody shot in the gallery. Goo-net Exchange: a third-party grading report in English with a body
   diagram.
6. **Flaws named.** Cars & Bids has a "Known Flaws" list on every listing; The Market writes condition
   area by area.
7. **More than one way to commit.** Lorbek (enquire, pre-approval, $1,000 deposit), Garage Apex (Place a
   Deposit, Book a Test Drive, Discuss Finance, Ask a Question), Velocity Cars (a $500 refundable deposit
   "subject to independent inspection"), B-Pro (call, text, WhatsApp, email).
8. **Incoming stock as its own list.** AutoProject's In Transit page with auction grades; Torque GT's
   For sale, Coming soon, Reserved and Sold on one page; JDM Sport Classics' En Route list.
9. **What the price includes, in plain words.** J-Spec itemises the landed price line by line;
   AutoProject shows an estimated drive-away figure; Autotrader stacks the cash price and a monthly figure.
10. **Premium is restraint.** Classic Throttle Shop (light, wide type; uniform photos; big figures beside
    a big price), Porsche (large light numerals with tiny units, a quiet sticky bar, parallax tied to
    scroll), Polestar (one name, three facts, two buttons), Romans (one backdrop for every car).
11. **Trust at the point of decision.** Lorbek shows its licence numbers, warranty and an interstate block
    on the car page. Collecting Cars names a person to contact.

## What nobody does well: the opening

Each line was reported independently by at least two of the seven agents.

1. **Nobody structures proof.** Import facts (grade, auction sheet, deregistration certificate,
   compliance) sit in prose or comments, if anywhere. No dealer site has a panel that says, for this car,
   what is on record and what is not. (au-jdm, au-prestige, japan, uk-eu, auctions)
2. **Nobody gives the car and the action a clean first screen on a phone.** Popups, cookie panels and
   tall headers cover it; enquiry sits two screens down or at the bottom. (all seven)
3. **Nobody makes photos navigable by what you want to check.** Even with 247 photos there are no jumps
   to underside, flaws or documents; only Cars & Bids has coarse tabs. (auctions, japan, au-jdm)
4. **Nobody states the price basis for the buyer's state**, and the two best Australian attempts are
   estimates. (au-jdm, au-prestige, uk-eu)
5. **Almost nobody has an adjustable finance estimate with honest wording.** (au-prestige, uk-eu, auctions)
6. **Interstate buyers are served with a paragraph, not a path.** No "send me a video of this car".
   (au-jdm, uk-eu, usa-canada, japan)
7. **Coming-soon stock is a list, not a hook.** No site lets you ask to be told when a particular car
   lands. B-Pro has saved-search alerts; nothing per car. (uk-eu, usa-canada, au-jdm)
8. **Pages are heavy.** 3 to 17 MB is normal for Australian importers; brand sites 6 to 33 MB; two UK
   dealers 32 to 35 MB. Fast pages (Cars & Bids 1.7 MB, MM Prestige 0.9 MB) are rare. (all seven)
9. **Motion with a purpose is absent from dealer sites.** It exists only on brand sites, and there it is
   heavy video. (au-prestige, brands-marketplaces)
10. **There is no modern stock dealer site in South Australia.** The only SA competitor found, Iron Chef,
    is a broker with four cars and a mailing-list popup over the page. (au-jdm)

Tokyo Prestige's own position against that: 123 real cars, real VINs, a workshop, a showroom five minutes
from the city, and a site that scores 34 to 39 for speed with filters that do not work (`client.md`).

## The constraint that shapes the design

Tokyo Prestige publishes five photos per car, no auction sheet and no grade. The best sites win on proof
we do not have yet. So the car page is built around an honest record: what is stated, where it is stated,
and a one-tap request for anything that is not. When the dealer adds an auction sheet or underbody photos
to the feed, the same panel shows them. Nothing is invented to fill it.

## Features for this site, ranked by likely effect on enquiries

The ranking is my judgement, from how often the need appears in the buyer evidence and how badly the
current site and competitors serve it. "Finding" points to where it comes from.

| # | Feature | Finding it traces to |
|---|---|---|
| 1 | **Sticky bar on every car page: Call, Message, Book a test drive.** One thumb, always in reach. | Client: enquiry buttons are four small ones under the title, no call button. Pattern 3. Gap 2. |
| 2 | **Stock search that works: instant filters, counts, shareable address, sort, forgiving text search by model code.** On the first screen of the homepage. | Client: every filter reads "No options"; the first price is 8,070px down the homepage on a phone. Patterns 1, 2. Enthusiasts search by code (`buyers.md` profile 1). |
| 3 | **"What is on record" on every car page**, with the source of each line and an "ask for it" link. | Buyers: "If the dealer can't show you the auction sheet, walk away." Gap 1. |
| 4 | **A short form that already knows the car**, with the purpose as one tap (question, test drive, hold, video, drive-away price) and trade-in, finance and interstate as optional taps. | Client: three separate pop-up forms, a reCAPTCHA, 4 to 6 fields. Pattern 7. |
| 5 | **Request a walk-around video of this car.** | Tokyo Prestige already promises "comprehensive video inspections" but no page offers one. Buyers profile 4. Gap 6. |
| 6 | **Spec plate with model code and grade first, VIN shown, no generated copy.** | Client: "GTR HR34" on a BNR34, a sedan listed as an SUV. Buyers: one wrong code and the dealer is written off. Pattern 4. |
| 7 | **Price with what it covers and a "get the drive-away price" request.** | Client: "Plus on-road costs" with no explanation. Gap 4. Pattern 9. |
| 8 | **Fast pages: target 90 or more on a phone.** | Client: 34 to 39. Gap 8. Most buyers arrive on a phone from social or search. |
| 9 | **Coming soon with "tell me when it lands", per car and per make and model.** | Client: 53 cars with no price, no date and no way to follow them. Gap 7. Pattern 8. |
| 10 | **Hold this car.** | Buyers: "had the patience to hold TWO vans for a few weeks". Pattern 7. Worded as a request, since no deposit terms are published. |
| 11 | **Repayment estimator where the visitor sets the rate.** | Gap 5. No rate is published, so none is shown by default. |
| 12 | **Interstate path on the car page**: video, delivery, registering at home, in the dealer's own FAQ words. | Buyers profile 4. Client: the answers exist, buried in an accordion. |
| 13 | **Trust on every page**: licence, address, hours, the showroom, real reviews, the people. | Client: Our Team is template text; no review quoted. Pattern 11. Reviews and people are placeholders until supplied. |
| 14 | **Gallery that swipes with momentum, opens full screen and labels each angle.** | Gap 3, at the scale the photos allow. |
| 15 | **A plain "how importing works" page**: auction, grades, shipping, compliance, the yard. | Buyers profile 2: "I had a list of 12 questions". No dealer explains grades (uk-eu, japan). |
| 16 | **Similar cars that are similar** (same body, near in price). | Client: "similar" is the five newest listings. Pattern from Cars & Bids. |
| 17 | **Motion that shows care**: the hero reveal, cards that turn through angles, the spec plate assembling. | Gap 9. It earns the owner's attention in the pitch; it sells to buyers only if it never slows them, so it is last. |

## Decided: the Shop is left out

The Shop holds four clothing items and empty parts categories, last changed in March 2024, and it brings
a login, cart, checkout and account pages. It is not central to selling cars, and WooCommerce is part of
why the site is slow. It is left out of the demo. If the owner wants merchandise, a single page with an
enquiry link would do.
