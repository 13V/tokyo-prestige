# How Japanese used cars are imported into, and sold in, Australia (explainer for the Tokyo Prestige demo site)

Researched 11 Nov 2026. Purpose: give the web designer terminology and legal facts that are right, so enthusiast buyers do not spot errors.

## 0. Read this first: access limits and confidence

- **The Department of Infrastructure site (infrastructure.gov.au) was unreachable.** WebFetch returned HTTP 503 and the real browser and curl returned 502 / INTERNAL_ERROR for every page and PDF on that host (tried the importing-vehicle, concessional RAV, SEV and "older vehicle" pages and the SEV and concessional guides). So **I have not read any federal page myself.** Federal statements below come from (a) search-engine summaries of the Department's pages (the search tool quoted the Department's text; I mark these "Dept via search summary"), (b) the Western Australian and South Australian government pages, which I did read, and (c) importer sites, which I read. Re-verify all federal items on the Department's own pages before launch. URLs are given so the designer can do that.
- **South Australian primary sources were read in full**: the Second-hand Vehicle Dealers Act 1995 (current, version 1.9.2025) and Second-hand Vehicle Dealers Regulations 2025 (version 1.9.2025) as PDFs from legislation.sa.gov.au, plus pages and factsheets from CBS, sa.gov.au and RevenueSA.
- ASIC RG 234 (published 9 June 2026) was read as a PDF.
- Where a quote comes from WebFetch it was returned by a summariser model, not a raw page. Quotes marked "(raw)" were copied from raw page text or PDF text that I read myself.
- Nothing here is legal advice. Tokyo Prestige should have the final ad copy and finance wording checked by a lawyer or CBS.

---

## 1. Legal pathways and what "compliance" physically involves

### 1.1 The framework in one paragraph
Since 1 July 2021 the **Road Vehicle Standards Act 2018 (RVSA)** governs imports. Every imported road vehicle needs an **import approval**, applied for in the Department's online system **ROVER**. A vehicle that is to be driven on public roads must also be entered on the **Register of Approved Vehicles (RAV)**, which replaced compliance plates. States and territories then register the car under their own rules.

