---
name: flytbase-reel
description: Build on-brand FlytBase social short-form videos (Reels / TikTok / Shorts, 1080×1920) with HyperFrames. Use whenever someone wants a FlytBase reel, social clip, short promo, teaser, stat/feature/announcement video, or any short vertical motion piece "in the FlytBase style / brand". Produces consistent, repeatable output every time — the same charcoal + Signal-Orange palette, Lora/Geist/Geist-Mono type, dotted hairlines, and the locked FlytFrames motion system (rise-and-confirm, never dances). Invoke before authoring any FlytBase short video so the brand tokens and animation feel stay identical run to run.
---

# FlytBase Reel

A reusable engine for **FlytBase-branded social short clips** (vertical 1080×1920) on HyperFrames. It locks the brand into three files so every reel looks and *moves* the same:

- `assets/flytbase-reel.css` — the brand as motion-safe video primitives (palette, type, textures, scene classes) **with fonts bundled offline**.
- `assets/flytframes.js` — the **locked motion system** (`window.FB`): named GSAP helpers with fixed durations/easings. This is what makes the animation consistent every time.
- `assets/starter-index.html` — a complete, renderable 5-scene reel you copy and rewrite the copy in.
- `assets/fonts/` — Lora, Geist, Geist Mono `.woff2` (self-contained; renders in `--docker --strict`).

Brand law it encodes (from FlytBase-26 DESIGN-SYSTEM): one accent (Signal Orange `#D95B28`), charcoal dark base, sharp corners, dotted 1px hairlines, Lora headlines with **one** italic word, Geist Mono eyebrows with an accent square, mono telemetry numbers, operator voice (specific numbers, no hype, no emoji). **Motion confirms cause & effect — it signals, it never dances.**

## When to use

- "Make a FlytBase reel / short / social clip / teaser about X"
- A stat drop, feature list, announcement, or quote card in the FlytBase brand
- Any short (≈8–25s) vertical motion piece that must match the FlytBase look

**Not this skill:** a >~3 min or 16:9 piece, a narrated explainer, a product-launch crawl of the website, captions on existing footage, or a GitHub-PR video → route through `/hyperframes-read-first` (you can still pull this skill's CSS + FlytFrames in for the brand).

## How to build a reel

1. **Scaffold** a project (or reuse one):
   `npx hyperframes init <name> --example blank --non-interactive`
2. **Copy the engine in** — from this skill's `assets/` into the project root:
   `flytbase-reel.css`, `flytframes.js`, `fonts/`, and `starter-index.html` → `index.html`.
3. **Rewrite the copy, keep the structure.** Edit text inside the scene blocks in `index.html`. To add/remove/reorder scenes, use the blocks in `references/scene-library.md` and adjust each scene's `data-start` / `data-duration` (keep Track 2 contiguous) and the matching `FB.*(tl, ...)` calls (the `at` time = the scene's `data-start` + a small offset). Set the root `data-duration` to the last scene's end.
4. **Compose motion from FlytFrames only** — never hand-write per-element tweens with ad-hoc durations/easings. Use `FB.reveal / stagger / eyebrow / rule / words / countUp / dot / exit / drift`. Full API in `references/brand-motion.md`.
5. **Check** (gates): `npx hyperframes lint` → `validate` → `snapshot --at <scene midpoints>` and eyeball the contact sheet.
6. **Render** vertical: `npx hyperframes render --quality high --output flytbase-reel.mp4` (the 1080×1920 canvas comes from the root `data-width/height`). Iterate with `--quality draft`.

> Two lint **warnings are expected and fine**: `timeline_track_too_dense` (a single-file reel is intentional for shorts) and `font_family_without_font_face` (the linter can't resolve the `var(--sans)` token to the bundled `@font-face` — the fonts are present and load; confirm in any snapshot's "Fonts loaded" line). Treat anything else as a real finding.

## The locked spec (don't drift)

