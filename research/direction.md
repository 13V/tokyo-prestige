# Direction: Tokyo Prestige

> The live demo carries two looks: this one (dark, the default) and "The figures" (light), switched in the
> header. The second look is in `assets/css/figures.css`.

One page. Proved by two screens: the homepage's first screen with the stock search, and one complete car
page (`/cars/2001-nissan-skyline-gt-r-bnr34-512`). Screenshots and a clip are in `direction/`.

## The idea

**The showroom at night.** Their photos are taken in a bright showroom on a phone. We turn the lights
down: the room falls back to near black and the car stays lit, as if it were the only thing in the
building. It is done in CSS over their own photos, so every new car in the feed gets the same treatment
with no retouching. Around the cars, the page behaves like a spec plate: codes, grades and numbers set
exactly, in a fixed order, with nothing decorative.

It is Tokyo Prestige's identity, not Lumen's: no gradient, no ink, square corners in place of pills.

## Tokens (in `assets/css/tp.css`)

| | |
|---|---|
| **Ground** | `--night #060607`, panels `#0c0c0e` `#131316` `#1b1b1f`, hairlines white at 10% and 20% |
| **Text** | `#f3f2ee`, secondary `#b9b8b2`, muted `#8f8e88` (all AA or better on the ground) |
| **Accent** | One: 朱 shu, vermilion `#ff4a22`, the colour of an inspector's seal and a nod to their red. Used for the main action, status and focus. Never as a background wash. |
| **Light** | `--beam #e4ecff`, a cool headlight white, used only in light effects |
| **Type** | Archivo (one variable file) for everything: headings at width 108 to 112, weight 500, tight tracking; big numerals at weight 300. Geist Mono, uppercase, for codes and labels. Noto Sans JP for a few small captions. Body 16px, never smaller than 12px for labels. |
| **Scale** | 12, 13, 14, 16, 18, 22, 28, 40, 56, 80 (fluid) |
| **Space** | A 4px step: 4, 8, 12, 16, 24, 32, 48, 64, 96, 160. Sections 96 to 160px apart. |
| **Radius** | 2px on controls and cards, 4px on panels. Photos square. Circles only for status dots. |
| **Controls** | 52px high, filled ground, 1px line, a vermilion focus ring. Tap targets 44px or more. (Sizing and focus follow Astryx.) |
| **Motion** | Settle `cubic-bezier(.16,1,.3,1)`; sweeps `cubic-bezier(.65,0,.35,1)`; a soft spring for presses. 140ms press, 320ms state, 720ms reveal, 1,800ms for the one hero sweep, 60ms stagger. Only transform, opacity, clip-path, filter and colour. No scroll hijacking. With reduced motion or no JavaScript every page is complete and still. |

## Japanese details, and the rule for them

Only where they are correct and useful to someone who can read them: model names in katakana as the maker
writes them (スカイライン GT-R), spec labels a Japanese listing uses (年式, 型式, 走行距離, 駆動方式), and a
seal that reads 東京. A model with no checked katakana gets none. No rising suns, no neon, no brush fonts.

## The two screens

**Homepage, first screen** (reworked after Troy's feedback on the first version). A showcase of four
cars from their stock, one for each kind of buyer: the BNR34 GT-R, the Century, a Crown Hybrid and an
Alphard. Each comes out of the dark as one band of light crosses it and its lamp comes on, with its model
code set large behind the car. The featured car is a plate across the hero (name in katakana, code,
kilometres, price as they state it) whose figures roll over like an odometer when the car changes. It
rests on hover, has a pause button, and with a mouse a soft torch follows the pointer through the dark
room. The headline: "Hand-picked Japanese imports. Here to drive in Adelaide." (their words:
"hand-picked", "Japanese imported vehicles", "right here, right now"). The search is on the first screen
on both sizes: text (model or code), make, body, budget, and a button that counts ("Show 62 cars").
*Findings: features 2 and 17.*

**Car page.** Top to bottom, the order a wary buyer needs:
1. Gallery: swipe on a phone, mosaic on a desk, full screen on tap, each angle labelled.
2. Name, model code as a plate, one line of facts, status, price "plus on-road costs" as they state it.
3. Year and kilometres as large numbers; the full specification with the VIN.
4. **What is on record**: each line with its source, and "ask for it" where nothing is published.
5. A request for a walk-around video. Five photos is what they publish; the page says so.
6. What the price covers, a request for the drive-away figure, and an estimator where the visitor sets the rate.
7. One form that knows the car: purpose in one tap; trade-in, finance and interstate as optional taps.
8. Interstate, in their FAQ's words. Who you are buying from, with the licence. Similar cars.

Call, Message and Book a test drive stay pinned to the bottom of a phone; on a desk the price and actions
stay beside the page. *Findings: features 1, 3 to 7, 10 to 14, 16.*

## Where this goes past the best sites we found

- A clean first phone screen with the car, the search and one action: no site in the research has one.
- A structured, sourced record on a dealer's car page: no site in the research has one.
- A video request, a hold request and a landing alert per car.
- Weight: these two pages are about half a megabyte on a phone; competitors run 3 to 35 MB.

## How it is built

Hand-written HTML, CSS and JavaScript, no framework. `data/stock.json` holds every car;
`node tools/build.mjs` writes the pages from it, and the written pages are committed, so Vercel has no
build step and the stock list works without JavaScript. A feed from their dealer system would replace
that one file.

## What I need from you

1. Is this the direction? In particular the accent (vermilion, not their logo's red) and the type.
2. The header uses a wordmark and a 東京 seal I drew. Should their TP badge go there instead?
3. The hero car is the BNR34 at $229,888. Happy to lead with it, or would the owner rather lead with a Crown?
