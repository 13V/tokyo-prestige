// The stock manager (demo). Reads the same stock file as the website. Everything a user changes is kept in
// this browser's localStorage and nothing is published anywhere.
//   Real on this device: stock edits, status, the channel switches, and LEADS, which are the enquiries
//   sent through the demo site's own forms in this browser (tp.js and car.js record them).
//   Sample: views, calls and searches. There is no traffic to a private demo, so those figures are made
//   up per car from its stock number, the same every time, and every one is labelled "Sample".
// HOOKS for a real build: load() and save() become the dealer system's API; CHANNELS[].on becomes a feed.
(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const money = (n) => (n ? "$" + Number(n).toLocaleString("en-AU") : "Not priced");
  const num = (n) => (n == null || n === "" ? "–" : Number(n).toLocaleString("en-AU"));
  const KEY = "tp-portal", LEADS = "tp-leads";
  const STATUS = { "coming-soon": "Coming soon", available: "In stock", "under-contract": "Under contract", sold: "Sold" };
  const CHANNELS = [
    ["web", "Website", "Shown on the stock pages"],
    ["carsales", "Carsales", "Not connected: needs your dealer account and a stock feed"],
    ["fb", "Facebook Marketplace", "Not connected: needs your Page and a vehicle catalogue"],
    ["ig", "Instagram", "Not connected: posts for approval, not published"],
  ];
  const read = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch (e) { return d; } };
  const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  let state = read(KEY, { edits: {}, added: [] });
  let cars = [], tab = "available", q = "", shown = 30;

  // sample figures: fixed per car, from its stock number
  const rnd = (id, salt) => { let h = 2166136261; for (const c of String(id) + salt) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return ((h >>> 0) % 1000) / 1000; };
  const sample = (c) => {
    if (c.added) return { views: 0, calls: 0, days: 0 };
    const hot = c.price > 60000 || /GT-R|Century|Alphard|Crown/.test(c.title) ? 1.6 : 1;
    return { views: Math.round((40 + rnd(c.id, "v") * 260) * hot), calls: Math.round(rnd(c.id, "c") * 6 * hot), days: 4 + Math.round(rnd(c.id, "d") * 70) };
  };
  const leads = () => read(LEADS, []);
  const leadsFor = (c) => leads().filter((l) => String(l.stock) === String(c.id));

  const view = () =>
    [...state.added, ...cars].map((c) => {
      const e = state.edits[c.id] || {};
      const o = { ...c, ...e };
      o.ch = e.ch || { web: o.status !== "sold", carsales: false, fb: false, ig: false };
      return o;
    });
  const save = () => write(KEY, state);
  const edit = (id, patch) => { state.edits[id] = { ...(state.edits[id] || {}), ...patch }; save(); render(); };
  const toast = (t) => { const el = $("[data-toast]"); el.textContent = t; el.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => (el.hidden = true), 3200); };

  // the listing checker: the things that make a buyer distrust a listing
  const warnings = (c) => {
    const w = [];
    if (!c.modelCode) w.push("No model code");
    if (c.km == null || c.km === "") w.push("No kilometres");
    if (c.status === "available" && !c.price) w.push("In stock with no price");
    if (!c.transmission) w.push("No gearbox");
    if (!c.added && (!c.photos || c.photos.length < 5)) w.push("Fewer than 5 photos");
    return w;
  };

  const pic = (c) => (c.thumb ? c.thumb : c.added ? "" : `/img/cars/${c.id}/1-480.avif`);

  function tiles(all) {
    const n = (s) => all.filter((c) => c.status === s).length;
    const L = leads();
    const adv = all.filter((c) => c.status !== "sold" && (c.ch.carsales || c.ch.fb || c.ch.ig)).length;
    $("[data-tiles]").innerHTML = [
      ["In stock", n("available"), "on the floor"],
      ["Coming soon", n("coming-soon"), "on the way"],
      ["Under contract", n("under-contract"), ""],
      ["Sold", n("sold"), "marked here"],
      ["Leads", L.length, "sent through the demo, this device", "tile--red"],
    ].map(([a, b, c, k]) => `<div class="tile ${k || ""}"><small>${a}</small><b>${b}</b><span>${c}</span></div>`).join("") + "";
    return adv;
  }

  function analytics(all) {
    const live = all.filter((c) => c.status === "available");
    const s = live.map((c) => ({ c, ...sample(c), leads: leadsFor(c).length }));
    const top = [...s].sort((a, b) => b.views - a.views).slice(0, 5);
    const cold = [...s].filter((x) => x.leads === 0).sort((a, b) => b.views - a.views).slice(0, 5);
    const old = [...s].sort((a, b) => b.days - a.days).slice(0, 5);
    const L = leads().slice().reverse();
    const days = [...Array(14)].map((_, i) => Math.round(120 + rnd(i, "day") * 240));
    const mx = Math.max(...days);
    const row = (x, v, u) => `<li><span>${esc(x.c.year)} ${esc(x.c.make)} ${esc(x.c.model)} <em>${esc(x.c.id)}</em></span><b>${v} <em>${u}</em></b></li>`;
    $("[data-an]").innerHTML = `
      <div class="panel"><h3>Leads <span class="pill">Real, this device</span></h3>
        ${L.length ? L.slice(0, 6).map((l) => `<div class="lead"><b>${esc(l.name)} · ${esc(l.contact)}</b><span>${esc(l.car || "General enquiry")}${l.intent ? " · " + esc(l.intent) : ""}</span><em>${new Date(l.at).toLocaleString("en-AU", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" })} · ${esc(l.source || "website")}</em></div>`).join("") : `<p class="empty">No leads yet. Open a car on the website in this browser, send the enquiry form, and it appears here against that car.</p>`}
      </div>
      <div class="panel"><h3>Most viewed, 7 days <span class="pill pill--sample">Sample</span></h3><ul class="rows">${top.map((x) => row(x, x.views, "views")).join("")}</ul></div>
      <div class="panel"><h3>Viewed, but no enquiry <span class="pill pill--sample">Sample</span></h3><ul class="rows">${cold.map((x) => row(x, x.views, "views")).join("")}</ul></div>
      <div class="panel"><h3>Website visits, 14 days <span class="pill pill--sample">Sample</span></h3><div class="spark">${days.map((d, i) => `<i class="${i > 10 ? "on" : ""}" style="height:${Math.round((d / mx) * 100)}%"></i>`).join("")}</div><p class="ax"><span>14 days ago</span><span>today</span></p></div>
      <div class="panel"><h3>Longest in stock <span class="pill pill--sample">Sample</span></h3><ul class="rows">${old.map((x) => row(x, x.days, "days")).join("")}</ul></div>
      <div class="panel"><h3>Searched for, not found <span class="pill pill--sample">Sample</span></h3><ul class="rows">${[["Supra", 14], ["Land Cruiser 70", 11], ["Jimny", 9], ["RX-7", 8], ["Hiace", 6]].map(([a, b]) => `<li><span>${a}</span><b>${b} <em>searches</em></b></li>`).join("")}</ul></div>`;
  }

  function render() {
    const all = view();
    tiles(all);
    analytics(all);
    const counts = Object.fromEntries(Object.keys(STATUS).map((s) => [s, all.filter((c) => c.status === s).length]));
    $("[data-tabs]").innerHTML = Object.entries(STATUS).map(([k, v]) => `<button type="button" role="tab" aria-selected="${tab === k}" data-tab="${k}">${v}<b>${counts[k]}</b></button>`).join("");
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    const rows = all.filter((c) => (words.length ? true : c.status === tab) && words.every((w) => [c.id, c.title, c.make, c.model, c.modelCode, c.year].join(" ").toLowerCase().includes(w)));
    const list = $("[data-list]");
    list.innerHTML = rows.length
      ? rows.slice(0, shown).map((c) => {
          const s = sample(c), w = warnings(c), nl = leadsFor(c).length, p = pic(c);
          return `<article class="row${c.status === "sold" ? " is-sold" : ""}" data-id="${esc(c.id)}">
            <div class="row__pic">${p ? `<img src="${esc(p)}" alt="" loading="lazy">` : ""}</div>
            <div><p class="row__t">${esc(c.year)} ${esc(c.make)} ${esc(c.model)}</p><p class="row__m">Stock <b>${esc(c.id)}</b> · ${esc(c.modelCode || "no code")} · ${num(c.km)} km · <b>${money(c.price)}</b></p></div>
            <div class="row__stats"><div class="stat stat--lead"><small>Leads</small><b>${nl}</b></div><div class="stat"><small>Views 7d</small><b>${s.views}</b></div><div class="stat"><small>Calls</small><b>${s.calls}</b></div><div class="stat"><small>Days</small><b>${s.days}</b></div></div>
            <div class="row__ch">${CHANNELS.map(([k, n]) => `<span class="ch${c.ch[k] ? " on" : ""}">${n}</span>`).join("")}</div>
            <div class="row__act"><select aria-label="Status" data-status>${Object.entries(STATUS).map(([k, v]) => `<option value="${k}"${c.status === k ? " selected" : ""}>${v}</option>`).join("")}</select><button class="btn btn--sm" type="button" data-ad>Advertise</button>${c.status === "sold" ? `<button class="btn btn--sm" type="button" data-edit>Edit</button>` : `<button class="btn btn--sm btn--red" type="button" data-sold>Mark sold</button>`}</div>
            ${w.length ? `<p class="warns">Check: ${w.map(esc).join(" · ")}</p>` : ""}
          </article>`;
        }).join("")
      : `<p class="empty">No cars match.</p>`;
    $("[data-more]").hidden = rows.length <= shown;
  }

  // ---------- list actions ----------
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-tab]");
    if (t) { tab = t.dataset.tab; shown = 30; return render(); }
    if (e.target.closest("[data-more]")) { shown += 30; return render(); }
    if (e.target.closest("[data-add]")) return openForm();
    if (e.target.closest("[data-reset]")) { state = { edits: {}, added: [] }; save(); write(LEADS, []); render(); return toast("Demo reset"); }
    const c = e.target.closest("[data-close]");
    if (c) return c.closest("dialog").close();
    const row = e.target.closest(".row");
    if (!row) return;
    const car = view().find((x) => String(x.id) === row.dataset.id);
    if (e.target.closest("[data-sold]")) { const on = CHANNELS.filter(([k]) => car.ch[k]).map(([, n]) => n); edit(car.id, { status: "sold", ch: { web: false, carsales: false, fb: false, ig: false } }); return toast(`Sold. Taken off ${on.length ? on.join(", ") : "sale"} (demo).`); }
    if (e.target.closest("[data-ad]")) return openAd(car);
    if (e.target.closest("[data-edit]")) return openForm(car);
  });
  document.addEventListener("change", (e) => {
    const s = e.target.closest("[data-status]");
    if (!s) return;
    const id = s.closest(".row").dataset.id;
    const car = view().find((x) => String(x.id) === id);
    edit(id, { status: s.value, ch: s.value === "sold" ? { web: false, carsales: false, fb: false, ig: false } : { ...car.ch, web: true } });
    toast(`${car.year} ${car.make} ${car.model}: ${STATUS[s.value]}`);
  });
  $("[data-q]").addEventListener("input", (e) => { q = e.target.value; shown = 30; render(); });

  // ---------- add or edit ----------
  const fs = $("[data-form-sheet]"), form = $("[data-form]");
  let editing = null, thumb = "";
  function openForm(car) {
    editing = car || null; thumb = car?.thumb || "";
    form.reset(); $("[data-thumbs]").innerHTML = ""; $("[data-checks]").innerHTML = ""; $$(".is-filled", form).forEach((el) => el.classList.remove("is-filled")); lkMsg("The form below fills in from the record. You check it, then save."); $("[data-lk]").hidden = !!car;
    $("[data-form-h]").textContent = car ? "Edit car" : "Add a car";
    if (car) for (const k of ["year", "make", "model", "modelCode", "km", "price", "transmission", "colour", "vin", "status"]) form.elements[k].value = car[k] ?? "";
    fs.showModal();
  }
  $("[data-photos]").addEventListener("change", (e) => {
    const box = $("[data-thumbs]"); box.innerHTML = "";
    [...e.target.files].slice(0, 8).forEach((f, i) => { const r = new FileReader(); r.onload = () => { const im = new Image(); im.onload = () => { const c = document.createElement("canvas"); c.width = 320; c.height = 240; const k = Math.max(320 / im.width, 240 / im.height); c.getContext("2d").drawImage(im, (320 - im.width * k) / 2, (240 - im.height * k) / 2, im.width * k, im.height * k); const u = c.toDataURL("image/jpeg", 0.7); if (i === 0) thumb = u; box.insertAdjacentHTML("beforeend", `<img src="${u}" alt="">`); }; im.src = r.result; }; r.readAsDataURL(f); });
  });
  // ---------- look up before typing ----------
  // What is real in this demo: a VIN or chassis number that is in the dealer's own stock file fills the
  // whole form, and a Japanese chassis number (for example BNR34-402727) is decoded to its model code and
  // matched to the make and model the dealer already lists under that code.
  // HOOK: a registered plate plus state, and a full specification, come from a vehicle data provider
  // (RedBook, or a NEVDIS-based plate search). That needs the dealer's account, so here it says so.
  const fill = (rec, keys) => {
    keys.forEach((k) => { if (rec[k] == null || rec[k] === "") return; const el = form.elements[k]; el.value = rec[k]; el.classList.add("is-filled"); });
    form.dispatchEvent(new Event("input"));
  };
  const lkMsg = (t, k) => { const m = $("[data-lk-msg]"); m.textContent = t; m.className = "lk__msg " + (k || ""); };
  $("[data-lk-go]").addEventListener("click", () => {
    const raw = $("[data-lk-id]").value.trim().toUpperCase();
    const st = $("[data-lk-state]").value;
    $$(".is-filled", form).forEach((el) => el.classList.remove("is-filled"));
    if (raw.length < 3) return lkMsg("Type a plate, a VIN or a chassis number first.", "warn");
    const flat = raw.replace(/[^A-Z0-9]/g, "");
    const hit = cars.find((c) => c.vin && c.vin.toUpperCase().replace(/[^A-Z0-9]/g, "") === flat);
    if (hit) { fill(hit, ["year", "make", "model", "modelCode", "km", "price", "transmission", "colour", "vin"]); return lkMsg(`Found in your own stock records: stock ${hit.id}. Every field is filled from that record.`, "ok"); }
    const codes = [...new Set(cars.map((c) => c.modelCode).filter(Boolean))].sort((a, b) => b.length - a.length);
    const code = codes.find((k) => flat.includes(k.toUpperCase().replace(/[^A-Z0-9]/g, "")));
    if (code) { const like = cars.find((c) => c.modelCode === code); fill({ make: like.make, model: like.model, modelCode: code, vin: raw }, ["make", "model", "modelCode", "vin"]); return lkMsg(`Chassis code ${code} recognised: ${like.make} ${like.model}. Make, model and code are filled; year, kilometres and price are yours to add.`, "ok"); }
    if (st && flat.length <= 7) return lkMsg(`A ${st} plate search needs a vehicle data provider such as RedBook connected to your account. Not connected in this demo.`, "warn");
    form.elements.vin.value = raw;
    lkMsg("Not in your stock records, and the chassis code is not one you have listed before. A full specification lookup needs a data provider such as RedBook; not connected in this demo.", "warn");
  });

  const fields = () => Object.fromEntries(["year", "make", "model", "modelCode", "km", "price", "transmission", "colour", "vin", "status"].map((k) => [k, form.elements[k].value.trim()]));
  form.addEventListener("input", () => { const v = fields(); const w = warnings({ ...v, km: v.km, price: Number(v.price) || 0, added: true }); $("[data-checks]").innerHTML = w.length ? w.map((x) => `<p>Check: ${esc(x)}</p>`).join("") : `<p class="ok">Listing looks complete.</p>`; });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const v = fields();
    let bad = null;
    for (const k of ["year", "make", "model"]) { const ok = k === "year" ? /^(19|20)\d\d$/.test(v.year) : v[k].length > 1; form.elements[k].setAttribute("aria-invalid", ok ? "false" : "true"); if (!ok && !bad) bad = form.elements[k]; }
    if (bad) return bad.focus();
    const car = { ...v, year: Number(v.year), km: v.km === "" ? null : Number(v.km.replace(/\D/g, "")), price: Number(v.price.replace(/\D/g, "")) || null, title: `${v.year} ${v.make} ${v.model}` };
    if (thumb) car.thumb = thumb;
    if (editing) { edit(editing.id, car); toast("Saved"); }
    else { const id = "N" + (1600 + state.added.length); state.added.unshift({ ...car, id, added: true, photos: [] }); save(); tab = car.status; render(); toast(`Added as stock ${id} (demo)`); }
    fs.close();
  });

  // ---------- advertise ----------
  const as = $("[data-ad-sheet]");
  let adCar = null, adKind = "carsales";
  const AD = {
    carsales: (c) => `${c.year} ${c.make} ${c.model}${c.modelCode ? " " + c.modelCode : ""}\n\n${[c.km != null && num(c.km) + " km", c.transmission, c.colour].filter(Boolean).join(" · ")}\n${money(c.price)}${c.price ? " plus on-road costs" : ""}\n\nHand-picked Japanese import, in Adelaide and ready to drive. Fully serviced by our own workshop, Australian-compliant and ready for registration, with a guaranteed clear title.\n\nStock no. ${c.id}. Tokyo Prestige, 216-218 Kensington Road, Marryatville SA. 08 8336 4674. Licensed dealer MVD 287394.`,
    fb: (c) => `${c.year} ${c.make} ${c.model} · ${money(c.price)}${c.price ? " plus on-road costs" : ""}\n${[c.km != null && num(c.km) + " km", c.transmission, c.colour].filter(Boolean).join(", ")}.\n\nHere in Adelaide, serviced and complied. Come and drive it, or ask us for a walk-around video.\n\nTokyo Prestige, Marryatville. 08 8336 4674. Stock ${c.id}. MVD 287394.`,
    ig: (c) => `Just landed: ${c.year} ${c.make} ${c.model}${c.modelCode ? " (" + c.modelCode + ")" : ""}.\n${[c.km != null && num(c.km) + " km", c.transmission].filter(Boolean).join(" · ")}\n${money(c.price)}${c.price ? " plus on-road costs" : ""}\n\nIn the showroom at Marryatville now. Link in bio, stock ${c.id}.\n\n#${String(c.make).toLowerCase()} #${String(c.model).toLowerCase().replace(/[^a-z0-9]/g, "")} #jdm #adelaide #tokyoprestige`,
  };
  function paintAd() {
    const c = view().find((x) => x.id === adCar);
    $("[data-ad-car]").textContent = `${c.year} ${c.make} ${c.model} · stock ${c.id} · ${STATUS[c.status]}`;
    $("[data-chans]").innerHTML = CHANNELS.map(([k, n, d]) => `<div class="chan"><div><b>${n}</b><small>${d}</small></div><button class="sw" type="button" role="switch" aria-checked="${!!c.ch[k]}" aria-label="${n}" data-sw="${k}"></button></div>`).join("");
    $("[data-ad-tabs]").innerHTML = [["carsales", "Carsales"], ["fb", "Facebook"], ["ig", "Instagram"]].map(([k, n]) => `<button type="button" role="tab" aria-selected="${adKind === k}" data-kind="${k}">${n}</button>`).join("");
    $("[data-ad-text]").value = AD[adKind](c);
  }
  function openAd(c) { adCar = c.id; paintAd(); as.showModal(); }
  as.addEventListener("click", (e) => {
    const sw = e.target.closest("[data-sw]");
    if (sw) { const c = view().find((x) => x.id === adCar); const on = !c.ch[sw.dataset.sw]; edit(adCar, { ch: { ...c.ch, [sw.dataset.sw]: on } }); paintAd(); return toast(`${CHANNELS.find(([k]) => k === sw.dataset.sw)[1]}: ${on ? "on" : "off"} (demo, nothing published)`); }
    const k = e.target.closest("[data-kind]");
    if (k) { adKind = k.dataset.kind; return paintAd(); }
    if (e.target.closest("[data-copy]")) { navigator.clipboard?.writeText($("[data-ad-text]").value).then(() => toast("Ad text copied"), () => toast("Select the text to copy it")); }
  });

  fetch("/data/stock.json").then((r) => r.json()).then((d) => { cars = d.cars; render(); }).catch(() => { $("[data-list]").innerHTML = `<p class="empty">The stock file could not be loaded.</p>`; });
  addEventListener("storage", render);
})();
