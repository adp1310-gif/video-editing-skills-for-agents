# FlytBase Reel — scene library

Copy-paste scene blocks. Each is a `<section class="scene clip">` on **Track 2** plus the `FB.*` timeline calls. Keep Track 2 scenes **contiguous** (each `data-start` = previous end), over a persistent Track 1 background. Set `at` (motion time) = the scene's `data-start` + the offset shown. Default scene length **4s**.

Always present once, on Track 1, spanning the whole reel:

```html
<div id="bg" class="scene clip" data-start="0" data-duration="TOTAL" data-track-index="1">
  <div class="bg-grid" data-layout-allow-overflow></div><div class="thermal-glow"></div><div class="vignette"></div>
</div>
```
```js
FB.drift(tl, '#bg .bg-grid', 0, TOTAL, { to: 1.06 });  // TOTAL = root data-duration
```

---

## 1 · Logo sting (cold open)
```html
<section id="sting" class="scene clip" data-start="0" data-duration="2.5" data-track-index="2">
  <div class="sting-wrap">
    <span class="sting-dot"></span>
    <div class="wordmark-text">FlytBase</div>
    <div class="sting-meta">The Autonomy Layer</div>
  </div>
</section>
```
```js
FB.dot(tl, '#sting .sting-dot', 0.2);
FB.reveal(tl, '#sting .wordmark-text', 0.7, { dur: FB.D.hero, ease: FB.E.hero });
FB.reveal(tl, '#sting .sting-meta', 1.25, { dur: FB.D.std });
```

## 2 · Title card
```html
<section id="title" class="scene clip" data-start="2.5" data-duration="4" data-track-index="2">
  <div class="safe">
    <div class="eyebrow"><span class="sq"></span><span class="eyebrow-label">Every mission type</span></div>
    <span class="rule"></span>
    <h1 class="headline">
      <span class="w">Autonomous</span> <span class="w">drone</span> <span class="w">ops,</span>
      <span class="w"><em>confirmed</em></span> <span class="w">from</span> <span class="w">altitude.</span>
    </h1>
    <p class="kicker">One platform to plan, fly, and verify every mission — no pilot on site.</p>
  </div>
</section>
```
```js
FB.eyebrow(tl, '#title .eyebrow', 2.6);
FB.rule(tl, '#title .rule', 2.75);
FB.words(tl, '#title .headline', 2.95);
FB.reveal(tl, '#title .kicker', 3.9, { dur: FB.D.reveal });
```
Rules: wrap each headline word in `<span class="w">`; exactly **one** `<em>` (the italic accent). No `<br>` — let it wrap.

## 3 · Stat pop (count-up)
```html
<section id="stat" class="scene clip" data-start="6.5" data-duration="4" data-track-index="2">
  <div class="safe">
    <div class="eyebrow"><span class="sq"></span><span class="eyebrow-label">Fleet telemetry</span></div>
    <div class="stat-row"><span class="stat-num">0</span><span class="stat-unit">+</span></div>
    <div class="stat-label">Autonomous flights / year</div>
  </div>
</section>
```
```js
FB.eyebrow(tl, '#stat .eyebrow', 6.6);
FB.countUp(tl, '#stat .stat-num', 3400, 6.9, { group: true, dur: 1.2 }); // group=true → "3,400"
FB.reveal(tl, '#stat .stat-unit', 6.9, { dur: FB.D.std });
FB.reveal(tl, '#stat .stat-label', 8.0, { dur: FB.D.reveal });
```
Variants: `{ decimals: 1, suffix: '%' }` for a rate; `{ prefix: '$' }` for value. Unit element (`+`, `%`, `×`, `k`) stays in `.stat-unit` so the number rolls clean.

## 4 · Feature row-list
```html
<section id="list" class="scene clip" data-start="10.5" data-duration="4" data-track-index="2">
  <div class="safe">
    <div class="eyebrow"><span class="sq"></span><span class="eyebrow-label">What ships</span></div>
    <h2 class="headline" style="font-size:72px">Built for <em>operators</em>.</h2>
    <ul class="rowlist">
      <li class="row"><span class="row-icon">01</span><div><div class="row-text">Dock-to-dashboard autonomy</div><div class="row-sub">Scheduled, repeatable, hands-off</div></div></li>
      <li class="row"><span class="row-icon">02</span><div><div class="row-text">Live thermal + visual feeds</div><div class="row-sub">Signed telemetry on every frame</div></div></li>
      <li class="row"><span class="row-icon">03</span><div><div class="row-text">BVLOS-ready compliance</div><div class="row-sub">Audit trail baked in</div></div></li>
    </ul>
  </div>
</section>
```
```js
FB.eyebrow(tl, '#list .eyebrow', 10.6);
FB.reveal(tl, '#list .headline', 10.8, { dur: FB.D.reveal });
FB.stagger(tl, '#list .row', 11.25, { each: 0.1 });
```
3–4 rows max. `.row-icon` holds a 2-digit index (`01`) or a short glyph; keep it mono.

