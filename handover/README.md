# Tokyo Prestige demo: hand-over

11 November 2026. Live at **https://tokyo-prestige.vercel.app/** (public address, `noindex`, not connected
to GitHub: it was deployed from the build session). Code is on branch `claude/ecstatic-cray-bwl9f8`.

## The look: rebuilt in "The figures" (11 November 2026, later the same day)

The live demo was first built dark ("The showroom at night"). At Troy's request it was rebuilt in direction J,
"The figures": a light ground, Geist, and the same four figures (year, kilometres, gearbox, price) on the
homepage, every card and every car page. Structure, pages, search, forms and wording are unchanged. The dark
version is kept at the git tag `direction-a-showroom-at-night`. The screenshots and clips in this folder show
the new look. Lighthouse on the rebuilt pages, local build, phone profile, one run each: home 97, stock 95,
car page 96 for performance; accessibility 100 on all three. The live figures in the table below were
measured on the dark build and have not been re-run against the live address.

## What is in this folder

- `walkthrough-phone.mp4` (48 s) and `walkthrough-desktop.mp4` (48 s): homepage, stock search, a car page
  and a sent test-drive request, with the motion playing.
- `screens/`: every page type on desktop and phone, the first screen and the whole page (52 images).
- `design-directions.pdf`: five directions (the built one, the gallery, find it fast, Astryx, the figures),
  compared, with a last page on automation and AI after the site.
- The interactive proposal is `../proposal.html` (served at `/proposal`, noindex), in Lumen's own look;
  screenshots of it are in `proposal/`.
- `design-directions-2.pdf`: three further directions, each traced to a research finding and a Mobbin
  reference (the figures, the lineup, start from what you need), with a pick. Mock-ups: `../concepts/` (j to l).
- The research is in `../research/`; what to ask the owner is in `../research/gaps.md`.

## Pages built

Home; Stock (62 available, 8 under contract behind the Status filter); Coming soon (53); a page for each of
the 123 cars from one template; How importing works; Finance; Servicing; About; Questions; Contact; a
not-found page. The Shop is left out: four clothing items, last changed March 2024, and it carries the
cart and login that slow their current site.

## Speed: Lighthouse 12, phone profile, 11 Nov 2026

| Page | Theirs (1 run) | Ours, live on Vercel (3 runs) |
|---|---|---|
| Home | 36 performance, 77 accessibility, LCP 12.5 s, 2.2 MB | 99, 99, 99 performance, 100 accessibility, LCP 1.9 s, 0.68 MB |
| Stock list | 39, 76, LCP 4.0 s, 1.8 MB | 97, 97, 98, 100, LCP 2.3 to 2.5 s, 0.60 MB |
| Car page (BNR34) | 34, 68, LCP 16.6 s, 2.1 MB | 99, 100, 99, 100, LCP 1.7 s, 0.47 MB |

Ours were measured from the same machine and tool as theirs. Other pages measured on the local build:
importing 97, about 96, contact 99, coming soon 97 to 98 (live).

## Taps on a phone, from the homepage

| Task | Their site | The demo |
|---|---|---|
| See a car with its price | 0 taps, but 8,070px of scrolling (measured) | 0 taps, 0 scrolling: the featured car and its price are on the first screen |
| Open the stock list | 2 (menu, Cars Available) | 1 (Show 62 cars) |
| Find a Crown under $30,000 | Not possible on the stock page: all nine filters read "No options". From the homepage form: about 5 taps and a page load | 4 (search field, budget, choose, Show), no page load: 9 cars |
| Enquire about the car you are on | 1 tap to open a pop-up, then 4 fields, a contact-method choice, a reCAPTCHA and Send | 1 tap (Message, always on screen), 2 fields, Send |
| Call from a car page | Scroll to the top, tap a text link 17px high | 1 tap (Call, always on screen) |
| Homepage to a sent test-drive request for a Crown under $30,000 | About 12 taps, 6 fields and a reCAPTCHA (counted from their forms; not submitted) | 7 taps and 2 fields (walked end to end, in the clip) |

## Five sentences for the owner

1. "On your stock page today every filter says 'No options', so a buyer on a phone cannot narrow 70 cars
   down; on this one they type 'Crown', pick a budget, and see nine cars without the page reloading."
2. "Your car page scores 34 out of 100 for speed on a phone and takes about 17 seconds to show the car;
   this one scores 99 and shows it in under two."
3. "To enquire on your site a buyer finds a small button, then fills four fields and a reCAPTCHA in a
   pop-up; here Call, Message and Book a test drive sit under their thumb on every car, and the form
   already knows which car it is."
4. "The first thing import buyers on the forums say is 'if the dealer can't show you the auction sheet,
   walk away', so every car page here sets out what is on record and gives them one tap to ask you for
   the rest, including the walk-around video your About page already promises."
5. "You have 53 cars on the water that today are a list with no price and no way to follow them; here
   each one has a 'tell me when it lands' button, so they collect enquiries before they arrive."

## What two independent reviewers found, and what was done

- **As the owner, cold, on a phone.** A blocker: the phone menu opened to one row (a blur on the header
  trapped it). Fixed. Also fixed: no sort on phones (now in the filter sheet); a 35-screen stock page
  (now 24 cars at a time); the hero stopping after a tap; counts that disagreed between pages (62
  everywhere, under-contract cars behind Status); "Tokyo Prestige says" changed to "we"; file names in
  the placeholder boxes removed; the record panel now leads with what is confirmed.
- **As an enthusiast, checking facts.** Every field on three car pages matched the dealer's listing.
  Fixed: gearbox or engine wording on eight cars (all listed in `gaps.md`), three phrases of mine that
  went past what the dealer says ("hand-picked in Japan", "not bought in bulk", "sails 7,800 km"), the
  grade table, and the dealer's equipment lists restored to 61 car pages. It judged all the Japanese
  correct.
- Not changed, for you to decide: the reviewer-as-owner disliked seeing "On request" beside the auction
  sheet on a $229,888 car ("it reads as if I'm hiding something"). That is the point to raise with the
  owner: the fix is for him to publish the sheet.

## Not tested, or not verified

- **Real phones.** Everything was checked in Chromium emulating a phone. Not tested on an iPhone in
  Safari or on an Android phone. The hero's blend modes and the view transitions are the parts most
  worth checking in Safari.
- **Screen readers.** Headings, labels, alt text, focus and contrast pass Lighthouse (100) and were
  checked by keyboard in part; no screen reader was run.
- **The Japanese.** A reviewer judged it correct from knowledge and checked model names against sources;
  no native speaker has read it.
- **Their reviews.** None could be read, so none are shown. The reviews and team blocks are placeholders.
- **Legal wording.** Licence form, price wording, the finance estimator and the warranty summary need
  the checks listed in `research/gaps.md` (section C) before a real launch.
- **Research gaps.** Reddit, Whirlpool, Carsales, Carsguide, Carvana and CarMax blocked the research
  browser; the federal import-rule pages were down. Sources used instead are named in each report.
- **Forms** validate and thank, and send nothing. The hook is `data-endpoint` on each form.
- **The map** on Contact is a Google Maps embed and was not visible from the build machine.
- **The dealer's data.** About 25 listings contradict themselves; the demo shows the safe reading and
  `gaps.md` lists each one.
- **Photos.** All are the dealer's own, shown as taken. The four hero cars are chosen by stock number in
  `tools/templates/home.mjs`.
