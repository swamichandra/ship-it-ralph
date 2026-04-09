# Ship-it-Ralph Architecture

Ship-it-Ralph has two layers:

1. **Policy layer**: **`SKILL.md`** — canonical behavior contract  
   - In this repository: `SKILL.md`  
   - In a workspace (recommended): **`.agents/<skill-name>/SKILL.md`** with `references/` in that folder — **not** `SKILL.md` alone at **`.agents/`** with no subfolder  
   - Optional: **`.github/SKILL.md`** (e.g. Copilot)  
   - Optional machine-wide: **`~/.agents/skills/<skill-name>/SKILL.md`** — **not** `~/.agents/SKILL.md` at the user-profile `.agents` root

2. **Execution layer**: **`orchestrator/ORCHESTRATOR.md`** (optional runtime wrapper at repo root)

If any instruction conflicts, the policy layer wins.

---

## Core flow

`0 Intake -> 1 PM -> 2 Architect -> 3 Design -> 4 Spec -> 5 Tasks -> 6 Tests -> 7A Server -> 7B Client -> 8 Security`

Contracts:

- `spec/spec.md` is written before any build phases
- `spec/tasks.md` drives 7A/7B ordering
- tests are written before implementation
- health check gates client phase
- security phase always emits verdict

---

## Orchestrated flow (optional)

The orchestrator adds:

- Phase-local context pruning
- Inter-phase verification gates
- **Per-generated-app** checkpoints: **`.ralph/briefs/`** and **`.ralph/memory/`** (not `orchestrator/briefs/` in the repo)
- Loader/pattern **templates** under `orchestrator/memory/` in this repo

This reduces token usage and improves long-run stability without changing factory semantics.

---

## Directory responsibilities

- **Repository root** — authoritative factory bundle in this repo (`SKILL.md`, `references/`, optional `assets/`, `scripts/`, `evals/`)
- **`.agents/<skill-name>/`** (workspace) — recommended consumer install: same bundle beside the project you open in the IDE
- **`.github/`** (consumer) — optional alternative: copy of `SKILL.md` + `references/` (+ optional folders)
- **`~/.agents/skills/<skill-name>/`** (optional global) — machine-wide copy; only valid under **`skills/<skill-name>/`**, never a lone file at **`~/.agents/`**
- **`orchestrator/`** — execution loop templates, pruning, memory seeds, scripts
- **`docs/`** — human-readable guidance and architecture

---

## Execution modes

- **Portable mode**: run only **`SKILL.md`** (wherever installed)
- **Orchestrated mode**: run **`orchestrator/ORCHESTRATOR.md`** with **`SKILL.md`** precedence
