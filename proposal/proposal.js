// The proposal page. Reveals, counting figures, the direction tabs, the journey of a car, clips that play
// only while on screen, the lamp that follows the pointer and the name in the footer that it lights.
// Without this file the page is complete: everything is shown, one section under the other.
(() => {
  "use strict";
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // ---------- reveals ----------
  const reveals = $$(".reveal");
  if (calm || !("IntersectionObserver" in window)) reveals.forEach((el) => el.classList.add("is-in"));
  else {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
          $$("[data-count]", e.target).forEach(count);
        }),
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );
    reveals.forEach((el) => io.observe(el));
  }

  // ---------- figures count up to their value ----------
  function count(el) {
    if (calm) return;
    const to = Number(el.dataset.count);
    const dp = Number(el.dataset.dp || 0);
    const t0 = performance.now();
    const dur = 1400;
    const step = (t) => {
      const k = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - k, 4);
      el.textContent = (to * e).toFixed(dp);
      if (k < 1) requestAnimationFrame(step);
      else el.textContent = to.toFixed(dp);
    };
    requestAnimationFrame(step);
  }

  // ---------- tabs (the directions, and the journey) ----------
  const tabs = (list, onChange) => {
    const btns = $$('[role="tab"]', list);
    const select = (i, focus) => {
      i = Math.max(0, Math.min(btns.length - 1, i));
      btns.forEach((b, n) => {
        const on = n === i;
        b.setAttribute("aria-selected", on);
        b.tabIndex = on ? 0 : -1;
        document.getElementById(b.getAttribute("aria-controls")).hidden = !on;
      });
      if (focus) btns[i].focus();
      onChange?.(i, btns);
    };
    btns.forEach((b, n) => {
      b.addEventListener("click", () => select(n));
      b.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") select(n + 1, true);
        if (e.key === "ArrowLeft") select(n - 1, true);
      });
    });
    return { select, at: () => btns.findIndex((b) => b.getAttribute("aria-selected") === "true"), n: btns.length };
  };
  const seg = $(".seg");
  if (seg) tabs(seg);

  const flow = $("[data-flow]");
  if (flow) {
    const rail = $(".rail", flow);
    const prev = $("[data-flow-prev]", flow);
    const next = $("[data-flow-next]", flow);
    const at = $("[data-flow-at]", flow);
    const t = tabs(rail, (i, btns) => {
      rail.style.setProperty("--p", i / (btns.length - 1));
      btns.forEach((b, n) => b.classList.toggle("done", n < i));
      prev.disabled = i === 0;
      next.disabled = i === btns.length - 1;
      at.textContent = `${i + 1} of ${btns.length}`;
    });
    prev.addEventListener("click", () => t.select(t.at() - 1));
    next.addEventListener("click", () => t.select(t.at() + 1));
  }

  // ---------- clips play only while they are on screen ----------
  const clips = $$("video[data-clip]");
  const saver = navigator.connection && navigator.connection.saveData;
  if (calm || saver) clips.forEach((v) => (v.controls = true));
  else if ("IntersectionObserver" in window) {
    const vo = new IntersectionObserver((es) => es.forEach((e) => (e.isIntersecting ? e.target.play().catch(() => (e.target.controls = true)) : e.target.pause())), { threshold: 0.4 });
    clips.forEach((v) => vo.observe(v));
  }

  // ---------- the page's progress, and the section you are in ----------
  const prog = $("[data-prog]");
  const links = $$(".hdr nav a");
  const secs = links.map((a) => $(a.getAttribute("href")));
  let ticking = false;
  const onScroll = () => {
    ticking = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    prog.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
    let on = -1;
    secs.forEach((s, i) => s && s.getBoundingClientRect().top < innerHeight * 0.4 && (on = i));
    links.forEach((a, i) => a.classList.toggle("on", i === on));
  };
  addEventListener("scroll", () => ticking || ((ticking = true), requestAnimationFrame(onScroll)), { passive: true });
  onScroll();

  // ---------- the lamp, and the name it lights ----------
  if (calm) return;
  const lamp = document.createElement("div");
  lamp.className = "lamp";
  lamp.setAttribute("aria-hidden", "true");
  document.body.append(lamp);
  const mark = $("[data-wordmark]");
  let lit = null;
  if (mark) {
    lit = document.createElement("span");
    lit.className = "lit";
    lit.textContent = mark.textContent;
    mark.append(lit);
    mark.classList.add("is-lightable");
  }
  const L = { x: 0, y: 0, tx: 0, ty: 0, on: false, moving: false };
  const glide = () => {
    L.x += (L.tx - L.x) * 0.14;
    L.y += (L.ty - L.y) * 0.14;
    lamp.style.transform = `translate3d(${L.x.toFixed(1)}px, ${L.y.toFixed(1)}px, 0)`;
    if (lit) {
      const r = mark.getBoundingClientRect();
      if (r.bottom > 0 && r.top < innerHeight) {
        lit.style.setProperty("--lx", `${(L.x - r.left).toFixed(1)}px`);
        lit.style.setProperty("--ly", `${(L.y - r.top).toFixed(1)}px`);
      }
    }
    if (Math.abs(L.tx - L.x) + Math.abs(L.ty - L.y) > 0.5) requestAnimationFrame(glide);
    else L.moving = false;
  };
  const aim = (x, y) => {
    L.tx = x;
    L.ty = y;
    if (!L.on) {
      L.x = x;
      L.y = y;
      L.on = true;
      lamp.classList.add("is-on");
    }
    if (!L.moving) {
      L.moving = true;
      requestAnimationFrame(glide);
    }
  };
  addEventListener("pointermove", (e) => aim(e.clientX, e.clientY), { passive: true });
  addEventListener("touchmove", (e) => e.touches[0] && aim(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
  addEventListener("scroll", () => L.on && !L.moving && ((L.moving = true), requestAnimationFrame(glide)), { passive: true });
  document.addEventListener("pointerleave", () => {
    L.on = false;
    lamp.classList.remove("is-on");
  });
})();

// the film: a large play button over the poster; the browser's own controls take over once it plays
(() => {
  const v = document.querySelector("video[data-film]"), b = document.querySelector("[data-film-play]");
  if (!v || !b) return;
  const box = v.parentElement;
  v.controls = false; // the page's own button starts it; without scripts the browser's controls stay
  b.addEventListener("click", () => { v.controls = true; v.play(); v.focus(); });
  v.addEventListener("play", () => box.classList.add("is-playing"));
  v.addEventListener("ended", () => { box.classList.remove("is-playing"); v.controls = false; v.load(); });
})();
