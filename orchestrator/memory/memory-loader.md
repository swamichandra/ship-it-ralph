# Memory Loader Rules

## When to load

Phase 0 only, before intake.

## What to load

1. Last 3 files from `.ralph/memory/episodes/` (most recent first)
2. `.ralph/memory/patterns.md` (full file)

If no episodes exist, continue with patterns only.
If `.ralph/memory/patterns.md` does not exist yet, initialize it from `orchestrator/memory/patterns.md`.

## How memory is used

- Capture recurring user preferences
- Capture domain-specific implementation pitfalls
- Capture phase-level failure patterns
- Use memory as guidance, never as hard constraints

## What not to do

- Do not override explicit user instructions with memory
- Do not reference prior episodes directly to the user
- Do not assume prior scope applies to new ideas

## Relevance filtering

- Weight episodes higher when domain matches current run
- Keep general patterns as lightweight defaults

## Episode template

Write to `.ralph/memory/episodes/YYYY-MM-DD-project-name.md`:

```markdown
# Episode: [Project Name]

**Date**: [YYYY-MM-DD]
**Idea**: "[one-sentence spec]"
**Domain**: [domain]
**Outcome**: [SHIP | SHIP_WITH_NOTES | DO_NOT_SHIP]

## What Was Built
- Entities: [count] ([names])
- Screens: [count] ([names])
- API routes: [count]
- Records seeded: [count]

## User Edits to Spec
- [edit]
Insight: [priority signal]

## Phase Issues
### Phase [N]: [Name]
- Issue: [what happened]
- Fix: [what resolved it]
- Lesson: [future guardrail]

## Patterns Noticed
- [pattern]

## For Next Time
- [suggestion]
```
