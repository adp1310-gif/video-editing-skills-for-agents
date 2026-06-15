/* ============================================================================
   FlytFrames — FlytBase's locked motion system for HyperFrames.
   One source of truth for HOW things move, so every reel is identical in feel.
   Compose these helpers onto a single paused GSAP timeline. Do not redefine
   durations/easings per video — that is the whole point of consistency.

   Brand motion law (DESIGN-SYSTEM §8):
     • Motion confirms cause & effect. It signals, it never dances.
     • Translate, don't just fade — elements rise 16–24px into place.
     • Out beats In — default power2.out; in-curves only for exits.
     • Stagger lists by ~58ms.
   ========================================================================== */
window.FB = (function () {
  // Durations (seconds) — Fast / Standard / Reveal / Hero
  const D = { fast: 0.2, std: 0.4, reveal: 0.9, hero: 1.2 };
  // Easings
  const E = {
    out:  'power2.out',                 // default UI
    hero: 'power4.out',                 // big hero reveal
    expo: 'expo.out',                   // dramatic entry (sting)
    sig:  'cubic-bezier(0.22,1,0.36,1)',// signature curve (rules, wipes)
    in:   'power2.in',                  // exits only
  };
  const EACH = 0.058;   // list stagger
  const RISE = 24;      // default translate distance

  const $  = (s, r = document) => r.querySelector(s);

  /* reveal — rise + fade. The atomic FlytBase entrance. */
  function reveal(tl, sel, at, o = {}) {
    const { y = RISE, dur = D.reveal, ease = E.out } = o;
    tl.fromTo(sel, { opacity: 0, y }, { opacity: 1, y: 0, duration: dur, ease }, at);
    return tl;
  }

  /* stagger — a list of elements revealing one after another. */
  function stagger(tl, sel, at, o = {}) {
    const { y = RISE, dur = D.reveal, ease = E.out, each = EACH } = o;
    tl.fromTo(sel, { opacity: 0, y }, { opacity: 1, y: 0, duration: dur, ease, stagger: each }, at);
    return tl;
  }

  /* eyebrow — accent square pops, then the mono label slides in. */
  function eyebrow(tl, sel, at) {
    tl.fromTo(`${sel} .sq`, { scale: 0 }, { scale: 1, duration: D.std, ease: E.out }, at);
    tl.fromTo(`${sel} .eyebrow-label`, { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: D.std, ease: E.out }, at + 0.06);
    return tl;
  }

  /* rule — the 1px/3px orange accent bar wipes out from the left. */
  function rule(tl, sel, at, o = {}) {
    const { dur = D.std, ease = E.sig } = o;       // .rule sets transform-origin:left in CSS
    tl.fromTo(sel, { scaleX: 0 }, { scaleX: 1, duration: dur, ease }, at);
    return tl;
  }

  /* words — headline word-by-word stagger (hero register). Wrap each word in <span class="w">. */
  function words(tl, sel, at, o = {}) {
    const { each = EACH, dur = D.hero, ease = E.hero, y = 28 } = o;
    tl.fromTo(`${sel} .w`, { opacity: 0, y }, { opacity: 1, y: 0, duration: dur, ease, stagger: each }, at);
    return tl;
  }

  /* countUp — deterministic number roll. Telemetry, not slot-machine. */
  function countUp(tl, sel, to, at, o = {}) {
    const { dur = D.reveal, ease = E.out, decimals = 0, prefix = '', suffix = '', group = false } = o;
    const el = $(sel); if (!el) return tl;
    const fmt = (n) => {
      const s = group
        ? Number(n).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
        : n.toFixed(decimals);
      return prefix + s + suffix;
    };
    const acc = { v: 0 };
    tl.to(acc, { v: to, duration: dur, ease, onUpdate: () => { el.textContent = fmt(acc.v); } }, at);
    return tl;
  }

  /* dot — brand dot pops in with one calm, deterministic pulse. */
  function dot(tl, sel, at, o = {}) {
    const { dur = D.hero } = o;
    tl.fromTo(sel, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: D.std, ease: E.expo }, at);
    tl.to(sel, { scale: 1.18, duration: dur * 0.4, ease: 'sine.inOut', yoyo: true, repeat: 1 }, at + D.std);
    return tl;
  }

  /* exit — fade + small drop. In-curve, because it is leaving. */
  function exit(tl, sel, at, o = {}) {
    const { y = 16, dur = D.std, ease = E.in } = o;
    tl.to(sel, { opacity: 0, y, duration: dur, ease }, at);
    return tl;
  }

  /* drift — very slow background scale for life under static scenes. */
  function drift(tl, sel, at, dur, o = {}) {
    const { to = 1.06 } = o;
    tl.fromTo(sel, { scale: 1 }, { scale: to, duration: dur, ease: 'none' }, at);
    return tl;
  }

  return { D, E, EACH, RISE, reveal, stagger, eyebrow, rule, words, countUp, dot, exit, drift };
})();
