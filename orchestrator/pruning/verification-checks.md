# Inter-Phase Verification Checks

After each phase and before writing the brief, validate output coherence.
If any check fails, fix it before moving on.

---

## After Phase 0

- DOMAIN is one of `NONE | MEDICAL | FINANCIAL | LEGAL`
- SPEC is one sentence: what it does, who uses it, core action
- Review mode noted when `--review` is present

## After Phase 1

- JOBS are verb phrases
- MVP count respects mode caps
- CUT is non-empty
- WIN is measurable

## After Phase 2

- Each entity has `id`
- CRUD routes exist per entity
- Fields support MVP/JOBS
- Chart requirements align with CHARTS flag

## After Phase 3

- Screen slugs are lowercase-hyphenated and unique
- Every screen has a primary action
- Every entity appears in at least one screen
- Component names exist in design system

## After Phase 4

- `spec/spec.md` written to disk
- Required sections present
- Entity/route/slug names match prior phases exactly

## After Phase 5

- `spec/tasks.md` written to disk
- Task IDs sequential and complete
- Task count follows Phase 5 scope formula
- One schema/seed/routes task per entity
- One page task per screen
- Server block before client block

## After Phase 6

- `tests/api.test.js` exists with one describe per entity
- `tests/seed.test.js` exists with one test per JOB
- Tests use exact entity/field names from spec
- Record minimum assertions align with mode-aware seed minimums

## After Phase 7A

- Server tasks are checked in `spec/tasks.md`
- Health check passes: `GET /api/health` -> `{ "status": "ok" }`
- Tables/routes match `spec/spec.md`
- Parameterized SQL only

## After Phase 7B

- Client tasks are checked in `spec/tasks.md`
- Router paths match spec slugs exactly
- Empty states and search filters exist
- ModeToggle present
- No hardcoded hex colors

## After Phase 8

- Security block emitted with valid verdict
- High findings are fixed or verdict is `DO_NOT_SHIP`
- Helmet + localhost CORS + validation + no secrets enforced

---

## Failure handling

1. Fix immediately in the current phase output
2. Note fix in phase brief verification notes
3. Continue only after all checks pass
