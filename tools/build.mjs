#!/usr/bin/env node
// Writes the site's HTML from data/stock.json. Run it after the stock file changes and commit the
// result: Vercel serves the files as they are, with no build step.
//   node tools/build.mjs
import { write, cars } from "./lib.mjs";
import { home } from "./templates/home.mjs";
import { carPage } from "./templates/car.mjs";

write("index.html", home());
for (const c of cars) write(`cars/${c.slug}.html`, carPage(c));
console.log(`built: home, ${cars.length} car pages`);
