# Context Pruning Rules Per Phase

Each phase loads only what it needs.

---

## Phase 0: Intake

Load:
- `orchestrator/phases/phase-0-intake.md`
- Last 3 episodes + `.ralph/memory/patterns.md`

Ignore:
- Technical templates, design system implementation details

---

## Phase 1: PM

Load:
- `orchestrator/phases/phase-1-pm.md`
- `.ralph/briefs/phase-0-brief.md`

Ignore:
- Ralph voice instructions, implementation details

---

## Phase 2: Architect

Load:
- `orchestrator/phases/phase-2-architect.md`
- `.ralph/briefs/phase-1-brief.md`

Ignore:
- Design-system details, non-architectural prior instructions

---

## Phase 3: Design

Load:
- `orchestrator/phases/phase-3-design.md`
- `.ralph/briefs/phase-1-brief.md`
- `.ralph/briefs/phase-2-brief.md`

Reference sections:
- `references/DESIGN_SYSTEM.md`:
  - Palette and tokens
  - Component catalog
  - Icon guidance

Ignore:
- Server templates and constitution details

---

## Phase 4: Spec

Load:
- `orchestrator/phases/phase-4-spec.md`
- `.ralph/briefs/phase-0-brief.md` through `phase-3-brief.md`

Reference sections:
- `references/DESIGN_SYSTEM.md` (palette summary)
- `references/STACK.md` (folder/layout summary)

Ignore:
- Full implementation snippets

---

## Phase 5: Tasks

Load:
- `orchestrator/phases/phase-5-tasks.md`
- `spec/spec.md` (full file)

Ignore:
- Prior phase instructions and phase briefs (spec supersedes)

---

## Phase 6: Tests

Load:
- `orchestrator/phases/phase-6-tests.md`
- `spec/spec.md` (full file)

Reference sections:
- `references/STACK.md` (Vitest/test sections only)

Ignore:
- UI design system and non-test templates

---

## Phase 7A: Server

Load:
- `orchestrator/phases/phase-7a-server.md`
- `spec/spec.md` and `spec/tasks.md` (full files)

Reference sections:
- `references/STACK.md` (server sections only)
- `references/CONSTITUTION.md` (full file)

Ignore:
- Client templates and design-system component implementation

---

## Phase 7B: Client

Load:
- `orchestrator/phases/phase-7b-client.md`
- `spec/spec.md` and `spec/tasks.md` (full files)

Reference sections:
- `references/DESIGN_SYSTEM.md` (component/usage sections)
- `references/STACK.md` (client sections only)

Ignore:
- Server templates and constitution implementation details

---

## Phase 8: Security

Load:
- `orchestrator/phases/phase-8-security.md`
- `.ralph/briefs/phase-0-brief.md` (DOMAIN)
- Current codebase files

Reference sections:
- `references/CONSTITUTION.md` (security principles)

Ignore:
- Design-system and full phase instruction history
