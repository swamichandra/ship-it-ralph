# Ralph Anti-Generic UI Contract (v2.0)

This file overrides default “vibe-coded UI” behavior for **composition, layout, metaphor, and experiential polish**.

If there is any conflict between this file and `DESIGN_SYSTEM.md` on **structure, patterns, screen concept, or theme default**, **this file wins**. On **palette, typography tokens, CSS variables, listed components, and §9 AI primitives**, follow `DESIGN_SYSTEM.md` unless this file explicitly says otherwise.

---

## 0. CORE PRINCIPLE

The goal is NOT to look “modern” or “clean”.

The goal is:
> **Produce an interface that feels intentional, opinionated, emotionally legible, and unmistakably not AI-generated**

If the output feels like:
- a SaaS dashboard
- a template
- a component library demo
- a layout made by satisfying a checklist instead of making a product

→ it is **invalid and must be redesigned**

---

## 0b. RELATIONSHIP TO THE DESIGN SYSTEM

- **Keep:** Eclipse palette (`var(--*)`), Geist + Instrument Serif, spacing/motion tokens, Iconoir, glass/surface language where it serves the metaphor, **§9 AI-native patterns** (skeleton, optimistic, streaming).
- **Challenge:** Card grids as the whole product, symmetrical “KPI + table” shells, repeating identical modules, default `dashboard-grid` with no twist, “big empty hero plus safe cards below”.
- **Rule of thumb:** Tokens and primitives are shared; **the shell, hierarchy, and rhythm are bespoke** to this app.

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

**`fast` mode:** Same headings; each bullet may be a single tight sentence.

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
- “Use a clean modern shell”

✅ ALWAYS:
- Define layout like a system diagram

Example:
- Left rail: 64px icon strip
- Center: living timeline / canvas / work surface
- Right: contextual inspector or AI review rail

**CRUD / data-heavy apps:** A table or list may occupy **one** region as the job demands; the screen must still satisfy **section 5** (visual tension), **section 6** (a dominant idea), and **section 11** (felt polish). A bare full-width grid of cards around a default table is not enough.

---

## 3. BAN GENERIC UI PATTERNS

The following are NOT allowed unless explicitly justified:

- Card grids as primary structure
- Evenly spaced dashboards
- Fully symmetrical layouts
- Repeating identical components more than twice
- “KPI cards + table” as default UI
- Empty oversized hero areas with weak utility beneath

If used → must include transformation or variation.

### 3a. REJECTED SHELL (pattern match — stop and redesign)

If the built UI **matches this cluster**, it **failed** the contract:

- Default workspace is light gray / off-white with **white** metric blocks, or a dark sidebar glued to a generic pale main content area.
- Main content is mostly an **even N-column grid** of same-sized cards with **large radius + soft shadow**.
- Typography is generic UI sans only — **no** display serif or strong section identity where the design system calls for it.
- Only KPI strips + area/bar charts inside cards; **no** `WEIRD_HOOK`, **no** intentional asymmetry, **no** region that breaks the grid.
- The experience feels “starter template polished”, not “product-specific”.

**Fix path:** rebuild shell from Phase 3 `LAYOUT_SPEC` + `WEIRD_HOOK`. Charts and numbers may live **inside** a deliberate layout, never replace it.

---

## 4. COMPONENT UNIQUENESS RULE

No component may repeat more than 2 times without variation.

Variation must include at least one:
- Size
- Layout
- Interaction
- Density
- Semantic role

If four cards look like the same card with different labels, redesign.

---

## 5. FORCE VISUAL TENSION

Every screen must include at least ONE:

- Asymmetry (intentional imbalance)
- Overlap (layering elements)
- Depth contrast (foreground vs background separation)
- Mixed density (tight + open areas)
- Offset anchoring (e.g. floating inspector, broken alignment, pinned action strip)

❌ Avoid:
- perfect grids
- evenly spaced layouts everywhere
- a page that could be screenshot-cropped into any other B2B app

---

## 6. STRONG IDEA PER SCREEN

Each in-scope screen must carry **one** dominant concept (tag it on the screen line in Phase 3, e.g. `idea:`).

```
SCREEN_IDEA: [for this screen — a single dominant concept]
```

Examples:
- “Operating system for commitments”
- “Live control room”
- “Canvas of active entities”
- “Timeline as a living system”
- “Inbox for AI-suggested actions”

If every screen is only “list with filters” with no distinct idea → reject output.

---

## 7. INTERACTION-FIRST RULE

UI must NOT be static.

Must include:
- state transitions
- user-triggered transformations
- visible system feedback
- a sense that the interface is helping work move forward, not merely displaying stored records

❌ Avoid:
- passive dashboards
- static layouts
- decorative AI labels with no controls

---

## 8. WEIRDNESS INJECTION (MANDATORY)

Each **app** must include at least **one** unexpected or memorable element (name it `WEIRD_HOOK` in Phase 3). It must be **implementable** in the stack (React/CSS).

