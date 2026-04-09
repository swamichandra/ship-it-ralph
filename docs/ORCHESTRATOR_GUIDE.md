# Orchestrator Guide

Use this guide when you want pruning + episodic memory on top of the base skill.

---

## Authority model

- Canonical policy: **`SKILL.md`** — upstream: `SKILL.md` in this repo; in your workspace: **`.agents/<skill-name>/SKILL.md`** (recommended) or **`.github/SKILL.md`**; optional machine-wide: **`~/.agents/skills/<skill-name>/SKILL.md`** (**not** a lone `~/.agents/SKILL.md`).
- Optional runtime wrapper: **`orchestrator/ORCHESTRATOR.md`** (lives at **repository root** in Ship-it-Ralph; not copied into `.github/` by default).
- Conflict rule: **`SKILL.md`** always wins.

---

## When to use orchestrator mode

Use orchestrator mode when:

- runs are long and context-heavy
- you want phase-local context windows
- you want explicit verification between phases
- you want memory of prior runs

Use direct mode (**`SKILL.md` only**) when maximum portability is preferred.

---

## How to run

Prompt:

```text
Read orchestrator/ORCHESTRATOR.md and run /factory with your installed SKILL.md (e.g. `.agents/<skill-name>/SKILL.md` or `.github/SKILL.md`) as authority.
```

For direct mode:

```text
Run /factory using only your installed skill (e.g. `.agents/<skill-name>/SKILL.md`, `.github/SKILL.md`, or `SKILL.md` at the upstream repo root).
```

---

## What orchestrator mode adds

- Controlled context loading (`orchestrator/pruning/context-rules.md`)
- Phase verification gates (`orchestrator/pruning/verification-checks.md`)
- **Per-build state inside the generated app:**
  - **`.ralph/briefs/`** — phase checkpoint markdown files
  - **`.ralph/memory/episodes/`** — episodic memory; **`.ralph/memory/patterns.md`** (seed from `orchestrator/memory/patterns.md` when missing)
- App bootstrap on new factory runs: creates **`../ralph-apps/[geeky-prefix]-[idea-slug]`** and uses it as run root (same as `SKILL.md`); if environment policy blocks parent-folder writes, use **`./ralph-apps/[geeky-prefix]-[idea-slug]`** in your local bootstrap rule.

The **`orchestrator/`** folder in this repo holds **templates and rules**; it is **not** where per-run briefs are stored during a factory build.

It does not change command semantics or phase contracts.

---

## Recovery commands

Recovery behavior remains aligned with **`SKILL.md`**:

- `/continue`
- `/rebuild`
- `/redesign`
- `/respec`
- `/retask`

---

## Maintenance

- Keep **`SKILL.md`** and **`orchestrator/*`** aligned after behavior changes
- Add regression checks under **`evals/`** in this repo
- Treat **`/ankit`** as legacy/reference only once migration is complete