Sources and key sentences:
- Import approval is mandatory (Dept via search summary): "Before you import a road vehicle into Australia, you must obtain an import approval." Importing without one is an offence under s22 RVSA. https://www.infrastructure.gov.au/infrastructure-transport-vehicles/vehicles/importing-road-vehicle-australia
- ROVER (Dept via search summary): "Applications for an approval to import a road vehicle must be made through ROVER".
- RAV (Dept via search summary): "To be added to the RAV, a vehicle must be approved under either a concessional RAV entry approval, or vehicle type approval."
- RAV replaces compliance plates. WA Department of Transport (read myself, raw): "From 1 July 2023, only imported vehicles listed on the RAV will be considered for licensing as the information on the RAV replaces the need to fit approved vehicles with compliance plates." https://transport.wa.gov.au/licensing/import-a-car-from-overseas.asp
- RAV is public. WA page (raw): "the Register of Approved Vehicles (RAV), an online, publicly searchable database of vehicles approved for the Australian market."
- Federal approval is not registration. WA page (raw): "A Commonwealth vehicle import approval alone doesn't guarantee that the vehicle can be licensed in WA as all vehicles must additionally meet applicable State requirements prior to licencing." The same point from an importer quoting the Department: "not a guarantee that the vehicle meets a state or territory's registration and insurance requirements" (https://www.jdmbuysell.com/learn/topics/importing-to-australia/, via summariser).
- SA registration (read via WebFetch of sa.gov.au): "A vehicle import approval must be obtained before importing a vehicle into Australia." and "If imported after that date [1 July 2021], the vehicle must be recorded on the Register of Approved Vehicles." https://www.sa.gov.au/topics/driving-and-transport/vehicles/buying-and-selling/importing-motor-vehicles

Terminology correction for the site: the old words "compliance plate", "Used Import Plate" and "VSB10" belong to the pre-RVSA scheme (Motor Vehicle Standards Act 1989). One importer page I read (https://www.dazmac.com.au/automotive/car-imports/specialist-and-enthusiast-scheme-sevs/) still says the final step is fitting a "Used Import Plate" and cites "VSB10". That is out of date. Do not copy it. Say "entered on the RAV".

### 1.2 The pathways that matter for a dealer of Japanese cars

**A. "Older vehicle" (25-year) concessional RAV entry approval**
- Rule: Rules s36 of the Road Vehicle Standards Rules 2019. Dept via search summary: the vehicle needs "a relevant build date at least 25 years before the date of the application". https://www.infrastructure.gov.au/infrastructure-transport-vehicles/vehicles/importing-vehicle/concessional-rav-entry-approvals and https://infrastructure.gov.au/department/media/news/how-import-your-older-vehicle-25-years-or-older
- It is a rolling date (build date at least 25 years before application), not a fixed cut-off. A 2016-era dealer article says the rule moved from a fixed 1989 date to a rolling 25 years; that is dated secondary material.
- Build date means when assembly was first completed, or when the last significant modification was finished (jdmbuysell summary of the Dept). If no month can be shown, the Dept assumes December: "Some very old cars don't include the month. In that case, the month is assumed to be December of the year it was built." (Dept via search summary.)
- **Significant modifications trap** (Dept via search summary): "If the vehicle you have your heart set on has been significantly modified in the past 25 years, it is no longer considered to be an 'older vehicle'." Dept guidance notes: wait until the modification is 25 years old, or check whether the SEV Register applies.
- Evidence of age: original sales document, VIN photo, or a deregistration certificate from certain countries. Japanese export certificate validity is six months (jdmbuysell summary).
- Fee: AUD 35 application fee, AUD 7.20 RAV entry charge for a passenger vehicle (jdmbuysell page, summariser; verify). Decision in 30 business days, clock pauses while information is requested; Department says up to 60 business days (same source).
- Approval must be granted **before** the car ships (jdmbuysell, ABF advice).
- After approval the car can take up to 48 hours to appear on the RAV (jdmbuysell).

**B. Specialist and Enthusiast Vehicle (SEV) Register + concessional RAV entry approval** (this is what most people still call "SEVS")
- Legal basis: Rules s129 for register entry (secondary source, https://www.dazmac.com.au is not reliable on RVSA detail; the s129 point came via search summary). Dept guides: https://www.infrastructure.gov.au/sites/default/files/documents/guide-to-specialist-and-enthusiast-vehicles-november2025.pdf (unreachable for me).
- Dept via search summary on conditions: "the vehicle must be covered by an entry on the SEVs Register, the applicant must be owner or intended owner, and the applicant must have access to an approved Model Report".
- The vehicle must not have been sold new in Australia under a type approval and must have been on sale overseas for at least 3 months (Dept via search summary; the Fukasawa importer page says the same).
- Six criteria, a model needs at least one (Dept via search summary and the importer pages https://fukasawaimports.com.au/sevs-explained/ and https://www.dazmac.com.au/automotive/car-imports/specialist-and-enthusiast-scheme-sevs/):
  1. **Performance**: power-to-weight above 110 kW per tonne if made before 1 Jan 2020, above 130 kW per tonne if made on or after that date. Most JDM performance cars use this one.
  2. **Environmental performance**: meets or exceeds current emissions standards.
  3. **Mobility**: built or modified for people with disability.
  4. **Left-hand drive**: built only as left-hand drive anywhere in the world.
  5. **Campervans and motorhomes**.
  6. **Rarity**: Dazmac states fewer than 3,000 of the make, 1,000 of the model, or 100 of a variant produced worldwide per year; Dept via search summary states the model test as "less than 1,000 vehicles of the vehicle model are produced per year, averaged over the number of years the model is or was available as a new vehicle". Treat the 3,000 / 100 figures as unverified.
- Entries are per model, with build-date windows and expiry dates. Fukasawa example table (read raw): Toyota Crown GRS204, SEV-000725, Performance, built 02/2008 to 07/2013, entry expires 27 Nov 2027; Nissan R34 GT-R BNR34, SEV-000768, built 01/1997 to 12/2002, expires 2 Feb 2028; R35 GT-R SEV-000646 covers only cars built Nov 2007 to Feb 2009. (An importer's snapshot, Oct 2026. Always check the live register.)
- Important caveat quoted by the Dept (via search summary): an entry on the SEV Register "does not guarantee the vehicle will be able to be modified to comply" and Dept (via jdmbuysell): "An entry on the SEVS Register is not an approval to import the vehicle."
- A model on the register also needs an **approved Model Report** and a **Registered Automotive Workshop (RAW)** approved to work to it (Fukasawa).
- Heavily modified cars can be ruled out even when the build date fits (Fukasawa).

**C. Personal effects (personal import)**
- For a person who owned and used the car overseas. Dept via search summary: "you own the vehicle when you apply, became its owner while living overseas, and owned it for at least 12 months before arriving in Australia intending to stay indefinitely", applied within 6 months of arrival, and no personal-effects approval in the last 5 years. It uses a concessional RAV entry approval applied for as "Single Road Vehicle Approval" in ROVER. https://www.infrastructure.gov.au/sites/default/files/documents/importing-a-vehicle-as-personal-effects-overview-april2024.pdf
- WA page (raw) confirms the 12-month rule: "If you've owned and used a vehicle overseas for at least 12 months, you can import it to WA as a 'Personal effect'", and "Visitors, temporary residents and companies can't import vehicles this way."
- This is not a way for a dealer to stock cars. (Inference.)

**D. Other approvals you may see mentioned** (Dept via search summary): reimportation (a vehicle previously exported from Australia) and non-RAV entry (temporary, 12 months or less, not for public roads, e.g. shows or racing). https://www.infrastructure.gov.au/infrastructure-transport-vehicles/vehicles/importing-vehicle/non-rav-entry-import-approvals

**Volume note (unresolved).** WA page (raw): "Concessional type approval - for 4 or fewer vehicles being imported within a 12 month period. Vehicle type approval - for vehicles imported in greater volumes." I could not confirm how this applies to a dealer or RAW doing repeated SEVS or 25-year imports. Ask the Department or the dealer's importer.

### 1.3 What "eligible" means for which cars (plain words)
- A car built **25 or more years ago** (build date, not first registration), original, not significantly modified in the last 25 years: older-vehicle pathway. A car built in the year 2001 becomes eligible during 2026 (inference from the rolling rule; month matters).
- A **newer** car: only if its exact model, variant and build date are on the SEV Register, a Model Report covers it, and it is unmodified.
- A model that was sold new in Australia (for example a Toyota Corolla or a mainstream Camry) generally cannot come through the SEV route (Fukasawa: "A model that has been sold new through Australian showrooms will generally not qualify, however interesting the Japanese version is.").
- Left-hand-drive cars in SA: "Left-hand drive, under 25 years: You can register it only if it is on the Register of Approved Vehicles and was imported as a Rarity or Personal Effects vehicle. Otherwise, it must be 25 or more years old or converted to right-hand drive." (SA page via WebFetch.) The search tool also showed a 30-year left-hand-drive threshold on another SA page; the two SA pages conflict. Not relevant to a JDM dealer but do not state either number on the site.

### 1.4 What compliance physically involves

**SEV route** (importer pages; Dept via search summary):
- A **Model Report** "documents how the car meets each relevant ADR, with test evidence, and contains Work Instructions setting out exactly what has to be changed" (Fukasawa, raw). Dept via search summary: modifications "must be undertaken in accordance with the Work Instructions in an approved Model Report, and must be checked by an approved authorised vehicle verifier (AVV)."
- A **Registered Automotive Workshop (RAW)** does the work. An **Authorised Vehicle Verifier (AVV)** inspects it. Dept via search summary: "The AVV will enter the vehicle on the RAV once they are satisfied the vehicle has been modified by a RAW approval holder in accordance with an approved Model Report."
- ADRs cover (Fukasawa, raw): "seatbelts and child restraint anchorages, lighting, brakes, speedometers and exhaust emissions".
- Commonly changed items per importers (these are generic lists, not tied to any one Model Report; the Model Report for the exact model is what counts): speedometer to km/h, headlight beam pattern, daytime running lights, seatbelt changes, emissions work, compliance labelling. West Coast Shipping lists estimates (AUD 200-500 speedometer, 300-800 headlights, 150-400 DRL, 200-600 seatbelts, total modification costs "AUD 1,500-5,000+") but these are the shipping company's own estimates for generic cases: https://www.wcshipping.com/blog/sevs-vs-25-year-rule-which-australia-import-pathway-fits . I could not verify "tyres" as a typical change from any source; do not claim it on the site.
- Child restraint: Japan-market cars often lack the anchorage points the ADRs require. WA's own list for personally imported cars (raw) says such a car "must be fitted with: seat belts that meet an Australian Standard or British Standard; seat belt anchorages that meet the number and location requirements of ADR 5 ...; child restraint anchorages that meet the number, location, accessibility, thread size and form requirements of ADR 34 ...; head restraints that meet the number, location, and size requirements of ADR 22". That is WA's partial-exemption list for personal imports, not the SEV list. https://transport.wa.gov.au/licensing/import-a-car-from-overseas.asp

**25-year route: what is required is contested between sources. State this carefully.**
- Federal: no Model Report; the Dept approval is about age. An importer summary of the Dept (via search): "There are no federal compliance requirements for 25 year old imports, so it is up to the State or Territory registration authority to determine what is required".
- Fukasawa (raw, Oct 2026): "A common misconception is that cars imported under the 25-year rule skip the ADRs. They do not. An older car generally has to meet the ADRs that applied at its build date ... The exact requirements are set by each state." It says Victoria, NSW and WA hold older cars to build-date ADRs.
- These are consistent if read as: Commonwealth sets none, states do. The honest site wording is "the state or territory sets what a 25-year import needs before registration".
- Victoria (search summary): current roadworthy certificate, VIN recorded on the RAV as "Concessional - Older Vehicles", and VIN stamped on the vehicle. I was blocked (403) from the VicRoads page, so this is unverified.
- Biosecurity and asbestos: every imported vehicle must be clean inside and out and, per ABF as relayed by jdmbuysell: "the asbestos import prohibition applies to all vehicles of any type, age or value." Testing before shipment is preferred. These are the importer's job, but expect to see them in dealer explainers.

**Taxes** (jdmbuysell summary, 2026 figures, verify): GST 10%; the 5% tariff on Japanese-built vehicles is removed under JAEPA with origin documents; luxury car tax threshold AUD 80,809 (AUD 91,661 fuel-efficient) from 1 July 2026. https://www.jdmbuysell.com/learn/topics/importing-to-australia/. Fukasawa: "Cars built in Japan are generally free of customs duty under the Japan-Australia free trade agreement".

**Sales terminology to avoid**
- "Grey import" and "parallel import" are common in the press and in insurers' pages (e.g. https://www.comparethemarket.com.au/car-insurance/import/), and the phrase is not an official term in the RVSA process. For an enthusiast audience, "JDM import" or "Japanese import" is safer. (Inference.)
- Do not say "compliance plate" for a 2021+ import. Say "entered on the Register of Approved Vehicles (RAV)".
- Do not say a car is "SEVS approved". The register lists a model; the import and the RAV entry are separate approvals per car. Say "eligible under the SEV Register" only where the live entry and Model Report cover the car, or "imported under the 25-year rule".

---

## 2. The Japanese auction system and the auction sheet

### 2.1 Auctions
- USS is named as one of Japan's major auction operators. Kobe Motor (https://www.kobemotor.com/blog/buying-guides/japanese-car-auction-sheets-explained-grades-codes-and-red-flags, dated 8 Oct 2026, read raw): "USS, one of Japan's major vehicle auction operators, states that its inspectors check areas including scratches, dents, engine condition, accident history and previous repairs using its own evaluation standards."
- Car From Japan (https://carfromjapan.com/article/used-car-auction-grade-basic-information/, read raw) says "There are currently over 115 auction house locations that test and provide auction grades". Other houses were not individually verified by me (I did not fetch USS, TAA, HAA, JU, CAA, Aucnet, etc.). CAA and JU appear in the Mirai Trading summary as examples of houses with their own legends (https://miraitrading.co.jp/how-to-read-japanese-auction-sheets/, via summariser).
- Auction houses differ. Kobe Motor (raw): "a Grade 4 at one auction should not automatically be treated as identical to Grade 4 at every other auction." Auction houses can use different "Grading thresholds, Special grades, Interior grades, Damage symbols, Inspection criteria, Definitions for R and RA".
- The sheet is a snapshot: Mirai Trading (via summariser): "A sheet is a time-specific inspection record for a particular auction lot, not a warranty or a complete service history." and "Grade letters are not a universal mechanical-health scale."

### 2.2 Overall grades (common reading; houses vary)
Japan Car Direct's explainer (read raw), from a USS sheet example: https://www.japancardirect.com/how-to-buy/how-do-i-read-the-auction-sheets-reports/
- "S / 6 – The car is less than 12 months old from the first registration date. As good as new."
- "5 – A very difficult grade to obtain, the unit will be in near perfect condition with very minor imperfections."
- "4.5 – A very high grade ... The car may have some very slight imperfections in the body work."
- "4 – The exterior may have some small scratches and dents. The car is in above average condition, and often has maintenance records."
- "3.5 – This is the most common auction grade and the range of condition is very wide."
- "3 – The exterior has many noticeable large scratches/scrapes, paint blemishes, and/or large dents."
- "2 – The vehicle has corrosion holes."
- "RA – A car that has had MINOR accident damage and has been repaired well."
- "R – The car has accident history and the damage may or may have not been repaired."
- "*** / 0 / 無効 / Blank Grade – Any of these marks indicates one or more of the following: 1. The vehicle has not been inspected by the auction house 2. The vehicle has been in a major accident 3. The vehicle is not running. 4. No Claim, buy as is."

**Conflicts between explainers (flag on site as "varies by auction house"):**
- RA: Japan Car Direct and Car From Japan say minor accident, well repaired; Kobe Motor (raw) says "Do not assume that RA always means 'minor accident.'" and "Some auction houses use RA for comparatively lighter repair history, while other auction companies may classify it differently."
- R: Car From Japan: "R stands for vehicles with repair history or major modification." Kobe: generally structural or accident-related repair history, "does not automatically tell you how serious the original damage was". JCD adds "This is a grade often associated with drift and rally cars."
- Grade 1: Kobe Motor says "Special condition, major modification or auction-specific issue"; Car From Japan lumps 1 and 2 as "Poor condition with significant damages, but the car is functional." Treat as house-specific.
- Grade 4.5: Car From Japan says "mileage of up to 100,000km"; I could not confirm that as a rule; do not state it.
- Grade 6: used by some houses; S/6 mean near-new. A secondary Japanese-language summary also lists "X" as a grade for very old or classic cars; unverified.

### 2.3 Interior and exterior letter grades
- Car From Japan (raw): "Some auctions use Letters –A, B, C, D, or E to describe the exterior and/or interior condition of the car, in addition to the overall grade, where A>B>C>D>E." Interior: "A – New vehicle's condition. B – The car is in good condition, and the interior looks nice and tidy. C – Small food stains or cigarette holes could be found inside the car. D – Inner vehicle consists of cigarette marks, stains, tears, or smells. E – The Interior of the car is in bad condition." Exterior (same source, single importer): "B – Some small scratches up to 15cm", "C – Scratches up to 30 cm or dents".
- JCD (raw): "These grades are often written below the auction grade on the sheets. The grades are given 5 through 1, and A through E, with 5 and A being the best condition." So the **exterior is often a number (5 to 1)** and the interior a letter (A to E), depending on the house. Not every house prints an exterior grade. Mirai (summariser): "Where an A–E scale is used, higher letters generally signal more wear or required work." which is the same direction (A best).
- Both importers say A-E exists; neither says which houses use it. Say "interior grade A (best) to E".

### 2.4 Defect marks on the car diagram
Car From Japan list (raw; one importer's translation):
A1 small scratch, A2 scratch, A3 big scratch; B dent with scratch; E1/E2/E3 few / several / many dimples; U1 small dent, U2 dent, U3 big dent; W1 hardly detectable repair mark or wave, W2 repair mark or wave, W3 visible repair mark or wave; S1 rust, S2 heavy rust; X must be replaced; XX replaced; B1/B2 distorted radiator back panel or core support (B1 slight, B2 heavy); Y1/Y2/Y3 small / medium / big crack or hole; X1 small windshield crack; R repaired windshield crack; RX repaired windshield crack (must be replaced); G stone chip in glass; C1 corrosion, C2 heavy corrosion; P marked paint; H faded paint.

Japan Car Direct (raw) gives size-based definitions: "U1 – A dent which is the size of a thumb. U2 – ... the size of a palm. U3 – ... more than size U2."; "Y1 – A tear which is the size of a thumb" (so JCD reads **Y as a tear**, Car From Japan as crack or hole); "W1 – A panel which has been repaired slightly, and is in good condition. W2 ... slightly a wave. W3 ... a conspicuous wave."; "S1 – Rust which is the size of a fist. S2 – Rust which is more than size S1."; "C1 – Major rust corrosion which is the size of a fist."; "X – A panel which needs to be replaced. XX – A panel which has been replaced." Mirai (summariser) says CAA's appendix gives A1 about 10 cm, A2 20 cm, A3 40 cm, and "Other houses use different sizes." Kobe: "Numbers are often added to indicate relative severity".

**Conflicts / caution:**
- **B**: Car From Japan "Dent with scratch" (also called "scratch and dent"). In some houses B1/B2 relate to bent radiator support (Car From Japan). Both are listed by one source. Kobe: "B ... Scratch and dent / combined body damage", Mirai: "Scratch with dent in CAA. Other houses may use it differently."
- **S vs C**: Rust vs corrosion; in JCD "C1 – Major rust corrosion" and "S1 – Rust ..." so C is the heavier/penetrating; Mirai says "S / C - Rust or corrosion, per the CAA legend". Do not over-explain.
- **E**: "Few dimples" (Car From Japan, JCD E3 "Some dents which are barely visible") vs Mirai "Small dent in some JU conventions".
- **Y**: crack/hole (Car From Japan, Mirai) vs tear (JCD). Y is also used for interior tears per JCD. Use "crack, tear or hole".
- **XX** means replaced panel, which is not the same as structural repair history (Kobe: "XX commonly indicates that a panel has already been replaced. This does not automatically mean the vehicle has structural repair history.").
- **W** means a repaired or refinished panel, not automatically accident damage (Kobe: "One light W mark does not automatically mean structural accident history.").
- Kobe on position: "A code near a bumper can mean something different from the same code on glass."
- Equipment abbreviations (JCD, raw): AC air conditioner, AAC climate control, FA/AT automatic, F5 / F6 manual 5 or 6-speed, PS power steering, PW power windows, SR sunroof, AW alloy wheels, TV television, カワ・革 leather, エアB airbag, CA column automatic.

### 2.5 Mileage symbols on the sheet
- JCD (raw): "# / $ / * – Mileage not confirmed. If any of these symbols shows beside the listed mileage, then the auction house is not confirming the vehicle's mileage. This could be due to an odometer swap, 5 digit odometer or simply because it is very old. Many vehicles with unconfirmed mileage have accurate clocks, it is just an auction formality."
- Integrity Exports (via summariser, https://integrityexports.com/japanese-car-auctions-overview/odometer-readings/): "*" the auction believes the odometer was changed with no records, "$" odometer legitimately replaced, "#" true mileage unknown. **This conflicts with JCD's lumped reading.** Treat the symbols as house-specific; read the legend.
- Kobe (via Mirai summary): "Do not turn the current display into a verified-mileage claim." and mileage symbols "are not safe to decode without the sheet legend."

### 2.6 How reliable are sheets?
- Not a warranty. Quotes above (Mirai, Kobe). Kobe (raw): "never judge a vehicle only by its auction grade" and "A Grade 4 vehicle may still have scratches, dents, repainting, interior wear or mechanical comments. An R-grade vehicle may look excellent in photographs but have documented structural repair history."
- Inspection limits (Mirai, summariser): "An auction inspection may not establish road-test behavior."
- JCD recommends third-party pre-bid inspections especially for 3.5 and lower: "We recommend getting a third party, professional pre bid inspection on all vehicles, but especially grades 3.5 and lower".
- All of these are importer or agent marketing pages. I found no regulator or industry-body document on auction-sheet accuracy.
- **Repair history definition (Japan)**: the Japan Automobile Fair Trade Council (AFTC) definition, per a Japanese-language search summary: 修復歴 means "車体の骨格に当たる部位の修正及び交換歴" (a history of correcting or replacing the structural frame parts), and other repairs such as bumpers or bolt-on panels are not 修復歴. The listed parts include frame members (side and cross members), front inside panels, pillars, dash panel, roof panel, floor panel, trunk floor panel, and radiator core support. The wording was quoted from the search summary of car-me.jp / AFTC material; I did not read the AFTC rule itself. https://www.aftc.or.jp/content/files/pdf/aftc_info/aftcinfo_20190326.pdf (not opened). Judgement by the Japan Auto Appraisal Institute (JAAI) standards.

### 2.7 Export certificate (輸出抹消仮登録証明書, yushutsu massho) and odometer
- Japanese term: 輸出抹消仮登録証明書 (yushutsu massho karitōroku shōmeisho), usually shortened to "export certificate" or "deregistration certificate" in English. The kanji form is from memory (not verified today); the English phrase "export certificate" and the Romanised "massho" appear in importer pages.
- Prestige Motorsport (Adelaide-area importer; read via WebFetch/summariser): "This official document is produced from the de-registration paper by Japanese Customs at the time of export." and it "shows the kms at the last two registration inspections by the Japanese Transport Authority, together with the date", giving "odometer records for up to 7 years for some cars and about 5 years for most". https://prestigemotorsport.com.au/genuine-mileage-guarantee-japanese-export-certificate/ . (Single importer's claim; the "last two inspections" wording may differ per document.)
- Fukasawa (raw): "Once we buy the car, it is deregistered in Japan and an export certificate is issued. This document confirms the car's identity and Japanese registration details, and it is one of the documents used to support the import approval application, including as evidence of the car's identity and age."
- Shaken (車検) records note odometer readings (Integrity Exports, summariser): "it has also become mandatory to note the odometer reading at the time of the roadworthiness test (called Shaken in Japanese)." JDM Buy Sell (summariser), quoting MLIT: remarks carry "the odometer value at the time of the vehicle's inspection". Since January 2017, readings after a meter replacement should carry a maximum recorded distance.
- **Third-party odometer checks:** JEVIC (Japan Export Vehicle Inspection Center) offers an odometer certificate that checks readings against history. JDM Buy Sell (summariser, https://www.jdmbuysell.com/learn/topics/verify-mileage/): JEVIC describes its odometer inspection as "verifying the actual odometer mileage against the historical readings of the vehicle." and "Confirm that the certificate you are shown is the odometer one." Caveats from the same page: "No single record proves a JDM car's lifetime mileage." Importers sell JEVIC as an optional extra at additional cost (search summary). Prestige Motorsport also points to "Japan Car History Check" (a different service).
- **Does Australia require a third-party odometer check?** I found **no** requirement in any source I could read. The older-vehicle page text I could access (via jdmbuysell summary) lists build-date evidence, not odometer verification. I could not read the Department's pages. Mark as: no requirement found; not verified against the Department. The word "verified" for mileage on a website should therefore not be used unless Tokyo Prestige holds the documents (export certificate figures, JEVIC odometer certificate, auction sheet unconfirmed marks). That is also a legal point; see 5.3 below on odometer statements in SA.
- SA also tightened odometer law from 1 July 2025: see section 5.1.

---

## 3. Japanese terminology a spec plate would use

Readings are in hiragana/romaji. "(verified)" = I saw the string in a source I read. "(from memory)" = my knowledge, not verified today. Where only the kanji came from a search summary I say so.

| English | Japanese | Reading | Note |
|---|---|---|---|
| Model code / chassis code | 型式 | katashiki | From memory for 型式 itself. A katashiki is the model-type code on the shaken certificate (e.g. "GRS204" for the Crown, from Fukasawa's SEV table). Western enthusiasts say "chassis code" (e.g. BNR34); the Japanese katashiki and the Western chassis code are not always identical. Flag if exact value matters. |
| Grade (trim level) | グレード | gurēdo | From memory. Do not confuse with 評価点 (auction grade). |
| Model year / first registration | 年式 / 初度登録(年月) | nenshiki / shodo tōroku (nengetsu) | Verified in search summary (Sompo Direct, https://www.sompo-direct.co.jp/otona/oshiete/car/first-time-registration.html): 初度登録年月 is the year and month first registered in Japan; "年式は一般に初度登録年月と同じ意味で使われますが、厳密には製造年月を指します" (nenshiki is commonly used to mean first registration, but strictly means manufacture date). Japan's year-of-registration can differ from build date; for the 25-year rule the build date, not first registration, is what counts (section 1). Japan convention also uses era years: 平成 Heisei and 令和 Reiwa (e.g. H12 = 2000, R7 = 2025; the Toyota search result shows 2025年(R7年)). |
| Mileage | 走行距離 | sōkō kyori | Verified (Kobe Motor table). Usually in km. |
| Displacement | 排気量 | haikiryō | From memory. In cc on the shaken (e.g. 2393cc on Toyota's page). |
| Vehicle inspection | 車検 | shaken | Verified (Kobe table: "Vehicle inspection / shaken"). Japan's mandatory periodic inspection. "車検あり" / "車検付き" means shaken remaining. A car exported from Japan is deregistered, so shaken has no legal value in Australia. (Inference.) |
| Colour | 色 / 車体色 | iro / shataishoku | From memory. |
| Repair history | 修復歴 | shūfukureki | Verified (Kobe). 修復歴あり = repair history present, 修復歴なし = none. Verified: "有 / あり" Yes, "無 / なし" No (Kobe table). See 2.6 for the definition. |
| One owner | ワンオーナー | wan ōnā | From memory (common Japanese advert term). |
| Auction grade | 評価点 | hyōkaten | Verified in Japanese search results (crexgroup.com "車査定の点数を解説 評価点の見方" and Goo-net). |
| Scratch / dent / rust | キズ / 凹み / 錆 | kizu / hekomi / sabi | Verified (Kobe table). |
| Replacement / fault | 交換 / 不良 | kōkan / furyō | Verified (Kobe table). |

### 3.1 Make and model katakana
I checked each against the Japanese Wikipedia article title or opening line (fetched via the Wikipedia API on 11 Nov 2026), unless marked.

| Name | Katakana | Status |
|---|---|---|
| Toyota | トヨタ | verified (トヨタ自動車) |
| Lexus | レクサス | verified (レクサス article) |
| Nissan | 日産 (kanji) / ニッサン (katakana) | 日産自動車 verified as the company name; 日産 is the normal written form. The brief asked for 日産: correct. |
| Subaru | スバル | verified (株式会社SUBARU（スバル）) |
| Honda | ホンダ | verified (本田技研工業 article, ホンダ in titles e.g. ホンダ・オデッセイ) |
| Suzuki | スズキ | verified (スズキ株式会社) |
| Crown | クラウン | verified |
| Crown Majesta | クラウンマジェスタ (written "クラウン マジェスタ" with a space in the article body) | verified |
| Century | センチュリー | verified |
| Celsior | セルシオ | verified (note: the Lexus LS in Japan, 1989-2006, "Celsior" is the Japan name) |
| Alphard | アルファード | verified |
| Vellfire | ヴェルファイア | verified (toyota.jp page title). The English romanisation is "Vellfire", two Ls. |
| Voxy | ヴォクシー | verified (toyota.jp). Note Japanese "ヴォクシー" is Voxy in English. |
| Skyline | スカイライン | verified |
| GT-R | GT-R (ジーティーアール) | verified. Written in Latin letters; reading jī-tī-āru. |
| Land Cruiser | ランドクルーザー | verified (article title ランドクルーザー) |
| Mark X | マークX (マークエックス) | verified |
| Legacy | レガシィ | verified. Note spelling レガシィ with a small ィ, not レガシー. |
| MR2 | MR2 (エムアールツー) | verified |
| MR-S | MR-S (エムアールエス) | verified |
| Odyssey | オデッセイ | verified |
| Serena | セレナ | verified |
| Carry | キャリイ | verified (Wikipedia: キャリイ（CARRY）). The ending is "イ", not the long-vowel "ー"; "キャリー" is a common mis-spelling (from memory). |
| Ignis | イグニス | verified |
| Corolla Touring | カローラ ツーリング (space) / カローラツーリング | verified. Official Toyota name has a space. |

Uncertainties to flag: (a) Wikipedia article titles are community spellings; Toyota/Nissan product pages are the authority for official forms. (b) "キャリイ" is correct per Wikipedia; (c) Legacy: the Subaru name is "レガシィ" per the Wikipedia article. All other forms matched.

### 3.2 English-language terms an enthusiast expects
- "JDM" (Japanese Domestic Market) means the car was built and sold for Japan, and is often right-hand drive. Strictly, a car built in Japan but exported new to Australia is not "JDM". (Compare the Market page: "If you purchase a Japanese car domestically from a manufacturer who has imported it ..." which draws a similar line.)
- "Kei car" (軽自動車, kei jidōsha): Japan's small vehicle class. The Wikipedia opening line for the Carry calls it a "軽トラック" (kei truck). Dazmac (single importer source, and its page uses pre-RVSA terms elsewhere, so verify) says the SEV environmental criterion covers small-capacity vehicles under 660 cc, maximum 47 kW and under 3.4 m. Kei trucks and vans also arrive by the 25-year route. The kei definition itself is from memory.

---

## 4. What Australian buyers of imports worry about

Sources are commercial (importers, insurers, comparison sites) except where stated. None gives hard statistics.

- **Insurance.** Compare the Market (updated 28 Aug 2024, read raw): "If you privately import your car from overseas, you may need specialised cover not offered by our comparison service, and you may need to pay a higher car insurance premium." Also: "Cost of parts. ... replacement parts may be more expensive for imported cars ... These parts can often be difficult to source as well". https://www.comparethemarket.com.au/car-insurance/import/ . Tokyo Drive (importer, Oct 2025-ish, read raw): auction grade and verified kilometres affect premiums: "Cars with: Grade R (repaired) / Accident history / Unverified odometers usually cost more or require inspection." and "Some models don't have a local equivalent / Parts availability varies". https://tokyodrive.com.au/insuring-imported-japanese-cars-what-australian-drivers-need-to-know/ . Specialist insurers named by search: MB Insurance Group (https://www.mbinsurance.com.au/japanese-imported-vehicle-insurance/), Enthusiast Motor Insurance, Ryno (not read).
- **Parts.** Same sources. Many JDM-only models have no local equivalent; Toyota, Honda and Nissan mainstream models have easier parts (Tokyo Drive). Importer claim, not independent.
- **Resale.** Only importer claims found: one argues many imports are now collector cars with strong resale (a seller's view). Do not make resale or investment claims on the site (consumer law; "No hype" per CLAUDE.md voice).
- **Finance.** Search summary: one lender "doesn't finance vehicles over 12 years old or grey imports"; another page says it can be hard for "a high LVR, over 15 years old or a grey import". Unsecured personal loans often ignore vehicle age (Savvy, plenti pages, not read in full). Expect higher rates (a forum comment, low reliability). Conclusion: finance availability for 15-25-year-old imports is limited and lender-specific; confirm before offering finance on the site. The sources are https://www.360finance.com.au/?p=2537 , https://www.savvy.com.au/?p=9116 (not opened; summary only).
- **Infotainment language / navigation.** The only practical item found: Japanese head units and navigation are in Japanese and the FM band differs. I found no source on English conversion or maps; replacement head units are the usual answer (inference). The Tokyo Drive page only mentions availability issues generally.
- **Radio band.** NZ Radio Spectrum Management (read raw): "The frequency range agreed internationally for FM broadcasting includes 88-108 MHz ... Japan, however, uses the frequency range 76-90 MHz." and "If you drive a used car imported from Japan it will probably be fitted with a Japanese car radio which, without modification, only receives some New Zealand radio stations." It says band expanders "shift" signals, can cause "Wrong interpretation of frequency. Distortion due to high signal levels (overload)." and recommends "replacing your Japanese car radio with a model designed for the FM band used in New Zealand." https://www.rsm.govt.nz/business-individuals/interference/band-expanders-in-imported-vehicles . **This is a New Zealand regulator**, not Australian; I found no ACMA page. The same physical issue applies in Australia; Australian FM is also about 87.5/88-108 MHz (Wikipedia-based search summary). A Melbourne converter site says Soarers imported to Australia need an expander and notes some stations broadcast vertically polarised only (https://sites.google.com/site/udcaus/soarerfmradioconversion , snippet only).
- **Fuel / E10.** No source specific to JDM imports. NSW EPA (search summary): high-performance vehicles and older cars "particularly those built before 1986 but also any that use older technologies such as carburettors, shouldn't use E10". Nissan Australia (search summary): does not recommend E10 for vehicles made before 1 January 2004. Toyota UK magazine: pre-January 1998 not compatible (UK guidance). Octane figures conflict (NSW Government: regular 91 RON, E10 94 RON; NRMA: E10 95 RON). Whether specific imports like RB26 Skylines suit E10 is unanswered. The designer should not state a fuel recommendation per model on the site; point to the owner's manual and the NSW E10 compatibility checker. https://www.nsw.gov.au/topics/e10-fuel/facts
- **Tyres.** I found no source on tyres as a buyer worry or compliance item. Leave out.
- **Registration interstate.** See section 6.
- **Hidden damage and accident history.** Covered by repair-history grades (section 2) and, in SA, by write-off disclosure: "A licensed dealer must disclose if a car has been written off or is flood damaged" (CBS, https://www.cbs.sa.gov.au/campaigns/buying-used-car , raw).
- **Mileage honesty.** SA penalties from 1 July 2025 (section 5.1) and the importer-sold "export certificate" proofs (section 2.7).

---

## 5. South Australian dealer rules relevant to the site and to the ads

### 5.1 Licensing
- sa.gov.au (raw): "If you buy, sell, or offer for sale four or more vehicles in a 12 month period, you're considered a second-hand vehicle dealer. You must be licensed and follow the legal requirements for this type of business." Close associates: six or more between them. https://www.sa.gov.au/topics/business-and-trade/running-a-business/second-hand-vehicle-dealers-responsibilities
- Law: Second-hand Vehicle Dealers Act 1995 (SA), regulations "Second-hand Vehicle Dealers Regulations 2025 (SA)" (Law Handbook, https://lawhandbook.sa.gov.au/ch10s04s07s03.php, last revised 13 Aug 2025). Premises must be registered with CBS. Dealers pay into the Second-hand Vehicles Compensation Fund. Check a licence on the CBS Licensing Public Register ("Find a licence holder"): https://www.cbs.sa.gov.au/campaigns/buying-used-car
- Penalties for unlicensed dealing and odometer tampering rose 1 July 2025 (CBS, raw): "maximum penalties for unlicensed dealing increase from $100,000 to $250,000 and/or two years imprisonment for individuals, and from $250,000 to $500,000 for body corporates" and "a 15-fold increase of the maximum penalty for odometer tampering to $150,000". https://cbs.sa.gov.au/campaigns/protecting-second-hand-vehicle-buyers . **Conflict:** the Law Handbook (raw) states a fine of "$150,000 for a first or second offence, $250,000 or imprisonment for 2 years or both for a third or subsequent offence" for unlicensed dealing and the CBS factsheet says odometer interference penalties are "up to $250,000 and/or 2 years imprisonment" for individuals. Do not print penalty figures on the site; they are not needed.
- Interfering with an odometer is an offence for anyone; altering needs CBS approval (sa.gov.au page, raw): "You can only change an odometer on a second-hand vehicle with written approval from the Commissioner for Consumer and Business Services." and "It's illegal to provide false and misleading statements about odometers."

### 5.2 What a licensed dealer's advertisement must contain (verified from the regulations)
Second-hand Vehicle Dealers Regulations 2025 (SA), version 1.9.2025, PDF from https://www.legislation.sa.gov.au/_legislation-documents/lz/c/r/second-hand-vehicle-dealers-regulations-2025/current/2025.78.auth.pdf (read raw):

> 23—Advertisements (1) An advertisement relating to the sale of a second-hand vehicle by a dealer must contain the information and particulars referred to in Schedule 2. ... (3) A person who publishes an advertisement relating to the sale of a second-hand vehicle that does not comply with this regulation, or who causes or permits such an advertisement to be published, is guilty of an offence. Maximum penalty: $5 000.

> Schedule 2—Advertisements for sale of second-hand vehicles ... (a) the words "Licensed Second-hand Vehicle Dealer" (which may be abbreviated to "LVD") immediately followed by the dealer's licence number ... (b) the price at which the vehicle, in the condition which it is offered for sale, may be purchased for cash, including all dealer charges but not including any statutory charges or fees; (c) the registration number of the vehicle or, if the vehicle is not registered, the engine number, either of which is to be printed adjacent to or immediately after any description, photograph or illustration of the vehicle appearing in the advertisement.

Consequences for the website (inference, but strongly grounded; confirm with CBS at occupational@sa.gov.au):
- Every vehicle listing and every paid ad should carry "Licensed Second-hand Vehicle Dealer" (or "LVD") plus the licence number, the cash price, and the registration number (or engine number if unregistered) next to the vehicle description or photo. Whether a website listing counts as an "advertisement" is not stated in the sources I read; the definition in the Act refers to "the publishing, or authorising the publication, of an advertisement" without limiting it to print (act.txt line 181 context). Be conservative and include it on listing cards and pages.
- Search summaries and CBS enforcement news show CBS monitors online listings (e.g. Gumtree), which supports treating online listings as covered.

Odometer in ads (Act s16(6), raw): "A dealer must not, in an advertisement published in connection with the sale of a second-hand vehicle, refer directly or indirectly to the odometer reading of the vehicle or the distance travelled by the vehicle unless a notice is attached to the vehicle under this section and the notice contains a statement by the dealer that the odometer reading of the vehicle may be regarded as reasonably accurate. Maximum penalty: $5 000." This matters a lot for Japan imports: showing "42,000 km" in an ad obliges the dealer to have a Section 16 Notice on the car with that statement. A dealer who cannot stand behind the reading (auction sheet marked #, $ or *) should not state the mileage as a fact or should hold documents.

Section 16 Notice contents (Act s16, raw): includes "(f) the price at which the vehicle (in the condition in which it is offered for sale) may be purchased for cash, including any fees and charges payable to the dealer (except prescribed fees and charges); (g) the vehicle's year of manufacture (as determined by the regulations); (h) the vehicle's year of first registration; (i) the vehicle's manufacturer and model designation; (j) ... registration number; (k) ... engine number; (l) ... odometer reading at the time the vehicle was acquired". Regulation definition (raw): "year of manufacture means— (a) the year of the date referred to on the compliance plate (if any) ... or (b) the year (if any) impressed on or affixed to the vehicle by the manufacturer ... or (c) the year during which the manufacture of the vehicle was completed ..., whichever year is the earliest." And the Act defines "year of first registration" simply as "the year in which the vehicle was first registered." The Act text does not say whether that is the Australian or the Japanese first registration. Not verified how CBS treats imports; ask CBS before printing a "first registered" year on listings. (Gap.)

### 5.3 Statutory warranty (duty to repair) in SA, as stated now
CBS dealer factsheet (raw, PDF; https://cbs.sa.gov.au/__data/assets/pdf_file/0017/1057103/Selling-cars-in-South-Australia.pdf):
> For cars priced: between $3,001 and $6,000, the warranty covers the car for up to 3,000 km or two months, whichever occurs first; over $6,000, the warranty covers the car for up to 5,000 km or three months whichever occurs first. The statutory warranty does not apply to cars that: have been sold for $3,000 or less; have travelled over 200,000 kilometres before the sale; were first registered more than 15 years ago.

Act s23(7)(ab) (raw): "if the year of first registration of the vehicle was more than 15 years before the year in which the sale was made; or if the vehicle had been driven more than 200 000 kilometres before the sale". The dealer must still make sure a vehicle is roadworthy. The Law Handbook (raw): "Defects in a vehicle that make it unroadworthy or illegal to drive at the time of delivery to the purchaser must be repaired by the dealer regardless of the price paid for, or the distance traveled by, the vehicle [s 23]." CBS (raw): "The government is retaining the statutory warranty period under the Act for cars aged less than 15 years or that have travelled less than 200,000km." (https://cbs.sa.gov.au/campaigns/protecting-second-hand-vehicle-buyers). Changes from 1 Sept 2025: hybrid and EV main propulsion batteries are covered; "a purchaser can no longer waive the dealer's duty to repair"; dealers can list defects on a prescribed form (Form 17) so those defects are not covered if the car stays roadworthy.

What this means for imports (inference): Cars imported under the 25-year rule were first registered more than 15 years ago in Japan, so if "first registration" is read as the first registration anywhere, they fall outside the SA statutory warranty; SEV-route cars from 2008 to 2013 also usually are over 15 years from first registration by 2026-2028. Whether the Japanese registration date counts is not stated in the Act or regs. Unresolved; ask CBS. Australian Consumer Law guarantees still apply "to all vehicles, even if there is no warranty" (CBS factsheet, raw), so the site must not say "sold as is" or "no warranty" in a way that implies ACL rights are removed: "cannot be replaced, limited or removed by any agreement, contract or warranty" (CBS factsheet).
Duty to repair does not apply to motorcycles or vehicles bought at auction (Law Handbook, raw).

### 5.4 Cooling-off in SA
Law Handbook (raw, s18B): "Purchasers have the right to rescind (cool-off) a contract for a second-hand car bought from a dealer by delivering a written notice to the dealer within 2 business days of the signing of the contract". CBS factsheet (raw): "Consumers have two clear business days to consider the purchase ... Saturdays are considered to be business days." Dealer deposit up to 10%; on cancellation refund minus 2% of the contract price or $100, whichever is lesser. "The right to rescind the contract does not apply if the purchaser takes possession of the car." A purchaser aged 18 or over may waive in writing (Waiver of Cooling-off Rights), and "It is an offence for a dealer to influence or attempt to influence a purchaser to waiver". Credit contracts are void if the buyer cancels (s18B(9)). Is this right available to an interstate buyer who buys from an SA dealer? Not addressed in the sources; the Act applies to sales by SA dealers. Ask CBS. (Gap.)

### 5.5 Stamp duty and registration in SA
- RevenueSA (WebFetch of https://www.revenuesa.sa.gov.au/stamp-duty-vehicles/rates), non-commercial vehicles: up to $1,000 "$1 per $100 (or part of $100), minimum $5"; $1,000-$2,000 "$10, plus $2 per $100 ... over $1,000"; $2,000-$3,000 "$30, plus $3 per $100 ... over $2,000"; over $3,000 "$60, plus $4 per $100 (or part of $100) over $3,000". Duty is on market value. Imported vehicles: RevenueSA audits "low values being declared on second-hand imported motor vehicles" (https://www.revenuesa.sa.gov.au/stamp-duty-vehicles/second-hand-vehicle-dealers, raw). Dealers can claim an exemption for vehicles "registered for the purpose of resale" for up to 12 months of registration. I did not check for different rates for higher-value cars; the page shows only the four bands I listed. (Search summaries disagree about higher-value bands, for example a "2026 scale with 13% above $70,000" on a calculator site that I discarded as unreliable.)
- Registering an imported car in SA (sa.gov.au, WebFetch): present at Service SA: identity inspection certificate; roadworthy certificate and paperwork confirming ADR compliance (for rarity vehicles only if the identity inspection says so); registration and CTP application; and "You must submit an imported vehicle for an identity inspection before beginning any modifications." Costs: registration, inspection fee, new plates, "Stamp duty on the market value, unless you already paid it in another Australian jurisdiction". Contact: vehiclestandards@sa.gov.au, 1300 882 248. https://www.sa.gov.au/topics/driving-and-transport/vehicles/buying-and-selling/importing-motor-vehicles

### 5.6 Advertising prices: ACCC and SA together
- ACL s48 "single price" rule. ACCC page (WebFetch): "Businesses must display the total price of a product or service as a single figure." https://www.accc.gov.au/consumers/pricing/price-displays . ACCC guidance via search summary: "A supplier must not promote or state a price that is only part of the cost, unless also prominently advertising the single price." The single price must be "at least as prominent as the most prominent component". Optional extras and delivery charges can be left out; pre-selected options must be included. The ACCC December 2024 submission to Treasury proposed changes to make the minimum quantifiable price the most prominent price; I did not confirm whether that has been enacted. https://www.accc.gov.au/system/files/accc-submission-treasury-unfair-trading-practices-consultation-december-2024.pdf
- "Drive away" wording: the ACCC's 2002 media release (read via summariser, https://accc.gov.au/media-release/accc-puts-the-brakes-on-misleading-car-ads) says the ACCC encourages dealers to adopt "truthfully advertising 'drive away – no more to pay'" and that stamp duty and similar statutory charges may be listed as extra only if their "nature and amount are 'clearly and prominently disclosed in the advertisement'". It is a 2002 release; I could not find a current ACCC page on car "drive away" pricing (the pages I tried returned 404). Search results about the 2009 "clarity in pricing" rules (e.g. https://www.themotorreport.com.au/news/accc-e28098drive-away-no-more-to-paye28099-new-car-pricing-to-come-into-effect-may-25/) were about **new** cars. Treat as background.
- **How the two rules fit (inference):** SA Schedule 2 requires the cash price "including all dealer charges but not including any statutory charges or fees", so an SA-compliant ad price excludes stamp duty and registration. The ACL single-price rule requires the price to include all quantifiable non-optional costs. The sources do not reconcile these for a second-hand dealer. A safe wording, not verified with CBS or ACCC: show the price as "Dealer price (includes all dealer charges)" and, if stating a "drive-away" or "on-road" figure, make it a complete figure including stamp duty and registration for a named state. Avoid "drive away" unless the total is complete. Confirm with CBS and ACCC before launch.
- The ACCC "Pricing manual for the motor vehicle industry" and "Motor vehicle sales and repairs" guide exist (https://www.accc.gov.au/system/files/Pricing%20Manual%20for%20the%20motor%20vehicle%20industry.pdf , https://www.accc.gov.au/system/files/1449_ACL%20Motor%20vehicle%20sales%20and%20repairs_FA_WEB.pdf); I could not extract their text.

### 5.7 Finance repayment wording (ASIC)
ASIC RG 234 "Advertising financial products and services", published 9 June 2026 (PDF read raw): https://download.asic.gov.au/media/cvcjdpy5/rg234-published-09-june-2026.pdf
- RG 234.50: "Under the National Credit Code, an advertisement for a credit product does not need to include an annual percentage rate but must do so if the advertisement states the amount of any repayment. The advertisement must also include references to any fees and charges: s150 of the National Credit Code."
- RG 234.56: "An advertisement must contain a comparison rate if it contains an interest rate: s160 of the National Credit Code."
- RG 234.58: "An advertised comparison rate must be identified as a comparison rate and the comparison rate must not be less prominent in an advertisement than any interest rate or the amount of any repayment stated in the advertisement: s164 of the National Credit Code."
- RG 234.60: "A comparison rate in an advertisement must be accompanied by a warning about the accuracy of the comparison rate and that the comparison rate is accurate only for the example given in the advertisement" (the text I read is cut mid-sentence; the warning requirement is s163 and reg 99 per the search summary).
- Wording to avoid (RG 234 line ~2082, raw): "an advertisement for a credit product should not use terms such as 'guaranteed acceptance' or 'pre-approved'". Example 57 in the same guide concerns "guaranteed" finance.
- Practical reading (inference): a weekly "$X per week" figure on a car card is a stated repayment, so ASIC's guidance says it must show an annual percentage rate and fees and, where an interest rate is shown, a comparison rate with warning, unless a different route applies. Whether these rules apply to a dealer depends on whether the dealer or a lender is the credit provider or the dealer is only referring customers to a broker (credit assistance); RG 234 has a section on "credit assistance" (RG 234.154 and following) which I did not read in full. A dealer who only invites enquiries ("finance enquiries welcome, subject to approval") and does not state repayments avoids the problem. Get legal or broker advice before printing any repayment estimate. I did not find an ASIC rule on "indicative repayment calculators" for dealers.

---

## 6. Interstate purchase from an SA dealer

Government sources, read raw unless stated.

- **SA unregistered vehicle permit** (https://www.sa.gov.au/topics/driving-and-transport/registration/conditional-registration/unregistered-vehicle-permits): "Permits may be granted for a maximum of 3 days but are usually only issued for as long as necessary". Purposes include to "relocate the vehicle". "The journey must start or finish in South Australia for the permit to be valid. If you're travelling interstate, you should check with the interstate authority to ensure the permit is valid for the planned trip." Apply via mySAGOV; need make, VIN or engine number, plate number if any, and journey details. Search summary adds: not available for statutory write-offs or vehicles with a "Lift Tow" restriction.
- **How the car leaves SA** (inference): by truck (transport), or driven home under an SA unregistered vehicle permit if the dealer's registration is cancelled or the car is unregistered. An SA dealer car that is registered in SA can be driven on SA registration until transfer; the transfer rules were not checked. Dealer trade plates cannot be used for a customer's journey. (Inference, not sourced.)
- **Check history before buying**: VicRoads (https://www.vicroads.vic.gov.au/buy-sell-transfer/buying-car/buying-interstate): it hasn't been reported stolen, isn't recorded as a write-off, and has no money owing; search the PPSR or call 1300 007 777. The SA Law Handbook adds the PPSR fee "($2 as at June 2026)". A PPSR certificate protects the buyer until the end of the next day (Law Handbook).
- **Victoria**: "You'll also need to get a roadworthy certificate for the vehicle, unless it's exempt. A licensed vehicle tester from Victoria can check your vehicle and give you a certificate." "Register the vehicle at a VicRoads Customer Service Centre. If you need to drive it there, make sure you get an Unregistered vehicle permit from Transport Victoria." Registering in Victoria "may not automatically cancel the interstate registration".
- **NSW** (https://www.service.nsw.gov.au/transaction/get-an-authorised-unregistered-vehicle-inspection-blue-slip, last published 18 Aug 2026): "All unregistered light vehicles need a blue slip inspection report before they can be registered in NSW." An inspection is needed if the vehicle "has been brought into NSW from another state or territory, or from overseas". Report is "valid for 42 days".
- **Queensland** (https://www.qld.gov.au/transport/registration/transfer/interstate): vehicle "garaged at a Queensland address" must be registered in Queensland within "14 days"; a current Queensland safety certificate is required for the transfer from another state. Queensland rules on buying a Queensland-registered car from interstate do not apply to an SA purchase.
- **Western Australia**: WA's page covers overseas imports only; WA licensing of an interstate vehicle was not retrieved. WA also has "Unlicensed vehicle permits" (menu item, not read).
- **SA's own rules for registering in SA** are in section 5.5. SA transfer deadlines conflicted in secondary sources (14 days vs 3 months); not verified; do not state a figure.
- **Sales-contract and warranty questions** (cooling-off, statutory warranty when the car goes to another state) are not addressed in any source I read. Dealer should confirm; the SA statutory duty to repair requires the buyer to "deliver the car to the dealer for the repairs" (Law Handbook, s24), which affects interstate buyers (inference).
- A 2025 NSW parliamentary answer (search summary) says Transport for NSW is "exploring" removing blue slips for new vehicles bought interstate; this does not apply to used imports and I found no confirmation it is in effect.

---

## 7. Glossary (the website can rely on these; flagged where definitions differ)

1. **ADR (Australian Design Rules)**: national standards for vehicle safety, anti-theft and emissions (WA page, raw).
2. **AFTC (Japan Automobile Fair Trade Council)**: Japan's industry body whose rules govern used-car advertising and the 修復歴 definition.
3. **AVV (Authorised Vehicle Verifier)**: inspects a modified SEV car and enters it on the RAV.
4. **Auction sheet**: the auction house's inspection record for one lot; not a warranty.
5. **Build date**: when assembly was completed (or last significant modification finished); determines the 25-year rule.
6. **Chassis code / model code (型式, katashiki)**: the type code on the Japanese shaken certificate, such as GRS204 or BNR34.
7. **Concessional RAV entry approval**: approval under the Rules for a vehicle that is not type-approved: older vehicles, SEVs, personal effects.
8. **Cooling-off (SA)**: two business days to cancel a dealer sale (Saturdays count); not if possession was taken; can be waived in writing.
9. **Deregistration certificate / export certificate (輸出抹消仮登録証明書)**: issued when a car is deregistered for export; shows identity, registration data and some odometer history.
10. **Defect codes (A, U, W, S, C, X, XX, B, Y, G, E)**: marks on the sheet's diagram; meanings vary by house.
11. **Duty to repair (SA statutory warranty)**: dealer's obligation to repair defects for 2 or 3 months/3,000 or 5,000 km, depending on price; none under $3,000 sale price, over 200,000 km or over 15 years from first registration.
12. **ERA years (平成 Heisei, 令和 Reiwa)**: Japanese year system used on documents.
13. **Grade (グレード)**: trim level of a model, for example "GT-R V-Spec".
14. **Auction grade (評価点)**: the numerical condition score, S/6 to R, RA.
15. **Grey import / parallel import**: press and insurer term for a car not supplied through the manufacturer's Australian network; not an official RVSA term.
16. **Import approval**: the permission required before importing a road vehicle; applied for in ROVER.
17. **JDM**: Japanese domestic market, a car built for sale in Japan.
18. **JAEPA**: Japan-Australia Economic Partnership Agreement; removes the 5% tariff on Japanese-built vehicles with origin documents.
19. **JEVIC**: Japan Export Vehicle Inspection Center; sells an optional odometer certificate.
20. **Kei car (軽自動車)**: Japan's small-vehicle class.
21. **LCT (luxury car tax)**: 33% above a threshold of AUD 80,809 for 2026-27 (jdmbuysell, verify).
22. **LVD**: SA abbreviation for "Licensed Second-hand Vehicle Dealer" required with the licence number in ads.
23. **Model Report**: engineering document for an SEV model: how it meets each ADR plus Work Instructions.
24. **Odometer "unconfirmed" marks (#, $, *)**: marks beside mileage on sheets; meaning varies by house.
25. **Older vehicle (25-year rule)**: build date at least 25 years before the application; not significantly modified in that time.
26. **Personal effects vehicle**: a car owned and used overseas for at least 12 months by someone relocating to Australia.
27. **PPSR**: Personal Property Securities Register; check for money owing, theft, write-off; fee about $2 (SA Law Handbook, June 2026).
28. **RAV (Register of Approved Vehicles)**: public online list of vehicles approved for road use; replaced compliance plates.
29. **RAW (Registered Automotive Workshop)**: workshop approved to modify SEV cars to a Model Report.
30. **Repair history (修復歴)**: Japanese term for corrected or replaced structural frame parts; not the same as cosmetic repair.
31. **ROVER**: the Department's online system for import and vehicle-standards applications.
32. **RVSA (Road Vehicle Standards Act 2018)**: the law in force since 1 July 2021.
33. **Section 16 Notice (SA)**: notice a dealer must attach to a vehicle for sale, with price, year of first registration, odometer reading, etc.
34. **SEV Register / SEVS**: register of eligible Specialist and Enthusiast Vehicle models; "SEVS" is the older scheme name still in common use.
35. **Shaken (車検)**: Japan's mandatory periodic vehicle inspection; shaken records note odometer readings.
36. **Significant modification**: change that can remove "older vehicle" status within the last 25 years (Dept guidance via search).
37. **Single price rule (ACL s48)**: advertised price must show the total price as a single figure at least as prominently as any component.
38. **Unregistered vehicle permit (SA)**: up to 3 days permit to move an unregistered vehicle; journey must start or finish in SA.
39. **Yushutsu massho (輸出抹消)**: "export deregistration", the Japanese process producing the export certificate (from memory).
40. **Year of first registration (SA)**: required on the dealer's notice; not defined for imports in the Act.

---

## 8. Unresolved items and conflicts (summary)

1. Department of Infrastructure pages not read directly (site unreachable). Verify: 25-year rule wording, SEV criteria (esp. rarity numbers 3,000/100), fees, processing times, the "4 or fewer in 12 months" concessional limit, and personal-effects conditions.
2. Whether the Commonwealth or states set compliance work for 25-year cars: Commonwealth none; Fukasawa and state authorities say states apply build-date ADRs. Use "set by the state".
3. Dazmac page uses pre-RVSA language (Used Import Plate, VSB10). Rejected.
4. RA and R meanings vary by auction house. Mileage symbols #, $, * conflict between JCD and Integrity Exports.
5. Odometer verification requirement in Australia: none found, not confirmed.
6. SA penalty figures conflict (CBS vs Law Handbook). Not needed on the site.
7. SA statutory warranty: whether Japanese first registration counts for the 15-year exclusion is unknown; most 25-year imports and many SEV imports will be over 15 years.
8. SA ad rules: Schedule 2 licence number and price wording verified in the regulations; whether a website listing is an "advertisement" for this purpose is not confirmed (assume yes).
9. SA "cash price excluding statutory charges" versus ACL single price / "drive away": no source reconciles them for used cars. Confirm with CBS and ACCC.
10. ASIC: repayment estimate rules depend on whether the dealer is the credit provider; no dealer-specific repayment calculator guidance found.
11. Interstate: the permit rules for the destination state; cooling-off and statutory warranty for interstate buyers not addressed in any source.
12. Radio band expander guidance is from New Zealand's regulator. No Australian regulator page found.
13. E10 for specific JDM models: no authoritative model-specific source.
14. Tyres as a compliance item: no source.
15. Katakana: all items verified against Japanese Wikipedia / toyota.jp except the readings of 型式, グレード, 排気量, 色, ワンオーナー and 輸出抹消仮登録証明書 which are from memory (these are standard terms but I did not see them in a read source, except 型式 appears in context via search summary).

## 9. Files

Scratch data (not for the site): /tmp/claude-0/-home-user/fcf86e89-c12a-5a43-ab64-990b6ecf98e4/scratchpad/imp/ (act.txt, regs.txt, sell.txt, rg234.txt, k0.txt, k1.txt, x0.txt etc.).
