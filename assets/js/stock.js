// Stock and Coming soon: search, filter and sort without a page load. The filter state lives in the
// address, so any view can be shared or bookmarked, and Back returns to it. Without this file the
// page lists every car.
(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = $("[data-list]");
  if (!root) return;
  const form = $("[data-flt-form]");
  const grid = $("[data-grid]");
  const cards = $$("[data-card]", grid).map((el, i) => ({
    el,
    i,
    make: el.dataset.make,
    model: el.dataset.model,
    body: el.dataset.body,
    year: Number(el.dataset.year),
    price: Number(el.dataset.price) || 0,
    km: el.dataset.km === "" ? null : Number(el.dataset.km),
    trans: el.dataset.trans,
    status: el.dataset.status,
    q: el.dataset.q,
  }));
  const sort = $("#f-sort");
  const empty = $("[data-empty]");
  const chips = $("[data-chips]");
  const badge = $("[data-flt-n]");
  const sheet = $("[data-flt-sheet]");
  const inline = $("[data-flt-inline]");
  const KEYS = ["q", "make", "model", "body", "year", "max", "km", "trans", "status"];
  const money = (n) => "$" + Number(n).toLocaleString("en-AU");
  const LABEL = {
    q: (v) => `“${v}”`,
    make: (v) => v,
    model: (v) => v,
    body: (v) => v,
    year: (v) => `${v} or newer`,
    max: (v) => `Under ${money(v)}`,
    km: (v) => `Under ${Number(v).toLocaleString("en-AU")} km`,
    trans: (v) => v,
    status: (v) => (v === "available" ? "Available" : "Under contract"),
  };
  const field = (k) => form.elements[k];
  const state = () => Object.fromEntries(KEYS.filter((k) => field(k) && field(k).value.trim()).map((k) => [k, field(k).value.trim()]));

  // forgiving text search: every word must start a word on the car; hyphens and spaces do not matter ("gtr" finds GT-R)
  const squash = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "");
  cards.forEach((c) => {
    const t = c.q.split(/[^a-z0-9]+/).filter(Boolean);
    c.forms = [...t, ...t.slice(1).map((w, i) => t[i] + w)]; // single words, and neighbours joined: "gt" + "r"
  });
  const match = (c, s) => {
    if (s.make && c.make !== s.make) return false;
    if (s.model && c.model !== s.model) return false;
    if (s.body && c.body !== s.body) return false;
    if (s.year && c.year < Number(s.year)) return false;
    if (s.max && !(c.price && c.price <= Number(s.max))) return false;
    if (s.km && !(c.km != null && c.km <= Number(s.km))) return false;
    if (s.trans && c.trans !== s.trans) return false;
    if (s.status && c.status !== s.status) return false;
    if (s.q) {
      const words = s.q.toLowerCase().split(/\s+/).filter(Boolean);
      if (!words.every((w) => c.forms.some((f) => f.startsWith(squash(w))))) return false;
    }
    return true;
  };
  const ORDER = {
    "": (a, b) => a.i - b.i,
    "price-asc": (a, b) => (a.price || Infinity) - (b.price || Infinity) || a.i - b.i,
    "price-desc": (a, b) => (b.price || -1) - (a.price || -1) || a.i - b.i,
    "km-asc": (a, b) => (a.km ?? Infinity) - (b.km ?? Infinity) || a.i - b.i,
    "year-desc": (a, b) => b.year - a.year || a.i - b.i,
    "year-asc": (a, b) => a.year - b.year || a.i - b.i,
  };

  // the model list follows the chosen make
  const modelSel = field("model");
  const allModels = $$("option[data-make]", modelSel);
  const syncModels = () => {
    const make = field("make").value;
    allModels.forEach((o) => {
      o.hidden = o.disabled = !!make && o.dataset.make !== make;
      o.textContent = make ? o.value : `${o.dataset.make} ${o.value}`;
    });
    if (modelSel.selectedOptions[0]?.disabled) modelSel.value = "";
  };

  let onPaint = null;
  let shown = cards.length;
  const setCount = (n) => {
    $$("[data-tally]").forEach((el) => {
      if (el.textContent === String(n)) return;
      el.textContent = n;
      el.classList.remove("is-tick");
      void el.offsetWidth;
      el.classList.add("is-tick");
    });
    $$("[data-tally-w]").forEach((el) => (el.textContent = n === 1 ? "car" : "cars"));
  };

  const paint = (s) => {
    const list = cards.filter((c) => match(c, s)).sort(ORDER[sort.value] || ORDER[""]);
    const keep = new Set(list);
    cards.forEach((c) => (c.el.hidden = !keep.has(c)));
    list.forEach((c, n) => {
      c.el.style.setProperty("--n", n);
      grid.append(c.el);
    });
    shown = list.length;
    empty.hidden = shown > 0;
    grid.hidden = shown === 0;
  };

  const renderChips = (s) => {
    const keys = Object.keys(s);
    chips.textContent = "";
    chips.hidden = keys.length === 0;
    badge.hidden = keys.length === 0;
    badge.textContent = keys.length;
    keys.forEach((k) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "fchip";
      b.setAttribute("aria-label", `Remove filter: ${LABEL[k](s[k])}`);
      b.innerHTML = `<span></span><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m2.5 2.5 7 7M9.5 2.5l-7 7"/></svg>`;
      b.firstChild.textContent = LABEL[k](s[k]);
      b.addEventListener("click", () => {
        field(k).value = "";
        apply();
      });
      chips.append(b);
    });
    if (keys.length > 1) {
      const c = document.createElement("button");
      c.type = "button";
      c.className = "fchip fchip--clear";
      c.textContent = "Clear all";
      c.addEventListener("click", clear);
      chips.append(c);
    }
  };

  const writeUrl = (s) => {
    const p = new URLSearchParams(s);
    if (sort.value) p.set("sort", sort.value);
    const qs = p.toString();
    history.replaceState(null, "", location.pathname + (qs ? "?" + qs : ""));
  };

  // the grid reflows: cards on screen glide to their new places where the browser can do it,
  // otherwise the new set rises in
  const apply = ({ url = true, animate = true } = {}) => {
    syncModels();
    const s = state();
    const run = () => {
      paint(s);
      renderChips(s);
      setCount(shown);
      onPaint && onPaint();
    };
    const near = animate && !calm ? cards.filter((c) => !c.el.hidden && c.el.getBoundingClientRect().top < innerHeight * 1.2 && c.el.getBoundingClientRect().bottom > -200).slice(0, 14) : [];
    if (animate && !calm && document.startViewTransition && near.length) {
      near.forEach((c) => (c.el.style.viewTransitionName = "c" + c.i));
      const t = document.startViewTransition(run);
      t.finished.finally(() => near.forEach((c) => (c.el.style.viewTransitionName = "")));
    } else {
      run();
      if (animate && !calm) {
        grid.classList.remove("is-fresh");
        void grid.offsetWidth;
        grid.classList.add("is-fresh");
      }
    }
    if (url) writeUrl(s);
  };
  const clear = () => {
    KEYS.forEach((k) => field(k) && (field(k).value = ""));
    apply();
  };

  // start from the address, so a shared link opens on the same view
  const params = new URLSearchParams(location.search);
  KEYS.forEach((k) => {
    const el = field(k);
    if (!el || !params.has(k)) return;
    const v = params.get(k);
    if (el.tagName === "SELECT") {
      const o = [...el.options].find((o) => o.value.toLowerCase() === v.toLowerCase());
      if (o) el.value = o.value;
    } else el.value = v;
  });
  if (params.has("sort") && ORDER[params.get("sort")]) sort.value = params.get("sort");
  apply({ url: false, animate: false });

  let typing = 0;
  form.addEventListener("input", (e) => {
    if (e.target.type === "search") {
      clearTimeout(typing);
      typing = setTimeout(apply, 140);
    } else apply();
  });
  sort.addEventListener("change", () => apply());
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    apply();
    if (sheet.open) sheet.close();
    field("q").blur();
  });
  form.addEventListener("reset", (e) => {
    e.preventDefault();
    clear();
  });
  $$("[data-flt-reset]").forEach((b) => b.type !== "reset" && b.addEventListener("click", clear));

  // desk: the less-used filters sit behind "More filters", and open by themselves if one is set
  const moreBtn = $("[data-flt-more]", form);
  const moreN = $("[data-flt-more-n]", form);
  const fbody = $(".flt__body", form);
  const MORE = $$("[data-flt-more-box] select", form).map((el) => el.name);
  const setMore = (on) => {
    fbody.classList.toggle("is-more", on);
    moreBtn.setAttribute("aria-expanded", on);
  };
  const countMore = () => {
    const n = MORE.filter((k) => field(k).value).length;
    moreN.hidden = n === 0;
    moreN.textContent = n;
    return n;
  };
  moreBtn.addEventListener("click", () => setMore(!fbody.classList.contains("is-more")));
  if (countMore()) setMore(true);
  onPaint = countMore;

  // phone: the form lives in a sheet; desk: it sits above the grid
  const wide = matchMedia("(min-width: 1000px)");
  const place = () => {
    if (wide.matches) {
      if (sheet.open) sheet.close();
      inline.append(form);
    } else sheet.append(form);
  };
  place();
  wide.addEventListener("change", place);
  $("[data-flt-open]").addEventListener("click", () => sheet.showModal());
  $("[data-flt-close]", form).addEventListener("click", () => sheet.close());
  sheet.addEventListener("click", (e) => e.target === sheet && sheet.close()); // a tap on the backdrop
  sheet.addEventListener("close", () => {
    const top = root.querySelector(".flt").getBoundingClientRect().top;
    if (top < 0 || shown === 0) grid.scrollIntoView({ block: "start", behavior: calm ? "auto" : "smooth" });
  });
})();
