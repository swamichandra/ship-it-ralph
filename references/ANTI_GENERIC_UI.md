# Ralph Anti-Generic UI Contract (v1.2)

This file overrides default “vibe-coded UI” behavior for **composition, layout, and metaphor**.

If there is any conflict between this file and `DESIGN_SYSTEM.md` on **structure, patterns, or screen concept**, **this file wins**. On **palette, typography tokens, CSS variables, listed components, and §9 AI primitives**, follow `DESIGN_SYSTEM.md` unless this file explicitly says otherwise.

---

## 0. CORE PRINCIPLE

The goal is NOT to look “modern” or “clean”.

The goal is:
> **Produce an interface that feels intentional, opinionated, and unmistakably not AI-generated**

If the output feels like:
- a SaaS dashboard  
- a template  
- something seen 100 times  

→ it is **invalid and must be redesigned**

---

## 0b. RELATIONSHIP TO THE DESIGN SYSTEM

- **Keep:** Eclipse palette (`var(--*)`), Geist + Instrument Serif, spacing/motion tokens, Iconoir, glass/surface language where it serves the metaphor, **§9 AI-native patterns** (skeleton, optimistic, streaming).
- **Challenge:** Card grids as the whole product, symmetrical “KPI + table” shells, repeating identical modules, default `dashboard-grid` with no twist.
- **Rule of thumb:** Tokens and primitives are shared; **the shell and rhythm are bespoke** to this app.

---

## 1. REQUIRED DESIGN CONTRACT (MANDATORY)

Emit the following **in Phase 3** (and again on `/redesign`) **before** screen lists and implementation — not only as silent reasoning. Same blocks belong in `spec/spec.md` under **## Design** (or a subsection) so later phases preserve intent.

```
DESIGN_INTENT:
- Core metaphor: [one line]
- Visually distinct because: [one line]
- Not generic because: [one line]

SIGNATURE_MOMENT:
- One defining interaction or visual: [specific]

VISUAL_TENSION:
- Where asymmetry, overlap, depth, or mixed density appears: [specific]
```

If this section is missing → **that phase output is invalid** (rewrite Phase 3 before Phase 4).

**`fast` mode:** Same headings; each bullet may be a single tight sentence (no fewer headings).

---

## 2. LAYOUT MUST BE EXPLICIT (NO AUTOGENERATION)

```
LAYOUT_SPEC:
- Regions (left / center / right / floating): [roles and rough sizing or flex behavior]
- Fixed vs fluid: [what pins, what grows]
- Mobile (<640px): [collapse order and what stacks]
```

❌ NEVER:
- “Create a dashboard”
- “Use a responsive layout”

✅ ALWAYS:
- Define layout like a system diagram

Example:
- Left rail: 64px icon strip
- Center: infinite canvas
- Right: contextual inspector (appears on selection)

**CRUD / data-heavy apps:** A table or list may occupy **one** region as the job demands; the screen must still satisfy **section 6** (a dominant idea) and **section 5** (visual tension elsewhere on the screen — offset header, asymmetric chrome, inspector rail, etc.). A bare full-width grid of cards around a default table is not enough.

---

## 3. BAN GENERIC UI PATTERNS

The following are NOT allowed unless explicitly justified:

- Card grids as primary structure
- Evenly spaced dashboards
- Fully symmetrical layouts
- Repeating identical components more than twice
- “KPI cards + table” as default UI

If used → must include transformation or variation

### 3a. REJECTED SHELL (pattern match — stop and redesign)

If the built UI **matches this cluster**, it **failed** the contract (models gravitate here for “analytics / tokenomics / usage” apps):

- **Default workspace** is light gray / off-white (`#f3f4f6`-style) with **white** metric blocks, **not** Eclipse `data-theme="dark"` as the initial experience.
- **Main content** is mostly an **even N-column grid** of same-sized cards with **large radius + soft shadow** (the “shadcn / SaaS kit” look).
- **Optional dark left sidebar** + washed-out main (split personality) with **no** shared surface language from the design system.
- **Typography** is generic UI sans only — **no** display serif (or equivalent) for page/section identity where the design system calls for it.
- **Only** KPI strips + area/bar charts inside cards; **no** `WEIRD_HOOK`, **no** intentional asymmetry, **no** region that breaks the grid.

**Fix path:** Reread `DESIGN_SYSTEM.md` §§1–2 (dark body, tokens). Rebuild shell from Phase 3 `LAYOUT_SPEC` + `WEIRD_HOOK` — charts and numbers sit **inside** a deliberate layout, not as the layout.

