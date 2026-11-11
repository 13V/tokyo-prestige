#!/usr/bin/env node
// Writes the site's HTML from data/stock.json. Run it after the stock file changes and commit the
// result: Vercel serves the files as they are, with no build step.
//   node tools/build.mjs
import { write, cars } from "./lib.mjs";
import { home } from "./templates/home.mjs";
import { carPage } from "./templates/car.mjs";
import { listPage } from "./templates/stock.mjs";
import { importing, finance, servicing, about, faq, contact, notFound } from "./templates/pages.mjs";

write("index.html", home());
write("stock.html", listPage());
write("coming-soon.html", listPage({ soon: true }));
write("importing.html", importing());
write("finance.html", finance());
write("servicing.html", servicing());
write("about.html", about());
write("faq.html", faq());
write("contact.html", contact());
write("404.html", notFound());
for (const c of cars) write(`cars/${c.slug}.html`, carPage(c));
console.log(`built: 10 pages and ${cars.length} car pages`);