## 5 · Quote / claim
```html
<section id="quote" class="scene clip" data-start="X" data-duration="4" data-track-index="2">
  <div class="safe">
    <span class="rule"></span>
    <blockquote class="headline" style="font-size:84px">“We cut inspection time by <em>70%</em> in the first quarter.”</blockquote>
    <div class="meta">— Operations lead, energy major</div>
  </div>
</section>
```
```js
FB.rule(tl, '#quote .rule', X + 0.2);
FB.reveal(tl, '#quote blockquote', X + 0.4, { dur: FB.D.hero, ease: FB.E.hero });
FB.reveal(tl, '#quote .meta', X + 1.3, { dur: FB.D.std });
```
One italic accent (a number or key noun). Attribution in mono `.meta`.

## 6 · CTA end card
```html
<section id="cta" class="scene clip" data-start="14.5" data-duration="4" data-track-index="2">
  <div class="safe">
    <span class="rule"></span>
    <div class="wordmark"><span class="brand-dot"></span>FlytBase</div>
    <div class="cta-url">flytbase.com</div>
    <div class="btn">Book a demo</div>
  </div>
</section>
```
```js
FB.rule(tl, '#cta .rule', 14.7);
FB.reveal(tl, '#cta .wordmark', 14.85, { dur: FB.D.hero, ease: FB.E.hero });
FB.reveal(tl, '#cta .cta-url', 15.45, { dur: FB.D.std });
FB.reveal(tl, '#cta .btn', 15.85, { dur: FB.D.std, y: 12 });
```

---

## Assembling a reel
1. Pick scenes; lay them on Track 2 contiguously (sting → … → CTA).
2. Set each `data-start`/`data-duration`; set root `data-duration` = last scene's end.
3. Add each scene's `FB.*` calls with `at` = its `data-start` + the offset above.
4. A light variant: add `class="light"` to a `.scene` for a deliberate inverted card (≤1 per reel).
5. `lint` → `validate` → `snapshot --at <midpoints>` → `render --quality high`.

---

## 16:9 launch scenes (landscape, real screenshots)

Root: `<div class="stage wide" data-width="1920" data-height="1080" ...>`. Persistent `<div class="mark"><span class="brand-dot"></span>FlytBase · New Release</div>`. See SKILL.md "16:9 launch mode".

**Full-bleed screenshot + text (with Ken-Burns):**
```html
<section id="sX" class="scene clip" data-start="T" data-duration="D" data-track-index="2">
  <div class="shot"><img id="sXimg" src="media/hero.jpg" alt="..."></div>
  <div class="scrim-l"></div><div class="scrim-b"></div>
  <div class="col-l">
    <div class="eyebrow"><span class="sq"></span><span class="eyebrow-label">One command center</span></div>
    <h2 class="headline">Arrange it your <em>way</em></h2>
    <p class="kicker">Resize, float, swap — saved across every session.</p>
  </div>
</section>
```
```js
FB.fadeIn(tl, '#sXimg', T); FB.pushIn(tl, '#sXimg', T, D, { from:1.0, to:1.12 });
FB.eyebrow(tl, '#sX .eyebrow', T+0.2); FB.slideIn(tl, '#sX .headline', T+0.4); FB.reveal(tl, '#sX .kicker', T+1.1, { dur:FB.D.std });
```

**Text-left + framed screenshot panel:**
```html
<section id="sY" class="scene clip" data-start="T" data-duration="D" data-track-index="3">
  <div class="col-l">
    <div class="eyebrow"><span class="sq"></span><span class="eyebrow-label">Device picker</span></div>
    <h2 class="headline" style="font-size:78px">Any dock, any <em>drone</em></h2>
    <p class="kicker">Find and select a pair in seconds.</p>
  </div>
  <div class="panel"><img id="sYimg" src="media/device.jpg" alt="..."></div>
</section>
```
```js
FB.eyebrow(tl, '#sY .eyebrow', T+0.15); FB.slideIn(tl, '#sY .headline', T+0.3); FB.reveal(tl, '#sY .kicker', T+0.9, { dur:FB.D.std });
FB.panelIn(tl, '#sY .panel', T+0.25); FB.pushIn(tl, '#sYimg', T+0.25, D, { from:1.05, to:1.13 });
```
Alternate full-bleed / panel scenes and alternate `data-track-index` 2/3 so adjacent scenes never collide on a track boundary. Long headlines: drop `font-size` inline. Narration: align each `T` to the VO's transcribed sentence start.

### Optional polish (`/hyperframes-media`)
- **BGM:** `npx hyperframes bgm` for a low, industrial bed; add as a root-level `<audio>` (direct child of root, per core rules).
- Reels usually run **silent-first** — design to read with sound off. Keep it text-driven.
