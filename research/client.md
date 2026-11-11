# Tokyo Prestige: what their site says, and how it works for a buyer

Read on 11 November 2026 in a real browser (Playwright, Chromium) at 1440 and 390 wide. Every page was
opened: home, About, FAQ, Servicing, Cars Available, Cars Coming Soon, Finance, Shop, Contact, Our Team,
Subscribe, one of four "trusted name in ... imports" pages, and all 123 listing pages (HTML saved and
parsed; twelve of them screenshotted on desktop and phone). Screenshots are in `client-shots/`.

Only what the site states is recorded in part 1. Part 2 is the audit.

## 1. What they say

### Who they are

- "Tokyo Prestige – Adelaide's premier JDM car dealership!" Site tagline: "Japan used vehicle importers".
- "As a locally owned family business, we take pride in offering exceptional customer service,
  transparent advice, and vehicles hand-picked for quality, reliability, and value." (every listing)
- "With over a decade of experience in the JDM industry, our enthusiastic team has curated Australia's
  best selection of premium JDM cars – all hand-picked and ready for you to experience firsthand." (About)
- "Skip the lengthy import process and any guesswork; with Tokyo Prestige, you can see and experience the
  car you want right here, right now." (About)
- "We are just like you, we love everything JDM, we know JDM cars inside & out." (About)

### Details

| | |
|---|---|
| Address | 216-218 Kensington Rd, Marryatville SA 5068 ("We are now located at"). The footer on every page says 5067. |
| Phone | 08 8336 4674 |
| Email | sales@tokyoprestige.com.au |
| Licence | MVD 287394 (shown beside the phone number in the top bar) |
| Hours | Mon to Fri 9 to 5, Sat 9 to 3, Sun closed |
| Location line | "conveniently located only 5 minutes from Adelaide CBD" |
| Facebook | facebook.com/Tokyoprestige |
| Finance partner | Credit One (1300 CREDIT, 1300 273 348) |

### Sourcing

- Cars are "carefully selected", "hand-picked". They "source, import and sell vehicles" (Servicing).
- The site does not say where in Japan cars come from, name any auction house, or describe the buying
  process. There is no page on how importing works.
- Some stock is local: listings say "JUST TRADED", "AUSTRALIAN DELIVERED" (an Audi A1, a Lexus RC F).

### Compliance and registration

- Every listing: "Every vehicle in our range is: Fully serviced; Comprehensively detailed;
  Australian-compliant & ready for registration".
- FAQ, "Are these cars ready to be registered?": "Vehicles are only to be registered in South Australia
  upon purchase. Vehicles sold out of the state will require the purchaser to organise RWC and any local
  registration requirements."
- Nothing is said about how compliance is done (workshop, the Register of Approved Vehicles, what is changed).

### Grading and condition

- No auction grade or auction sheet is published on any of the 123 listing pages.
- One auction grade appears on the whole site: the homepage feature for a 2024 Skyline says
  "Incoming AS new 2024 Nissan Skyline 400R NISMO only 49kms ... GRADE 5 A". Its own listing page does not
  repeat the grade and gives 47 km.
- Some listings state history in a headline, for example "FULL HISTORY – 2 KEYS", "SERVICE HISTORY",
  "ONLY 38,523 ORIGINAL KMS", "ALL ORIGINAL INCLUDING FACTORY HEAD UNIT", "FULL SERVICE HISTORY".
- About, "Why choose us": "Clear title of ownership: Every car has a guaranteed clear title"; "Guaranteed
  odometer reading: For vehicles directly imported by Tokyo Prestige"; "Third-party inspections: Ensure
  your peace of mind"; "Full service: Workshop checked by our qualified mechanics"; "Comprehensive video
  inspections: Explore every detail of the vehicle remotely".
- FAQ, "How do I know the vehicle's odometer is correct?": "There are various ways to conduct odometer
  checks from Japan to local services in Australia. For vehicles sourced for the company an original
  deregistration certificate will be provided. We encourage purchasers to undertake their due diligence
  prior to any purchase."

### Warranty

- "Aftermarket warranty is available from 1 to 5 years for your motoring piece of mind." (FAQ)
- "Statutory warranty applies, from the date of purchase": $3,001 to $6,000, 3,000 km or two months;
  over $6,000, 5,000 km or three months. Not for a vehicle that travelled more than 200,000 km before
  sale, was registered more than fifteen years ago, sold for $3,000 or less, had defects reasonably
  apparent at sale, or has damage caused by the purchaser. (FAQ, in full)
