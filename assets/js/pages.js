// Content pages: the import route draws as you read, and the showroom lights come up on About.
(() => {
  "use strict";
  const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const route = document.querySelector("[data-route]");
  if (route && !calm) {
    const line = route.querySelector("[data-route-line]");
    const ship = route.querySelector("[data-route-ship]");
    const steps = [...route.querySelectorAll("[data-route-step]")];
    const list = route.querySelector(".route__steps");
    route.classList.add("is-live");
    let raf = 0;
    const draw = () => {
      raf = 0;
      // how far the reader is through the steps: 0 at the first, 1 at the last
      const r = list.getBoundingClientRect();
      const mid = innerHeight * 0.5;
      const first = steps[0].getBoundingClientRect().top - r.top;
      const last = steps[steps.length - 1].getBoundingClientRect().top - r.top;
      const p = Math.max(0, Math.min(1, (mid - r.top - first) / (last - first || 1)));
      line.style.clipPath = `inset(0 0 ${(100 - p * 100).toFixed(2)}% 0)`;
      ship.style.transform = `translate3d(0, ${(p * line.offsetHeight).toFixed(1)}px, 0)`;
      const at = Math.round(p * (steps.length - 1));
      steps.forEach((s, i) => s.classList.toggle("is-at", i === at));
    };
    const on = () => !raf && (raf = requestAnimationFrame(draw));
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    draw();
  }
  // FAQ: open the question a link points at
  const openHash = () => {
    const el = location.hash && document.querySelector(`details${CSS.escape ? "#" + CSS.escape(location.hash.slice(1)) : location.hash}`);
    if (el) el.open = true;
  };
  openHash();
  addEventListener("hashchange", openHash);
})();
