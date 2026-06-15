# flytbase-reel — a Claude skill

Build on-brand **FlytBase social short-form videos** (Reels / TikTok / Shorts, 1080×1920)
with HyperFrames. It locks the FlytBase brand + a fixed motion system into reusable
files so every reel looks and *moves* the same.

## What's inside

```
flytbase-reel/
├── SKILL.md                     # the skill (what Claude reads first)
├── README.md                    # this file
├── references/
│   ├── brand-motion.md          # tokens, type scale, FlytFrames motion API
│   └── scene-library.md         # copy-paste scene blocks + timeline calls
└── assets/
    ├── flytbase-reel.css        # brand as video primitives (fonts inlined)
    ├── flytframes.js            # the locked motion system (window.FB)
    ├── starter-index.html       # a complete, renderable 5-scene reel
    └── fonts/                    # Lora, Geist, Geist Mono (.woff2, offline-safe)
```

## Prerequisites

The skill builds videos with **HyperFrames**, so your friend needs:

1. **Node.js ≥ 22** and **FFmpeg** on their machine.
2. The **HyperFrames skills** installed in Claude:
   ```
   npx skills add heygen-com/hyperframes
   ```
   (This gives Claude `/hyperframes-*` — the engine `flytbase-reel` builds on.)

## Install this skill

Drop the `flytbase-reel/` folder into **either**:

- **User scope** (available in every project): `~/.claude/skills/flytbase-reel/`
  - Windows: `C:\Users\<you>\.claude\skills\flytbase-reel\`
- **Project scope** (just one repo): `<your-project>/.claude/skills/flytbase-reel/`

No build step. Claude Code discovers it on the next session. Confirm it's loaded by
asking Claude to run its skill list, or just say *"make a FlytBase reel about X."*

## Use

It auto-triggers on requests like *"make a FlytBase reel / social clip / teaser about X."*
You can also invoke it explicitly: **`/flytbase-reel`**.

Typical flow Claude follows:
1. `npx hyperframes init <name> --example blank --non-interactive`
2. Copy this skill's `assets/` into the project (css, js, fonts, `starter-index.html` → `index.html`)
3. Rewrite the copy / pick scenes from `references/scene-library.md`
4. `npx hyperframes lint` → `validate` → `snapshot` → `render --quality high`

## Notes

- Fonts are **bundled** (`assets/fonts/`), so renders work offline / in `--docker --strict`.
- Two lint warnings are expected & harmless: `timeline_track_too_dense` (single-file reels
  are intentional) and `font_family_without_font_face` (the linter can't resolve the
  `var(--sans)` token to the bundled `@font-face`; the fonts load fine).

---

Built for FlytBase. Brand system: FlytBase-26 DESIGN-SYSTEM (charcoal base, Signal Orange
accent, Lora / Geist / Geist Mono, sharp corners, dotted hairlines).
