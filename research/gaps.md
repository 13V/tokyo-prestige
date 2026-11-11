# Gaps: what the design needs that Tokyo Prestige has not published

For Troy to ask the owner. Nothing below has been invented on the demo: each item is either left out,
shown as "not published, ask for it", or shown as a marked placeholder (a dashed vermilion box).

## A. Placeholders on the demo

| # | Where | What is needed |
|---|---|---|
| 1 | Car pages, "Who you are buying from" | **Reviews.** Three or more Google reviews, word for word, with name, date and link. None could be read: Google would not show the review panel to the research browser, and their site quotes none. |
| 2 | About (phase 3) | **The people.** Names, roles and photos. Their Our Team page is the theme's demo text. |
| 3 | Coming soon (phase 3) | **Expected arrival** for each car. None is published, so the demo shows none. |
| 4 | Car pages, grade on two cars | Grade "to be confirmed" on the Alphard (stock 9974441) and the two RV37 Skylines listed as "400R NISMO" (1463, 1474). |

## B. Shown as "not published, ask for it"

| # | What | Why it matters |
|---|---|---|
| 5 | **Auction sheet and grade** for each imported car | The first thing an import buyer asks for (`buyers.md`). The feed needs a field for the grade and a photo of the sheet. |
| 6 | **Deregistration or export certificate** per car | Their FAQ says one is provided for vehicles they source. Showing it on the page is the strongest odometer proof they have. |
| 7 | **Service history** where the listing does not mention it | 115 of 123 listings say nothing about it. |
| 8 | **More photos**: engine bay, underside, boot, dash and odometer, flaws | 117 of 123 cars have five photos. The gallery is built to label and order more. |
| 9 | **Walk-around video** per car | About says "comprehensive video inspections"; no listing has one. The demo offers it as a request. |
| 10 | **Drive-away price**, or the on-road costs for SA | Listings say "plus on-road costs" only. The demo offers a request for the figure. |

## C. Wording and rules to confirm before going live

| # | What | Note |
|---|---|---|
| 11 | **Licence wording** | The site shows "MVD 287394". The research agent read the SA Second-hand Vehicle Dealers Regulations 2025 as requiring "Licensed Second-hand Vehicle Dealer" or "LVD" and the number in advertisements. Confirm the form with Consumer and Business Services. The demo shows both the words and "MVD 287394". |
| 12 | **Price in advertisements** | Same source: an SA dealer's advertised price must include dealer charges and may exclude statutory charges; national rules on "drive away" need a complete price. Confirm how "plus on-road costs" should read. |
| 13 | **Odometer statements** | Same source: an advertisement that states the odometer reading may need a Section 16 notice on the car. Confirm. |
| 14 | **Finance estimator** | No rate is published, so the visitor sets one and no figure shows by default. Whether a dealer may show any repayment figure, and with what disclosures, depends on its credit arrangements (ASIC RG 234). Confirm with Credit One before launch. |
| 15 | **Statutory warranty per car** | The demo links to their FAQ's rules and does not say whether a given car is covered. Whether Japanese first registration counts toward the 15-year limit is not stated in what was read. |
| 16 | **Hold this car** | Offered as a request. No deposit or hold terms are published. |
| 17 | **Postcode** | Header says 5068, footer says 5067. The demo uses 5068. |
| 18 | **"Guaranteed odometer reading"** | About limits it to "vehicles directly imported by Tokyo Prestige". Which cars are those? A field in the feed would let the page say yes or no per car. |
| 19 | **Family questions for people movers** | Child-seat anchor points, seating certification, whether the screen and navigation are in English. Not published per car. |
| 20 | **Insurance** | Buyers ask who insures imports. Nothing is published; an FAQ answer naming insurers their customers use would help. |

## D. Listing data that contradicts itself (found while building `data/stock.json`)

The demo shows the safe reading and leaves the doubtful field empty. Each should be checked against the car.

| Stock | Car | Conflict |
|---|---|---|
| 512 | 2001 Skyline GT-R BNR34 | Description calls it a "GTR HR34" four times. |
| 1459 | 1996 UZZ31 | Title "Lexus SC ... SC400"; fields say Toyota Soarer. Shown as a Toyota Soarer. |
| 9974441 | 2018 Alphard | Title "AGH30W SC"; model field "Executive Lounge S"; VIN and engine are a hybrid AYH30; drivetrain listed FWD. |
| 1392, 1219 | Land Cruiser HDJ101K | Title 4-speed automatic; table 5-speed. |
| 1510 | 2007 Skyline Coupe CKV36 | Title 5-speed automatic; table 7-speed. |
| 1424, 1324 | Crown GRS214 Athlete G | Title "CVT 8sp"; table 8-speed automatic. |
| 1363 | 2007 IS 350 | Body listed as SUV. |
| 1440 | 1999 Legacy B4 RSK | Description is for a BH5 wagon. |
| 1433 | 2025 LBX Morizo RR | Engine and VIN lines belong to an RX 450h. |
| 1443, 1442 | 2022 and 2023 Voxy | The two listings show the same five photos. |
| 1463 | 2024 Skyline "400R NISMO" | Homepage says 49 km and "GRADE 5 A"; listing says 47 km and no grade. |
| 1482 | 2008 GT-R R35 | Model field "Skyline R35 GTR". |
| 1496 | 2014 LS 460 USF45 | Listed RWD; a USF45 is AWD. |
| 1486 | 2024 Crown Sedan AZSH32 | Listed 2.4 turbo hybrid AWD; an AZSH32 is a 2.5 hybrid, rear drive. |
| 1480 | 2023 AMG GT 43 | Engine listed 2.0 turbo; the VIN is a four-door GT 43 (3.0 six). |
| 1465 | 1998 Safari WGY61 | Engine "4.5i V6"; the 4.5 is an inline six. |
| 1406 | 1998 Pajero Evolution | Frame number "AP1-1004596"; a Pajero Evolution is a V55W. |
| 1469 | 2002 Legacy B4 | Frame "BES002187", 6-speed manual: grade not stated. |
| 1438 | 2001 MR-S | Listed 6-speed manual; worth checking against the build date. |
| 1462 | 1999 Land Cruiser 100 | No kilometres listed. |
