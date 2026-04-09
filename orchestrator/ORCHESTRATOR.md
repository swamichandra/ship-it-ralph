# Ship-it-Ralph Orchestrator

Optional runtime wrapper for token-efficient, phase-local execution.

Authority: `SKILL.md` remains canonical for commands, run modes, phase order, and output contracts.

---

## How to start

Tell the agent:

> Read `orchestrator/ORCHESTRATOR.md` and run the factory with `SKILL.md` precedence.

---

## Phase loop

For each phase (0 through 8), run this loop:

1. **Phase 0 only: bootstrap app directory**
   - Distill idea to one-word slug (lowercase, hyphen-safe).
   - Pick random geeky prefix from: `neon`, `quark`, `byte`, `turbo`, `photon`, `vector`, `orbit`, `kernel`, `cipher`, `pixel`.
   - Create `../ralph-apps/[prefix]-[slug]` (append `-v2`, `-v3`, ... if needed).
   - Use this folder as project root for the entire run.
   - Initialize run-state directories inside app root: `.ralph/briefs/` and `.ralph/memory/episodes/`.
2. **Phase 0 only: clean slate**
   - Clear `.ralph/briefs/` markdown files from prior attempts (if any).
3. **Phase 0 only: load memory**
   - Read `orchestrator/memory/memory-loader.md` (rules/template source)
   - Read last 3 files from `.ralph/memory/episodes/` (most recent first)
   - Read `.ralph/memory/patterns.md` (if missing, seed from `orchestrator/memory/patterns.md`)
4. **Load phase instructions**
   - Read `orchestrator/phases/phase-[N]-[name].md`
5. **Load phase context (pruned)**
   - Read `orchestrator/pruning/context-rules.md` for this phase
6. **Execute phase**
7. **Verify before proceeding**
   - Read `orchestrator/pruning/verification-checks.md` section for this phase
   - Fix inline if any check fails
8. **Write phase brief**
   - Write `.ralph/briefs/phase-[N]-brief.md`
9. **Advance**

Do not skip verification. Do not proceed with known failures.

---

## Phase progression

`0 Intake -> 1 PM -> 2 Architect -> 3 Design -> 4 Spec -> 5 Tasks -> 6 Tests -> 7A Server -> 7B Client -> 8 Security`

- After Phase 4: if `--review` flag is set, pause for `/approve`.
- After Phase 7A: health check must pass before Phase 7B.

---

## After Phase 8

Write an episode:

- Manual: use template in `orchestrator/memory/memory-loader.md`, write to `.ralph/memory/episodes/`
- Script: run `node orchestrator/scripts/episode-writer.js` from app root

---

## Recovery commands

Keep semantics aligned with `SKILL.md`:

| Command | Re-entry |
|---|---|
| `/continue` | resume 7A/7B from `spec/tasks.md` state |
| `/rebuild` | 7A -> 7B -> 8 |
| `/redesign` | 3 -> 7B |
| `/respec` | 1 -> 5 |
| `/retask` | 5 only |

For recovery commands, read `spec/spec.md` and required phase contracts first, then apply pruning rules.

---

## Emergency context reset

If context becomes overloaded mid-phase:

1. Read only current phase file
2. Read only immediately prior phase brief
3. Read `spec/spec.md` if it exists (Phases 5+)
4. Ignore everything else until phase completion

---

## Reference files

- `SKILL.md` (canonical policy)
- `references/DESIGN_SYSTEM.md`
- `references/STACK.md`
- `references/CONSTITUTION.md`

Load reference sections per `orchestrator/pruning/context-rules.md`, not full files by default.
