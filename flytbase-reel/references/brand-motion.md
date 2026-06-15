# FlytBase Reel — tokens, type & the FlytFrames motion API

Source of truth: `assets/flytbase-reel.css` (look) + `assets/flytframes.js` (motion). This file is the quick reference.

## Color tokens (CSS variables, defined in `:root`)

| Token | Hex | Use |
|---|---|---|
| `--o400` | `#D95B28` | **Primary brand orange** — eyebrows, dots, rules, accents, italic word |
| `--o200` | `#EC7D42` | Higher-contrast orange (headline italic word, small accent text) |
| `--o600` | `#A33D14` | Deeper accent |
| `--dbg` | `#1A1A1A` | Page background |
| `--ds` / `--de` | `#242424` / `#2E2E2E` | Surface / elevated (icon frames) |
| `--db` | `#3D3D3D` | Dotted borders / hairlines (decoration only) |
| `--dm` `--dsc` `--dbd` `--dh` | `#8A8A8A` `#999999` `#D6D6D6` `#F0F0F0` | Text: muted → secondary → body → heading |

Status (`--success #3A7A65`, `--warning #D9A441`, `--info #3E6F9E`, `--error #F43F5E`) are **functional only** — almost never in a reel, and never as an accent. Never use a text color darker than `--dm` on the dark base.

## Type scale (1080-wide vertical)

| Class | Family | Size | Use |
|---|---|---|---|
| `.display` | Lora 400 | 150px | Single huge word / cover |
| `.headline` | Lora 400 | 104px (`.w` spans = words; `em` = the one italic word in `--o200`) | Title / claim |
| `.kicker` | Geist 400 | 40px | Sub-line under a headline |
| `.body` | Geist 400 | 34px | Supporting copy (≤ ~40ch) |
| `.eyebrow` | Geist Mono 500 | 27px, .12em, UPPER, leads with `.sq` 18px orange square | Section label |
| `.stat-num` / `.stat-unit` | Geist Mono 500 | 300 / 120px | Telemetry number + orange unit |
| `.stat-label` | Geist Mono | 30px | Caption under a stat |
| `.meta` | Geist Mono | 25px | Timestamps / metadata |
| `.row-text` / `.row-sub` | Lora 48 / Geist 28 | — | Row-list item |
| `.wordmark` / `.wordmark-text` | Lora | 104 / 124px | Brand lockup (with round `--o400` dot) |
| `.cta-url` | Geist Mono | 34px | URL line |

Layout helpers: `.stage` (the 1080×1920 canvas) · `.scene` (one full-frame clip) · `.safe` (centered safe column; `.safe.top` / `.safe.bottom`). Textures: `.bg-grid`, `.bg-dots`, `.thermal-glow`, `.vignette`. Accent bar: `.rule` (wipes via `scaleX`, origin-left). Button shape: `.btn`.

## FlytFrames motion API (`window.FB`)

Constants: `FB.D = {fast:.2, std:.4, reveal:.9, hero:1.2}` · `FB.E = {out:'power2.out', hero:'power4.out', expo:'expo.out', sig:'cubic-bezier(.22,1,.36,1)', in:'power2.in'}` · `FB.EACH = .058` · `FB.RISE = 24`.

Every helper takes `(tl, selector, at, opts?)` and adds tweens to the one paused timeline at absolute time `at` (seconds). Returns `tl`.

| Helper | What it does | Key opts (defaults) |
|---|---|---|
| `FB.reveal(tl, sel, at, o)` | Rise + fade in — the atomic entrance | `y=24, dur=.9, ease=out` |
| `FB.stagger(tl, sel, at, o)` | Reveal a set of elements in sequence | `y=24, dur=.9, ease=out, each=.058` |
| `FB.eyebrow(tl, sel, at)` | Accent square pops, then mono label slides in | — (sel = the `.eyebrow`) |
| `FB.rule(tl, sel, at, o)` | Orange `.rule` bar wipes from the left | `dur=.4, ease=sig` |
| `FB.words(tl, sel, at, o)` | Headline word-by-word (hero). Wrap words in `<span class="w">` | `each=.058, dur=1.2, ease=hero, y=28` |
| `FB.countUp(tl, sel, to, at, o)` | Deterministic number roll | `dur=.9, ease=out, decimals=0, group=false, prefix='', suffix=''` |
| `FB.dot(tl, sel, at, o)` | Brand dot pops with one calm pulse | `dur=1.2` |
| `FB.exit(tl, sel, at, o)` | Fade + small drop (in-curve, for leaving) | `y=16, dur=.4, ease=in` |
| `FB.drift(tl, sel, at, dur, o)` | Very slow background scale for life | `to=1.06` |

### Timing recipe (per scene)
1. Scene base time `T` = the scene's `data-start`.
2. `eyebrow` at `T + 0.1` → `rule` at `T + 0.25` → `words`/`reveal` headline at `T + 0.45` → supporting `reveal`/`stagger` ~`T + 1.0`.
3. Keep a scene's motion inside its `[data-start, data-start+data-duration]` window. Default scene length 4s reads well for social.
4. Hard cuts between scenes (the clip lifecycle hides each at its end) — clean and on-brand. Use `FB.exit` only for a deliberate outro.

### Why this stays consistent
All durations, easings, rise distances, and stagger live in `flytframes.js`. Compose helpers; never inline `gsap.to(..., {duration: 0.6, ease:'back.out'})` with one-off values — that is exactly the drift this system prevents.
