// Repayment estimator (car pages and the finance page). The visitor sets the rate: Tokyo Prestige
// does not publish one, so no figure shows until a rate is chosen. An estimate, never an offer.
(() => {
  "use strict";
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const money = (n) => "$" + Math.round(n).toLocaleString("en-AU");
  document.querySelectorAll("[data-est]").forEach((est) => {
    const $ = (s) => est.querySelector(s);
    const ui = $("[data-est-ui]");
    const dep = $("[data-est-dep]");
    const depOut = $("[data-est-dep-out]");
    const priceIn = $("[data-est-price]"); // only on the finance page
    const priceOut = $("[data-est-price-out]");
    const own = $("[data-est-rate]");
    const week = $("[data-est-week]");
    const unit = $("[data-est-unit]");
    const month = $("[data-est-month]");
    const sum = $("[data-est-sum]");
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
    const fill = (el) => el.style.setProperty("--p", ((Number(el.value) - Number(el.min)) / (Number(el.max) - Number(el.min))) * 100 + "%");
    const calc = () => {
      const price = priceIn ? Number(priceIn.value) : Number(est.dataset.price);
      if (priceIn) {
        priceOut.textContent = money(price);
        fill(priceIn);
        dep.max = Math.floor((price * 0.6) / 500) * 500;
        if (Number(dep.value) > Number(dep.max)) dep.value = dep.max;
      }
      const d = Number(dep.value);
      fill(dep);
      depOut.textContent = money(d);
      const years = Number(est.querySelector("input[name='est-term']:checked").value);
      const picked = est.querySelector("input[name='est-rate']:checked");
      const rate = own.value !== "" ? Number(own.value) : picked ? Number(picked.value) : NaN;
      const P = price - d;
      if (!(rate >= 0) || Number.isNaN(rate)) {
        big.classList.add("is-empty");
        week.textContent = "Pick a rate";
        unit.textContent = "";
        month.textContent = "";
        sum.textContent = `Choose a rate to see an estimate on ${money(P)}.`;
        shown = 0;
        return;
      }
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
      if (e.target === own && own.value !== "") est.querySelectorAll("input[name='est-rate']").forEach((r) => (r.checked = false));
      if (e.target.name === "est-rate") own.value = "";
      calc();
    });
    calc();
  });
})();
