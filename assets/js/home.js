// Home: the search button counts matching cars, and the hero turns through four featured cars.
// Without this file the hero shows the first car, lit, and the search is a plain form.
(() => {
  "use strict";
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // ---------- search: a live count ----------
  const form = $("[data-find]");
  const data = $("#find-index");
  if (form && data) {
    const cars = JSON.parse(data.textContent);
    const n = $("[data-find-n]", form);
    const w = $("[data-find-w]", form);
    const update = () => {
      const q = form.q.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
      const make = form.make.value;
      const body = form.body.value;
      const max = Number(form.max.value) || 0;
      const count = cars.filter(([m, b, p, , text]) => (!make || m === make) && (!body || b === body) && (!max || (p && p <= max)) && q.every((t) => text.includes(t))).length;
      if (String(count) !== n.textContent) {
        n.textContent = count;
        n.classList.remove("is-tick");
        void n.offsetWidth;
        n.classList.add("is-tick");
      }
      w.textContent = count === 1 ? "car" : "cars";
    };
    form.addEventListener("input", update);
    // leave empty fields out of the address, so a search link stays short
    form.addEventListener("submit", () => [...form.elements].forEach((el) => el.name && !el.value && (el.disabled = true)));
    addEventListener("pageshow", () => {
      [...form.elements].forEach((el) => (el.disabled = false));
      update();
    });
  }

  // ---------- hero: the featured cars ----------
  const hero = $("[data-hero]");
  const feat = $("[data-feat]");
  const slides = $$("[data-hs]");
  const fd = $("#feat-data");
  if (!hero || !feat || slides.length < 2 || !fd) return;
  const cars = JSON.parse(fd.textContent);
  const bars = $$("[data-feat-go]", feat);
  const link = $("[data-feat-link]", feat);
  const toggle = $("[data-feat-toggle]", feat);
  const f = (k) => $(`[data-f="${k}"]`, feat);
  const HOLD = 7000;
  let at = 0;
  let busy = false;
  const mine = () => document.documentElement.dataset.look !== "figures"; // this hero belongs to the dark look
  let paused = calm || !mine();
  let userPaused = false;
  let run = null; // the progress animation on the active bar

  // the other cars' photos load once the page is idle, never before the first paint is done
  const loaded = new Set([0]);
  const load = (i) => {
    if (loaded.has(i)) return;
    loaded.add(i);
    $$("source[data-srcset]", slides[i]).forEach((so) => (so.srcset = so.dataset.srcset));
    $$("img[data-src]", slides[i]).forEach((im) => {
      im.srcset = im.dataset.srcset;
      im.src = im.dataset.src;
    });
  };
  const ready = (i) => {
    load(i);
    const im = $(".hs__img", slides[i]) || $(".hs__room", slides[i]);
    return im.complete && im.naturalWidth ? Promise.resolve() : (im.decode ? im.decode().catch(() => {}) : new Promise((r) => im.addEventListener("load", r, { once: true })));
  };
  const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 1200));
  addEventListener("load", () => idle(() => load(1)), { once: true });

  // text rolls to its next value, character by character, like an odometer
  const roll = (el, text, { stagger = 26, dur = 620, delay = 0 } = {}) => {
    if (!el || el.textContent === text) return;
    if (calm) return void (el.textContent = text);
    const old = el.textContent;
    const box = document.createElement("span");
    box.className = "roll";
    const o = document.createElement("span");
    o.className = "roll__old";
    o.textContent = old;
    box.append(o);
    const chars = [...text].map((ch) => {
      const s = document.createElement("span");
      s.className = "roll__ch";
      s.textContent = ch;
      box.append(s);
      return s;
    });
    el.textContent = "";
    el.append(box);
    o.animate([{ transform: "translateY(0)", opacity: 1 }, { transform: "translateY(-70%)", opacity: 0 }], { duration: 300, delay, easing: "cubic-bezier(.65,0,.35,1)", fill: "both" });
    const anims = chars.map((s, i) => s.animate([{ transform: "translateY(105%)", opacity: 0 }, { transform: "translateY(0)", opacity: 1 }], { duration: dur, delay: delay + 140 + i * stagger, easing: "cubic-bezier(.16,1,.3,1)", fill: "both" }));
    Promise.all(anims.map((a) => a.finished))
      .then(() => el.contains(box) && (el.textContent = text))
      .catch(() => {});
  };

  const progress = () => {
    run?.cancel();
    run = null;
    bars.forEach((b, i) => {
      b.classList.toggle("is-on", i === at);
      b.classList.toggle("is-done", i < at);
      i === at ? b.setAttribute("aria-current", "true") : b.removeAttribute("aria-current");
    });
    if (calm) return;
    const bar = bars[at].firstElementChild;
    run = bar.animate([{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], { duration: HOLD, easing: "linear", fill: "both" });
    run.onfinish = () => go(at + 1);
    if (paused) run.pause();
  };

  const go = async (n) => {
    n = (n + slides.length) % slides.length;
    if (busy || n === at) return;
    busy = true;
    run?.pause();
    await ready(n);
    const from = slides[at];
    const to = slides[n];
    const c = cars[n];
    // 1. lights out on the car that is leaving
    from.classList.add("is-out");
    // 2. the plate rolls over to the next car
    roll(f("idx"), String(n + 1).padStart(2, "0"));
    roll(f("jp"), c.jp, { stagger: 18, delay: 60 });
    roll(f("title"), c.title, { stagger: 14, delay: 100 });
    roll(f("code"), c.code, { stagger: 40, delay: 180 });
    roll(f("km"), c.km, { stagger: 34, delay: 240 });
    roll(f("note"), c.note, { stagger: 6, delay: 280 });
    roll(f("price"), c.price, { stagger: 34, delay: 300 });
    link.href = c.url;
    await new Promise((r) => setTimeout(r, calm ? 0 : 430));
    // 3. the next car: the room fades up, one band of light crosses it, its lamp comes on
    slides.forEach((s) => s.classList.remove("is-prev"));
    from.classList.remove("is-on");
    from.classList.add("is-prev");
    to.classList.add("is-on");
    at = n;
    progress();
    load((n + 1) % slides.length);
    setTimeout(
      () => {
        from.classList.remove("is-prev", "is-out");
        busy = false;
      },
      calm ? 0 : 1150,
    );
  };

  bars.forEach((b) => b.addEventListener("click", () => go(Number(b.dataset.featGo))));
  $("[data-feat-prev]", feat).addEventListener("click", () => go(at - 1));
  $("[data-feat-next]", feat).addEventListener("click", () => go(at + 1));
  feat.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") go(at + 1);
    if (e.key === "ArrowLeft") go(at - 1);
  });

  // it rests while it is hovered, focused, off screen or in a hidden tab, and there is a pause button
  const setPaused = () => {
    const p = calm || userPaused || hovering || focused || !visible || document.hidden || !mine();
    if (p === paused) return;
    paused = p;
    if (run) paused ? run.pause() : run.play();
  };
  let hovering = false;
  let focused = false;
  let visible = true;
  if (!calm) {
    toggle.hidden = false;
    toggle.addEventListener("click", () => {
      userPaused = !userPaused;
      toggle.classList.toggle("is-paused", userPaused);
      toggle.setAttribute("aria-label", userPaused ? "Play the featured cars" : "Pause the featured cars");
      setPaused();
    });
    // a mouse resting on it or keyboard focus inside it; a tap on a phone must not leave it stopped
    feat.addEventListener("pointerenter", (e) => e.pointerType === "mouse" && ((hovering = true), setPaused()));
    feat.addEventListener("pointerleave", () => ((hovering = false), setPaused()));
    feat.addEventListener("focusin", (e) => ((focused = e.target.matches(":focus-visible")), setPaused()));
    feat.addEventListener("focusout", () => ((focused = false), setPaused()));
    document.addEventListener("visibilitychange", setPaused);
    document.addEventListener("tp:look", setPaused);
    new IntersectionObserver((es) => es.forEach((e) => ((visible = e.isIntersecting), setPaused())), { threshold: 0.35 }).observe(hero);
    // start the clock once the first reveal has played
    setTimeout(progress, 2600);
  }

  const root = document.documentElement;

  // the featured car idles: its loop plays only while that car is showing, on screen, in the dark look
  const alive = $("[data-alive]", hero);
  if (alive && !calm && !(navigator.connection && navigator.connection.saveData)) {
    let got = false;
    const aliveSet = () => {
      const on = mine() && visible && !document.hidden && alive.closest("[data-hs]").classList.contains("is-on");
      if (on && !got) {
        got = true;
        alive.src = alive.dataset.src;
        alive.addEventListener("playing", () => alive.classList.add("is-on"), { once: true });
      }
      if (!got) return;
      on ? alive.play().catch(() => {}) : alive.pause();
    };
    new MutationObserver(aliveSet).observe(hero, { attributes: true, attributeFilter: ["class"], subtree: true });
    new MutationObserver(aliveSet).observe(root, { attributes: true, attributeFilter: ["class", "data-look"] });
    new IntersectionObserver(() => setTimeout(aliveSet, 0), { threshold: 0.35 }).observe(hero);
    document.addEventListener("visibilitychange", aliveSet);
    addEventListener("load", () => setTimeout(aliveSet, 1500), { once: true });
  }

  // on a phone, a swipe across the photo changes the car
  let sx = null;
  hero.addEventListener("touchstart", (e) => (sx = e.touches[0].clientY < hero.clientHeight * 0.5 && !e.target.closest("a,button,input,select") ? e.touches[0].clientX : null), { passive: true });
  hero.addEventListener(
    "touchend",
    (e) => {
      if (sx == null) return;
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 48) go(at + (dx < 0 ? 1 : -1));
      sx = null;
    },
    { passive: true },
  );
})();

