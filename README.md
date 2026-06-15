# Video Editing Skills for Agents

A collection of **Claude skills** for creating videos with
[HyperFrames](https://github.com/heygen-com/hyperframes) — drop a folder into
`~/.claude/skills/` and Claude can build branded, repeatable video content.

## Skills in this repo

| Skill | What it does |
|---|---|
| [`flytbase-reel`](./flytbase-reel) | Build on-brand **FlytBase** social short-form videos (Reels / TikTok / Shorts, 1080×1920). Locks the FlytBase brand + a fixed motion system so every reel looks and moves the same. |

## Prerequisites

1. **Node.js ≥ 22** and **FFmpeg** installed.
2. The **HyperFrames** skills installed in Claude (the engine these build on):
   ```
   npx skills add heygen-com/hyperframes
   ```

## Install a skill

Copy the skill's folder into **either**:

- **User scope** (every project): `~/.claude/skills/<skill>/`
  - Windows: `C:\Users\<you>\.claude\skills\<skill>\`
- **Project scope** (one repo): `<your-project>/.claude/skills/<skill>/`

No build step — Claude Code discovers it on the next session. Each skill has its own
`README.md` with usage details.

### Quick install with degit (no full clone)

```bash
npx degit adp1310-gif/video-editing-skills-for-agents/flytbase-reel ~/.claude/skills/flytbase-reel
```

## Use

Start a new Claude session and ask, e.g. *"make a FlytBase reel about X"*, or invoke the
skill explicitly with `/flytbase-reel`.