- Listings: "Extensive warranty options tailored for your needs".

### Finance

- "Yes competitive financial services are available, please call one of our friendly staff." (FAQ)
- "Finance in-house: We offer convenient in-house financing options." (About)
- Finance page: Credit One "are our preferred finance partner and are able to offer low-rate finance
  solutions"; "access to over 35 leading financiers"; "instant online quotes and same-day approvals";
  a link to Credit One's dealer application form.
- No rate, term, comparison rate or repayment is published anywhere.

### Price

- Listing pages: the price, then "Plus on-road costs". Stock list cards: "plus on-roads".
- No drive-away price is published. 62 of the 70 cars in Cars Available show a price; the 8 marked
  Under Contract and all 53 in Coming Soon show none.

### Servicing

- "we also pride ourselves on having the ability to service, rebuild and upgrade your JDM or Prestige vehicle."
- Logbook servicing, preventative maintenance, fault finding (mechanical and electrical), sourcing and
  fitting parts for Japanese imports, tyres, an air-conditioning specialist next door.
- Performance: exhaust and BOV, turbo, intercooler, injection and intake, fuel and ECU; tuning "through
  many of our partners". Body kits, paintless dent removal, paint and panel arranged.
- "we have our own in house qualified mechanic" (FAQ). A booking form: name, phone, email, car details.

### Delivery

- "Australia-wide delivery" (listings). "nationwide delivery, comprehensive video inspections, and
  trusted third-party reviews" (About).
- FAQ: "Yes we have several competitive freight companies within Australia. Completely insured within
  the time of freight. Delivery to your door? Not a problem. To the depot? to save a few dollars for
  modifications no problem."

### Other

- Trade-ins welcome (a trade-in appraisal form on every listing).
- Shop: four items of clothing (men's and women's polo $49.95, T-shirt $44.95) and empty parts categories.
- Four pages titled "Tokyo Prestige: Australia's trusted name in [Toyota Crown / Nissan Aura / kei truck /
  Honda Fit] imports".

### Stock on the day (in `data/stock.json`)

- 123 listings: 70 in Cars Available (62 for sale, 8 under contract) and 53 in Cars Coming Soon
  (47 coming soon, 6 under contract).
- Makes: Toyota 51, Lexus 19, Nissan 16, Suzuki 15, Mercedes-Benz 6, Subaru 6, Jaguar 3, Audi 2, and one
  each of Aston Martin, BMW, Honda, Mitsubishi and Porsche.
- Priced cars run from $10,888 (2012 Audi A1) to $229,888 (2001 Skyline GT-R BNR34). Median about $30,400.
- Each listing gives year, make, model, body, km, transmission, drivetrain, engine, exterior and interior
  colour, stock number and VIN (coming-soon cars give the Japanese frame number, for example RV37-220531).
- Coming Soon listings have no description, no price and no expected arrival date.

## 2. Audit: buying from this site on a phone

### Taps to do the three things that matter (390 wide, from the homepage)

| Task | Taps | What happens |
|---|---|---|
| See any car with its price | 0 taps, about 9 screens of scrolling | The first price is in the "Recent vehicles" strip, 8,070px down a 10,800px page (measured). The search form starts at 1,230px. |
| Open the full stock list | 2 (menu, Cars Available) | The list is 27,500px long on a phone for 51 cars (about 540px per car), with a second page for the other 19. |
| Find a particular car, e.g. a Crown under $30,000 | Not possible on the stock page | Every filter on Cars Available opens to "No options" (see below). The only working filter is the homepage form: 2 taps per field, then a full page load. |
| Enquire about a car you are looking at | 2 (Request More Info, then the form) plus 4 fields, a contact-method choice and a reCAPTCHA | The form opens in a pop-up. Nothing on the page stays in reach as you scroll: the only buttons are four small ones under the title. |
| Call | 1, if you scroll to the top | The phone number is a text link 17px high in the top bar. There is no call button on a car page. |

### What a car page is missing (all 123 checked by script, twelve by eye)

- **Photos: five per car.** 117 of 123 listings have exactly five photos of the car; on 116 the last image in the gallery
  is a photo of the dealership instead. The five are always front three-quarter, front, rear three-quarter, rear and one
  interior shot. No engine bay, no underside, no boot, no dash close-up, no odometer, no flaws, no
  documents. Two different cars (2022 and 2023 Voxy, $48,888 and $49,888) show the same five photos.