(() => {
  "use strict";
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // ---------- the second look, "The figures": the same four cars, each introduced by four figures ----------
  const hero = $("[data-fhero]");
  const feat = $("[data-ffeat]");
  const pics = $$("[data-fhs]");
  const fd = $("#ffeat-data");
  if (!hero || !feat || pics.length < 2 || !fd) return;
  const mine = () => document.documentElement.dataset.look === "figures"; // this hero belongs to the figures look
  const cars = JSON.parse(fd.textContent);
  const tabs = $$("[data-ffeat-go]", feat);
  const links = $$("[data-ffeat-link]", hero);
  const book = $("[data-ffeat-book]", hero);
  const toggle = $("[data-ffeat-toggle]", feat);
  const f = (k) => $(`[data-ff="${k}"]`, hero);
  const HOLD = 7000;
  let at = 0;
  let busy = false;
  let paused = calm || !mine();
  let userPaused = false;
  let run = null; // the fill on the active car's pill

  // the other cars' photos load once the page is idle, never before the first paint is done
  const loaded = new Set();
  const load = (i) => {
    if (loaded.has(i)) return;
    loaded.add(i);
    pics[i].srcset = pics[i].dataset.srcset;
    pics[i].src = pics[i].dataset.src;
  };
  const ready = (i) => {
    load(i);
    const im = pics[i];
    return im.complete && im.naturalWidth ? Promise.resolve() : im.decode ? im.decode().catch(() => {}) : new Promise((r) => im.addEventListener("load", r, { once: true }));
  };
  const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 1200));
  // nothing here is fetched until this look is the one on screen
  const wake = () => {
    if (!mine()) return;
    load(0);
    idle(() => load(1));
  };
  wake();
  document.addEventListener("tp:look", wake);

  // a figure rolls to its next value, character by character, like an odometer
  const roll = (el, text, { stagger = 26, dur = 620, delay = 0 } = {}) => {
    if (!el || el.textContent === text) return;
    if (calm) return void (el.textContent = text);
    const box = document.createElement("span");
    box.className = "froll";
    const o = document.createElement("span");
    o.className = "froll__old";
    o.textContent = el.textContent;
    const nw = document.createElement("span");
    nw.className = "froll__new";
    const chars = [...text].map((ch) => {
      const c = document.createElement("span");
      c.className = "froll__ch";
      c.textContent = ch;
      nw.append(c);
      return c;
    });
    box.append(o, nw);
    el.textContent = "";
    el.append(box);
    o.animate([{ transform: "translateY(0)", opacity: 1 }, { transform: "translateY(-70%)", opacity: 0 }], { duration: 300, delay, easing: "cubic-bezier(.65,0,.35,1)", fill: "both" });
    const anims = chars.map((c, i) => c.animate([{ transform: "translateY(105%)", opacity: 0 }, { transform: "translateY(0)", opacity: 1 }], { duration: dur, delay: delay + 140 + i * stagger, easing: "cubic-bezier(.16,1,.3,1)", fill: "both" }));
    Promise.all(anims.map((a) => a.finished))
      .then(() => el.contains(box) && (el.textContent = text))
      .catch(() => {});
  };

  const progress = () => {
    run?.cancel();
    run = null;
    tabs.forEach((b, i) => {
      b.classList.toggle("is-on", i === at);
      i === at ? b.setAttribute("aria-current", "true") : b.removeAttribute("aria-current");
    });
    if (calm) return;
    run = tabs[at].firstElementChild.animate([{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], { duration: HOLD, easing: "linear", fill: "both" });
    run.onfinish = () => go(at + 1);
    if (paused) run.pause();
  };

  const go = async (n) => {
    n = (n + pics.length) % pics.length;
    if (busy || n === at) return;
    busy = true;
    run?.pause();
    await ready(n);
    const c = cars[n];
    pics[at].classList.remove("is-on");
    pics[n].classList.add("is-on");
    roll(f("kick"), c.kick, { stagger: 5, dur: 420 });
    roll(f("title"), c.title, { stagger: 16, delay: 40 });
    roll(f("sub"), c.sub, { stagger: 6, dur: 460, delay: 90 });
    roll(f("year"), c.year, { stagger: 40, delay: 140 });
    roll(f("km"), c.km, { stagger: 34, delay: 200 });
    roll(f("gear"), c.gear, { stagger: 30, delay: 260 });
    roll(f("gearu"), c.gearu, { stagger: 8, dur: 460, delay: 300 });
    roll(f("price"), c.price, { stagger: 34, delay: 320 });
    const nEl = f("n");
    if (nEl) nEl.textContent = `1 of ${c.n} photos`;
    links.forEach((a) => (a.href = c.url));
    if (book) book.href = c.url + "#enquire";
    at = n;
    progress();
    load((n + 1) % pics.length);
    setTimeout(() => (busy = false), calm ? 0 : 900);
  };

  tabs.forEach((b) => b.addEventListener("click", () => go(Number(b.dataset.ffeatGo))));
  feat.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") go(at + 1);
    if (e.key === "ArrowLeft") go(at - 1);
  });

  // it rests while it is hovered, focused, off screen or in a hidden tab, and there is a pause button
  let hovering = false;
  let focused = false;
  let visible = true;
  const setPaused = () => {
    const p = calm || userPaused || hovering || focused || !visible || document.hidden || !mine();
    if (p === paused) return;
    paused = p;
    if (run) paused ? run.pause() : run.play();
  };
  if (!calm) {
    toggle.hidden = false;
    toggle.addEventListener("click", () => {
      userPaused = !userPaused;
      toggle.classList.toggle("is-paused", userPaused);
      toggle.setAttribute("aria-label", userPaused ? "Play the featured cars" : "Pause the featured cars");
      setPaused();
    });
    // a mouse resting on it or keyboard focus inside it; a tap on a phone must not leave it stopped
    hero.addEventListener("pointerenter", (e) => e.pointerType === "mouse" && ((hovering = true), setPaused()));
    hero.addEventListener("pointerleave", () => ((hovering = false), setPaused()));
    hero.addEventListener("focusin", (e) => ((focused = e.target.matches(":focus-visible")), setPaused()));
    hero.addEventListener("focusout", () => ((focused = false), setPaused()));
    document.addEventListener("visibilitychange", setPaused);
    document.addEventListener("tp:look", setPaused);
    new IntersectionObserver((es) => es.forEach((e) => ((visible = e.isIntersecting), setPaused())), { threshold: 0.35 }).observe(feat);
    setTimeout(progress, 1200);
  }

  // on a phone, a swipe across the photo changes the car
  let sx = null;
  feat.addEventListener("touchstart", (e) => (sx = e.target.closest("button") ? null : e.touches[0].clientX), { passive: true });
  feat.addEventListener(
    "touchend",
    (e) => {
      if (sx == null) return;
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 48) go(at + (dx < 0 ? 1 : -1));
      sx = null;
    },
    { passive: true },
  );
})();
