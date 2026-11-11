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
  let paused = calm;
  let userPaused = false;
  let run = null; // the progress animation on the active bar

  // the other cars' photos load once the page is idle, never before the first paint is done
  const loaded = new Set([0]);
  const load = (i) => {
    if (loaded.has(i)) return;
    loaded.add(i);
    $$("img[data-src]", slides[i]).forEach((im) => {
      im.srcset = im.dataset.srcset;
      im.src = im.dataset.src;
    });
  };
  const ready = (i) => {
    load(i);
    const im = $(".hs__img", slides[i]);
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
    const p = calm || userPaused || hovering || focused || !visible || document.hidden;
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
    new IntersectionObserver((es) => es.forEach((e) => ((visible = e.isIntersecting), setPaused())), { threshold: 0.35 }).observe(hero);
    // start the clock once the first reveal has played
    setTimeout(progress, 2600);
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

  // with a mouse: the photo leans a little toward the pointer and a torch follows it through the dark
  const frame = $("[data-frame]", hero);
  const torch = $("[data-torch]", hero);
  if (!calm && matchMedia("(hover: hover) and (pointer: fine)").matches && frame && torch) {
    let raf = 0;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    let live = false;
    const tick = () => {
      x += (tx - x) * 0.09;
      y += (ty - y) * 0.09;
      const r = frame.getBoundingClientRect();
      torch.style.transform = `translate3d(${(x - r.left).toFixed(1)}px, ${(y - r.top).toFixed(1)}px, 0)`;
      const hr = hero.getBoundingClientRect();
      frame.style.setProperty("--px", (((x - hr.left) / hr.width) * 2 - 1).toFixed(3));
      frame.style.setProperty("--py", (((y - hr.top) / hr.height) * 2 - 1).toFixed(3));
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.3 ? requestAnimationFrame(tick) : 0;
    };
    hero.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse") return;
      tx = e.clientX;
      ty = e.clientY;
      if (!live) {
        live = true;
        x = tx;
        y = ty;
        torch.classList.add("is-on");
      }
      if (!raf) raf = requestAnimationFrame(tick);
    });
    hero.addEventListener("pointerleave", () => {
      live = false;
      torch.classList.remove("is-on");
    });
  }
})();
