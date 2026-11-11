// Home: the search button counts the cars that match as you choose.
(() => {
  "use strict";
  const form = document.querySelector("[data-find]");
  const data = document.getElementById("find-index");
  if (!form || !data) return;
  const cars = JSON.parse(data.textContent);
  const n = form.querySelector("[data-find-n]");
  const w = form.querySelector("[data-find-w]");
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
  form.addEventListener("submit", () => [...form.elements].forEach((el) => el.name && (!el.value || el.name === "status") && (el.disabled = true)));
  addEventListener("pageshow", () => {
    [...form.elements].forEach((el) => (el.disabled = false));
    update();
  });
})();