Examples:
- Obvious state-driven motion (queue items “settling,” stage changes on status)
- Asymmetric or broken-grid hero / nav
- One non-rectangular or angled panel treatment
- Live-updating strip or ticker tied to real seed data
- Future-planning ribbon that previews likely drift or regret
- AI suggestion lane that physically reorders the day when accepted

This prevents regression to generic patterns.

---

## 9. MOTION IS MEANING

Animations must:
- communicate state
- guide attention
- reflect system changes
- reduce cognitive friction

❌ Avoid:
- decorative-only motion
- floaty nonsense
- random parallax or “premium” shimmer with no information value

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
- “Apple Health trends”
- “Arc browser sidebar rhythm”

❌ Do NOT use:
- “modern SaaS UI”
- “clean dashboard”
- “minimal startup aesthetic”

---

## 11. EXPERIENCE QUALITY BAR (NEW HARD RULE)

The output must feel like it was tuned by designers who are maniacal about the human experience.

That means:
- primary action is obvious within 3 seconds
- hierarchy is readable without effort
- no broken-feeling dead zones
- no giant decorative emptiness where useful motion or context should be
- controls are placed near the decision they affect
- the interface reduces ambiguity instead of adding surface area
- first paint should already feel coherent, not like a scaffold waiting for taste

Reject if the UI is:
- sparse in a low-effort way
- over-padded without purpose
- under-resolved in transitions or spacing
- visually “fine” but experientially flat
- clearly assembled from cards instead of composed as a system

---

## 12. THEME DEFAULT RULE

Theme default is a product decision, not a blanket ideology.

### Use **light-default** when the product is primarily:
- productivity
- planning
- writing
- note-taking
- team coordination
- utility / life-management
- reading-heavy

### Use **dark-default** when the product is primarily:
- control-room / monitoring
- trading / security / operations
- media / immersive environments
- cinematic or high-contrast creative tooling
- a domain where darkness supports focus or atmosphere better than paper-like clarity

Phase 3 must state:

```
THEME: [light-default | dark-default] because [reason]
```

Defaulting to dark because it “looks cooler” is invalid.

---

## 13. AI-NATIVE UX RULE

If the app is AI-native, the design must visibly prove it in the primary workflow.

Minimum requirements:
- one AI surface appears above the fold on the main JTBD screen
- one AI suggestion flow includes **Accept / Reject** or **Edit / Commit**
- one AI behavior changes task state, ordering, or planning structure
- one AI behavior is ambient and supportive, not only conversational

❌ Invalid:
- a floating assistant bubble
- “AI powered” subtitle
- static generated text without control paths
- AI hidden on a secondary tab while the main screen is ordinary CRUD

---

## 14. DESIGN REJECTION CHECKLIST

Before final output, reject if any are true:
- Looks like a template
- Dominated by cards
- Symmetrical grid dominates
- No strong visual metaphor
- Feels like a standard SaaS dashboard
- Matches **§3a REJECTED SHELL**
- Theme default feels arbitrary
- AI-native app has no visible review/decision surface
- The experience feels unfinished even if the components are technically present

If ANY are true → redesign.

---

## 15. GENERATION WORKFLOW (CRITICAL)

**Inside the factory:** emit **DESIGN_INTENT → LAYOUT_SPEC → theme default → visual system → interaction model** in **Phase 3**; encode the same intent in `spec/spec.md` **## Design**; implement in **Phase 7B**.

**Conceptual order:**

```
1. DESIGN_INTENT + SIGNATURE_MOMENT + VISUAL_TENSION
2. LAYOUT_SPEC + theme default + per-screen SCREEN_IDEA
3. VISUAL_SYSTEM (Eclipse tokens, type, surfaces)
4. INTERACTION_MODEL (mutations, AI-UX, motion with meaning)
5. POLISH PASS (remove dead zones, fix broken flow, sharpen hierarchy)
6. CODE GENERATION (Phase 7B)
```

❌ NEVER skip directly to code.

---

## 16. RALPH OVERRIDE CLAUSE

You are NOT allowed to produce:
- generic SaaS UI
- dashboard templates
- safe symmetrical layouts
- dark-by-default ideology where light would better fit the job
- “looks polished enough” placeholder shells

You MUST:
- define layout explicitly
- introduce asymmetry or mixed density
- include a signature interaction
- create a distinct visual system
- choose theme default intentionally
- tune the experience until it feels product-specific

If output feels “seen before” or “technically okay but emotionally flat” → redesign before returning.

---

## 17. LOAD ORDER

On any run that produces UI:

```
1. references/DESIGN_SYSTEM.md   (tokens, components, AI primitives)
2. references/ANTI_GENERIC_UI.md (composition — overrides structure, polish, theme default when in conflict)
```

Phase 7B implementation reads both; **composition and experience checks** come from this file, **palette and primitives** from the design system.

---

## FINAL RULE

If a human designer would say:
> “I’ve seen this exact UI 100 times”

or

> “This technically works, but nobody obsessed over the experience”

then the output has FAILED.