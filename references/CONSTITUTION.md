# Constitution Reference
## What a project constitution is and how to write one

Read this before emitting `constitution.md` in Phase 7.

---

## Purpose

A constitution is a one-page, plain-language document of non-negotiable
principles for a specific project. It lives in the repo root. Every agent,
every developer, every future factory run reads it first.

It is not a README. It is not a style guide. It is not documentation.
It is a set of constraints that cannot be overridden without explicitly
amending the constitution itself.

---

## What goes in it

**Stack (locked)**: The exact versions and libraries chosen in Phase 2.
No additions without approval. If a library isn't listed, don't add it.

**Code principles**: The 4–6 rules that prevent the most common AI-generated
code failures in this specific project. Examples:
- "No raw SQL string concatenation — parameterised queries only"
- "One React component per file, named export"
- "All API routes return proper HTTP status codes — 400 for bad input, 404 for missing, 201 for created"
- "No hardcoded color values — all colors via CSS custom properties"

**Data principles**: Rules derived from the seed data spec in Phase 2.
- Status enum values — list them explicitly so any future seeding matches
- Required fields — which fields can never be null
- Date range expectations

**Design principles**: The non-negotiable UI rules from Phase 3.
- Which design system is in use (NOVA Eclipse)
- Dark mode default
- Responsive breakpoint
- Empty states required on which screens

**What never ships**: A short blocklist of patterns that are forbidden.
- Hardcoded secrets
- Raw SQL string concat
- Inline hex colors
- Components over N lines (pick a reasonable limit)

---

## What does NOT go in it

- Implementation details (those belong in spec.md)
- Task breakdown (that belongs in tasks.md)
- API routes or screen specs (spec.md)
- Instructions to the model (this is a project document, not a prompt)
- Anything that should change as the project evolves normally

---

## Format rules

- Plain markdown. No tables. No nested lists beyond one level.
- Sections: Stack · Code Principles · Data Principles · Design Principles · What Never Ships
- Length: one page. If it needs to be longer, it's too detailed.
- Tone: declarative. "No X" not "Please avoid X". "Always Y" not "Try to Y".
- Versioned: include a `_Last updated_` line so it can be amended intentionally.

---

## Example constitution (abbreviated)

```markdown
# Acme Tracker — Constitution
_Last updated: [date] · Ralph Wiggum Loop v6.0_

## Stack
React 18 + Vite + Tailwind · Express + Node (ESM) · SQLite/better-sqlite3
No additional dependencies without explicit approval.

## Code Principles
- One component per file. Named exports only.
- All colors via CSS custom properties. No hardcoded hex.
- API routes: 400 bad input · 404 not found · 201 created. Always.
- Parameterised queries only. No string SQL concatenation.
- React Router paths match spec.md slugs exactly.

## Data Principles
- Status enum: active | pending | overdue | cancelled (no others)
- Required fields: id, name, status (never null)
- Dates: ISO 8601 strings. Span at least 12 months in seed data.

## Design Principles
- NOVA Eclipse design system. Read DESIGN_SYSTEM.md before writing UI.
- Dark mode default. ModeToggle always present in nav.
- Every data screen has an empty state component.
- Every list has a live search filter.
- Responsive at 640px. No horizontal overflow.

## What Never Ships
- Hardcoded API keys or secrets
- Raw SQL string concatenation
- Inline hex color values
- React components over 150 lines
```

---

*v1.0.0 · Swami Chandrasekaran*