- **Canvas:** 1080×1920, dark base `#1A1A1A`. Keep content inside `.safe` (clears Reels/TikTok/Shorts UI: 300px top / 380px bottom / 100px sides).
- **Accent:** Signal Orange `--o400 #D95B28` only. Orange never signals status; green/amber/red are functional only and rarely belong in a reel.
- **Type:** Lora (headlines/wordmark) · Geist (body/kicker) · Geist Mono (eyebrows, numbers, URLs, labels). One italic word per headline, in `--o200`.
- **Shape:** sharp corners (radius 0; only dots are round), 1px **dotted** hairlines.
- **Motion (FlytFrames):** durations Fast .2 / Standard .4 / Reveal .9 / Hero 1.2s; ease default `power2.out`, hero `power4.out`, dramatic `expo.out`, signature `cubic-bezier(.22,1,.36,1)`; list stagger ~58ms; elements **rise 16–28px** into place (translate, don't just fade); out-curves for exits only. Hard cuts between scenes are on-brand — don't add busy transitions.

## Scene library (reusable, consistent)

In `references/scene-library.md`, copy-paste ready: **logo sting**, **title card**, **stat pop** (count-up), **feature row-list**, **quote/claim**, **CTA end card**. Each ships its HTML block + the exact `FB.*` timeline calls. Mix them; keep scenes on Track 2 contiguous over a persistent Track 1 background.

## 16:9 launch mode (product / feature videos)

The same engine builds **landscape launch videos** that show real product UI with movement. Switch on by adding `class="stage wide"` to the root and setting `data-width="1920" data-height="1080"`. Then:

- **Layout classes** (in `flytbase-reel.css`): `.shot` + `.scrim-l`/`.scrim-b` (full-bleed screenshot with legibility gradient), `.panel` (right-side framed screenshot with orange edge), `.col-l` (left text column), `.center` (centered title/CTA), `.lede` (Lora sub-headline), `.mark` (persistent top-left brand mark). Landscape type sizes are scoped to `.stage.wide`.
- **Motion — screenshots that move:** `FB.pushIn(tl, sel, at, dur, {from,to})` (slow Ken-Burns; `dur` = scene length; `from>to` = pull-back), `FB.slideIn(tl, sel, at, {x})`, `FB.panelIn(tl, sel, at)` (framed panel flies in from right), `FB.fadeIn(tl, sel, at)`. Compose with the standard helpers (eyebrow/words/rule/reveal/stagger).
- **Real screenshots:** capture them with `npx hyperframes capture <feature-url>` → use the downloaded `cap/assets/image-*.jpg`. Frame full-bleed (`.shot`, object-fit cover) or in a `.panel`.
- **Narration (optional):** `npx hyperframes tts script.txt -o media/vo.wav -v am_michael`, then `transcribe` the VO for sentence timings and place each scene at the matching time. Add two root-level `<audio>` elements on **separate tracks** — VO at `data-volume="1"`, music ducked to `~0.3`.
- **Music:** no local generator ships; synthesize a bed with ffmpeg or drop in a licensed track as a root `<audio>`.
- **Style dial:** *elevated* (pushIn + slideIn + panelIn + kinetic words — best for social/feed attention) vs *restrained* (soft fades + slow drift only — premium/site hero). Pick per audience.

## Hard rules (never break)

1. One brand accent (orange). 2. Sharp corners; dotted hairlines. 3. Lora headline = one italic word max; Geist Mono for eyebrows/numbers/labels. 4. Operator voice — specific numbers, no hype, **no emoji**. 5. Motion via FlytFrames helpers only — no ad-hoc durations/easings. 6. Single paused timeline registered at `window.__timelines["flytbase-reel"]`; build it synchronously. 7. Deterministic only — no `Date.now()` / `Math.random()` / network (count-ups use `FB.countUp`). 8. Keep the `.safe` padding so type never collides with platform UI. 9. Run lint + validate + snapshot before every render.

## References

- `references/brand-motion.md` — tokens, type scale, the full FlytFrames helper API, timing recipe.
- `references/scene-library.md` — the copy-paste scene blocks + their timeline calls.
