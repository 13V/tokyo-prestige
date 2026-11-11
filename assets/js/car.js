// Car page: gallery, full-screen photos, the repayment estimator, the enquiry form and the sticky bar.
// Without this file the photos open as links, the form is a plain form and nothing is hidden.
(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const money = (n) => "$" + Math.round(n).toLocaleString("en-AU");

  // ---------- gallery ----------
  const gal = $("[data-gal]");
  if (gal) {
    const track = $("[data-gal-track]", gal);
    const items = $$("[data-full]", gal);
    const label = $("[data-gal-label]", gal);
    const count = $("[data-gal-n]", gal);
    const strip = () => track.scrollWidth > track.clientWidth + 4; // a strip on phones, a mosaic on desks
    let at = 0;
    const warm = (i) => {
      const im = items[i]?.querySelector("img");
      if (im && im.loading === "lazy") im.loading = "eager"; // fetch the next photo ahead of the swipe
    };
    const sync = () => {
      const i = Math.round(track.scrollLeft / track.clientWidth);
      if (i === at || !items[i]) return;
      at = i;
      label.textContent = items[i].dataset.label;
      count.textContent = i + 1;
      warm(i + 1);
    };
    track.addEventListener("scroll", () => requestAnimationFrame(sync), { passive: true });
    track.addEventListener("keydown", (e) => {
      if (!strip()) return;
      if (e.key === "ArrowRight") track.scrollBy({ left: track.clientWidth, behavior: calm ? "auto" : "smooth" });
      if (e.key === "ArrowLeft") track.scrollBy({ left: -track.clientWidth, behavior: calm ? "auto" : "smooth" });
    });
    track.addEventListener("pointerdown", () => warm(at + 1), { passive: true });
    if ("requestIdleCallback" in window) requestIdleCallback(() => warm(1));

    // full screen
    const lb = $("[data-lb]");
    const lbTrack = $("[data-lb-track]", lb);
    const lbLabel = $("[data-lb-label]", lb);
    const lbCount = $("[data-lb-count]", lb);
    const prev = $("[data-lb-prev]", lb);
    const next = $("[data-lb-next]", lb);
    let built = false;
    let li = 0;
    const build = () => {
      if (built) return;
      built = true;
      items.forEach((a, i) => {
        const cell = document.createElement("li");
        const im = new Image();
        const small = a.querySelector("img");
        im.alt = small.alt;
        im.width = a.dataset.w;
        im.height = a.dataset.h;
        im.decoding = "async";
        im.dataset.src = a.href;
        im.src = small.currentSrc || small.src; // what is already on screen, then the large file
        cell.append(im);
        lbTrack.append(cell);
      });
    };
    const sharp = (i) => {
      const im = lbTrack.children[i]?.firstChild;
      if (!im || !im.dataset.src) return;
      const big = new Image();
      big.src = im.dataset.src;
      const src = im.dataset.src;
      delete im.dataset.src;
      big.decode?.().then(() => (im.src = src)).catch(() => (im.src = src));
    };
    const lbSync = () => {
      const i = Math.round(lbTrack.scrollLeft / lbTrack.clientWidth);
      li = Math.max(0, Math.min(items.length - 1, i));
      lbLabel.textContent = items[li].dataset.label;
      lbCount.textContent = `${li + 1} / ${items.length}`;
      prev.disabled = li === 0;
      next.disabled = li === items.length - 1;
      sharp(li);
      sharp(li + 1);
    };
    const open = (i) => {
      build();
      lb.showModal();
      lbTrack.scrollTo({ left: i * lbTrack.clientWidth, behavior: "instant" });
      lbSync();
      lbTrack.focus({ preventScroll: true });
    };
    const go = (d) => lbTrack.scrollBy({ left: d * lbTrack.clientWidth, behavior: calm ? "auto" : "smooth" });
    if (lb && typeof lb.showModal === "function") {
      items.forEach((a, i) =>
        a.addEventListener("click", (e) => {
          if (e.metaKey || e.ctrlKey || e.shiftKey) return;
          e.preventDefault();
          open(i);
        }),
      );
      const all = $("[data-gal-open]", gal);
      if (all && items.length > 1) {
        all.hidden = false;
        all.addEventListener("click", () => open(0));
      }
      lbTrack.addEventListener("scroll", () => requestAnimationFrame(lbSync), { passive: true });
      prev.addEventListener("click", () => go(-1));
      next.addEventListener("click", () => go(1));
      $("[data-lb-close]", lb).addEventListener("click", () => lb.close());
      lb.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      });
      lb.addEventListener("close", () => {
        if (strip()) track.scrollTo({ left: li * track.clientWidth, behavior: "instant" });
        items[li]?.focus({ preventScroll: true });
      });
    }
  }

  // ---------- repayment estimator ----------
  const est = $("[data-est]");
  if (est) {
    const price = Number(est.dataset.price);
    const ui = $("[data-est-ui]", est);
    const dep = $("[data-est-dep]", est);
    const depOut = $("[data-est-dep-out]", est);
    const own = $("[data-est-rate]", est);
    const week = $("[data-est-week]", est);
    const unit = $("[data-est-unit]", est);
    const month = $("[data-est-month]", est);
    const sum = $("[data-est-sum]", est);
    const big = week.parentElement;
    ui.hidden = false;
    let shown = 0;
    const tween = (to) => {
      if (calm || !shown) {
        shown = to;
        week.textContent = money(to);
        return;
      }
      const from = shown;
      const t0 = performance.now();
      shown = to;
      const step = (t) => {
        const p = Math.min(1, (t - t0) / 420);
        week.textContent = money(from + (to - from) * (1 - Math.pow(1 - p, 3)));
        if (p < 1 && shown === to) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const calc = () => {
      const d = Number(dep.value);
      dep.style.setProperty("--p", (d / Number(dep.max)) * 100 + "%");
      depOut.textContent = money(d);
      const years = Number($("input[name='est-term']:checked", est).value);
      const picked = $("input[name='est-rate']:checked", est);
      const rate = own.value !== "" ? Number(own.value) : picked ? Number(picked.value) : NaN;
      if (!(rate >= 0) || Number.isNaN(rate)) {
        big.classList.add("is-empty");
        week.textContent = "Pick a rate";
        unit.textContent = "";
        month.textContent = "";
        sum.textContent = `Choose a rate to see an estimate on ${money(price - d)}.`;
        shown = 0;
        return;
      }
      const P = price - d;
      const n = years * 12;
      const r = rate / 100 / 12;
      const m = r === 0 ? P / n : (P * r) / (1 - Math.pow(1 + r, -n));
      big.classList.remove("is-empty");
      tween((m * 12) / 52);
      unit.textContent = "a week";
      month.textContent = `${money(m)} a month`;
      sum.textContent = `${money(P)} over ${years} years at ${rate}% a year, the rate you set. Total repaid ${money(m * n)}.`;
    };
    est.addEventListener("input", (e) => {
      if (e.target === own && own.value !== "") $$("input[name='est-rate']", est).forEach((r) => (r.checked = false));
      if (e.target.name === "est-rate") own.value = "";
      calc();
    });
    calc();
  }

  // ---------- enquiry ----------
  const form = $("[data-enq]");
  if (form) {
    const when = $("[data-when]", form);
    const label = $("[data-enq-label]", form);
    const done = $("[data-enq-done]");
    const msg = form.elements.message;
    const LABELS = { question: "Send my question", testdrive: "Request a test drive", hold: "Ask to hold this car", video: "Request the video", driveaway: "Get the drive-away price", notify: "Tell me when it lands" };
    const NEXT = {
      question: "The sales team will reply during opening hours.",
      testdrive: "The sales team will call to confirm a time for your test drive.",
      hold: "The sales team will call to talk through holding the car for you.",
      video: "The sales team will film the car and send the video to you.",
      driveaway: "The sales team will send the drive-away figure for your state.",
      notify: "You will hear from the team as soon as this car arrives in Adelaide.",
    };
    const setIntent = (v) => {
      const r = form.querySelector(`input[name='intent'][value='${v}']`);
      if (r) r.checked = true;
      sync();
    };
    const sync = () => {
      const v = form.elements.intent.value;
      when.hidden = v !== "testdrive";
      label.textContent = LABELS[v] || "Send";
    };
    form.addEventListener("change", sync);
    sync();
    // every "book a test drive", "ask for it" or "request a video" link sets the form up first
    $$("[data-intent]").forEach((a) =>
      a.addEventListener("click", () => {
        setIntent(a.dataset.intent);
        if (a.dataset.opt) {
          const o = form.querySelector(`input[name='opt'][value='${a.dataset.opt}']`);
          if (o) o.checked = true;
        }
        if (a.dataset.msg && !msg.value) msg.value = a.dataset.msg;
        if (done && !done.hidden) {
          done.hidden = true;
          form.hidden = false;
        }
        setTimeout(() => form.elements.name.focus({ preventScroll: true }), calm ? 0 : 500);
      }),
    );
    const check = (el, ok) => {
      const err = el.parentElement.querySelector(".field__err");
      el.setAttribute("aria-invalid", ok ? "false" : "true");
      if (err) err.hidden = ok;
      return ok;
    };
    const validContact = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || v.replace(/[^\d]/g, "").length >= 8;
    form.elements.name.addEventListener("input", (e) => e.target.getAttribute("aria-invalid") === "true" && check(e.target, e.target.value.trim().length > 1));
    form.elements.contact.addEventListener("input", (e) => e.target.getAttribute("aria-invalid") === "true" && check(e.target, validContact(e.target.value.trim())));
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const a = check(form.elements.name, form.elements.name.value.trim().length > 1);
      const b = check(form.elements.contact, validContact(form.elements.contact.value.trim()));
      if (!a || !b) return (a ? form.elements.contact : form.elements.name).focus();
      // HOOK: when data-endpoint is set, POST the fields as JSON and show the thank-you only on a 200.
      //   fetch(form.dataset.endpoint, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form))) })
      const v = form.elements.intent.value;
      $("[data-enq-who]", done).textContent = form.elements.name.value.trim().split(/\s+/)[0];
      $("[data-enq-next]", done).textContent = NEXT[v] || NEXT.question;
      form.hidden = true;
      done.hidden = false;
      done.focus({ preventScroll: true });
      done.scrollIntoView({ block: "center", behavior: calm ? "auto" : "smooth" });
    });
  }

  // ---------- sticky bar: steps aside while the form is on screen ----------
  const dock = $("[data-dock]");
  const enq = $("#enquire");
  if (dock && enq && "IntersectionObserver" in window) {
    new IntersectionObserver((es) => es.forEach((e) => dock.classList.toggle("is-away", e.isIntersecting)), { rootMargin: "-25% 0px -25% 0px" }).observe(enq);
  }
})();
