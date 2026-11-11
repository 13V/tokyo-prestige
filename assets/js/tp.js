// Tokyo Prestige: shared behaviour. Every page is complete without this file; it adds the motion.
(() => {
  "use strict";
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // header: clear over a hero, solid once the page moves
  const hdr = document.querySelector("[data-hdr]");
  if (hdr && !hdr.classList.contains("hdr--solid")) {
    const set = () => hdr.classList.toggle("is-solid", scrollY > 24);
    set();
    addEventListener("scroll", set, { passive: true });
  }

  // phone menu: Escape closes it, and it closes if the screen widens
  const menu = document.querySelector("[data-menu]");
  if (menu) {
    addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.open) {
        menu.open = false;
        menu.querySelector("summary").focus();
      }
    });
    menu.addEventListener("toggle", () => {
      document.documentElement.style.overflow = menu.open ? "hidden" : "";
      if (menu.open) hdr?.classList.add("is-solid");
      else if (hdr && !hdr.classList.contains("hdr--solid")) hdr.classList.toggle("is-solid", scrollY > 24);
    });
    matchMedia("(min-width: 1100px)").addEventListener("change", (e) => e.matches && (menu.open = false));
  }

  // reveals: play once as a block comes into view
  const reveals = $$("[data-reveal]");
  if (calm || !("IntersectionObserver" in window)) reveals.forEach((el) => el.classList.add("is-in"));
  else {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    reveals.forEach((el) => io.observe(el));
  }

  // numbers count to their value once (the value is already in the page)
  const counts = $$("[data-count]");
  if (counts.length && !calm && "IntersectionObserver" in window) {
    const fmt = new Intl.NumberFormat("en-AU");
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          const el = e.target;
          const to = Number(el.dataset.count);
          const from = Number(el.dataset.from ?? (to > 3000 ? to * 0.94 : to > 1900 ? to - 12 : 0));
          const plain = el.hasAttribute("data-plain");
          const pre = el.dataset.pre || "";
          const t0 = performance.now();
          const dur = 1100;
          const step = (t) => {
            const p = Math.min(1, (t - t0) / dur);
            const v = Math.round(from + (to - from) * (1 - Math.pow(1 - p, 4)));
            el.textContent = pre + (plain ? v : fmt.format(v));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }),
      { threshold: 0.6 },
    );
    counts.forEach((el) => io.observe(el));
  }

  // stock cards: the photo eases through the car's angles, on hover with a mouse,
  // or once as the card passes the middle of a phone screen. Extra photos load only then.
  const cards = $$("[data-card]");
  const prep = (card) => {
    if (card._imgs) return card._imgs;
    const shot = card.querySelector(".card__shot");
    const first = shot.querySelector("img");
    const id = card.dataset.id;
    const imgs = [first];
    card.dataset.angles
      .split(",")
      .slice(1)
      .forEach((n) => {
        const im = new Image();
        im.decoding = "async";
        im.alt = "";
        im.width = first.width;
        im.height = first.height;
        im.sizes = first.sizes;
        im.srcset = `/img/cars/${id}/${n}-480.avif 480w, /img/cars/${id}/${n}-960.avif 960w`;
        im.src = `/img/cars/${id}/${n}-480.avif`;
        first.after(im);
        imgs.push(im);
      });
    // put them in order after the first
    imgs.slice(1).forEach((im) => shot.insertBefore(im, shot.querySelector(".card__top")));
    card._imgs = imgs;
    card._i = 0;
    return imgs;
  };
  const show = (card, i) => {
    const imgs = prep(card);
    const next = imgs[i];
    const go = () => {
      imgs.forEach((im, k) => {
        im.classList.toggle("is-on", k === i && k !== 0);
        if (k === 0) im.classList.toggle("is-off", i !== 0);
      });
      $$(".card__ticks i", card).forEach((t, k) => t.classList.toggle("is-on", k === i));
      card._i = i;
    };
    if (next.complete && next.naturalWidth) go();
    else next.addEventListener("load", go, { once: true });
  };
  if (cards.length && !calm) {
    if (fine) {
      cards.forEach((card) => {
        let timer = 0;
        const stop = () => {
          clearInterval(timer);
          timer = 0;
          if (card._imgs) show(card, 0);
        };
        card.addEventListener("pointerenter", () => {
          const n = card.dataset.angles.split(",").length;
          if (n < 2 || timer) return;
          prep(card);
          let i = 0;
          timer = setInterval(() => show(card, (i = (i + 1) % n)), 1150);
          setTimeout(() => timer && show(card, (i = 1)), 180);
        });
        card.addEventListener("pointerleave", stop);
      });
    } else if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (es) =>
          es.forEach((e) => {
            const card = e.target;
            if (e.isIntersecting) {
              card.classList.add("is-seen");
              const n = card.dataset.angles.split(",").length;
              if (n < 3 || card._played) return;
              card._played = true;
              card.querySelector(".card__ticks").style.opacity = 1;
              setTimeout(() => show(card, 2), 500);
              setTimeout(() => show(card, 0), 2600);
            } else card.classList.remove("is-seen");
          }),
        { rootMargin: "-38% 0px -38% 0px" },
      );
      cards.forEach((c) => io.observe(c));
    }
  }

  // plain forms (contact, servicing, finance, stock alert): check name and a way to reply, then thank.
  // HOOK: when a form's data-endpoint is set, POST its fields there and thank only on a 200.
  $$("form[data-form]").forEach((form) => {
    const okContact = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || v.replace(/[^\d]/g, "").length >= 8;
    const rule = (el) => (el.name === "contact" || el.type === "tel" ? okContact(el.value.trim()) : el.type === "email" ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim()) : el.value.trim().length > 1);
    const check = (el) => {
      const ok = rule(el);
      el.setAttribute("aria-invalid", ok ? "false" : "true");
      const err = el.parentElement.querySelector(".field__err");
      if (err) err.hidden = ok;
      return ok;
    };
    const required = $$("[required]", form);
    required.forEach((el) => el.addEventListener("input", () => el.getAttribute("aria-invalid") === "true" && check(el)));
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const bad = required.filter((el) => !check(el));
      if (bad.length) return bad[0].focus();
      const who = (form.elements.name?.value || "").trim().split(/\s+/)[0];
      const done = document.createElement("div");
      done.className = "form__done";
      done.tabIndex = -1;
      done.innerHTML = `<span class="form__seal" aria-hidden="true"><svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6"><path d="m3.5 9.5 3.5 3.5 7.5-8"/></svg></span><h3 class="h3"></h3><p class="lede"></p><p class="ph__tag">Demo: nothing was sent</p>`;
      done.querySelector("h3").textContent = who ? `Thanks, ${who}.` : "Thanks.";
      done.querySelector("p").textContent = form.dataset.done || "The team will be in touch during opening hours.";
      form.hidden = true;
      form.after(done);
      done.focus({ preventScroll: true });
      done.scrollIntoView({ block: "center", behavior: calm ? "auto" : "smooth" });
    });
  });

  // the switch between the two looks: "night" (the default) and "figures". Remembered on this device.
  const root = document.documentElement;
  const looks = $$("[data-look-set]");
  const paint = () => looks.forEach((b) => b.setAttribute("aria-pressed", String((root.dataset.look || "night") === b.dataset.lookSet)));
  // the second look's stylesheet: fetched when the page is idle, so the switch is instant, and never in the way of the first paint
  let sheet = null;
  const figuresCss = () =>
    (sheet ||= new Promise((done) => {
      if (document.querySelector("link[data-figures]")) return done();
      const l = document.createElement("link");
      l.rel = "stylesheet";
      l.href = "/assets/css/figures.css";
      l.dataset.figures = "";
      l.onload = l.onerror = () => done();
      document.head.append(l);
    }));
  addEventListener("load", () => (window.requestIdleCallback || setTimeout)(figuresCss), { once: true });
  const setLook = async (name) => {
    if (name === "figures") await figuresCss();
    const apply = () => {
      if (name === "figures") root.dataset.look = "figures";
      else delete root.dataset.look;
      paint();
      document.dispatchEvent(new CustomEvent("tp:look"));
    };
    try {
      localStorage.setItem("tp-look", name);
    } catch (e) {}
    if (!calm && document.startViewTransition) document.startViewTransition(apply);
    else apply();
  };
  looks.forEach((b) => b.addEventListener("click", () => (root.dataset.look || "night") !== b.dataset.lookSet && setLook(b.dataset.lookSet)));
  paint();

  // a car's photo travels from its card to its page (where the browser supports it)
  if (!calm && "startViewTransition" in document) {
    addEventListener("click", (e) => {
      const a = e.target.closest?.("[data-card] a, a.hero__plate");
      if (!a) return;
      const img = a.closest("[data-card]")?.querySelector(".card__shot img");
      $$("[style*='view-transition-name']").forEach((el) => (el.style.viewTransitionName = ""));
      if (img) img.style.viewTransitionName = "car-photo";
    });
  }
})();