- **No auction sheet, auction grade, deregistration certificate, service record or inspection report** on
  any page, although About promises "guaranteed odometer reading", "third-party inspections" and
  "comprehensive video inspections". No video on any listing.
- **The description works against trust.** Most are long generated text that an enthusiast will not
  believe: the BNR34 GT-R ($229,888) is called a "GTR HR34" four times; a Mark X has "more style than a
  cat in a top hat and more power than a kangaroo on a trampoline"; a Legacy B4 sedan carries the
  description of a BH5 wagon; an LBX Morizo RR lists an RX 450h's engine and VIN. The real facts
  (history, keys, options) are a line or two buried under it.
- **Spec errors.** An IS 350 sedan is listed as an SUV; an Alphard is an "AGH30W SC" in the title, an
  "Executive Lounge S" in the model field and a hybrid AYH30 by its VIN; titles and spec tables disagree
  on the gearbox for four cars. All are listed in `gaps.md`.
- **Broken characters.** Every listing shows "????" where emoji failed, and "services to all males and
  models".
- **Price context.** "Plus on-road costs" with no explanation of what they are or what they come to.
- **No finance estimate, no similar cars** (the strip under each car is just the five newest), no
  delivery information on the page, no way to ask for a video of this car.
- **Coming Soon pages** are a title, a spec table and Japanese yard photos. No arrival date, and no way
  to be told when the car lands.
- Body text is 14px on listing pages. 23 of the 41 links and buttons on a phone car page are under 44px high.

### Search and filters

- On Cars Available, all nine filter dropdowns (year, make, model, body, mileage, transmission,
  condition, location, price) contain only "No options" at both 1440 and 390 wide
  (`client-shots/filter-open-desktop.jpg`). The page says "123 Vehicles Matching" while showing 51.
- The URL form still works (`/inventory/?make=lexus` returns 14 cars), so the filter exists but the
  interface to it is broken.
- The homepage search works, with a page reload. It offers 68 models and 20 transmissions in the
  dropdowns because the data is not normalised ("4 Speed Auto", "4sp Automatic", "automatic", "CVT",
  "eCVT", "CONTINUOUS VARIABLE" ...; body styles include "DUMP TRUCK", "Estate", "Liftback" and
  "IGNIS Hybrid MZ"). No kilometre filter on the homepage form.
- The magnifier search is the blog search: "alphard" returns dated posts "by" a staff member, with the
  generated description as the excerpt, not a stock result.
- Sort: date, year, price. Not by kilometres.
- Under Contract cars sit in the main list with no price. Coming Soon is a separate page that cannot be
  filtered either.

### Speed (Lighthouse 12, phone profile, 11 Nov 2026, one run each)

| Page | Performance | Accessibility | Best practices | SEO | LCP | Blocking time | Weight |
|---|---|---|---|---|---|---|---|
| Home | 36 | 77 | 75 | 92 | 12.5 s | 2,110 ms | 2.2 MB, 116 requests |
| Cars Available | 39 | 76 | 75 | 92 | 4.0 s | 3,560 ms | 1.8 MB, 94 requests |
| Car page (BNR34) | 34 | 68 | 75 | 85 | 16.6 s | 5,340 ms | 2.1 MB, 106 requests |

Most of the weight is script: 1.2 to 1.5 MB of JavaScript per page (WordPress, WooCommerce, WPBakery,
Slider Revolution). Colour contrast fails on all three pages.

### Trust

- The licence number is in the top bar, which is good, and absent from the footer.
- **The Our Team page is the theme's demo content**: "William Dean, Chief Executive Officer", lorem ipsum,
  1-800 numbers and @automotivetemplate.com emails. It is in their sitemap. No real person is named or
  shown anywhere on the site.
- No customer review is quoted anywhere, and there is no link to Google reviews.
- The footer reads "© Copyright 2025" and postcode 5067; the header says 5068.
- The first screen of the homepage is a slider of the building. No car, no price and no search is
  visible without scrolling, on desktop or phone.
- Login, cart, checkout and account pages exist for a shop with four clothing items.

### What is good and worth keeping

- The licence number and address in view on every page.
- Real VINs, engine numbers and stock numbers on listings: enthusiasts value this.
- Honest status labels (Just Arrived, Just Traded, Under Contract).
- A plain FAQ answer on odometers and on interstate registration.
- The showroom itself photographs well, and the sunset photo of the building is a strong image.
