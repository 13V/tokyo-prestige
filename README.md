# Tokyo Prestige: demo website

A private demo by Lumen adl for Tokyo Prestige, a Japanese import car dealer at 216-218 Kensington Road,
Marryatville, Adelaide. It uses their name, cars and photos to show what a new site could be. Every page
carries `noindex`, there is no sitemap, and `robots.txt` disallows everything.

Static HTML, CSS and JavaScript. No framework, and no build step on Vercel.

## How it fits together

- `data/stock.json`: every car, captured from tokyoprestige.com.au on 11 Nov 2026. In production a feed
  from the dealer's system replaces this one file.
- `node tools/build.mjs`: writes the pages from the stock file (`index.html`, `cars/<car>.html`). Run it
  after the stock file changes and commit the result.
- `node tools/serve.mjs 4173`: local preview that serves clean URLs the way Vercel does.
- `assets/css/tp.css` holds the design tokens; `home.css` and `car.css` are the page styles.
- `img/cars/<stock no>/`: their photos as responsive AVIF. `tools/build-images.py` makes them from the
  originals; `tools/build-stock.py` makes the stock file from the crawl in `data/source-listings.json`.

## Research

`research/` holds the work behind the design: `client.md` (their site, read and audited), `buyers.md`,
`competitors/` (seven regional reports), `findings.md`, `mobbin.md`, `direction.md` and `gaps.md` (what
to ask the owner). It is not deployed.

## Rules for content

Only real cars, prices, specs and claims from their site. Nothing invented. Anything the design needs
that they have not published is a marked placeholder and is listed in `research/gaps.md`.

## Forms

Forms validate and show a thank-you state but send nothing. The hook for a real endpoint is the
`data-endpoint` attribute on the form, handled in `assets/js/car.js`.