---

## 4. COMPONENT UNIQUENESS RULE

No component may repeat more than 2 times without variation.

Variation must include at least one:
- Size
- Layout
- Interaction
- Density

---

## 5. FORCE VISUAL TENSION

Every screen must include at least ONE:

- Asymmetry (intentional imbalance)
- Overlap (layering elements)
- Depth contrast (foreground vs background separation)
- Mixed density (tight + open areas)

❌ Avoid:
- perfect grids
- evenly spaced layouts everywhere

---

## 6. STRONG IDEA PER SCREEN

Each in-scope screen must carry **one** dominant concept (tag it on the screen line in Phase 3, e.g. `idea:`).

```
SCREEN_IDEA: [for this screen — a single dominant concept]
```

Examples:
- “Operating system for X”
- “Live control room”
- “Canvas of active entities”
- “Timeline as a living system”

If every screen is only “list with filters” with no distinct idea → reject output

---

## 7. INTERACTION-FIRST RULE

UI must NOT be static.

Must include:
- state transitions
- user-triggered transformations
- visible system feedback

❌ Avoid:
- passive dashboards
- static layouts

---

## 8. WEIRDNESS INJECTION (MANDATORY)

Each **app** must include at least **one** unexpected or memorable element (name it `WEIRD_HOOK` in Phase 3). It must be **implementable** in the stack (React/CSS); avoid promising multiplayer or real physics unless the spec already includes them.

Examples:
- Obvious state-driven motion (queue items “settling,” stage changes on status)
- Asymmetric or broken-grid hero / nav
- One non-rectangular or angled panel treatment
- Live-updating strip or ticker tied to real seed data

This prevents regression to generic patterns.

---

## 9. MOTION IS MEANING

Animations must:
- communicate state
- guide attention
- reflect system changes

❌ Avoid:
- decorative-only motion

---

## 10. DESIGN REFERENCES (MANDATORY)

Every UI-producing run must include **`INSPIRATION`** (three named references) in **Phase 3** and persist it under **## Design** in `spec/spec.md`.

```
INSPIRATION:
- [specific reference 1]
- [specific reference 2]
- [specific reference 3]
```

Examples:
- “Figma multiplayer”
- “Notion AI canvas”
- “Bloomberg terminal”
- “Linear.app density”

❌ Do NOT use:
- “modern SaaS UI”
- “clean dashboard”

---

## 11. DESIGN REJECTION CHECKLIST

Before final output:

Reject if:
- Looks like a template
- Dominated by cards
- Symmetrical grid dominates
- No strong visual metaphor
- Feels like a standard SaaS dashboard
- Matches **§3a REJECTED SHELL** (light default workspace + white shadow card grid + chart/KPI-only main)

If ANY are true → redesign

---

## 12. GENERATION WORKFLOW (CRITICAL)

**Inside the factory:** emit **DESIGN_INTENT → LAYOUT_SPEC → (palette/components from design system) → interaction model** in **Phase 3**; encode the same intent in `spec/spec.md` **## Design**; implement in **Phase 7B**. Do not open Phase 7B with only token paste and no layout metaphor.

**Conceptual order (same design session, not Ralph phase numbers):**

```
1. DESIGN_INTENT + SIGNATURE_MOMENT + VISUAL_TENSION
2. LAYOUT_SPEC + per-screen SCREEN_IDEA
3. VISUAL_SYSTEM (Eclipse tokens, type, surfaces)
4. INTERACTION_MODEL (mutations, AI-UX, motion with meaning)
5. CODE GENERATION (Phase 7B)
```

❌ NEVER skip directly to code

---

## 13. RALPH OVERRIDE CLAUSE

You are NOT allowed to produce:
- generic SaaS UI
- dashboard templates
- safe symmetrical layouts

You MUST:
- define layout explicitly
- introduce asymmetry
- include a signature interaction
- create a distinct visual system

If output feels “seen before” → redesign before returning

---

## 14. LOAD ORDER

On any run that produces UI:

```
1. references/DESIGN_SYSTEM.md   (tokens, components, §9)
2. references/ANTI_GENERIC_UI.md (composition — overrides structure when in conflict)
```

Phase 7B implementation reads both; **composition checks** come from this file, **palette and primitives** from the design system.

---

## FINAL RULE

If a human designer would say:
> “I’ve seen this exact UI 100 times”

Then the output has FAILED.
